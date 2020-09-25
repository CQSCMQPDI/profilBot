const misc = require('./misc.js');

module.exports = (sql, str, msg, pool) => {
    
    pool.query(sql, [str, `<@!${msg.author.id}>`], (err) => {
        if (err){
            misc.sendMessagesCode(msg, "errorMessage");
            throw err;
        }
        else if(!err){
            misc.successSaved(msg);
            return null;
        }
    });

};