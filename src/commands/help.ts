import { Message } from 'discord.js';

async function helpCommand(msg: Message): Promise<void> {
  await msg.react('👌');
}

export { helpCommand };
