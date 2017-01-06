"use strict";
var errorHandler = require('../errors/errorHandler');
var models = require('../models');
var _ = require('lodash');
var Promise = require('bluebird');

module.exports = function (Router) {

    Router.route('/clients')
        .get(function (req, res, next) {
            models.Client.findAll({
                include: [models.Provider]
            })
                .then(function (clients) {
                    res.json(clients)
                })
                .catch(errorHandler(res))

        })
        .post(function (req, res, next) {
            var data = req.body;

            models.sequelize.transaction(function (t) {
                return models.Client.create(data, {transaction: t})
                    .then(function (client) {
                        if (data['Providers']) {
                            var providers = [];
                            _.each(data['Providers'], function(v){
                                providers.push(v.id)
                            });
                            return client.setProviders(providers, {transaction: t})
                                .then(function () {
                                    return client;
                                });
                        } else {
                            return client;
                        }

                    })
            })
                .then(function (result) {
                    res.json(result)
                })
                .catch(errorHandler(res))

        });
    Router.route('/clients/:id')
        .get(function (req, res, next) {
            models.Client.findOne({
                where: {id: req.params.id},
                include: [models.Provider]
            })
                .then(function (client) {
                    if (client) {
                        res.json(client);
                    } else {
                        throw new Error('Client not Found');
                    }
                })
                .catch(errorHandler(res));
        })
        .put(function (req, res, next) {
            var data = req.body;
            var providers = data['Providers'];
            delete data['Providers'];

            models.Client.findOne({
                where: {id: req.params.id},
                include: [models.Provider]
            })
                .then(function (client) {
                    if (client) {
                        return models.sequelize.transaction(function (t) {
                            return client.updateAttributes(data, {transaction: t})
                                .then(function (client) {
                                    if (providers) {
                                        var pIds = [];
                                        _.each(providers, function(v){
                                            pIds.push(v.id)
                                        });
                                        return client.setProviders(null, {transaction: t})
                                        .then(function () {
                                            return client.setProviders(pIds, { transaction : t})
                                                .then(function(){
                                                    return client;
                                                });
                                        });
                                    } else {
                                        return client;
                                    }

                                })
                        })
                    } else {
                        throw new Error('Client not Found');
                    }
                })
                .then(function (updatedClient) {
                    res.json(updatedClient);
                })
                .catch(errorHandler(res));
        })
        .delete(function(req, res, next){
            var id = req.params.id;
            models.Client.findOne({
                where : { id : id}
            })
                .then(function(client){
                    if(client){
                        return client.setProviders(null)
                            .then(function(){
                                return client;
                            })
                    } else {
                        throw new Error('Client not Found');
                    }
                })
                .then(function(client){
                    return client.destroy()
                })
                .then(function(result){
                    res.json(result);
                })
                .catch(errorHandler(res));

        })
};