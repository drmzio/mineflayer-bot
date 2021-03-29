require('dotenv').config();
const mineflayer = require('mineflayer');
const { mineflayer: mineflayerViewer } = require('prismarine-viewer');

/**
 * Create the bot instance.
 * @see https://github.com/PrismarineJS/mineflayer
 */
const bot = mineflayer.createBot({
  host: process.env.MC_HOST,
  username: process.env.MC_USERNAME,
  password: process.env.MC_PASSWORD,
  auth: process.env.MC_AUTH,
});

/**
 * Creates the mineflayer viewer.
 * @see https://github.com/PrismarineJS/prismarine-viewer
 */
const createViewer = () => {
  // Destroy the current viewer if exists.
  if (bot.viewer) {
    bot.viewer.close();
    bot.viewer = undefined;
  }

  mineflayerViewer(bot, { port: process.env.PORT || 3000 });
};

bot.once('spawn', () => {
  createViewer();
});

bot.on('kicked', console.log);
bot.on('error', console.log);
