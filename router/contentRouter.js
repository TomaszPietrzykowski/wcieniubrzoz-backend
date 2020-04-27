const express = require("express")

const legendController = require("../controller/legendController")
const tipController = require("../controller/tipController")
const funfactController = require("../controller/funfactController")

const router = express.Router()

router.route("/").get(legendController.sendTestMsg)

router
  .route("/v1/legends")
  .get(legendController.getAllLegends)
  .post(legendController.createLegend)

router
  .route("/v1/legends/:id")
  .get(legendController.getLegend)
  .patch(legendController.updateLegend)
  .delete(legendController.deleteLegend)

router
  .route("/v1/tips")
  .get(tipController.getAllTips)
  .post(tipController.createTip)

router
  .route("/v1/tips/:id")
  .get(tipController.getTip)
  .patch(tipController.updateTip)
  .delete(tipController.deleteTip)

router
  .route("/v1/funfacts")
  .get(funfactController.getAllFunfacts)
  .post(funfactController.createFunfact)

router
  .route("/v1/funfacts/:id")
  .get(funfactController.getFunfact)
  .patch(funfactController.updateFunfact)
  .delete(funfactController.deleteFunfact)

module.exports = router
