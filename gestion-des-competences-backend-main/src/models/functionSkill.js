module.exports = (sequelize, DataTypes) => {
    const FunctionSkill = sequelize.define('FunctionSkill', {
        /* FunctionId : {
            type: DataTypes.INTEGER,
            references: {
                model: 'Function',
                key: 'id'
            }
        },
        SkillId : {
            type: DataTypes.INTEGER,
            references: {
                model: 'Skill',
                key: 'id'
            }
        }, */
    })
    return FunctionSkill;
};
