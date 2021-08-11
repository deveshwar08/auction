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

    const auction = await this.findById(mongoose.Types.ObjectId(bidId));
    if(auction){
        if(auction.bidAmount)
        {
            
            if(bidAmount > auction.bidAmount)
            {
                this.findByIdAndUpdate(bidId,{highestBidder: bidder},{bidAmount: bidAmount});

            }
            else{
                
                throw Error("Bidded lower than the highest bid amount");
            }
        }
        else {
            
            if(bidAmount > auction.baseBid)
            {
                this.findByIdAndUpdate(bidId,{highestBidder: bidder},{bidAmount: bidAmount});
            }
            else{
                throw Error("Bidded lower than the base bid");
            }
        }
    }
    else {
        console.log("Invalid auction");
        throw Error("No available auction");
    }
}

auctionSchema.statics.getBidDetails = async function(bidId){
   
    const auctionArr = await this.find({_id : bidId});
    const auction = auctionArr[0];
    if(auction){
        return auction;
    }
    else {
        throw Error("No avialable auction");
        
    }
}

const auction = mongoose.model('auction',auctionSchema);

module.exports = auction;