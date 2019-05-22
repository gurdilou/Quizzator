import * as express from "express";
import {Request, Response} from "express";
import * as ws from 'ws';

/**
 * GET /
 * Home page.
 */
export let voter = (req: Request, res: Response) => {
    res.render("home", {
        title: "Quizz Paul et Pauline",
    });
};

export let admin = (req: Request, res: Response) => {
    res.render("admin", {
        title: "Admin - Quizz Paul et Pauline",
    });
};

