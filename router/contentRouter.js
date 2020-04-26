const express = require("express")

const contentController = require("../controller/legendController")

const router = express.Router()

router
  .route("/")
  .post(contentController.createContentSet)
  .get(contentController.getAllContentSets)

router
  .route("/:dataset")
  .get(contentController.getContentSet)
  .put(contentController.replaceContentSet)
  .patch(contentController.updateContentSet)

module.exports = router
