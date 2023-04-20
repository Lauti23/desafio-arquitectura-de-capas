import dotenv from "dotenv";
dotenv.config();
import express from "express";
import handlebars from "express-handlebars";
import session from "express-session";
import passport from "passport";
import { initializePassport } from "./utils/passport.js";
import MongoStore from "connect-mongo";
import { connectionToMongo } from "./middlewares/connection.js";
import { productsRoute } from "./routes/products.route.js";
import { loginRoute } from "./routes/login.route.js";
import { registerRoute } from "./routes/register.route.js";
import { profileRoute } from "./routes/profile.route.js";
import { logoutRoute } from "./routes/logout.route.js";
import { logger } from "./utils/logger.js";
import { indexRoute } from "./routes/index.route.js";
import { cartRouter } from "./routes/cart.route.js";

const app = express()
const PORT = 8080 || process.env.PORT
connectionToMongo();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("src/public"));
app.use(session({
    store: MongoStore.create({mongoUrl: process.env.MONGO_SESSION_URL}),
    key: process.env.KEY,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 600000
    }
}))
initializePassport();
app.use(passport.initialize());
app.use(passport.session());


app.engine("hbs", handlebars.engine({ extname: ".hbs", defaultLayout: "main.hbs" }))
app.set("view engine", "hbs");
app.set("views", "src/public/views")

app.use("/", indexRoute)
app.use("/carts", cartRouter)
app.use("/products", productsRoute)
app.use("/login", loginRoute)
app.use("/register", registerRoute)
app.use("/profile", profileRoute)
app.use("/logout", logoutRoute);

app.listen(8080, () => logger.info(`Server running on port ${PORT}, process: ${process.pid}`))


