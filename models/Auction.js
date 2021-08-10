const mongoose = require('mongoose');

const auctionSchema = new mongoose.Schema({
    auctioner: {
        type: String,
        required: true,
        lowercase: true
    },
    baseBid: {
        type: Number,
        required: true
    },
    itemName: {
        type: String,
        required: true
    },
    highestBidder: {
        type: String,
        lowercase: true
    },
    bidAmount: {
        type: Number
    }
});

auctionSchema.statics.bid = async function(bidId, bidder, bidAmount){
    const auction = await this.findOne({_id: mongoose.Types.ObjectId(bidId)});
    if(auction){
        if(auction.bidAmount)
        {
            if(bidAmount > auction.bidAmount)
            {
                auction.highestBidder = bidder;
                auction.bidAmount = bidAmount;
            }
            else{
                throw Error("Bidded lower than the highest bid amount");
            }
        }
        else {
            if(bidAmount > auction.baseBid)
            {
                auction.highestBidder = bidder;
                auction.bidAmount = bidAmount;
            }
            else{
                throw Error("Bidded lower than the base bid");
            }
        }
    }
    else {
        throw Error("No available auction");
    }
}

auctionSchema.statics.getBidDetails = async function(bidId){
   
    const auctionArr = await this.find({_id : bidId});
    const auction = auctionArr[0];
    console.log("ObjectId:",bidId);
    console.log("Auction:",auction);
    console.log("RequestId:",bidId);
    console.log("AuctionId",auction._id);
    if(auction){
        return auction;
    }
    else {
        throw Error("No avialable auction");
        
    }
}

const auction = mongoose.model('auction',auctionSchema);

module.exports = auction;