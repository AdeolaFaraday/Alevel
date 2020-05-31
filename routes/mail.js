const express = require("express")
const router = express.Router()

const {sendMessage, readMessage, removeMail} = require('../controller/mail')

router.post('/send', sendMessage)
router.get('/readmsg', readMessage)
router.delete("/mail/msg/:mailId", removeMail)

module.exports = router
