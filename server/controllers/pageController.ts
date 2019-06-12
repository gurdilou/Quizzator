import {Request, Response} from "express";

/**
 * GET /
 * Home page.
 */
export let voter = (req: Request, res: Response) => {
    res.render("home", {
        title: "Quiz Paul et Pauline",
    });
};

export let admin = (req: Request, res: Response) => {
    res.render("admin", {
        title: "Admin - Quiz Paul et Pauline",
    });
};

export let viewer = (req: Request, res: Response) => {
    res.render("viewer", {
        title: "Quiz Paul et Pauline",
    });
};

