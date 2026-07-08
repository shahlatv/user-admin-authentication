const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const isLogin = require("../middlewares/authMiddleware");

router.get("/signup", userController.loadSignup);


router.post("/signup", userController.register);

router.get("/login", userController.loadLogin);

router.post("/login", userController.login);

router.get("/home", isLogin, userController.loadHome);

router.get("/logout", userController.logout);


module.exports = router;