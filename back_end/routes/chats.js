var express = require('express');
var router = express.Router();
const { getMessagesByConversationId, sendMessage, updateMessage, deleteMessage } = require('../controllers/chatcontrollers');
const autMiddleware = require('../midllewares/autMiddleware');

//get messages by conversation id
router.get('/',/*autMiddleware,*/getMessagesByConversationId) ;
//post send message
router.post('/', autMiddleware, sendMessage);
    
//put update message
router.put('/:messageId', autMiddleware,updateMessage);   
//delete message
router.delete('/:messageId',autMiddleware, deleteMessage);

module.exports = router;

