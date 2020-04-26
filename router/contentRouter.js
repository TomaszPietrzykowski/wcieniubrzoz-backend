const express = require("express")

const legendController = require("../controller/legendController")
const tipController = require("../controller/tipController")
const funfactController = require("../controller/funfactController")

const router = express.Router()

router
  .route("/legends")
  .get(legendController.getAllLegends)
  .post(legendController.createLegend)

// router
//   .route("/legends/:id")
//   .get(legendController.getLegend)
//   .patch(legendController.updateLegend)
//   .delete(legendController.deleteLegend)

// router.route("/tips").get(tipController.getAllTips).post(tipController.addTip)

// router
//   .route("/tips/:id")
//   .get(tipController.getTip)
//   .patch(tipController.updateTip)
//   .delete(tipController.deleteTip)

// router
//   .route("/funfacts")
//   .get(funfactController.getAllFunfacts)
//   .post(funfactController.addFunfact)

// router
//   .route("/funfacts/:id")
//   .get(funfactController.getFunfact)
//   .patch(funfactController.updateFunfact)
//   .delete(funfactController.deleteFunfact)

module.exports = router
