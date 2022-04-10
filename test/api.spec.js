const express = require('express');
const chai = require("chai");
const request = require("supertest");
const app = express();

 describe('v1/accountCreation POST', () => {
  it('Adding a new one disabled account', () => {
      request(app)
      .post('v1/accountCreation')
      .send({ "account": { "activeCard": false, "availableLimit": 100 } })
      .expect(201)
      .then((res) => {
       expect(res.headers.statusCode).to.be.eql('201');
  });
});
});
