//in the future we could remove the require field of the address and simply 
//require during the ordering process
//sentence[0].toLowerCase() + sentence.slice(1) to ensure that the user name and last 
//name are in uppercase
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const schema = new mongoose.Schema({
	email: { type: String, required: true, unique: true},
	password: {type: String, required: true},
	firstName: {type: String, required: true},
	lastName: {type: String, required: true},
	address: {
        number: {type: String, required: true},
        street:{type: String, required: true},
        zipcode:{type: Number, required: true}
    },
	role: {type: String, required: true},
}, {timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }});


//esta funcion se ejecuta "antes" de guardar cualquier usuario en Mongo
schema.pre('save',  function(next) {
	const user = this;

	//si no se ha cambiado la contraseña, seguimos
	if (!user.isModified('password')) return next();

	//brcypt es una libreria que genera "hashes", encriptamos la contraseña
	bcrypt.genSalt(10, function(err, salt) {
		if (err) return next(err);

		bcrypt.hash(user.password, salt, function(err, hash) {
			if (err) return next(err);

			//si no ha habido error en el encryptado, guardamos
			user.password = hash;
			next();
		});
	});
});

schema.methods.comparePassword = function(password) {
	return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model('User', schema);



module.exports = User;
