import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
            username: String,
            password: String
    }
)

const Users = mongoose.model('users',userSchema);

export default Users;

