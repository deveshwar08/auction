const Auction = require('../models/Auction');
const User = require('../models/User');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

module.exports.bid_post = async (req, res) => {       
    const token = req.cookies.jwt;
    jwt.verify(token, 'devesh auction', async (err, decodedToken) => { 

        const user = await User.findById( mongoose.Types.ObjectId(decodedToken.id));
        const bidder = user.email;
        const bidAmount = req.body.amount;
        try {
            const auction = await Auction.bid(req.params.bidId, bidder, bidAmount);
            res.status(200).json({auction});
        }
        catch(err) {
            res.status(400).json({err});
        }
    });        
}


module.exports.bid_get = async (req, res) => {
       
    try {
        const bidDetails = await Auction.getBidDetails(req.params.bidId);
        if(bidDetails instanceof Auction)
            res.status(200).render('bid',{bidDetails: bidDetails});
        else
            res.status(400).send("no such auction");
    }
    catch(err) {
        res.status(400).send(err.message);
    }
}

module.exports.bid_create_post = async (req, res) => {
    const token = req.cookies.jwt;
    jwt.verify(token, 'devesh auction', async (err, decodedToken) => { 
        const userId = mongoose.Types.ObjectId(decodedToken.id)
        const user = await User.findById(userId);
        const auctioner = user.email;
        const baseBid = req.body.baseBid;
        const itemName = req.body.itemName;
        const description = req.body.description;
        const imageUrl = req.body.imageUrl;

        try {
            const auction = await Auction.create({auctioner: auctioner,baseBid : baseBid,itemName : itemName,description: description,imageUrl: imageUrl});
            res.status(200).json({auction});
        }
        catch(err) {
            res.status(400).send(err.message);
            console.log(err);
        }
    });
    

}

module.exports.bid_create_get = async (req, res) => { res.render('bidCreate');}

module.exports.gallery = async (req, res) => {
    Auction.find({}, function(err, docs){
        res.render('gallery',{data: docs});
    });

}

module.exports.bid_update = async (req, res) => {
    const itemName = req.body.itemName;
    const description = req.body.description;
    const imageUrl = req.body.imageUrl;
    const bidId = req.params.bidId;

    try {
        const auction = await Auction.update(bidId, itemName, description, imageUrl);
        res.status(200).json({auction});
        
    } catch (err) {
        res.status(400).json({err});
        console.log(err);
    }
}

module.exports.bid_delete = async (req, res) => {
    const bidId = req.params.bidId;
    try {
        await Auction.delete(bidId);
        res.status(200).send("deleted successfully");
    } catch (err) {
        res.status(400).json({err});
        console.log(err);
    }
}