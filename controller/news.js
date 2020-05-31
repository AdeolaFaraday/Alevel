const News = require("../model/news")
const formidable = require('formidable')
const _ = require('lodash')
const fs = require('fs')

exports.newsById = (req, res, next, id) => {
    News.findById(id)
        .populate('category')
        .exec((err, news) => {
            if (err || !news) {
                return res.status(400).json({
                    error: 'News not found'
                })
            }
            req.news = news
            next()
        })
}

exports.create = (req, res) => {
  let form = new formidable.IncomingForm()
  form.keepExtensions = true
  form.parse(req, (err, fields, files) => {
    if (err) {
        return res.status(400).json({
            error: 'Image could not be uploaded'
        })
    }
    // check for all fields
    const {name, description} = fields

    if (!name || !description) {
      res.json({message: "Fill out all form please"})
    }

    let news = new News(fields)

    if (files.photo) {
        console.log("FILES PHOTO: ", news);
        if (files.photo.size > 1000000) {
            return res.status(400).json({
                error: 'Image should be less than 1mb in size'
            });
        }
        news.photo.data = fs.readFileSync(files.photo.path)
        news.photo.contentType = files.photo.type
    }

    news.save((err, data) => {
      if (err) {
          // console.log('PRODUCT CREATE ERROR ', err);
          return res.status(400).json({
              error: err
          });
      }
      res.json(data)
    })

  })
}

exports.listAll = (req, res) => {
  // News.find({}, (err, response) => {
  //   response.forEach((respond) => {
  //     if (respond.photo) {
  //       respond.photo = undefined
  //     }
  //   });
  //
  //   if (err) {
  //       return res.status(400).json({
  //           error: err
  //       })
  //   }
  //   console.log(response);
  //   res.json(response)
  // })

  News.find().select("-photo").exec({}, (err, response) => {
    if (err) {
        return res.status(400).json({
            error: err
        })
    }
    // console.log(response);
    res.json(response)
  })
}

exports.listOne = (req, res) => {
  let newsId = req.news._id
  News.findById({_id: newsId}, (err, data) => {
    data.photo = undefined
    if (err) {
      console.log(newsId);
        return res.status(400).json({
            error: err
        })
    }
    // console.log(data);
    res.json(data)
  })
}

exports.read = (req, res) => {
    let order = req.query.order ? req.query.order : 'desc';
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
    let limit = req.query.limit ? parseInt(req.query.limit) : 4;

    News.find()
        .select('-photo')
        .sort([[sortBy, order]])
        .limit(limit)
        .exec((err, news) => {
            if (err) {
                return res.status(400).json({
                    error: 'News not found'
                });
            }
            res.json(news);
        });
};


exports.remove = (req, res) => {

  let deleteId = req.news._id
  News.findByIdAndRemove({_id: deleteId}, (err, data) => {
        if (err) {
            return res.status(400).json({
                error: err
            })
        }
        res.json({
            message: 'News deleted successfully'
        })
  })
  // let news = req.news
  // news.remove((err, deletedNews) => {
  //     if (err) {
  //         return res.status(400).json({
  //             error: err
  //         })
  //     }
  //     res.json({
  //         message: 'News deleted successfully'
  //     })
  // })
}

exports.photo = (req, res, next) => {
    if (req.news.photo.data) {
        res.set('Content-Type', req.news.photo.contentType)
        return res.send(req.news.photo.data)
    }
    next()
}
