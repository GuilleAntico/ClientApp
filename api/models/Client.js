"use strict";

module.exports = function(sequelize, DataTypes){
    var Client = sequelize.define('Client', {
        name : {
            type : DataTypes.STRING,
            allowNull : false,
            notEmpty : true

        },
        email : {
            type : DataTypes.STRING,
            allowNull : false,
            notEmpty : true,
            isEmail : true

        },
        phone : {
            type : DataTypes.STRING,
            allowNull : false,
            notEmpty : true,
            isAlphaNumeric : true

        }
    }, {
        classMethods : {
            associate : function(models) {
                Client.belongsToMany(models.Provider, {
                    through: 'client_providers',
                    foreignKey : 'client_id'

                })
            }
        }
    });

    return Client;
};


