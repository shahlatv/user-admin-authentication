const User = require("../models/userModel");

async function isLogin(req, res, next) {

    // 1. Check whether a user session exists
    if (!req.session.user) {
        return res.redirect("/login");
    }

    try {

        // 2. Check whether the user still exists in MongoDB
        const user = await User.findById(req.session.user._id);

        // 3. User was deleted from the database
        if (!user) {

            req.session.destroy(() => {
                res.redirect("/login");
            });

            return;
        }

        // 4. Update session with current user data
        req.session.user = user;

        // 5. User exists → allow access
        next();

    } catch (error) {

        console.log(error.message);

        res.redirect("/login");

    }
}

module.exports = isLogin;