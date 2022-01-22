const express = require("express");
const router = express.Router();
const { Bookshelves, Books } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");


//Bookshelves ROUTES-------------------------

//add book to shelf
router.post("/", validateToken, async (req, res) => {
    console.log(req.body);
    const {shelf, BookId, UserId} = req.body;
    await Bookshelves.create({
        shelf: shelf,
        BookId: BookId,
        UserId: UserId,
    });
    res.json("BOOK ADDED TO SHELF");
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
    console.log(rowId)
    console.log("ASDFASDFSDAFSADFSADFSADFD")
    const shelfRow = await Bookshelves.findByPk(rowId)
    res.json(shelfRow);
});

router.put("/rate/:rowId", async (req, res) => {
    const rowId = req.params.rowId;
    await Bookshelves.update({
        personalRating: req.body.personalRating
        }, 
        { where: {id : rowId} });
        res.json(req.body.personalRating);
    });


// //update book by id
// router.put("/update/:bookId", async (req, res) => {
//     await Bookshelves.update({
//         title: req.body.title,
//         author: req.body.author,
//         summary: req.body.summary,
//         genre: req.body.genre,
//         datePublished: req.body.datePublished,
//         publisher: req.body.publisher,
//         isbn: req.body.isbn,
//         coverPhoto: req.body.coverPhoto,
//     }, { where: {id : req.body.id} });
//     res.json(req.body);
// });

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