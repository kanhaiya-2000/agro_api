const express = require("express");
const { createReport, getAggregateReport } = require("../controllers/ReportController");
const router = express.Router();

router.route("/").get(getAggregateReport);
router.route("/").post(createReport);

module.exports = router;