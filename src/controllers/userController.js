const UserService = require("../services/userService");

class UserController {


loadSignup(req, res) {
    res.render("user/signup");
}

loadLogin(req, res) {
    res.render("user/login");
}

loadHome(req, res) {
    res.render("user/home", {
        user: req.session.user
    });
}



 async register(req, res) {

        try {

            const user = await UserService.registerUser(req.body);

            res.status(201).json({
                success: true,
                message: "User Registered Successfully",
                data: user
            });

        } catch (error) {

            res.status(400).json({
                success: false,
                message: error.message
            });

        }

    }




async login(req, res) {

    try {

        const user = await UserService.loginUser(req.body);

        req.session.user = user;

        res.redirect("/home");

    } catch (error) {

        res.send(error.message);

    }

}


logout(req, res) {

    req.session.destroy((err) => {

        if (err) {
            return res.send("Logout Failed");
        }

        res.redirect("/login");

    });

}


}

module.exports = new UserController();