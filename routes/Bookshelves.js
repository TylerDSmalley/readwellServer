const express = require("express");
const router = express.Router();
const { Bookshelves, Books } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");


//Bookshelves ROUTES-------------------------

//add book to shelf
router.post("/", validateToken, async (req, res) => {
    const { shelf, BookId, UserId } = req.body;
    const dupeCheck = await Bookshelves.findOne({ where: { BookId: BookId, UserId: UserId } });

    if (!dupeCheck) {
        await Bookshelves.create({
            shelf: shelf,
            BookId: BookId,
            UserId: UserId,
        });
    } else {
        await Bookshelves.update({
            shelf: shelf,
        },
            {
                where: {
                    BookId: BookId,
                    UserId: UserId
                }
            })
            res.json("success")
    }


    res.json("BOOK ADDED TO SHELF");
});

//get dupe check
router.get("/dupe/:bookId/:userId", async (req, res) => {
    console.log(req.body)
    const bookShelf = await Bookshelves.findOne({
        where: {
            UserId: req.params.userId,
            BookId: req.params.bookId
        }
    });
    res.json(bookShelf);
});

//get all Bookshelves by id
router.get("/:id", async (req, res) => {
    const userId = req.params.id;
    const listOfBookshelves = await Bookshelves.findAll({
        where: {
            UserId: userId,
        },
        include: [Books]
    });
    res.json(listOfBookshelves);
});

//get personal rating total by bookId
router.get("/allratings/:bookId", async (req, res) => {
    const bookId = req.params.bookId;
    const listOfPersonalRatings = await Bookshelves.findAndCountAll({
        attributes: ['personalRating'],
        where: {
            BookId: bookId
        }
    });
    res.json(listOfPersonalRatings);
});

//get all Bookshelves by id and shelf name
router.get("/userrows/:id/:shelf", async (req, res) => {
    const userId = req.params.id;
    const shelfName = req.params.shelf
    const listOfBookshelves = await Bookshelves.findAll({
        where: {
            UserId: userId,
            shelf: shelfName,
        },
        include: [Books]
    });
    res.json(listOfBookshelves);
});

//get shelf row by id
router.get("/row/:rowId", async (req, res) => {
    const rowId = req.params.rowId;
    const shelfRow = await Bookshelves.findByPk(rowId)
    res.json(shelfRow);
});

router.put("/rate/:rowId", async (req, res) => {
    const rowId = req.params.rowId;
    await Bookshelves.update({
        personalRating: req.body.personalRating
    },
        { where: { id: rowId } });
    res.json(req.body.personalRating);
});


//update book by id
router.put("/update/:bookId", async (req, res) => {
    await Bookshelves.update({
        shelf: req.body.shelf
    }, { where: { id: req.body.id } });
    res.json(req.body);
});

//delete book from shelf by id
router.delete("/delete/:shelfId", validateToken, async (req, res) => {
    const shelfId = req.params.shelfId;
    await Bookshelves.destroy({
        where: {
            id: shelfId,
        },
    });
    res.json("BOOK DELETED");
})

module.exports = router;