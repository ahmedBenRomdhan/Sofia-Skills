module.exports = (sequelize, DataTypes) => {
    const Role = sequelize.define(
        'Role',
        {
            id : {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            description: {
                type: DataTypes.STRING,
            },
            enabled : {
                type : DataTypes.BOOLEAN,
                defaultValue: true,
                allowNull: false,

            },
        },
        {
            freezeTableName: true,
        }
    );
    Role.associate = models =>{
        Role.hasMany(models.User)
    }
    return Role;
}
