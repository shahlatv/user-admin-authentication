const User = require("../models/userModel");
const bcrypt = require("bcrypt");

class UserService {

    async registerUser(userData) {

        const { name, email, password } = userData;

        // Check if email already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            throw new Error("Email already exists");
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        return user;
    }

   
   
    async loginUser(userData) {

    const { email, password } = userData;

    // Check email
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error("User not found");
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error("Invalid Password");
    }

    return user;
}

}

module.exports = new UserService();