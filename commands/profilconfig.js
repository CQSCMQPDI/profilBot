const misc = require('./misc.js');

module.exports = profilConfig = {

  website: function(msg, pool){

    try {

      msg.author.send("Donne moi donc le lien de ton site web\n\n"+
      "`cancel` pour annuler")
      .then(() => {
        msg.channel.awaitMessages(m => m.author.id === msg.author.id,
        {
          max: 1,
          time: 30000,
          errors: ['time']
        })
        .then(res => {
            res = res.first();

            if(res.content === "cancel"){ misc.sendMessagesCode(msg, "stopAll"); return;}
            else if(res.content.match(/^https\:\/\//g))
            {
                const str = res.content;

                pool.getConnection(function(err,connection){
                  if (err) {
                    console.error(err);
                    return;
                  }
                  connection.query("INSERT INTO profils(pseudo, website) VALUES(?, ?);", [`<@${msg.author.id}>`, str],function(err,rows){
                    connection.release();
                    if(err.errno===1062)
                    {
                      connection.query("UPDATE profils SET website= ? WHERE pseudo = ?", [str, `<@${msg.author.id}>`],function(err,rows){
                        if(err) console.log(err);
                        else if(!err)
                        {
                          misc.successSaved(msg);
                          return;
                        }
                      });
                    }
                    else if(err.errno===1406){misc.sendMessagesCode(msg, "errorMessage");}
                    else if(err) console.log(err);
                    else if(!err)
                    {
                      misc.successSaved(msg);
                      return;
                    }
                  });

              });

              return;
            }
            else {
              misc.sendMessagesCode(msg, "urlCannoBeParsed");
            }
        }).catch((_) => {});
      })
    } catch (e) {
      console.log(e);
    }

  },

  banner: function(msg, pool){
    try {

      msg.author.send("Ok, domme moi le lien de l'image que tu veux ajouter\n\n"+
      "`cancel` pour annuler")
      .then(() => {
        msg.channel.awaitMessages(m => m.author.id === msg.author.id,
        {
          max: 1,
          time: 30000,
          errors: ['time']
        })
        .then(res => {
            res = res.first();

            if(res.content === "cancel"){ misc.sendMessagesCode(msg, "stopAll"); return;}
            else if(res.content.match(/^https\:\/\/*/g))
            {
                const str = res.content;

                pool.getConnection(function(err,connection){
                  if (err) {
                    console.error(err);
                    return;
                  }
                  connection.query("INSERT INTO profils(pseudo, banner) VALUES(?, ?);", [`<@${msg.author.id}>`, str],function(err,rows){
                    connection.release();
                    if(err.errno===1062)
                    {
                      connection.query("UPDATE profils SET banner= ? WHERE pseudo = ?", [str, `<@${msg.author.id}>`],function(err,rows){
                        if(err) console.log(err);
                        else if(!err)
                        {
                          misc.successSaved(msg);
                          return;
                        }
                      });
                    }
                    else if(err.errno===1406){misc.sendMessagesCode(msg, "errorMessage");}
                    else if(err) console.log(err);
                    else if(!err)
                    {
                      misc.successSaved(msg);
                      return;
                    }
                  });

              });

              return;
            }
            else {
              misc.sendMessagesCode(msg, "urlCannoBeParsed");
            }
        }).catch((_) => {});
      })
    } catch (e) {
      console.log(e);
    }

  },

  avatar: function(msg, pool){

    try {

      msg.author.send("Et bien, passe moi le lien de l'avatar que tu voudrais ajouter\n\n"+
      "`cancel` pour annuler")
      .then(() => {
        msg.channel.awaitMessages(m => m.author.id === msg.author.id,
        {
          max: 1,
          time: 30000,
          errors: ['time']
        })
        .then(res => {
            res = res.first();

            if(res.content === "cancel"){ misc.sendMessagesCode(msg, "stopAll"); return;}
            else if(res.content.match(/^https\:\/\//g))
            {
                const str = res.content;

                pool.getConnection(function(err,connection){
                  if (err) {
                    console.error(err);
                    return;
                  }
                  connection.query("INSERT INTO profils(pseudo, picture) VALUES(?, ?);", [`<@${msg.author.id}>`, str],function(err,rows){
                    connection.release();
                    if(err.errno===1062)
                    {
                      connection.query("UPDATE profils SET picture= ? WHERE pseudo = ?", [str, `<@${msg.author.id}>`],function(err,rows){
                        if(err) console.log(err);
                        else if(!err)
                        {
                          misc.successSaved(msg);
                          return;
                        }
                      });
                    }
                    else if(err.errno===1406){misc.sendMessagesCode(msg, "errorMessage");}
                    else if(err) console.log(err);
                    else if(!err)
                    {
                      misc.successSaved(msg);
                      return;
                    }
                  });

              });

              return;
            }
            else {
              misc.sendMessagesCode(msg, "urlCannoBeParsed");
            }
        }).catch((_) => {});
      })
    } catch (e) {
      console.log(e);
    }
  },

  langage: function(msg, pool){

    try {

      msg.author.send("D'accord, dit moi donc les langages qui te plaisent.. :thinking:\n\n"+
      "`cancel` pour annuler")
      .then(() => {
        msg.channel.awaitMessages(m => m.author.id === msg.author.id,
        {
          max: 1,
          time: 30000,
          errors: ['time']
        })
        .then(res => {
            res = res.first();

            if(res.content === "cancel"){ misc.sendMessagesCode(msg, "stopAll"); return;}
            else
            {
                const str = res.content;

                pool.getConnection(function(err,connection){
                  if (err) {
                    console.error(err);
                    return;
                  }
                  connection.query("INSERT INTO profils(pseudo, langage) VALUES(?, ?);", [`<@${msg.author.id}>`, str],function(err,rows){
                    connection.release();
                    if(err.errno===1062)
                    {
                      connection.query("UPDATE profils SET langage= ? WHERE pseudo = ?", [str, `<@${msg.author.id}>`],function(err,rows){
                        if(err) console.log(err);
                        else if(!err)
                        {
                          misc.successSaved(msg);
                          return;
                        }
                      });
                    }
                    else if(err.errno===1406){misc.sendMessagesCode(msg, "tooLong");}
                    else if(err) console.log(err);
                    else if(!err)
                    {
                      misc.successSaved(msg);
                      return;
                    }
                  });

              });

              return;
            }
        }).catch((_) => {});
      })
    } catch (e) {
      console.log(e);
    }
  },

  presentation: function(msg, pool){
    try {

      msg.author.send("Décris moi qui tu es, ce que tu aimes dans la vie, bref fais moi une présentation quoi :)\n\n"+
      "`cancel` pour annuler")
      .then(() => {
        msg.channel.awaitMessages(m => m.author.id === msg.author.id,
        {
          max: 1,
          time: 30000,
          errors: ['time']
        })
        .then(res => {
            res = res.first();

            if(res.content === "cancel"){ misc.sendMessagesCode(msg, "stopAll"); return;}
            else
            {
                const str = res.content;

                pool.getConnection(function(err,connection){
                  if (err) {
                    console.error(err);
                    return;
                  }
                  connection.query("INSERT INTO profils(pseudo, presentation) VALUES(?, ?);", [`<@${msg.author.id}>`, str],function(err,rows){
                    connection.release();
                    if(err.errno===1062)
                    {
                      connection.query("UPDATE profils SET presentation= ? WHERE pseudo = ?", [str, `<@${msg.author.id}>`],function(err,rows){
                        if(err) console.log(err);
                        else if(!err)
                        {
                          misc.successSaved(msg);
                          return;
                        }
                      });
                    }
                    else if(err.errno===1406){misc.sendMessagesCode(msg, "tooLong");}
                    else if(err) console.log(err);
                    else if(!err)
                    {
                      misc.successSaved(msg);
                      return;
                    }
                  });

              });

              return;
            }
        }).catch((_) => {});
      })
    } catch (e) {
      console.log(e);
    }
  }

};
