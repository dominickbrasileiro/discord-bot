/* eslint-disable no-param-reassign */
import { Guild, Message } from 'discord.js';
import * as ytdl from 'ytdl-core';
import { ICommand } from '.';
import { IQueue, ISong } from '../protocols/queue';

async function play(queue: IQueue, guild: Guild, song: ISong) {
  const serverQueue = queue[guild.id];

  if (!song) {
    serverQueue.voiceChannel.leave();
    delete queue[guild.id];
    return;
  }

  const dispatcher = serverQueue.connection
    .play(ytdl(song.url))
    .on('finish', () => {
      serverQueue.songs.shift();
      play(queue, guild, serverQueue.songs[0]);
    });

  dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

  await serverQueue.textChannel.send(`Start playing: **${song.title}**`);
}

const playCommand: ICommand = async (msg: Message, queue: IQueue) => {
  const voiceChannel = msg.member.voice.channel;
  if (!voiceChannel) {
    await msg.channel.send('You need to be in a voice channel to play music!');
  }

  const permissions = voiceChannel.permissionsFor(msg.client.user);

  if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
    await msg.channel.send(
      'I need the permissions to join and speak in your voice channel!',
    );
  }

  const songArgs = msg.content.split(' ')[1];

  const songInfo = await ytdl.getInfo(songArgs);
  const song = {
    title: songInfo.videoDetails.title,
    url: songInfo.videoDetails.video_url,
  };

  let serverQueue = queue[msg.guild.id];

  if (serverQueue) {
    serverQueue.songs.push(song);

    await msg.channel.send(`${song.title} has been added to the queue!`);
  } else {
    serverQueue = {
      textChannel: msg.channel,
      voiceChannel,
      connection: null,
      songs: [],
      volume: 5,
      playing: true,
    };

    queue[msg.guild.id] = serverQueue;

    serverQueue.songs.push(song);

    try {
      const connection = await voiceChannel.join();
      serverQueue.connection = connection;

      play(queue, msg.guild, serverQueue.songs[0]);
    } catch (err) {
      delete queue[msg.guild.id];
      await msg.channel.send(err);
    }
  }
};

export { playCommand };
