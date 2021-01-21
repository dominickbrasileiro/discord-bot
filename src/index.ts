/* eslint-disable no-console */
import 'dotenv/config';
import { botConfig } from './config/bot';
import { client } from './client';
import { commands } from './commands';
import { IQueue } from './protocols/queue';

const { prefix, token } = botConfig;

const queue: IQueue = {};

client.once('ready', () => {
  console.log('🤖 Bot ready!');
});

client.on('message', async msg => {
  if (msg.author.bot) return;

  if (msg.content.startsWith(prefix)) {
    const command = msg.content.split(' ')[0].replace(prefix, '');

    await commands[command](msg, queue);
  }
});

client.login(token);
