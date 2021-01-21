/* eslint-disable no-console */
import 'dotenv/config';
import { client } from './client';
import { botConfig } from './config/bot';

const { token } = botConfig;

client.once('ready', () => {
  console.log('🤖 Bot ready!');
});

client.login(token);
