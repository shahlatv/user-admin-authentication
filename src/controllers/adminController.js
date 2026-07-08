const User = require("../models/userModel");
const UserService = require("../services/userService");

class AdminController {

    loadLogin(req, res) {
        res.render("admin/login");
    }

    login(req, res) {

        const { email, password } = req.body;

        if (
            email === process.env.ADMIN_EMAIL &&
            password === process.env.ADMIN_PASSWORD
        ) {

            req.session.admin = true;

            return res.redirect("/admin/dashboard");

        }

        res.send("Invalid Admin Credentials");
    }

    async loadDashboard(req, res) {

    const search = req.query.search || "";

    const users = await User.find({
        name: {
            $regex: search,
            $options: "i"
        }
    });

    res.render("admin/dashboard", {
        users
    });

}


    loadAddUser(req, res) {
    res.render("admin/add-user");
}

async addUser(req, res) {

    try {

        await UserService.registerUser(req.body);

        res.redirect("/admin/dashboard");

    } catch (error) {

        res.send(error.message);

    }

}

async loadEditUser(req, res) {

    try {

        const user = await User.findById(req.params.id);

        res.render("admin/edit-user", { user });

    } catch (error) {

        res.send(error.message);

    }

}

async updateUser(req, res) {

    try {

        const { name, email, role } = req.body;

        await User.findByIdAndUpdate(
            req.params.id,
            {
                name,
                email,
                role
            }
        );

        res.redirect("/admin/dashboard");

    } catch (error) {

        res.send(error.message);

    }

}


async deleteUser(req, res) {

    try {

        await User.findByIdAndDelete(req.params.id);

        res.redirect("/admin/dashboard");

    } catch (error) {

        res.send(error.message);

    }

}


}

module.exports = new AdminController();