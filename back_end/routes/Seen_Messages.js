const express = require('express');
const router = express.Router();
const { getAllSeen, getSeenById, createSeen, updateSeen, deleteSeen } = require('../controllers/Seen_Messages');

// CRUD routes
router.get('/', getAllSeen);
router.get('/:id',getSeenById);
router.post('/',createSeen);
router.put('/:id',updateSeen);
router.delete('/:id',deleteSeen);

module.exports = router;
