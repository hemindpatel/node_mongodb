const utils=require("./utils");
const expect=require("expect");
describe("Utils",()=>{

    it("it should add two number",()=>{
        var res=utils.add(33,11);
        expect(res).toBe(44).toBeA("number");
    });
    it('should async add two number ',  () =>{
        utils.asyncAdd(4,3,()=>{
            expect(sum).toBe(10).toBeA('number');
        });

    });
});