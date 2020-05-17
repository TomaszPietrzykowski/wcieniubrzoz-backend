const express = require("express")

const authController = require("../controller/authController")
const legendController = require("../controller/legendController")
const tipController = require("../controller/tipController")
const funfactController = require("../controller/funfactController")
const uploadController = require("../controller/uploadController")

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
  .post(funfactController.createFunfact)

router
  .route("/funfacts/:id")
  .get(funfactController.getFunfact)
  .patch(funfactController.updateFunfact)
  .delete(funfactController.deleteFunfact)

router.route("/upload").post(uploadController.uploadFile)

module.exports = router
