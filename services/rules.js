const db = require('../models/db');
const moment = require('moment')


function addAccount(req) {
    var active = db.getCollection("accounts").find({'account.activeCard': true });

    if (( req.account.activeCard === true && active.length === 0 )) {
      
        let obj = JSON.parse(JSON.stringify(req));
        let validation = 'validation';
        obj.account[validation] = [];
        
        db.getCollection("accounts").insert(req)
        db.saveDatabase();
    
        return obj

    } else if (( req.account.activeCard === true && active.length > 0 )) {  
      
        let obj = JSON.parse(JSON.stringify(req));  
        let validation = 'validation';
        obj.account[validation] = ['account-already-initialized'];
      
        return obj
      
    } else {
      
      db.getCollection("accounts").insert(req)
      db.saveDatabase();

      return []

    }
}

function transactionAuthorize(req) {
  
  let ds = db.getCollection("accounts").find({});
  if (ds.length === 0) {
    return []
  }
  let availableLimit = ds[0].account.availableLimit;
  let activeCard = ds[0].account.activeCard;
 
  
   let output = { 
        account : {
          activeCard: activeCard,
          availableLimit: availableLimit
        }
     };

 
 let now = new Date().toISOString();
 let interval = moment(now).subtract(2, 'minutes').toISOString();

 let count_ds_t = db.getCollection("transactions").find({
    '$and': [{ 
        'transaction.time' : {
          '$gt': interval
        }
      },{
        'transaction.time' : {
          '$lt': now }
        }]
  });

  let similar_ds_t = db.getCollection("transactions").find({
    '$and': [{ 
        'transaction.time' : {
          '$gt': interval
        }
      },{
        'transaction.time' : {
          '$lt': now }
        },{
        'transaction.amount' : {
          '$eq': req.transaction.amount }
        },{
        'transaction.merchant' : {
          '$eq': req.transaction.merchant }
        }]
  });
 

  if (activeCard === false) {
  //No transaction should be accepted when the card is not active
      let validation = 'validation';
      output.account[validation] = ['card-not-active'];
      return output
  
  } else if (req.transaction.amount > availableLimit) {
  //The transaction amount should not exceed available limit
      let validation = 'validation';
      output.account[validation] = ['insufficient-limit'];
      return output

  } else if (count_ds_t.length > 2) {
  //There should not be more than 3 transactions on a 2 minute interval
     let validation = 'validation';
     output.account[validation] = ['high-frequency-small-interval']
     return output
  
  } else if (similar_ds_t.length > 1) {
  //There should not be more than 2 similar transactions (same amount and merchant) in a 2 minutes interval
    let validation = 'validation';
    output.account[validation] = ['doubled-transaction']
    return output

  } else {

    db.getCollection("transactions").insert(req)
    db.saveDatabase();
    
    newlimit = (availableLimit - req.transaction.amount)
    output.account.availableLimit = newlimit
    let validation = 'validation';
    output.account[validation] = [];

    db.getCollection("accounts").findAndUpdate(({ 'account.activeCard': true }), data => {
      data.account.availableLimit = newlimit
      return data
  })
    
    db.saveDatabase();
    return output

  }
}

module.exports.addAccount = addAccount;
module.exports.transactionAuthorize = transactionAuthorize;