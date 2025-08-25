// src/pages/ManagerDashboard.jsx
import { useEffect, useState } from "react";
import axios from "axios";

type Card = {
  _id: string;
  title: string;
  description: string;
  createdBy?: { username: string };
  assignedTo?: { _id: string };
};

export default function ManagerDashboard() {
  const [cards, setCards] = useState<Card[]>([]);
  const [newCard, setNewCard] = useState({ title: "", description: "" });

  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/cards", { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setCards(res.data))
      .catch(err => console.error(err));
  }, []);

  const createCard = async () => {
    try {
      const userStr = localStorage.getItem("user");
      if (!userStr) {
        alert("User not found in localStorage.");
        return;
      }
      const profile = JSON.parse(userStr); // logged-in user info
      await axios.post(
        "http://localhost:5000/api/cards",
        { ...newCard, assignedTo: profile._id }, // Manager can only assign to self
        { headers: { Authorization: `Bearer ${token}` } }
      );
      window.location.reload();
    } catch (err) {
      if (axios.isAxiosError(err) && err.response && err.response.data && err.response.data.message) {
        alert(err.response.data.message);
      } else {
        alert("An error occurred.");
      }
    }
  };

  const updateCard = async (id: string) => {
    try {
      await axios.put(
        `http://localhost:5000/api/cards/${id}`,
        { title: "Updated by Manager" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      window.location.reload();
    } catch (err) {
      if (axios.isAxiosError(err) && err.response && err.response.data && err.response.data.message) {
        alert(err.response.data.message);
      } else {
        alert("An error occurred.");
      }
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Manager Dashboard</h1>

      {/* Create Card */}
      <div className="my-4 p-4 border rounded bg-gray-100">
        <h2 className="font-semibold">Create My Card</h2>
        <input
          type="text"
          placeholder="Title"
          className="border p-2 m-2"
          onChange={e => setNewCard({ ...newCard, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          className="border p-2 m-2"
          onChange={e => setNewCard({ ...newCard, description: e.target.value })}
        />
        <button onClick={createCard} className="bg-green-600 text-white px-4 py-2 rounded">
          Create
        </button>
      </div>

      {/* Cards */}
      <h2 className="font-semibold">All Cards</h2>
      <ul>
        {cards.map(card => {
          const userStr = localStorage.getItem("user");
          if (!userStr) return null;
          const user = JSON.parse(userStr);
          return (
            <li key={card._id} className="mb-2 p-2 border rounded">
              <div>
                <strong>{card.title}</strong> - {card.description}
              </div>
              {card.assignedTo?._id === user._id && (
                <button
                  onClick={() => updateCard(card._id)}
                  className="bg-yellow-600 text-white px-2 py-1 rounded"
                >
                  Edit My Card
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
