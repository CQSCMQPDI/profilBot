const Discord = require('discord.js');
const client = new Discord.Client();


const profilcommand = require('./commands/profil.js');

const prefix = "!!!";

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});


client.on('message', msg => {
  if (msg.content.indexOf(prefix) > -1 && msg.content.includes("ping")){msg.reply('Pong!');}
  else if(msg.content.indexOf(prefix) > -1 && msg.content.includes("profil")){profilcommand(msg.content, msg);}






});

client.login('discord-token');
