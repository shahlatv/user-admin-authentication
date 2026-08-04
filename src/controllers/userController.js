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

           res.redirect("/login");

        } catch (error) {

    return res.render("user/signup", {
        error: error.message
    });

}
    }




async login(req, res) {

    try {

        const user = await UserService.loginUser(req.body);

        req.session.user = user;

        res.redirect("/home");

    } catch (error) {

    return res.render("user/login", {
        error: error.message
    });

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