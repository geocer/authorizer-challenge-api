/**
 * This function comment is parsed by doctrine
 * @route POST /accountCreation
 * @param {string} request.body.required - account payload
 * @group Account creation - Operations about account
 * @produces application/json
 * @consumes application/json
 * @return {object} 201 - body response
 * @returns {Error}  default - Unexpected error
*/

/**
 * This function comment is parsed by doctrine
 * @route POST /transactionAuthorization
 * @param {string} request.body.required - transaction payload
 * @group Transaction authorization - Operations about transactions
 * @produces application/json
 * @consumes application/json
 * @return {object} 201 - body response
 * @returns {Error}  default - Unexpected error
*/

const express = require('express');
const router = express.Router();
const rules = require('../services/rules');
const model = require('../services/initializedb');

router.post('/accountCreation', function(req, res) {

    try {
        
        console.log(req.body);
        let ret = rules.addAccount(req.body);
        console.log(ret)
        return res.status(201).json(ret);

    } catch (e) {

        console.error(e);
        return res.status(500).json(e);

    }

});

router.post('/transactionAuthorization', function (req, res) {

    try {
        
        console.log(req.body);
        let ret = rules.transactionAuthorize(req.body);
        console.log(ret);
        return res.status(201).json(ret);

    } catch (e) {

        console.error(e);
        return res.status(500).json(e);
    }
});

module.exports = app => app.use('/v1', router);