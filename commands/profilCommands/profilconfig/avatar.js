const misc = require('../../misc.js');
const updatePoolrequest = require('./../../updatePoolrequest.js');

const bot_config = require("../../../config/bot_config.json");


module.exports = (msg, pool) => {

    msg.author.send("Et bien, passe moi le lien de l'avatar que tu voudrais ajouter\n\n" + "`cancel` pour annuler")
        .then(() => {

            msg.channel.awaitMessages(m => m.author.id === msg.author.id,
                {
                    max: 1,
                    time: bot_config.timeoutMessages,
                    errors: ['time']
                })
                .then(m => {

                    let res = m.first().content;

                    if (res === "cancel" | "c") {
                        misc.sendMessagesCode(msg, "stopAll");
                        return;
                    }
                    
                    if (res.match(/^https\:\/\/[a-zA-Z0-9\.\/]+[\.jpg|\.png|\.jpeg|\.gif]$/g)){

                        pool.query("INSERT INTO profils(pseudo, picture) VALUES(?, ?);", [`<@!${msg.author.id}>`, res], (err) => {
                            if (err) {
                                updatePoolrequest("UPDATE profils SET picture= ? WHERE pseudo = ?", res, msg, pool);
                            }
                            else {
                                return null;
                            }
                        });
                    } 
                    else{

                        misc.sendMessagesCode(msg, "urlCannoBeParsed");
                        console.error(`Lien non conventionnel ${msg.author.tag}`);
                        return;

                    }
                }).then((err) => {
                    if (err===null) misc.successSaved(msg);
                    return err;

                }).catch(err => {
                    misc.sendMessagesCode(msg, "errorMessage");
                    throw err;
                });

        }).catch(err => {
            throw err;
        });

};