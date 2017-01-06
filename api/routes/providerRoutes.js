"use strict";
var errorHandler = require('../errors/errorHandler');
var models = require('../models');

module.exports = function(Router) {

    Router.route('/providers')
        .get(function(req, res, next){
            models.Provider
                .findAll()
                .then(function(providers){
                    res.json(providers)
                })
                .catch(errorHandler(res));
        })
        .post(function(req, res, next){
            var data = req.body;
            models.Provider
                .build(data)
                .save()
                .then(function(provider){
                    res.json(provider)
                })
                .catch(errorHandler(res));
        });
    Router.route('/providers/:id')
        .get(function(req, res, next){
            var id = req.params.id;
            models.Provider.findOne({
                where : { id : id}
            })
                .then(function(provider){
                    if(provider){
                        res.json(provider);
                    }else{
                        throw new Error('Provider not Found');
                    }
                })
                .catch(errorHandler(res));
        })
        .put(function(req, res, next){
            var id = req.params.id;
            var data = req.body;
            models.Provider.findOne({
                where : { id : id}
            })
                .then(function(provider){
                    if(provider){
                        return provider.updateAttributes(data);
                    }else{
                        throw new Error('Provider not Found');
                    }
                })
                .then(function(updatedProvider){
                    res.json(updatedProvider);
                })
                .catch(errorHandler(res));
        })
        .delete(function(req, res, next){
            var id = req.params.id;
            models.Provider.findOne({
                where : { id : id}
            })
                .then(function(provider){
                    if(provider){
                        return provider.setClients(null)
                            .then(function(){
                                return provider;
                            })
                    } else {
                        throw new Error('Provider not Found');
                    }
                })
                .then(function(provider){
                    return provider.destroy()
                })
                .then(function(result){
                    res.json(result);
                })
                .catch(errorHandler(res));

        })
};