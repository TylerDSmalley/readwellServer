module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("Users", {
        firstName: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(360),
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        role: {
            type: DataTypes.ENUM('user', 'admin'),
            allowNull: false,
            defaultValue: 'user',
        },
        isLocal: {
            type: DataTypes.ENUM('yes', 'no'),
            allowNull: false,
            defaultValue: 'yes',
        },
        status: {
            type: DataTypes.ENUM('active', 'inactive'),
            allowNull: false,
            defaultValue: 'active',
        }
    });

    //Foreign Keys
    Users.associate = (models) => {
        Users.belongsToMany(Users, { as: 'Friends', through: 'friends' });
        Users.belongsToMany(Users, { as: 'Requestees', through: 'friendRequests', foreignKey: 'requesterId', onDelete: 'CASCADE' });
        Users.belongsToMany(Users, { as: 'Requesters', through: 'friendRequests', foreignKey: 'requesteeId', onDelete: 'CASCADE' });

        Users.hasMany(models.Bookshelves, {
            onDelete: "cascade",
        });

        Users.hasMany(models.Reviews, {
            onDelete: "cascade",
        });
    };

    return Users;
};