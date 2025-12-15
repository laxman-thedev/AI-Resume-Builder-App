import mongoose from "mongoose";
import bcrypt from "bcrypt";

/*
|--------------------------------------------------------------------------
| User Schema
|--------------------------------------------------------------------------
| Stores authentication and basic profile data for users
| Used for login, registration, and resume ownership
*/
const UserSchema = new mongoose.Schema(
    {
        /*
        |--------------------------------------------------------------------------
        | Basic User Info
        |--------------------------------------------------------------------------
        */
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

/*
|--------------------------------------------------------------------------
| Instance Methods
|--------------------------------------------------------------------------
| Compares entered password with hashed password in database
*/
UserSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model("User", UserSchema);

export default User;