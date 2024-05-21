module.exports = (sequelize, DataTypes) => {
    const SkillEvaluation = sequelize.define(
        'SkillEvaluation',
        {
            id : {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,

            },
            level: {
                type: DataTypes.REAL,
                allowNull: false,
                defaultValue:0
            },
            evaluationEvidence: {
                type: DataTypes.STRING,
            },
            status: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue:'Not Evaluated'
            },
            enabled : {
                type : DataTypes.BOOLEAN,
                defaultValue: true,
                allowNull: false,

            },
            affected : {
                type : DataTypes.BOOLEAN,
                defaultValue: true,
                allowNull: false,

            },
            index : {
                type : DataTypes.INTEGER,
                defaultValue: -1,
                allowNull: false,
                
            },
        },
        {
            freezeTableName: true,
        }
    );

    SkillEvaluation.associate = models => {
        SkillEvaluation.belongsTo(models.Skill, {
            foreignKey: {
                allowNull: false,
                name: 'skillId'
            },
        });
        SkillEvaluation.belongsTo(models.User, {
            as :'evaluator',
            foreignKey: {
                allowNull: true,
                name:'evaluatorId',
            }
        })
        SkillEvaluation.belongsTo(models.User, {
            as : 'user',
            foreignKey: {
                allowNull: false,    
                name:'forUser',
            },
            
            onDelete: 'CASCADE',
        });
        SkillEvaluation.hasMany(models.SkillEvaluationHistory,{
            foreignKey : "evaluationId" ,
            as : 'evaluationHistory',
            onDelete: 'CASCADE'
        })
    }

    return SkillEvaluation;
}

