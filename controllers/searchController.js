const Auction = require('../models/Auction');
const mongoose = require('mongoose');

module.exports.search_get = (req, res) => {
    res.render('search');
};

module.exports.search_post = async (req, res) => {
    const term = req.body.term;
    const query = {
        itemName: {
            $regex : req.body.term,
            $options : 'i'
        }
    };
    await Auction.find(query, async function(err, docs){
        if(err){
            console.log(err.message);
            res.status(400).send(err.message);
        }
        else{
            console.log(docs);
            res.status(200).json({data: docs});
        }
    });
};
