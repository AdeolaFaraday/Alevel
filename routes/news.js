const express = require("express")
const router = express.Router()

const {create, read, remove, newsById, listOne, photo, listAll} = require('../controller/news')

router.post("/news/create", create)
router.get("/news/read", read)
router.get("/news/listall", listAll)
router.get("/news/readone/:newsId", listOne)
router.delete("/news/remove/:deleteId", remove)
router.get("/news/photo/:newsId", photo)

router.param("newsId", newsById)
router.param("deleteId", newsById)

module.exports = router
