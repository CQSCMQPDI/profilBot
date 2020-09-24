module.exports = (sql, str) => {
    
    pool.query(sql, [str, `<@${msg.author.id}>`], (err) => {
    if (err) throw err;

    else if (!err) {
        misc.successSaved(msg);
        return;
    }

});

};