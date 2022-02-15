const bcrypt = require('bcryptjs');

exports.encryptPassword=(password)=>{
return bcrypt.hash(password,10);
}