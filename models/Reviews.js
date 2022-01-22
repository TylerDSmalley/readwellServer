module.exports = (sequelize, DataTypes) => {
    const Reviews = sequelize.define("Reviews", {
        summary: {
            type: DataTypes.TEXT,
            allowNull: false,
        }
    });

    Reviews.associate = (models) => {
        Reviews.belongsTo(models.Books);
        Reviews.belongsTo(models.Users);
    }

    return Reviews;
};