const express = require("express")

const authController = require("../controller/authController")
const legendController = require("../controller/legendController")
const tipController = require("../controller/tipController")
const funfactController = require("../controller/funfactController")
const uploadController = require("../controller/uploadController")
const galleryController = require("../controller/galleryController")
const deleteController = require("../controller/deleteController")

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

router.route("/delete").post(authController.protect, deleteController.delete)

router
  .route("/gallery")
  .get(authController.protect, galleryController.getAllGalleries)
  .post(authController.protect, galleryController.createGallery)

router.route("/public_gallery").get(galleryController.getPublicGalleries)

router
  .route("/gallery/:id")
  .get(galleryController.getGallery)
  .patch(authController.protect, galleryController.updateGallery)
  .delete(authController.protect, galleryController.deleteGallery)

// dev-only routes, no ui handler:
router.route("/list_ftp").get(authController.protect, uploadController.listFTP)
router
  .route("/is_redundant")
  .post(authController.protect, uploadController.checkRedundancy)
router
  .route("/get_redundant")
  .post(authController.protect, uploadController.getRedundant)

module.exports = router
