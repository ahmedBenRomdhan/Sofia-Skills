module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define(
        'Category',
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
    Category.associate = models =>{
        Category.hasMany(models.Skill,{foreignKey: "categoryId"})
    }

    return Category;
}
