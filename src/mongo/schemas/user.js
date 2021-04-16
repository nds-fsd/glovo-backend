const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;


const userSchema = new mongoose.Schema({
	email: { type: String, required: true, unique: true, trim: true},
	password: {type: String, required: true},
	name: {type: String, required: true, trim: true}
}, {timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }},
{
    toJSON: { virtuals: true },
    toObject: { virtuals: true } 
  });
userSchema.virtual('restaurant', {
    ref: 'Restaurant',
    localField: '_id',
    foreignField: 'user', 
    justOne: true,
  });


//esta funcion se ejecuta "antes" de guardar cualquier usuario en Mongo
userSchema.pre('save',  function(next) {
	const user = this;

	//si no se ha cambiado la contraseña, seguimos
	if (!user.isModified('password')) return next();

	//brcypt es una libreria que genera "hashes", encriptamos la contraseña
	bcrypt.genSalt(10, function(err, salt) {
		if (err) return next(err);

		bcrypt.hash(user.password, salt, function(err, hash) {
			if (err) return next(err);

			// si no ha habido error en el encryptado, guardamos
			user.password = hash;
			next();
		});
	});
});

userSchema.methods.comparePassword = function(password) {
	return bcrypt.compareSync(password, this.password);
};

// * Method to generate the JWT (You choose the name)
userSchema.methods.generateJWT = function() {
	const today = new Date();
	const expirationDate = new Date();

	expirationDate.setDate(today.getDate() + 60);
	
	let payload = {
		id: this._id,
		name: this._name,
		email: this._email,
	};
	// * This method is from the json-web-token library (who is in charge to generate the JWT
	return jwt.sign(payload,secret, {
		expiresIn: parseInt(expirationDate.getTime() / 1000, 10)
	});
};

const User = mongoose.model('User', userSchema);



module.exports = User;
