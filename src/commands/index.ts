import { Message } from 'discord.js';
import { helpCommand } from './help';
import { playCommand } from './play';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ICommand = (msg: Message, ...agrs: any[]) => Promise<any>;

interface ICommands {
  [key: string]: ICommand;
}

const commands: ICommands = {
  help: helpCommand,
  play: playCommand,
};

export { commands };
