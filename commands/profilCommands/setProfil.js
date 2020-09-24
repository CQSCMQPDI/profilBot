const bot_config = require('../../config/bot_config.json');

const introduction = require("./profilconfig/introduction.js");
const avatar = require("./profilconfig/avatar.js");
const banner = require("./profilconfig/banner.js");
const languages = require("./profilconfig/languages.js");
const website = require("./profilconfig/website.js");

module.exports = (dmMsg, pool) => {
    
    
    try {

        dmMsg.author.send(`Bonjour, Cette configuration se fera en entretien, alors, dis moi, que veux-tu modifier ?\n\n
    \`Présentation\`\n
    \`Langages\`\n
    \`Bannière\`\n
    \`Avatar\`\n
    \`Site\`\n
    \n
    \`cancel\` pour annuler`).then(dmdmMsg => {


                dmdmMsg.channel.awaitMessages(m => m.author.id === dmMsg.author.id, {
                    max: 1,
                    time: bot_config.awaitMessages,
                    errors: ['time']
                }).then(res => {

                    res = res.first();
                        

                        switch (res.content.toLowerCase()) {
                            case "pr":
                                introduction(dmMsg, pool);
                                return;
                            case "lang":
                                languages(dmMsg, pool);
                                return;
                            case "avatar":
                                avatar(dmMsg, pool);
                                return;
                            case "banner":
                                banner(dmMsg, pool);
                                return;
                            case "site":
                                website(dmMsg, pool);
                                return;
                            case "cancel":
                                dmMsg.author.send(sententes.stopAll);
                                return;
                            default:
                                dmMsg.author.send("Tu n'as pas envoyé le bon mot clef, je me casse, ciao.");
                                return;
                        }

                    });
                });

    }catch(err){
        throw err;
    }

}