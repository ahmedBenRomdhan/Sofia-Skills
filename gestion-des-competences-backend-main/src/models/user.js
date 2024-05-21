module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        'User',
        {
            id : {
              type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            firstName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            lastName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            company: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            experienceYears:{
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            availableDate:{
                type: DataTypes.DATE,
                allowNull: true,
            },
            sofiaStartWorkDate:{
                type: DataTypes.DATE,
                allowNull: true,
            },
            frResumePath:{
                type: DataTypes.STRING,
                allowNull: true,
            },
            pertinentSkill:{
                type: DataTypes.STRING,
                allowNull: true,
            },
            frResumeFileName:{
                type: DataTypes.STRING,
                allowNull: true,
            },
            engResumePath:{
                type: DataTypes.STRING,
                allowNull: true,
            },
            engResumeFileName:{
                type: DataTypes.STRING,
                allowNull: true,
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
    User.associate = models =>{
        User.belongsTo(models.Department,{
            foreignKey: {
                allowNull: false
            },
        });
        User.belongsTo(models.Function,{
            foreignKey: {
                allowNull: false,
            },
        });
        User.belongsTo(models.Role,{
            foreignKey: {
                allowNull: false,
            },
        })
        User.hasMany(models.SkillEvaluation,{
            foreignKey : 'evaluatorId',
            as : 'skillEvaluationDone' ,
        })
        User.hasMany(models.SkillEvaluation,{
            foreignKey : "forUser" ,
            as : 'OwnSkillEvaluation',
            onDelete: 'CASCADE'
        })

    }
    return User;
}

