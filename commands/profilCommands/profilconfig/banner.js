const misc = require('../../misc.js');
const updatePoolrequest = require('./../../updatePoolrequest.js');

const bot_config = require("../../../config/bot_config.json");


module.exports = (msg, pool) => {

    msg.author.send("Et bien, passe moi le lien de la bannière que tu voudrais ajouter\n\n" + "`cancel` pour annuler")
        .then(() => {
            
            msg.channel.awaitMessages(m => m.author.id === msg.author.id,
                {
                    max: 1,
                    time: bot_config.timeoutMessages,
                    errors: ['time']
                })
                .then(res => {

                    if(res == null) throw `message vide ${msg.author.id}`;

                    res = res.first().content;

                    if (res === "cancel" | "c") {
                        misc.sendMessagesCode(msg, "stopAll");
                        return null;
                    }

                    if (res.match(/^^https\:\/\/[a-zA-Z0-9\.\/]+[\.jpg|\.png|\.jpeg|\.gif]$/g)) {

                        pool.query("INSERT INTO profils(pseudo, banner) VALUES(?, ?);", [`<@!${msg.author.id}>`, res], (err) => {
                            if (err) {
                                updatePoolrequest("UPDATE profils SET banner= ? WHERE pseudo = ?", res, msg, pool);
                                return null;
                            }
                            else {
                                return null;
                            }
                        });
                        
                    }
                    else {
                        misc.sendMessagesCode(msg, "urlCannoBeParsed");
                        console.error(`Lien non conventionnel ${msg.author.tag}`);
                        return;
                    }
                }).then((err) => {

                    if (err === null) misc.successSaved(msg);

                }).catch(err => {
                    if(err != null){
                        misc.sendMessagesCode(msg, "errorMessage");
                        throw err;
                    }
                    return null;
                });

        }).catch(err => {
            throw err;
        });

};