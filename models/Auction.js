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
    description:{
        type: String,
        required: true
    },
    imageUrl: {
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

auctionSchema.path('imageUrl').validate((val) => {
    urlRegex = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
    return urlRegex.test(val);
}, 'Invalid URL.');

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
                throw Error("Bidded lower than the highest bid amount");
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

auctionSchema.statics.update = async function(bidId, itemName, description, imageUrl){
    const auction = await this.findById(mongoose.Types.ObjectId(bidId));
    if(auction){
        await auction.update({itemName: itemName, description: description,imageUrl: imageUrl});
        return auction;
    }
    else {
        throw Error("No avialable auction");        
    }
}

auctionSchema.statics.delete = async function(bidId){
    const auction = await this.findById(mongoose.Types.ObjectId(bidId));
    if(auction){
        await this.findByIdAndDelete(mongoose.Types.ObjectId(bidId));
    }
    else{
        throw Error("No auction available to delete");
    }
}

const auction = mongoose.model('auction',auctionSchema);

module.exports = auction;