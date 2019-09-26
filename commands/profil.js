const mysql = require('mysql');
const { Client, RichEmbed } = require('discord.js');

const profilConfig = require('./profilconfig.js');

var pool = mysql.createPool({
  connectionLimit: 100,
  host: "localhost",
  user: "",
  password: "",
  database: "profilBot",
  debug: false
});


function showProfil(pseudo, msg)
{

  try {
    if(msg.guild === undefined || msg.guild === null) return;


    let sql = "SELECT * FROM profils WHERE pseudo='"+pseudo.toString()+"'";

    pool.getConnection(function(err,connection){
      if (err) {
        console.error(err);
        return;
      }

      connection.query(sql,function(err,rows){
        connection.release();
        if(!err) {

            const rslt = rows;

            let usernamefound ="";
            let pictureFound = "";


            msg.guild.members.filter((member) => {
                if(member.user.id === pseudo.replace(/\<|\>|@/g, ""))
                {
                  usernamefound = member.user.username + "#" + member.user.discriminator;
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
            embed.setFooter("Requête demandée par " + msg.author.username+"#"+msg.author.discriminator, msg.author.avatarURL);

            msg.channel.send(embed);


        }
        else {
          console.error(err)
        }
      });

      connection.on('error', function(err) {
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

    msg.author.send("Bonjour, Cette configuration se fera en entretient, alors, dit moi, que veux-tu modifier ?"+
    "\n\n`Présentation`\n`langages`\n`avatar`\n`bannière`\n`site`\n\n"+
    "`cancel` pour annuler")
    .then(() => {
      msg.channel.awaitMessages(m => m.author.id === msg.author.id, {
          max: 1,
          time: 30000,
          errors: ['time']
      })
      .then(res => {
            res = res.first();

            console.log(res.content);
            if(res.content === "cancel"){ msg.author.send("Très bien, j'arrête tout"); return;}
            else if(res.author.id === msg.author.id){

              if(res.content.toLowerCase() === "présentation"){ profilConfig.presentation(msg, pool); return;}
              else if(res.content.toLowerCase() === "langages"){ profilConfig.langage(msg, pool); return;}
              else if(res.content.toLowerCase() === "avatar"){ profilConfig.avatar(msg, pool); return;}
              else if(res.content.toLowerCase() === "bannière"){ profilConfig.banner(msg, pool); return;}
              else if(res.content.toLowerCase() === "site"){ profilConfig.website(msg, pool); return;}
              else msg.author.send("Tu n'as pas envoyé le bon mot clef, je me casse, ciao."); return;
            }
            else {
              return;
            }

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
    else msg.reply("Il manque des informations, je ne peux pas travailler dans de telles conditions !")
};
