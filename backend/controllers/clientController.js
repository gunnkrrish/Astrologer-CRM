const Client = require("../models/Client");


const createClient = async (req, res) => {
  try {
    const {
      name,
      phone,
      email,
      dob,
      gender,
      address,
      notes,
    } = req.body;

    const client = await Client.create({
      name,
      phone,
      email,
      dob,
      gender,
      address,
      notes,
      astrologer: req.user._id,
    });

    res.status(201).json(client);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getClients = async (req, res) => {
  try {
    const keyword = req.query.search
      ? {
          name: {
            $regex: req.query.search,
            $options: "i",
          },
        }
      : {};

    const clients = await Client.find({
      astrologer: req.user._id,
      ...keyword,
    });

    res.json(clients);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getClientById = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);

    if (!client) {
      return res.status(404).json({
        message: "Client not found",
      });
    }

    res.json(client);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


const updateClient = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);

    if (!client) {
      return res.status(404).json({
        message: "Client not found",
      });
    }

    const updatedClient = await Client.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedClient);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


const deleteClient = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);

    if (!client) {
      return res.status(404).json({
        message: "Client not found",
      });
    }

    await Client.findByIdAndDelete(req.params.id);

    res.json({
      message: "Client deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


module.exports = {
  createClient,
  getClients,
  getClientById,
  updateClient,
  deleteClient,
};