"use strict";

module.exports = function(sequelize, DataTypes){
    var Provider = sequelize.define('Provider', {
        name : {
            type : DataTypes.STRING,
            allowNull : false,
            notEmpty : true
        }
    }, {
        classMethods : {
            associate : function(models) {
                Provider.belongsToMany(models.Client, {
                    through: 'client_providers',
                    foreignKey : 'provider_id'

                })
            }
        }
    });

    return Provider;
};


