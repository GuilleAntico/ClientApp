'use strict';

module.exports = {
    up: function (migration, DataTypes, done) {

        migration
            .createTable(
                'providers',
                {
                    id: {
                        type: DataTypes.INTEGER,
                        primaryKey: true,
                        autoIncrement: true
                    },
                    createdAt: {
                        type: DataTypes.DATE,
                        defaultValue: DataTypes.literal('CURRENT_TIMESTAMP')
                    },
                    updatedAt: {
                        type: DataTypes.DATE,
                        defaultValue: DataTypes.literal('CURRENT_TIMESTAMP')
                    },
                    name: {
                        type: DataTypes.STRING,
                        defaultValue: false,
                        allowNull: false
                    }
                },
                {
                    charset: 'utf8'
                }
            )
            .then(function () {
                return migration
                    .createTable(
                        'clients',
                        {
                            id: {
                                type: DataTypes.INTEGER,
                                primaryKey: true,
                                autoIncrement: true
                            },
                            createdAt: {
                                type: DataTypes.DATE,
                                defaultValue: DataTypes.literal('CURRENT_TIMESTAMP')

                            },
                            updatedAt: {
                                type: DataTypes.DATE,
                                defaultValue: DataTypes.literal('CURRENT_TIMESTAMP')
                            },
                            name: {
                                type: DataTypes.STRING,
                                defaultValue: false,
                                allowNull: false
                            },
                            phone: {
                                type: DataTypes.STRING,
                                defaultValue: false,
                                allowNull: false
                            },
                            email: {
                                type: DataTypes.STRING,
                                defaultValue: false,
                                allowNull: false
                            }
                        },
                        {
                            charset: 'utf8'
                        }
                    );
        })
        .then(function () {
            return migration
                .createTable(
                    'client_providers',
                    {
                        id: {
                            type: DataTypes.INTEGER,
                            primaryKey: true,
                            autoIncrement: true
                        },
                        createdAt: {
                            type: DataTypes.DATE,
                            defaultValue: DataTypes.literal('CURRENT_TIMESTAMP')
                        },
                        updatedAt: {
                            type: DataTypes.DATE,
                            defaultValue: DataTypes.literal('CURRENT_TIMESTAMP')
                        },
                        client_id: {
                            type: DataTypes.INTEGER,
                            references: {
                                model: 'clients',
                                key: 'id'
                            },
                            onUpdate: 'cascade'
                        },
                        provider_id: {
                            type: DataTypes.INTEGER,
                            references: {
                                model: 'providers',
                                key: 'id'
                            },
                            onUpdate: 'cascade'
                        }
                    },
                    {
                        charset: 'utf8'
                    }
                );

        })
        .then(function () {
            return migration.sequelize.query(migration.QueryGenerator.bulkInsertQuery('providers', [
                {
                    id: 1,
                    name: "Provider 1"
                },
                {
                    id: 2,
                    name: "Provider 2"
                }
            ]))
        })
        .then(function(){
            return migration.sequelize.query(migration.QueryGenerator.bulkInsertQuery('clients', [
                {
                    id: 1,
                    name: "Client 1",
                    phone: "12345",
                    email: "client1@email.com"
                },
                {
                    id: 2,
                    name: "Client 2",
                    phone: "123456",
                    email: "client2@email.com"
                },
                {
                    id: 3,
                    name: "Client 3",
                    phone: "12345",
                    email: "client3@email.com"
                }
            ]))
        })
        .then(function(){
            migration.sequelize.query(migration.QueryGenerator.bulkInsertQuery('client_providers', [
                {
                    client_id: 1,
                    provider_id: 1
                },
                {
                    client_id: 1,
                    provider_id: 2
                },
                {
                    client_id : 2,
                    provider_id : 1
                }
            ]))
        })
    },

    down: function (queryInterface, DataTypes) {
        /*
         Add reverting commands here.
         Return a promise to correctly handle asynchronicity.

         Example:
         return queryInterface.dropTable('users');
         */
    }
};
