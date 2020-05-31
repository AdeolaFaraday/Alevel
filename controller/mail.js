const Message = require("../model/mail")


exports.sendMessage = (req, res) => {
  const email = new Message(req.body)

  email.save((err, data) => {
    if (err) {
      res.json({err})
    } else {
      res.json({data})
    }
  })
}

exports.readMessage = (req, res) => {
  let order = req.query.order ? req.query.order : 'desc';
  let sortBy = req.query.sortBy ? req.query.sortBy : '_id';

  Message.find({}, (err, data) => {
    if (err) {
      res.json({err})
    } else {
      res.json(data)
    }
  }).sort([[sortBy, order]])
}

exports.removeMail = (req, res) => {

  let deleteId = req.params.mailId
  console.log(deleteId);
  Message.findByIdAndRemove({_id: deleteId}, (err, data) => {
        if (err) {
            return res.status(400).json({
                error: err
            })
        }
        res.json({
            message: 'Message deleted successfully'
        })
  })
}
