const bcrypt = require('bcryptjs'); // used for hashing the password

const db = require('../data/database');

class User{
    constructor(email,password,fullname,street,city,zipcode){
        this.email = email;
        this.password = password;
        this.name = fullname;
        this.address = {
            street:street,
            city:city,
            zipcode:zipcode
        };
    }
    async signup(){
        const hashedPassword= await bcrypt.hash(this.password,12);

        await db.getDb().collection('users').insertOne({
            email : this.email,
            password: hashedPassword, //hashed using bcrypt
            name: this.name,
            address: this.address
        });

    }
}

module.exports =User;