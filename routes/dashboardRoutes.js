const { Router} = require('express');
const { requireAuth } = require('../middleware/authMiddleware');
const dashboardController = require('../controllers/dashboardController');

const router = Router();

router.get('/dashboard', requireAuth, dashboardController.dashboard_get);

module.exports = router;
