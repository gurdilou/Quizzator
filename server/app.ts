import express from "express";
import compression from "compression"; // compresses requests
import session from "express-session";
import bodyParser from "body-parser";
import lusca from "lusca";
import dotenv from "dotenv";
import mongo from "connect-mongo";
import flash from "express-flash";
import path from "path";
import mongoose from "mongoose";
import passport from "passport";
import expressValidator from "express-validator";
import bluebird from "bluebird";
import {MONGODB_URI, SESSION_SECRET} from "./util/secrets";
import * as ws from 'ws';
// Controllers (route handlers)
import * as pageController from "./controllers/pageController";
import * as questionsController from "./controllers/questionsController";
import {Application} from "express-ws";
import {NextFunction, Request, Response} from "express-serve-static-core";
// API keys and Passport configuration

const MongoStore = mongo(session);

// Load environment variables from .env file, where API keys and passwords are configured
dotenv.config({path: ".env.example"});


// Create Express server
const app: Application = require('express-ws')(express()).app;

// Connect to MongoDB
const mongoUrl = MONGODB_URI;
(<any>mongoose).Promise = bluebird;
mongoose.connect(mongoUrl, {useMongoClient: true}).then(
    () => { /** ready to use. The `mongoose.connect()` promise resolves to undefined. */
    },
).catch(err => {
    console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
    // process.exit();
});

// Express configuration
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressValidator());
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    store: new MongoStore({
        url: mongoUrl,
        autoReconnect: true
    })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));
app.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});
app.use((req, res, next) => {
    // // After successful login, redirect back to the intended page
    // if (!req.user &&
    //     req.path !== "/login" &&
    //     req.path !== "/signup" &&
    //     !req.path.match(/^\/auth/) &&
    //     !req.path.match(/\./)) {
    //     req.session.returnTo = req.path;
    // } else if (req.user &&
    //     req.path == "/account") {
    //     req.session.returnTo = req.path;
    // }
    next();
});

app.use(
    express.static(path.join(__dirname, "public"), {maxAge: 31557600000})
);



/**
 * Primary app routes.
 */
app.get("/", pageController.voter);
app.get("/admin", pageController.admin);
app.get("/viewer", pageController.viewer);
// app.get("/admin", .index);
app.ws('/questions', (ws: ws, req: express.Request, next: express.NextFunction) => {
    questionsController.questionsController(ws as any, req, next);
});
app.ws('/quizViewer', (ws: ws, req: express.Request, next: express.NextFunction) => {
    questionsController.viewerController(ws as any, req, next);
});
app.ws('/quizAdmin', (ws: ws, req: express.Request, next: express.NextFunction) => {
    questionsController.adminController(ws as any, req, next);
});


// Handle errors
if (app.get('env') === 'development') {

    app.use((err: any, req: Request, res: Response, next: NextFunction)=> {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });

}
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

export default app;
