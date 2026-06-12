import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

const Consultations = () => {

  const [consultations, setConsultations] = useState([]);

const [clients, setClients] = useState([]);

const [formData, setFormData] = useState({
  client: "",
  date: "",
  time: "",
  notes: "",
});

 useEffect(() => {
  fetchConsultations();
  fetchClients();
}, []);

  const fetchClients = async () => {
  try {
    const res = await API.get("/clients");
    setClients(res.data);
  } catch (error) {
    console.log(error);
  }
};


const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};

  const fetchConsultations = async () => {

    const res =
      await API.get(
        "/consultations"
      );

    setConsultations(
      res.data
    );
  };


  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    await API.post(
      "/consultations",
      formData
    );

    setFormData({
      client: "",
      date: "",
      time: "",
      notes: "",
    });

    fetchConsultations();

  } catch (error) {
    console.log(error);
  }
};


const deleteConsultation = async (id) => {

  const confirmDelete =
    window.confirm(
      "Delete this consultation?"
    );

  if (!confirmDelete) return;

  try {

    await API.delete(
      `/consultations/${id}`
    );

    fetchConsultations();

  } catch (error) {

    console.log(error);

  }
};

const updateStatus = async (
  id,
  status
) => {

  try {

    await API.put(
      `/consultations/${id}`,
      { status }
    );

    fetchConsultations();

  } catch (error) {
    console.log(error);
  }
};

  return (
    <>
      <Navbar />

      <div className="p-8">

        <h1 className="text-3xl font-bold mb-6">
          Consultations
        </h1>

        <form
  onSubmit={handleSubmit}
  className="bg-white p-4 rounded shadow mb-6"
>

  <h2 className="text-xl font-bold mb-4">
    Schedule Consultation
  </h2>

  <select
    name="client"
    value={formData.client}
    onChange={handleChange}
    className="border p-2 w-full mb-3"
    required
  >

    <option value="">
      Select Client
    </option>

    {clients.map((client) => (

      <option
        key={client._id}
        value={client._id}
      >
        {client.name}
      </option>

    ))}

  </select>

  <input
    type="date"
    name="date"
    value={formData.date}
    onChange={handleChange}
    className="border p-2 w-full mb-3"
    required
  />

  <input
    type="text"
    name="time"
    placeholder="11:00 AM"
    value={formData.time}
    onChange={handleChange}
    className="border p-2 w-full mb-3"
    required
  />

  <textarea
    name="notes"
    placeholder="Notes"
    value={formData.notes}
    onChange={handleChange}
    className="border p-2 w-full mb-3"
  />

  <button
    className="bg-blue-600 text-white px-4 py-2 rounded"
  >
    Schedule
  </button>

</form>

        {consultations.map((consultation) => (

  <div
    key={consultation._id}
    className="border p-4 mb-4 rounded"
  >

    <h3 className="font-bold">
      {consultation.client?.name}
    </h3>

    <p>
      Date: {new Date(
        consultation.date
      ).toLocaleDateString()}
    </p>

    <p>
      Time: {consultation.time}
    </p>

    <p>
      Notes: {consultation.notes}
    </p>

    <div className="mt-3">

      <select
        value={consultation.status}
        onChange={(e) =>
          updateStatus(
            consultation._id,
            e.target.value
          )
        }
        className="border p-2 mr-3"
      >
        <option>Scheduled</option>
        <option>Completed</option>
        <option>Cancelled</option>
      </select>

      <button
        onClick={() =>
          deleteConsultation(
            consultation._id
          )
        }
        className="bg-red-500 text-white px-3 py-1 rounded"
      >
        Delete
      </button>

    </div>

  </div>

))}

      </div>
    </>
  );
};

export default Consultations;