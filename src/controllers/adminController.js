
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

      return res.render("admin/login", {
    error: "Invalid Email or Password"
});
    }

    async loadDashboard(req, res) {

    const search = req.query.search || "";

    const users = await UserService.getUsers(search);

    res.render("admin/dashboard", {
        users,
        search,
        success: req.query.success
    });
}

    loadAddUser(req, res) {
    res.render("admin/add-user");
}

async addUser(req, res) {

    try {

        await UserService.registerUser(req.body);

       res.redirect("/admin/dashboard?success=User added successfully");

    } catch (error) {

    console.log(error);

    return res.status(500).send("Something went wrong.");

}

}

async loadEditUser(req, res) {

    try {

        const user = await UserService.getUserById(req.params.id);

        res.render("admin/edit-user", { user });

    } catch (error) {

    console.log(error);

    return res.status(500).send("Something went wrong.");

}
}

async updateUser(req, res) {

    try {

        await UserService.updateUser(
    req.params.id,
    req.body
);

      res.redirect("/admin/dashboard?success=User updated successfully");

    } catch (error) {

    console.log(error);

    return res.status(500).send("Something went wrong.");

}

}


async deleteUser(req, res) {

    try {

       await UserService.deleteUser(req.params.id);

        res.redirect("/admin/dashboard?success=User deleted successfully");

    } catch (error) {

    console.log(error);

    return res.status(500).send("Something went wrong.");

}

}

logout(req, res) {

    req.session.destroy(() => {

        res.redirect("/admin/login");

    });

}

}

module.exports = new AdminController();