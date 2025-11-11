var express = require('express');
var router = express.Router();
const { getMessagesByConversationId, sendMessage, updateMessage, deleteMessage } = require('../controllers/chatcontrollers');

//get messages by conversation id
router.get('/',getMessagesByConversationId) ;
//post send message
router.post('/', sendMessage);
//put update message
router.put('/:messageId', updateMessage);   
//delete message
router.delete('/:messageId', deleteMessage);

module.exports = router;

