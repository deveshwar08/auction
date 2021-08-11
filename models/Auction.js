const mongoose = require('mongoose');

const bidSchema = new mongoose.Schema({
    bidder: {
        type: String,
        required: true,
        lowercase: true
    },
    bidAmount: {
        type: String,
        required: true
    }
});

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
    bids:[bidSchema],
    highestBidder: {
        type: String,
        lowercase: true
    },
    bidAmount: {
        type: Number
    }
});

auctionSchema.statics.bid = async function(bidId, bidder, bidAmount){

    const auction = await this.findById(mongoose.Types.ObjectId(bidId));
    if(auction){
        if(auction.bidAmount)
        {            
            if(bidAmount > auction.bidAmount)
            {
                let flag = 0;
                auction.bids.forEach( bid => {
                    if(bid.bidder === bidder)
                        flag++;
                });
                if(flag === 0){
                    try{
                        await auction.update({highestBidder: bidder, bidAmount: bidAmount, $push: {bids: {bidder: bidder, bidAmount: bidAmount}}});
                    }
                    catch(err){
                        console.log(err);
                    }
                }
                else{
                    try{
                        await auction.update({highestBidder: bidder , bidAmount: bidAmount, bids: {bidder: bidder, bidAmount: bidAmount}});
                    }
                    catch(err){
                        console.log(err);
                    }
                }
            }
            else{                
                return Error("Bidded lower than the highest bid amount");
            }
        }
        else {            
            if(bidAmount > auction.baseBid)
            {
                let flag = 0;
                auction.bids.forEach( bid => {
                    if(bid.bidder === bidder)
                        flag++;
                });
                if(flag === 0){
                    try{
                        await auction.update({highestBidder: bidder, bidAmount: bidAmount, $push: {bids: {bidder: bidder, bidAmount: bidAmount}}});
                    }
                    catch(err){
                        console.log(err);
                    }
                }
                else{
                    try{
                        await auction.update({highestBidder: bidder , bidAmount: bidAmount, bids: {bidder: bidder, bidAmount: bidAmount}});
                    }
                    catch(err){
                        console.log(err);
                    }
                }
            }
            else{
                return Error("Bidded lower than the base bid");
            }
        }
    }
    else {
        console.log("Invalid auction");
        return Error("No available auction");
    }
}

auctionSchema.statics.getBidDetails = async function(bidId){
   
    const auctionArr = await this.find({_id : bidId});
    const auction = auctionArr[0];
    if(auction){
        return auction;
    }
    else {
        return Error("No avialable auction");
        
    }
}

const auction = mongoose.model('auction',auctionSchema);

module.exports = auction;