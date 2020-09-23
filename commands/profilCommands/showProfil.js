module.exports = (pseudo, msg, pool) => {

    try {
        if (msg.guild == undefined) return;


        pool.getConnection((err, connection) => {
            if (err) {
                console.error(err);
                return;
            }

            connection.query("SELECT * FROM profils WHERE pseudo=?", [pseudo], (err, rows) => {
                connection.release();
                if (!err) {

                    const rslt = rows;

                    let usernamefound = "";
                    let pictureFound = "";


                    if (rslt[0] === undefined) {
                        msg.channel.send("Le profil demandé n'existe pas");
                        return;
                    }
                    else if (rslt[0].picture === undefined || rslt[0].banner === undefined) {
                        msg.channel.send("Le profil demandé est incomplet");
                        return;
                    }


                    msg.guild.members.filter((member) => {
                        if (member.user.id === pseudo.replace(/\<|\>|@/g, "")) {
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
