const request = require("supertest");

const server = require('./server');

describe("server.js", function(){
    describe("checking for env var", function() {
        it('set env to testing', function() {
            expect(process.env.DB_ENV).toBe("test")
        })
    })
})

describe("GET /", function() {
    it("should recieve a 200 success message", function(){
        return request(server)
        .get('/')
        .then(res => {
            expect(res.status).toBe(200);
        })
    })
})