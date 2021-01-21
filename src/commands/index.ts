import { Message } from 'discord.js';
import { helpCommand } from './help';

type ICommand = (msg: Message) => Promise<void>;

interface ICommands {
  [key: string]: ICommand;
}

const commands: ICommands = {
  help: helpCommand,
};

export { commands };
