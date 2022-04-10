const db = require('../models/db');

const initializeDB = () => {
    
    db.addCollection('accounts');
    db.addCollection('transactions');
    
    db.saveDatabase(function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log("in-memory database is initialized");
        }
    });
    

}

initializeDB();