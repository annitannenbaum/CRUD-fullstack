import app from '../src/app';
import supertest from 'supertest';
import { expect } from 'chai';
import { v4 as uuid } from 'uuid';
import mongoose from 'mongoose';
import { request } from 'express';

let firstProductIdTest = ''; // empty string to hold API return value

const firstProductBody = {
    title: 'Test Product',
    name: 'The first Test Product',
    description: 'test'
};

const newTitle = 'A Testier Product'
const newName = 'The testier Product Name'

describe('Products', function() {
    let request: supertest.SuperAgentTest;
    before(function () {
        request = supertest.agent(app);
    });

    after(function (done) {
        app.close(() => {
            mongoose.connection.close(done);
        });
    });

    it('should allow a POST to /products', async function () {
        const res = await request.post('/products').send(firstProductBody);

        expect(res.status).to.equal(201);
        expect(res.body).not.to.be.empty;
        expect(res.body).to.be.an('object');
        expect(res.body.id).to.be.a('string');

        firstProductIdTest = res.body.id;
    });

    it('should allow a GET to /products', async function () {
        const res = await request.get('/products').send();

        expect(res.status).to.equal(200);
        expect(res.body).not.to.be.empty;
    })
});