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
    describe("GET /api/users", () => {
        it('should return: shall not pass!', async () => {
            const res = await request(server).get("/api/users");
            expect(res.body.you).toBe(undefined);
        })
    })
    describe ("POST /api/auth/login", () => {
        it("should tell me im logged in", async () =>{
          const res=await request(server).get("/api/auth/login");
          expect(200)
        })
      })
})
