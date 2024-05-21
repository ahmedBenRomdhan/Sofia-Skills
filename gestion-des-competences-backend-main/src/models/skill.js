module.exports = (sequelize, DataTypes) => {
    const Skill = sequelize.define(
        'Skill',
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
    Skill.associate = models => {
        Skill.belongsTo(models.Category, {
            foreignKey: {
                allowNull: false,
                name: 'categoryId'
            },
        })
        Skill.hasMany(models.SkillEvaluation, {
            foreignKey: 'skillId',
            as:"skillEvaluations",
            onDelete: 'CASCADE',
        })
        Skill.belongsToMany(models.Function, {
            through: models.FunctionSkill });

    }

    return Skill;
}
