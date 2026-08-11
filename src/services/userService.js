const User = require("../models/userModel");
const bcrypt = require("bcrypt");

class UserService {

    async registerUser(userData) {

        const { name, email, password } = userData;


        if (!email || !email.trim()) {
    throw new Error("Email is required");
}

const normalizedEmail = email.trim().toLowerCase();

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailPattern.test(normalizedEmail)) {
    throw new Error("Please enter a valid email address");
}


        if (!password || password.length < 8) {
    throw new Error("Password must be at least 8 characters long");
}

if (!/[A-Z]/.test(password)) {
    throw new Error("Password must contain at least one uppercase letter");
}

if (!/[a-z]/.test(password)) {
    throw new Error("Password must contain at least one lowercase letter");
}

if (!/[0-9]/.test(password)) {
    throw new Error("Password must contain at least one number");
}

if (!/[!@#$%^&*]/.test(password)) {
    throw new Error("Password must contain at least one special character");
}

        // Check if email already exists
        const existingUser = await User.findOne({ email: normalizedEmail});

        if (existingUser) {
            throw new Error("Email already exists");
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await User.create({
            name,
            email: normalizedEmail,
            password: hashedPassword
        });

        return user;
   
    }

   
   
    async loginUser(userData) {

    const { email, password } = userData;

    // Normalize email
    const normalizedEmail = email.trim().toLowerCase();

    // Check email
    const user = await User.findOne({
        email: normalizedEmail
    });

    if (!user) {
        throw new Error("User not found");
    }

    // Compare password
    const isMatch = await bcrypt.compare(
        password,
        user.password
    );

    if (!isMatch) {
        throw new Error("Invalid Password");
    }

    return user;
}

async getUsers(search = "") {

    return await User.find({
        name: {
            $regex: search,
            $options: "i"
        }
    });

}

async getUserById(id) {

    return await User.findById(id);

}

async updateUser(id, userData) {

    const { name, email, role } = userData;

    return await User.findByIdAndUpdate(
        id,
        {
            name,
            email,
            role
        },
        {
            new: true
        }
    );

}

async deleteUser(id) {

    return await User.findByIdAndDelete(id);

} 

}

module.exports = new UserService();