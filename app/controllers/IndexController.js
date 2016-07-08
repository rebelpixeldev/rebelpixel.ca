'use strict';

const 
    fs      = require('fs'),
    path    = require('path'),
    works   = require('../data/works.json');

const
    worksArr = works.reduce((ret, work) => {
        const filepath = path.join(__dirname, '../../pub/src/images/portfolio', work.slug , 'gallery');
        work.gallery = fs.statSync(filepath) ? fs.readdirSync(filepath).filter(f => f.indexOf('.jpg') > -1) : [];
        ret.push(ret);
        return ret;
    }, []);

class IndexController{

    constructor(app){
        this.app = app;
    }

    setupRoutes(){
        this.app.get('/', this.home.bind(this));
    }

    home(req, res){
        console.log(req.headers.host);
        res.render('index', {
            works : works,
            renderAnalytics : req.headers.host !== 'localhost:3000'
        });
    }
}

module.exports = IndexController;