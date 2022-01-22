const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

const db = require("./models");

//Routers

const usersRouter = require("./routes/Users")
app.use("/auth", usersRouter);

const booksRouter = require("./routes/Books")
app.use("/books", booksRouter);

const shelvesRouter = require("./routes/Bookshelves")
app.use("/shelves", shelvesRouter);

const reviewsRouter = require("./routes/Review")
app.use("/review", reviewsRouter);

const adminRouter = require("./routes/Admin")
app.use("/admin", adminRouter);

db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`server started on port ${PORT}`);
    });
});