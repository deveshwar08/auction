const Auction = require('../models/Auction');

module.exports.bid_post = async (req, res) => {
        const {bidder, bidAmount} = req.body;

        try {
            const auction = await Auction.bid(req.params.bidId, bidder, bidAmount);
            res.status(200).json({auction: auction._id});
        }
        catch(err) {
            res.status(400).json({err});
        }
}


module.exports.bid_get = async (req, res) => {
       
    try {
        const bidDetails = await Auction.getBidDetails(req.params.bidId);
        console.log("Bid details",bidDetails);
        res.status(200).render('bid',{bidDetails: bidDetails});
    }
    catch(err) {
        res.status(400).json({err});
        console.log(err);
    }
}

module.exports.bid_create_post = async (req, res) => {
    const auctioner = req.body.auctioner;
    const baseBid = req.body.baseBid;
    const itemName = req.body.itemName;

    try {
        const auction = await Auction.create({auctioner: auctioner,baseBid : baseBid,itemName : itemName});
        res.status(200).send("created successfully");
    }
    catch(err) {
        res.status(400).json({err});
        console.log(err);
    }

}

module.exports.bid_create_get = async (req, res) => { res.render('bidCreate');}