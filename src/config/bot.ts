interface IBotConfig {
  token: string;
}

const botConfig: IBotConfig = {
  token: process.env.DISCORD_BOT_TOKEN,
};

export { botConfig };
