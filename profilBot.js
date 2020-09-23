const Discord = require('discord.js');
const client = new Discord.Client();

const profilcommand = require('./commands/profil.js');
const bot_config = JSON.parse(require('./config/bot_config.json'));

const prefix = bot_config.prefix;



client.on('ready', () => {

  console.log(`Logged in as ${client.user.tag}!`);

});


client.on('message', msg => {




  if (msg.content.startsWith(prefix) && msg.content.includes("ping")){
    msg.reply('Pong!');
  }

  else if(msg.content.startsWith(prefix) && msg.content.includes("profil")){
    profilcommand(msg.content, msg);
  }


});




client.login(bot_config.bot_token);
