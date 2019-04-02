const router = require('express').Router();

router.use('/gods', require('./gods'));
router.use('/stats', require('./stats'));

module.exports = router;