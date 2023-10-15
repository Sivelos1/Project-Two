const {Users} = require('../models'); 

const GetUserName = function(id){
    var result = "N/A";
    const user = Users.findByPk(id);
    if(user){
        result = user.username;
    }
    console.log(result);
    return result;
}

const Censor = function(string){
    var result = "";
    for (let index = 0; index < string.length; index++) {
        result += "*";
    }
    return result;
}

module.exports = {
    GetUserName, Censor
}