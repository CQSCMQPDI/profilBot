const bot_config = require('../../config/bot_config.json');
const misc = require("../misc.js");

const introduction = require("./profilconfig/introduction.js");
const avatar = require("./profilconfig/avatar.js");
const banner = require("./profilconfig/banner.js");
const languages = require("./profilconfig/languages.js");
const website = require("./profilconfig/website.js");

module.exports = (msg, pool) => {
    
    msg.author.send(`Bonjour, Cette configuration se fera en entretien, alors, dis moi, que veux-tu modifier ?\n\n
\`Présentation\`\n
\`Langages\`\n
\`Bannière\`\n
\`Avatar\`\n
\`Site\`\n
\n
\`cancel\` pour annuler`).then(dmMsg => {

        dmMsg.channel.awaitMessages(m => m.author.id === msg.author.id, {
            max: 1,
            time: bot_config.awaitMessages,
            errors: ['time']
        }).then(res => {
            
            res = res.first();
            if(res == null) {
                dmMsg.author.send("Erreur");
                return;
            }

            switch (res.content.toLowerCase()) {
                    case "présentation":
                        introduction(res, pool);
                        break;
                    case "langage":
                        languages(res, pool);
                        break;
                    case "avatar":
                        avatar(res, pool);
                        break;
                    case "bannière":
                        banner(res, pool);
                        break;
                    case "site":
                        website(res, pool);
                        break;
                    case "cancel":
                        misc.sendMessagesCode(res, "stopAll");
                        break;

                    default:
                        res.author.send("Tu n'as pas envoyé le bon mot clef, je me casse, ciao.");
                        break;
            }

            return;
            
        }).catch(err => {
            throw err;
        });

    }).catch(err => {
        throw err;
    });

}