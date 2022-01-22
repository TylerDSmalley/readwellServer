const express = require("express");
const router = express.Router();
const { Books } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");


//BOOKS ROUTES-------------------------

//add book
router.post("/", validateToken, async (req, res) => {
    console.log(req.body);
    const { title, author, summary, genre, datePublished, publisher, isbn, coverPhoto } = req.body;
    await Books.create({
        title: title,
        author: author,
        summary: summary,
        genre: genre,
        datePublished: datePublished,
        publisher: publisher,
        isbn: isbn,
        coverPhoto: coverPhoto,
    });
    res.json("BOOK ADDED TO LIBRARY");
});

//get all books
router.get("/", async (req, res) => {
    const listOfBooks = await Books.findAll();
    res.json(listOfBooks);
});

router.get("/byId/:id", async (req, res) => {
    const id = req.params.id;
    const book = await Books.findByPk(id);
    res.json(book);
});

//update book by id
router.put("/update/:bookId", async (req, res) => {
    await Books.update({
        title: req.body.title,
        author: req.body.author,
        summary: req.body.summary,
        genre: req.body.genre,
        datePublished: req.body.datePublished,
        publisher: req.body.publisher,
        isbn: req.body.isbn,
        coverPhoto: req.body.coverPhoto,
    }, { where: {id : req.body.id} });
    res.json(req.body);
});

//delete book by id
router.delete("/books/delete/:bookId", validateToken, async (req, res) => {
    const bookId = req.params.bookId;
    await Books.destroy({
        where: {
            id: bookId,
        },
    });
    res.json("BOOK DELETED");
})

module.exports = router;