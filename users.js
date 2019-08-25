const mongo = require('mongoose');

const users = mongo.Schema({

userName:{
    type: String,
    unique: true,
    require: true
},
firstName:{
   type: String,
    require: true
},
lastName:{
    type: String,
     require: true
 },
email: {
    type:String,
    unique: true,
    require: true
},
password: {
    type: String,
    require: true
}
});

const user = module.exports = mongo.model('users', users);