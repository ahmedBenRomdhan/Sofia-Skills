module.exports = (sequelize, DataTypes) => {
    const Function = sequelize.define(
        'Function',
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
    Function.associate = models =>{
        Function.belongsTo(models.Department,{
            foreignKey: {
                allowNull: false,
            },
        });
       Function.hasMany(models.User);
       Function.belongsToMany(models.Skill, { through: models.FunctionSkill });
    }
    return Function;
}
