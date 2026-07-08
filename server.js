const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./src/config/db");
const path = require("path");
const session = require("express-session");
const nocache = require("nocache");
const userRoute = require("./src/routes/userRoute");
const adminRoute = require("./src/routes/adminRoute");


dotenv.config();

connectDB();

const app = express();

const PORT = process.env.PORT || 3000;


app.use(express.urlencoded({ extended: true }));


app.use(express.json());


app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use(nocache());


app.use(express.static(path.join(__dirname, "src/public")));


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src/views"));

app.use("/", userRoute);

app.use("/admin", adminRoute);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});