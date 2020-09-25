const { RichEmbed } = require('discord.js');


module.exports = (pseudo, msg, pool) => {

        if (msg.guild == undefined) throw `msg.guild undefined for ${msg.author.tag}`;
            
            pool.query("SELECT * FROM profils WHERE pseudo=?", [pseudo], (err, rows) => {
                if (!err) {

                    const rslt = rows;

                    let usernamefound = "";
                    let pictureFound = "";

                    if (rslt[0] == null) {
                        msg.channel.send("Le profil demandé n'existe pas");
                        console.error(`Profil n'existe pas, demandé par ${msg.author.tag}`);
                        return;
                    }
                    else if (rslt[0].picture == undefined || rslt[0].banner == undefined) {
                        msg.channel.send("Le profil demandé est incomplet");
                        console.error(`Profil incomplet, demandé par ${msg.author.tag}`);
                        return;
                    }


                    msg.guild.members.filter((member) => {
                        if (member.user.id === pseudo.replace(/\<|\>|@\!/g, "")) {
                            usernamefound = `${member.user.tag}`;
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
                    embed.setFooter(`Requête demandée par ${msg.author.tag}`, msg.author.avatarURL);

                    msg.channel.send(embed);


                }
                else {
                    throw err;
                }
            });

}
