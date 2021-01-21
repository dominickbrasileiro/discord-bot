import {
  VoiceChannel,
  TextChannel,
  DMChannel,
  NewsChannel,
  VoiceConnection,
} from 'discord.js';

export interface ISong {
  title: string;
  url: string;
}

export interface IQueue {
  [key: string]: {
    textChannel: TextChannel | DMChannel | NewsChannel;
    voiceChannel: VoiceChannel;
    connection?: VoiceConnection;
    songs: ISong[];
    volume: number;
    playing: boolean;
  };
}
