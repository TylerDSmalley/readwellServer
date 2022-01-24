module.exports = (sequelize, DataTypes) => {
    const Books = sequelize.define("Books", {
        title: {
            type: DataTypes.STRING(60),
            allowNull: false,
        },
        author: {
            type: DataTypes.STRING(60),
            allowNull: false,
        },
        summary: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        genre: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        datePublished: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        publisher: {
            type: DataTypes.STRING(60),
            allowNull: false,
        },
        isbn: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        coverPhoto: {
            type: DataTypes.STRING(300),
        },
        rating: {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 0,
        }
    });

    //Foreign Keys
    Books.associate = (models) => {
        Books.hasMany(models.Bookshelves, {
            onDelete: "cascade",
        });

        Books.hasMany(models.Reviews, {
            onDelete: "cascade",
        });
    }


    return Books;
};