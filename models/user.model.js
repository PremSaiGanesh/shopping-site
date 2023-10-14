const bcrypt = require('bcryptjs'); // used for hashing the password
const mongodb = require('mongodb'); 

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

    static async findById(userId) {
        const uid= new mongodb.ObjectId(userId);

        return db.getDb().collection('users').findOne({_id: uid}, {projection: {password: 0}});
    }

    getUserWithSameEmail(){
        return db.getDb().collection('users').findOne({ email: this.email});
    }

    async existsAlready(){
        const existingUser=await this.getUserWithSameEmail();
        if (existingUser) {
            return true;
        }
        return false;
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

    hasMatchingPassword(hashedPassword) {
        return bcrypt.compare(this.password, hashedPassword );
    }
}

module.exports =User;