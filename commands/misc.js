const sentences = require("../config/sentences.json");

module.exports = misc = {

  successSaved: function(msg){
    msg.author.send("Bien, merci, je m'occupe de faire le nécessaire");
  },

  sendMessagesCode: (msg, sentencesCode) => {
    msg.author.send(JSON.parse(sentences)[sentencesCode]);
  }

};
