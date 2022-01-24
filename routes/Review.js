const express = require("express");
const router = express.Router();
const { Bookshelves, Books, Reviews, Users } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.post("/", validateToken, async (req, res) => {
    const dupeCheck = await Reviews.findOne({ where: { BookId: req.body.BookId, UserId: req.body.UserId } });

    if (!dupeCheck) {
        await Reviews.create({
            summary: req.body.summary,
            BookId: req.body.BookId,
            UserId: req.body.UserId
        });
    } else {
        await Reviews.update({
            summary: req.body.summary
        },
            {
                where: {
                    BookId: req.body.BookId,
                    UserId: req.body.UserId
                }
            })
    }
    res.json(req.body);
});

router.get("/:id", async (req, res) => {
    let id = req.params.id
    const listOfReviews = await Reviews.findAll({
        where: {
            BookId: id,
        },
        include: [Users]
    });
    res.json(listOfReviews);
});

module.exports = router;