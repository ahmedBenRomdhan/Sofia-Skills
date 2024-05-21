module.exports = (sequelize, DataTypes) => {
    const Department = sequelize.define(
        'Department',
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
    Department.associate = models =>{
     Department.hasMany(models.User);
     Department.hasMany(models.Function);
    }
    return Department;
}
