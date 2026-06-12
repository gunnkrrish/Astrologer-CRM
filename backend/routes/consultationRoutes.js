const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const {
  createConsultation,
  getConsultations,
  updateConsultation,
  deleteConsultation,
  getConsultationsByClient,
} = require("../controllers/consultationController");

router.post("/", protect, createConsultation);
router.get("/", protect, getConsultations);
router.get(
  "/client/:clientId",
  protect,
  getConsultationsByClient
);
router.put("/:id", protect, updateConsultation);

router.delete("/:id", protect, deleteConsultation);

module.exports = router;