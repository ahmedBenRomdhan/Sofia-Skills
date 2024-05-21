const db = require('../models');
module.exports = (sequelize, DataTypes) => {
    const SkillEvaluationHistory = sequelize.define(
        'SkillEvaluationHistory',
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
                allowNull: false,
            },
            status: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            updateDate:{
                type: DataTypes.DATE,
                allowNull: false,
            },
            evaluatorFullname:{
                type: DataTypes.STRING,
                allowNull: false,
            },

        },
        {
            freezeTableName: true,
        }
    );

    SkillEvaluationHistory.associate = models => {
        SkillEvaluationHistory.belongsTo(models.SkillEvaluation, {
            foreignKey: {
                allowNull: false,
                name: 'evaluationId'
            },
        });
    }
    return SkillEvaluationHistory;
}
