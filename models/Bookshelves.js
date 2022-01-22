module.exports = (sequelize, DataTypes) => {
    const Bookshelves = sequelize.define("Bookshelves", {
        personalRating: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        shelf: {
            type: DataTypes.ENUM('read','reading','want'),
            allowNull: false,
        }
    });

    Bookshelves.associate = (models) => {
        Bookshelves.belongsTo(models.Books);
        Bookshelves.belongsTo(models.Users);
    }

    return Bookshelves;
};