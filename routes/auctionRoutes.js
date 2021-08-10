const { Router } = require('express');
const auctionController = require('../controllers/auctionController');
const { requireAuth } = require('../middleware/authMiddleware');

const router = Router();

router.post('/create-auction',requireAuth,auctionController.bid_create_post);
router.get('/create-auction',requireAuth, auctionController.bid_create_get);
router.get('/bid/:bidId',auctionController.bid_get);
router.post('/bid/:bidId',requireAuth,auctionController.bid_post);

module.exports = router;