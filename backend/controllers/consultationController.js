const Consultation = require("../models/Consultation");


const createConsultation = async (req, res) => {
  try {
    const {
      client,
      date,
      time,
      notes,
    } = req.body;

    const consultation =
      await Consultation.create({
        client,
        date,
        time,
        notes,
        astrologer: req.user._id,
      });

    res.status(201).json(consultation);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getConsultations = async (req, res) => {
  try {
    const consultations =
      await Consultation.find({
        astrologer: req.user._id,
      })
        .populate("client", "name phone")
        .sort({ date: 1 });

    res.json(consultations);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateConsultation = async (req, res) => {
  try {

    const consultation =
      await Consultation.findById(req.params.id);

    if (!consultation) {
      return res.status(404).json({
        message: "Consultation not found",
      });
    }

    const updated =
      await Consultation.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

    res.json(updated);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


const deleteConsultation = async (req, res) => {
  try {

    const consultation =
      await Consultation.findById(req.params.id);

    if (!consultation) {
      return res.status(404).json({
        message: "Consultation not found",
      });
    }

    await Consultation.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Consultation deleted",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getConsultationsByClient = async (req, res) => {
  try {

    const consultations = await Consultation.find({
      client: req.params.clientId,
      astrologer: req.user._id
    })
      .populate("client", "name phone")
      .sort({ date: -1 });

    res.json(consultations);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  createConsultation,
  getConsultations,
  updateConsultation,
  deleteConsultation,
  getConsultationsByClient
};