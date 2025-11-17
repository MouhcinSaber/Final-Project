const express = require('express');
const router = express.Router();
const conversationController = require('../controllers/Conversation');
const autMiddleware = require('../midllewares/autMiddleware');
// CRUD routes
router.get('/', autMiddleware ,conversationController.getAllConversations);
router.get('/:id', autMiddleware ,conversationController.getConversationById);
router.post('/', autMiddleware ,conversationController.createConversation);
router.put('/:id', autMiddleware ,conversationController.updateConversation);
router.delete('/:id',  autMiddleware ,conversationController.deleteConversation);

module.exports = router;