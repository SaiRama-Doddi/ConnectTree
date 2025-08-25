import { useEffect, useState } from "react";
import axios from "axios";

type Card = {
  _id: string;
  title: string;
  description: string;
  assignedTo?: {
    username: string;
    [key: string]: any;
  };
  profileImage?: string;
  backgroundImage?: string;
  location?: string;
  domainRole?: string;
  gmail?: string;
  twitter?: string;
  instagram?: string;
  facebook?: string;
  contactNo?: string;
  companyName?: string;
  companyDescription?: string;
};

type User = {
  _id: string;
  username: string;
  email: string;
  role: string;
};

export default function AdminDashboard() {
  const [cards, setCards] = useState<Card[]>([]);
  const [newCard, setNewCard] = useState({
    title: "",
    description: "",
    assignedTo: "",
    profileImage: "",
    backgroundImage: "",
    location: "",
    domainRole: "",
    gmail: "",
    twitter: "",
    instagram: "",
    facebook: "",
    contactNo: "",
    companyName: "",
    companyDescription: "",
  });

  const [newUser, setNewUser] = useState({ username: "", email: "", password: "", role: "User" });
  const token = localStorage.getItem("token");

  // Fetch cards
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/cards", { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setCards(res.data))
      .catch(err => console.error(err));
  }, [token]);

  // Create Card
  const createCard = async () => {
    try {
      await axios.post("http://localhost:5000/api/cards", newCard, {
        headers: { Authorization: `Bearer ${token}` },
      });
      window.location.reload();
    } catch (err: any) {
      alert(err.response?.data?.message || "Error creating card");
    }
  };

  // Create User (Admin only)
  const createUser = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/register", newUser, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("User created successfully!");
      setNewUser({ username: "", email: "", password: "", role: "User" });
    } catch (err: any) {
      alert(err.response?.data?.message || "Error creating user");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>

      {/* Create User */}
      <div className="my-4 p-4 border rounded bg-gray-100">
        <h2 className="font-semibold">Create User / Manager</h2>
        <input
          type="text"
          placeholder="Username"
          className="border p-2 m-2"
          value={newUser.username}
          onChange={e => setNewUser({ ...newUser, username: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          className="border p-2 m-2"
          value={newUser.email}
          onChange={e => setNewUser({ ...newUser, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 m-2"
          value={newUser.password}
          onChange={e => setNewUser({ ...newUser, password: e.target.value })}
        />
        <select
          className="border p-2 m-2"
          value={newUser.role}
          onChange={e => setNewUser({ ...newUser, role: e.target.value })}
        >
          <option value="User">User</option>
          <option value="Manager">Manager</option>
        </select>
        <button onClick={createUser} className="bg-green-600 text-white px-4 py-2 rounded">
          Create User
        </button>
      </div>

      {/* Create Card */}
      <div className="my-4 p-4 border rounded bg-gray-100">
        <h2 className="font-semibold">Create Card</h2>
        {Object.keys(newCard).map((field) => (
          <input
            key={field}
            type="text"
            placeholder={field}
            className="border p-2 m-2 w-full"
            value={(newCard as any)[field]}
            onChange={e => setNewCard({ ...newCard, [field]: e.target.value })}
          />
        ))}
        <button onClick={createCard} className="bg-blue-600 text-white px-4 py-2 rounded">
          Create Card
        </button>
      </div>

      {/* List of Cards */}
      <h2 className="font-semibold">All Cards</h2>
      <ul>
        {cards.map(card => (
          <li key={card._id} className="border p-2 my-2 rounded bg-white shadow">
            <p className="font-bold">{card.title}</p>
            <p>{card.description}</p>
            <p className="text-sm">Assigned to: {card.assignedTo?.username}</p>
            {card.domainRole && <p className="text-sm">Role: {card.domainRole}</p>}
            {card.companyName && <p className="text-sm">Company: {card.companyName}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
}
