const mysql = require('mysql');
const { RichEmbed } = require('discord.js');

const profilConfig = require('./profilconfig.js');
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


function showProfil(pseudo, msg)
{

  try {
    if(msg.guild == undefined) return;


    pool.getConnection((err,connection) => {
      if (err) {
        console.error(err);
        return;
      }

      connection.query("SELECT * FROM profils WHERE pseudo=?", [pseudo], (err,rows) => {
        connection.release();
        if(!err) {

            const rslt = rows;

            let usernamefound ="";
            let pictureFound = "";


            if(rslt[0] === undefined){ 
              msg.channel.send("Le profil demandé n'existe pas");
              return;
            }
            else if(rslt[0].picture === undefined || rslt[0].banner === undefined){
              msg.channel.send("Le profil demandé est incomplet"); 
              return;
            }


            msg.guild.members.filter((member) => {
                if(member.user.id === pseudo.replace(/\<|\>|@/g, ""))
                {
                  usernamefound = `${member.user.username}#${member.user.discriminator}`;
                  pictureFound = member.user.avatarURL;
                }
            });

            const embed = new RichEmbed();
            embed.setTitle("Profil");
            embed.setAuthor(usernamefound, pictureFound);
            embed.setThumbnail(rslt[0].picture);
            embed.addField("Présentation:", rslt[0].presentation);
            embed.addField("Langages:", rslt[0].langage);
            embed.addField("Mon site web:", rslt[0].website);
            embed.setImage(rslt[0].banner);
            embed.setFooter(`Requête demandée par ${msg.author.username} #${msg.author.discriminator}`, msg.author.avatarURL);

            msg.channel.send(embed);


        }
        else {
          console.error(err)
        }
      });

      connection.on('error', (err) => {
        console.error(err);
        return;
      });
    });






  } catch (e) {
    console.log(e);
  }


}


function setProfil(msg)
{
  try {

    msg.author.send(`Bonjour, Cette configuration se fera en entretien, alors, dis moi, que veux-tu modifier ?\n\n
    \`Présentation\`\n
    \`Langages\`\n
    \`Bannière\`\n
    \`Avatar\`\n
    \`Site\`\n
    \n
    \`cancel\` pour annuler`)
    .then(() => {
      msg.channel.awaitMessages(m => m.author.id === msg.author.id, {
          max: 1,
          time: 30000,
          errors: ['time']
      })
      .then(res => {
            res = res.first();

            console.log(res.content);

            if(res.content === "cancel" || res.content === "c"){ msg.author.send(
              sententes.stopAll); 
              return;
            }
            else if(res.author.id === msg.author.id){

              switch(res.content.toLowerCase())
              {
                case "présentation" || "present":
                  profilConfig.presentation(msg, pool);
                  return;
                case "langages" || "lang":
                  profilConfig.langage(msg, pool);
                  return;
                case "avatar":
                  profilConfig.avatar(msg, pool);
                  return;
                case "bannière" || "banner":
                  profilConfig.banner(msg, pool); 
                  return;
                case "site":
                  profilConfig.website(msg, pool);
                  return;
                default:
                  msg.author.send("Tu n'as pas envoyé le bon mot clef, je me casse, ciao.");
                  return;
              }

            }

            else return;

      }).catch((_) => {});

    });

  } catch (e) {
    console.log(e);
  }


}







module.exports = function(argv, msg) {

    let arg = argv.split(" ");

    if(arg[1] === "show" && arg[2] !== undefined && arg[2] !== null) showProfil(arg[2], msg);
    else if(arg[1] === "set") setProfil(msg);
    else msg.reply(sententes.errorMessage)
};
