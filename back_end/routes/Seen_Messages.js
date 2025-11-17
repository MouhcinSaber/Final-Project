const express = require('express');
const router = express.Router();
const { getAllSeen, getSeenById, createSeen, updateSeen, deleteSeen } = require('../controllers/Seen_Messages');
const autMiddleware = require('../midllewares/autMiddleware');
// CRUD routes
router.get('/', autMiddleware , getAllSeen);
router.get('/:id', autMiddleware ,getSeenById);
router.post('/', autMiddleware ,createSeen);
router.put('/:id', autMiddleware ,updateSeen);
router.delete('/:id', autMiddleware ,deleteSeen);

module.exports = router;
