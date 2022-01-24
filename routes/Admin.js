const express = require("express");
const router = express.Router();
const { Users, Books, Reviews } = require("../models");
const bcrypt = require("bcrypt");
const { sign } = require('jsonwebtoken');
const { validateToken } = require("../middlewares/AuthMiddleware");


//ADMIN ROUTES-----------------------------

//USERS-------------------------------------

//create user
router.post("/users/create", async (req, res) => {
    const { firstName, lastName, email, password, role } = req.body;
    bcrypt.hash(password, 10).then((hash) => {
        Users.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hash,
            role: role,
        });
        res.json("USER CREATED");
    });
});

//get all users
router.get("/users/list", async (req, res) => {
    const listOfUsers = await Users.findAll();
    res.json(listOfUsers);
});

//"delete" user by id
router.put("/users/delete/:userId", async (req, res) => {
    await Users.update({
        status: "inactive",
    }, { where: {id : req.params.userId} });
    res.json(req.body);
});

//update user 
router.put("/users/update/:userId", async (req, res) => {
    await Users.update({
        firstName : req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        role: req.body.role,
    }, { where: {id : req.params.userId} });
    res.json(req.body);
});

//get user by id
router.get("/users/byId/:id", async (req, res) => {
    const userid = req.params.id;
    const user = await Users.findByPk(userid);
    res.json(user);
});

//BOOKS--------------------------------------

//create book
router.post("/books/create", async (req, res) => {
//router.post("/books/create", validateToken, async (req, res) => {
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
router.get("/books/list", async (req, res) => {
    const listOfBooks = await Books.findAll();
    res.json(listOfBooks);
});

//update books
router.put("/books/update/:bookId", async (req, res) => {
    const bookID = req.params.bookId
    await Books.update({
        title: req.body.title,
        author: req.body.author,
        summary: req.body.summary,
        genre: req.body.genre,
        datePublished: req.body.datePublished,
        publisher: req.body.publisher,
        isbn: req.body.isbn,
    }, { where: {id : bookID} });
    res.json(req.body);
});

//delete book
router.delete("/books/delete/:bookId", validateToken, async (req, res) => {
    const bookId = req.params.bookId;
    await Books.destroy({
        where: {
            id: bookId,
        },
    });
    res.json("BOOK DELETED");
});

//get book by id
router.get("/books/byId/:id", async (req, res) => {
    const bookid = req.params.id;
    const book = await Books.findByPk(bookid);
    res.json(book);
});



//REVIEWS------------------------------------

//get all book reviews
router.get("/reviews/list", async (req, res) => {
    const listOfReviews = await Reviews.findAll({
        include: [Books, Users]
    });
    res.json(listOfReviews);
});



//delete book review
router.delete("/reviews/delete/:reviewId", validateToken, async (req, res) => {
    const reviewId = req.params.reviewId;
    await Reviews.destroy({
        where: {
            id: reviewId,
        },
    });
    res.json("REVIEW DELETED");
})

module.exports = router;