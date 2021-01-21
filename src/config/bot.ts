interface IBotConfig {
  token: string;
  prefix: string;
}

const botConfig: IBotConfig = {
  token: process.env.DISCORD_BOT_TOKEN,
  prefix: '/',
};

export { botConfig };
