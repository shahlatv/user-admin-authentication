const express = require("express");
const router = express.Router();
const isAdmin = require("../middlewares/adminAuth");


const adminController = require("../controllers/adminController");

router.get("/login", adminController.loadLogin);

router.post("/login", adminController.login);

router.get("/dashboard",isAdmin, adminController.loadDashboard);


router.get("/add-user", isAdmin, adminController.loadAddUser);

router.post("/add-user", isAdmin, adminController.addUser);

router.get("/edit-user/:id", isAdmin, adminController.loadEditUser);

router.post("/edit-user/:id", isAdmin, adminController.updateUser);

router.get("/delete-user/:id", isAdmin, adminController.deleteUser);

module.exports = router;