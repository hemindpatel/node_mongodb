const mongoose1 = require('../mongoose/db/mongoose');
if(mongoose1)
    console.log('connected');
else
    console.log('not connected');

var loadDb = function loadDb(req, res, next) {
    req.mongoose1 = {
        users: {
            findByApiKey: async token => {
                switch ({
                    case(token = '1234') {
                        return {role: 'owner', id: 1234}
                    },
                    case(token = '5678') {
                        return {role: 'employee', id: 5678}
                    },
                    default(){
                        return null;
                    }
                }){}
            }
        }
    };
    next();
};
module.exports={loadDb};
//     req.db={
//         users:{
//             findByApiKey: async token => {
//                 switch({
//                     case (token = '1234'){
//                     return {role: 'owner',id:  1234};
//                     },
//                     case (token = '5678')
//                     {
//                         return {role: 'employee', id: 5678};
//                     },
//                     default:{return: null}
//                 })
//             }
//         },
//     {next()}
//     }
//
//  }
