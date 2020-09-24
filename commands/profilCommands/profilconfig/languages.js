const misc = require('../../misc.js');
const updatePoolrequest = require('./../../updatePoolrequest.js');

const bot_config = require("../../../config/bot_config.json");


module.exports = (msg, pool) => {

    try {

        msg.author.send("D'accord, dit moi donc les langages qui te plaisent.. :thinking:\n\n" +
            "`cancel` pour annuler")
            .then(() => {
                msg.channel.awaitMessages(m => m.author.id === msg.author.id,
                    {
                        max: 1,
                        time: bot_config.timeoutMessages,
                        errors: ['time']
                    })
                    .then(res => {
                        res = res.first();


                        if (res.content === "cancel") {
                            misc.sendMessagesCode(msg, "stopAll");
                            return;
                        }


                        else if (res.content.match(/^https\:\/\//g)) {
                            const str = res.content;

                            pool.query("INSERT INTO profils(pseudo, langage) VALUES(?, ?);", [`<@${msg.author.id}>`, str], (err) => {


                                if (!err) {
                                    updatePoolrequest("UPDATE profils SET langage= ? WHERE pseudo = ?", str);
                                }

                                else if (err) console.log(err);

                                else if (!err) {
                                    misc.successSaved(msg);
                                    return;
                                }


                            });

                            return;
                        }



                        else {
                            misc.sendMessagesCode(msg, "errorMessage");
                        }



                    }).catch((_) => { });
            })
    } catch (e) {
        console.log(e);
    }

};




