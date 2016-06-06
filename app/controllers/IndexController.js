'use strict';

class IndexController{

    constructor(app){
        this.app = app;
        this.app.get('/', this.home.bind(this));
    }

    home(req, res){
        res.render('index', {
        });
    }
}

module.exports = IndexController;