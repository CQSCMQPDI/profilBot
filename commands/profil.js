const mysql = require('mysql2');

let showProfil = require('./profilCommands/showProfil.js');
let setProfil = require('./profilCommands/setProfil.js');

const mysqlConfig = require("../config/mysql_config.json");
const sententes = require("../config/sentences.json");

var pool = mysql.createPool({
  connectionLimit: mysqlConfig.connectionLimit,
  host: mysqlConfig.host,
  user: mysqlConfig.user,
  password: mysqlConfig.password,
  database: mysqlConfig.database
});



module.exports = (argv, msg) => {
  
  
    let arg = argv.split(" ");
    if(arg[0] === "show" && arg[1] != undefined) showProfil(arg[1], msg, pool);
    else if(arg[0].toString().toLowerCase() === "set" && arg[1] != undefined) setProfil(msg, pool);
    else msg.reply(sententes.errorMessage)

};
