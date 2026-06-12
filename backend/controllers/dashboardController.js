const Client = require("../models/Client");
const Consultation = require("../models/Consultation");

const getDashboardStats = async (req, res) => {
  try {

    const totalClients =
      await Client.countDocuments({
        astrologer: req.user._id
      });

    const totalConsultations =
      await Consultation.countDocuments({
        astrologer: req.user._id
      });

    const completedConsultations =
      await Consultation.countDocuments({
        astrologer: req.user._id,
        status: "Completed"
      });

    const upcomingConsultations =
      await Consultation.countDocuments({
        astrologer: req.user._id,
        status: "Scheduled"
      });

    const recentClients =
      await Client.find({
        astrologer: req.user._id
      })
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      totalClients,
      totalConsultations,
      completedConsultations,
      upcomingConsultations,
      recentClients,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  getDashboardStats
};