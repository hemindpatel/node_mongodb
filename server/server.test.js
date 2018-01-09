const request=require("supertest");
const expect=require("expect");
var app=require("./server.js").app;
it('shoud return hello response',(done)=>{
    request(app)
        .get('/')
        .expect(404)
        .expect((res)=>{
            expect(res.body).toInclude({
                error:"page not found"
            });
        })
        .end(done);
});
it("it should return any user object",(done)=>{
    request(app)
        .get('/users')
        .expect(200)
        .expect((res)=>{
            expect(res.body).toInclude({
              name:"hemin",
                age:22
            });
        })
        .end(done);
    });
