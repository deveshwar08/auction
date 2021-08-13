const { Router } = require('express');
const auctionController = require('../controllers/auctionController');
const { requireAuth } = require('../middleware/authMiddleware');
const auction = require('../models/Auction');

const router = Router();

router.post('/create-auction',requireAuth,auctionController.bid_create_post);
router.get('/create-auction',requireAuth, auctionController.bid_create_get);
router.get('/gallery',auctionController.gallery);
router.get('/bid/:bidId',auctionController.bid_get);
router.get('/bid-delete/:bidId',requireAuth,auctionController.bid_delete);
router.post('/bid/:bidId',requireAuth,auctionController.bid_post);
router.post('/bid-update/:bidId',requireAuth,auctionController.bid_update);


module.exports = router;