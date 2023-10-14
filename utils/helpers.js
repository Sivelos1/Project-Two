const {Users} = require('../models'); 

const GetUserName = function(id){
    var result = "N/A";
    const user = Users.findByPk(id);
    if(user){
        result = user.username;
    }
    return result;
}

module.exports = {
    GetUserName,
}