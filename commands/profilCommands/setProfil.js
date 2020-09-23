let profilConfig = require("../profilconfig.js");

module.exports = (msg, pool) => {
    
    
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
                }).then(res => {

                        res = res.first();

                        console.log(res.content);

                        if (res.content === "cancel" || res.content === "c") {
                            msg.author.send(sententes.stopAll);
                            return;
                        }
                        else if (res.author.id === msg.author.id) {

                            switch (res.content.toLowerCase()) {
                                case "pr":
                                    profilConfig.presentation(msg, pool);
                                    return;
                                case "lang":
                                    profilConfig.langage(msg, pool);
                                    return;
                                case "avatar":
                                    profilConfig.avatar(msg, pool);
                                    return;
                                case "banner":
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

                    }).catch((_) => { });

            });

    } catch (e) {
        console.log(e);
    }


}


