const misc = require('./misc.js');

module.exports = profilConfig = {

  website: function(msg, pool){

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

            if(res.content === "cancel"){ msg.author.send("Très bien, j'arrête tout"); return;}
            else if(res.content.match(/^https\:\/\//g))
            {
                const str = res.content;
                let sql = "INSERT INTO profils(pseudo, website) VALUES('<@"+msg.author.id+">', '"+str.toString()+"');";

                pool.getConnection(function(err,connection){
                  if (err) {
                    console.error(err);
                    return;
                  }
                  connection.query(sql,function(err,rows){
                    connection.release();
                    if(err.errno===1062)
                    {
                      sql = "UPDATE profils SET website = '"+str.toString()+"' WHERE pseudo = '<@"+msg.author.id+">'";
                      connection.query(sql,function(err,rows){
                        if(err) console.log(err);
                        else if(!err)
                        {
                          misc.successSaved(msg);
                          return;
                        }
                      });
                    }
                    else if(err.errno===1406){msg.author.send("Ton lien est trop grand, je ne peux travailler dans de telles conditions ! è_é");}
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
              msg.author.send("Ce que tu m'as envoyé n'a pas l'air d'être un lien conventionnel");
            }
        }).catch((_) => {});
      })
    } catch (e) {
      console.log(e);
    }

  },

  banner: function(msg, pool){
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

            if(res.content === "cancel"){ msg.author.send("Très bien, j'arrête tout"); return;}
            else if(res.content.match(/^https\:\/\/*/g))
            {
                const str = res.content;
                let sql = "INSERT INTO profils(pseudo, banner) VALUES('<@"+msg.author.id+">', '"+str.toString()+"');";

                pool.getConnection(function(err,connection){
                  if (err) {
                    console.error(err);
                    return;
                  }
                  connection.query(sql,function(err,rows){
                    connection.release();
                    if(err.errno===1062)
                    {
                      sql = "UPDATE profils SET banner = '"+str.toString()+"' WHERE pseudo = '<@"+msg.author.id+">'";
                      connection.query(sql,function(err,rows){
                        if(err) console.log(err);
                        else if(!err)
                        {
                          misc.successSaved(msg);
                          return;
                        }
                      });
                    }
                    else if(err.errno===1406){msg.author.send("Ton lien est trop grand, je ne peux travailler dans de telles conditions ! è_é");}
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
              msg.author.send("Ce que tu m'as envoyé n'a pas l'air d'être un lien conventionnel");
            }
        }).catch((_) => {});
      })
    } catch (e) {
      console.log(e);
    }

  },

  avatar: function(msg, pool){

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

            if(res.content === "cancel"){ msg.author.send("Très bien, j'arrête tout"); return;}
            else if(!res.content.match(/^https\:\/\/*/g))
            {
                const str = res.content;
                let sql = "INSERT INTO profils(pseudo, picture) VALUES('<@"+msg.author.id+">', '"+str.toString()+"');";

                pool.getConnection(function(err,connection){
                  if (err) {
                    console.error(err);
                    return;
                  }
                  connection.query(sql,function(err,rows){
                    connection.release();
                    if(err.errno===1062)
                    {
                      sql = "UPDATE profils SET picture = '"+str.toString()+"' WHERE pseudo = '<@"+msg.author.id+">'";
                      connection.query(sql,function(err,rows){
                        if(err) console.log(err);
                        else if(!err)
                        {
                          misc.successSaved(msg);
                          return;
                        }
                      });
                    }
                    else if(err.errno===1406){msg.author.send("Ton lien est trop grand, je ne peux travailler dans de telles conditions ! è_é");}
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
              msg.author.send("Ce que tu m'as envoyé n'a pas l'air d'être un lien conventionnel");
            }
        }).catch((_) => {});
      })
    } catch (e) {
      console.log(e);
    }
  },

  langage: function(msg, pool){

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

            if(res.content === "cancel"){ msg.author.send("Très bien, j'arrête tout"); return;}
            else
            {
                const str = res.content;
                let sql = "INSERT INTO profils(pseudo, langage) VALUES('<@"+msg.author.id+">', '"+str.toString()+"');";

                pool.getConnection(function(err,connection){
                  if (err) {
                    console.error(err);
                    return;
                  }
                  connection.query(sql,function(err,rows){
                    connection.release();
                    if(err.errno===1062)
                    {
                      sql = "UPDATE profils SET langage = '"+str.toString()+"' WHERE pseudo = '<@"+msg.author.id+">'";
                      connection.query(sql,function(err,rows){
                        if(err) console.log(err);
                        else if(!err)
                        {
                          misc.successSaved(msg);
                          return;
                        }
                      });
                    }
                    else if(err.errno===1406){msg.author.send("désolé, ton message est trop long, il va falloire le raccourcir.. à plus.");}
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

            if(res.content === "cancel"){ msg.author.send("Très bien, j'arrête tout"); return;}
            else
            {
                const str = res.content;
                let sql = "INSERT INTO profils(pseudo, presentation) VALUES('<@"+msg.author.id+">', '"+str.toString()+"');";

                pool.getConnection(function(err,connection){
                  if (err) {
                    console.error(err);
                    return;
                  }
                  connection.query(sql,function(err,rows){
                    connection.release();
                    if(err.errno===1062)
                    {
                      sql = "UPDATE profils SET presentation = '"+str.toString()+"' WHERE pseudo = '<@"+msg.author.id+">'";
                      connection.query(sql,function(err,rows){
                        if(err) console.log(err);
                        else if(!err)
                        {
                          misc.successSaved(msg);
                          return;
                        }
                      });
                    }
                    else if(err.errno===1406){msg.author.send("désolé, ton message est trop long, il va falloire le raccourcir.. à plus.");}
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
