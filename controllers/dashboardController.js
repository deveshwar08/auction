const Auction  = require('../models/Auction');
const User = require('../models/User');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');


module.exports.dashboard_get = async (req, res) => {
    const token = req.cookies.jwt;
    jwt.verify(token, 'devesh auction', async (err, decodedToken) => { 

        const user = await User.findById( mongoose.Types.ObjectId(decodedToken.id));
        const userEmail = user.email;
        try {
            const auctioned = await Auction.find({auctioner: userEmail});
            const bidded = await Auction.find({highestBidder: userEmail});
            res.render('dashboard',{data : {auctioned: auctioned,bidded: bidded}});
        }
        catch(err) {
            res.status(400).send(err);
        }
    });   
}
