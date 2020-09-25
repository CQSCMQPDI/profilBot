const misc = require('../../misc.js');
const updatePoolrequest = require('./../../updatePoolrequest.js');

const bot_config = require("../../../config/bot_config.json");



module.exports = (msg, pool) => {

    msg.author.send("Suite moi les langages que tu connais.\n\n" +
        "`cancel` pour annuler")
        .then(() => {

            msg.channel.awaitMessages(m => m.author.id === msg.author.id,
                {
                    max: 1,
                    time: bot_config.timeoutMessages,
                    errors: ['time']
                })
                .then(res => {

                    res = res.first().content;

                    if (res === "cancel" | "c") {
                        misc.sendMessagesCode(msg, "stopAll");
                        return;
                    }

                    pool.query("INSERT INTO profils(pseudo, langage) VALUES(?, ?);", [`<@!${msg.author.id}>`, res], (err) => {
                        if (err) {
                            updatePoolrequest("UPDATE profils SET langage=? WHERE pseudo = ?", res, msg, pool);
                        }
                        else {
                            return null;
                        }
                    });

                }).then((err) => {
                    if (err === null) misc.successSaved(msg);
                    return err;

                }).catch(err => {
                    misc.sendMessagesCode(msg, "errorMessage");
                    throw err;
                });

        }).catch(err => {
            throw err;
        });

};




