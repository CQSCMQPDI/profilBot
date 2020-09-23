const mysql = require('mysql');
const { RichEmbed } = require('discord.js');

let showProfil = require('./profilCommands/showProfil.js');
let setProfil = require('./profilCommands/setProfil.js');

const mysqlConfig = require("../config/mysql_config.json");
const sententes = require("../config/sentences.json");

var pool = mysql.createPool({
  connectionLimit: mysqlConfig.connectionLimit,
  host: mysqlConfig.host,
  user: mysqlConfig.user,
  password: mysqlConfig.password,
  database: mysqlConfig.database,
  debug: mysqlConfig.debug
});



module.exports = (argv, msg) => {

    let arg = argv.split(" ");
    console.log(arg);
    if(arg[0] === "show" && arg[1] != undefined) showProfil(arg[1], msg, pool);
    else if(arg[0] === "set") setProfil(msg, pool);
    else msg.reply(sententes.errorMessage)
};
