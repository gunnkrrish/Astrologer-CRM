import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

const Clients = () => {

  const [clients, setClients] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    notes: "",
  });
  const [search, setSearch] = useState("");

  const [editingId, setEditingId] = useState(null);

 

  useEffect(() => {

  fetchClients();

}, [search]);

  const fetchClients = async () => {

  try {

    const res =
      await API.get(
        `/clients?search=${search}`
      );

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

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {

    if (editingId) {

      await API.put(
        `/clients/${editingId}`,
        formData
      );

      setEditingId(null);

    } else {

      await API.post(
        "/clients",
        formData
      );

    }

    setFormData({
      name: "",
      phone: "",
      email: "",
      address: "",
      notes: "",
    });

    fetchClients();

  } catch (error) {
    console.log(error);
  }
};
  const deleteClient = async (id) => {

  const confirmDelete =
    window.confirm(
      "Delete this client?"
    );

  if (!confirmDelete) return;

  try {

    await API.delete(
      `/clients/${id}`
    );

    fetchClients();

  } catch (error) {

    console.log(error);

  }
};
  const editClient = (client) => {

  setEditingId(client._id);

  setFormData({
    name: client.name || "",
    phone: client.phone || "",
    email: client.email || "",
    address: client.address || "",
    notes: client.notes || "",
  });

};

  return (
    <>
      <Navbar />

      <div className="p-8">

        <h1 className="text-3xl font-bold mb-6">
          Clients
        </h1>


        <div className="mb-6">

  <input
    type="text"
    placeholder="Search Client..."
    value={search}
    onChange={(e) =>
      setSearch(e.target.value)
    }
    className="border p-2 w-full rounded"
  />

</div>

        <form
          onSubmit={handleSubmit}
          className="space-y-3 mb-8"
        >

          <input
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="border p-2 w-full"
          />

          <input
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            className="border p-2 w-full"
          />

          <input
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="border p-2 w-full"
          />

          <input
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className="border p-2 w-full"
          />

          <textarea
            name="notes"
            placeholder="Notes"
            value={formData.notes}
            onChange={handleChange}
            className="border p-2 w-full"
          />

          <button
            className="bg-blue-600 text-white px-4 py-2 rounded"
            >
            {editingId
                ? "Update Client"
                : "Add Client"}
            </button>

        </form>

        {clients.length === 0 ? (

  <div className="text-center mt-10">

    <h2 className="text-3xl">
      📋
    </h2>

    <p className="text-gray-500 mt-2">
      No Clients Found
    </p>

  </div>

) : (
        clients.map((client) => (

  <div
    key={client._id}
    className="border p-4 mb-3 rounded"
  >

    <h3 className="font-bold">
      {client.name}
    </h3>

    <p>{client.phone}</p>

    <p>{client.email}</p>

    <div className="mt-3">

      <button
        onClick={() => editClient(client)}
        className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
      >
        Edit
      </button>

      <button
        onClick={() =>
          deleteClient(client._id)
        }
        className="bg-red-500 text-white px-3 py-1 rounded"
      >
        Delete
      </button>

    </div>

  </div>

)))}

      </div>
    </>
  );
};

export default Clients;