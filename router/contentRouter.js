const express = require("express")

const authController = require("../controller/authController")
const legendController = require("../controller/legendController")
const tipController = require("../controller/tipController")
const funfactController = require("../controller/funfactController")
const uploadController = require("../controller/uploadController")
const galleryController = require("../controller/galleryController")

const router = express.Router()

router
  .route("/legends")
  .get(legendController.getAllLegends)
  .post(authController.protect, legendController.createLegend)

router
  .route("/legends/:id")
  .get(legendController.getLegend)
  .patch(authController.protect, legendController.updateLegend)
  .delete(authController.protect, legendController.deleteLegend)

router
  .route("/tips")
  .get(tipController.getAllTips)
  .post(authController.protect, tipController.createTip)

router
  .route("/tips/:id")
  .get(tipController.getTip)
  .patch(authController.protect, tipController.updateTip)
  .delete(authController.protect, tipController.deleteTip)

router
  .route("/funfacts")
  .get(funfactController.getAllFunfacts)
  .post(authController.protect, funfactController.createFunfact)

router
  .route("/funfacts/:id")
  .get(funfactController.getFunfact)
  .patch(authController.protect, funfactController.updateFunfact)
  .delete(authController.protect, funfactController.deleteFunfact)

router
  .route("/upload")
  .post(authController.protect, uploadController.uploadFile)

router
  .route("/gallery")
  .get(galleryController.getAllGalleries)
  .post(authController.protect, galleryController.createGallery)

router
  .route("/gallery/:id")
  .get(galleryController.getGallery)
  .patch(authController.protect, galleryController.updateGallery)
  .delete(authController.protect, galleryController.deleteGallery)

module.exports = router
