const express = require("express");
const router = express.Router();

const {
  createClient,
  getClients,
  getClientById,
  updateClient,
  deleteClient,
} = require("../controllers/clientController");



const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, createClient);
router.get("/", protect, getClients);
router.get("/:id", protect, getClientById);

router.put("/:id", protect, updateClient);

router.delete("/:id", protect, deleteClient);

module.exports = router;