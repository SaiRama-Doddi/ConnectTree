import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

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
    const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user token or any auth data
    localStorage.removeItem("token");
    // Redirect to login page
    navigate("/login");
  };
  const [editingCardId, setEditingCardId] = useState<string | null>(null);
  const [editedCard, setEditedCard] = useState<any>({});
  const [showForm, setShowForm] = useState(false);
  const [isCardFormVisible, setIsCardFormVisible] = useState(false);
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

  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
    role: "User",
  });
  const token = localStorage.getItem("token");

  // Fetch cards
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/cards", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setCards(res.data))
      .catch((err) => console.error(err));
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
    <>
    <Navbar />
    <div className="flex">
  <button
    onClick={handleLogout}
    className="ml-auto bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition font-medium"
  >
    Logout
  </button>
</div>

    <div className="p-6">
      <h1 className="text-2xl font-bold">Manager Dashboard</h1>
      {/* Toggle Button */}
      <button
        onClick={() => setShowForm(!showForm)}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-semibold mb-4 block mx-auto text-sm"
      >
        {showForm ? "Hide Form" : "Create New User"}
      </button>

      {/* Form */}
      {showForm && (
        <div className="p-6 bg-white shadow-lg rounded-lg border border-gray-200">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Create User / Manager
          </h2>

          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Username"
              className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              value={newUser.username}
              onChange={(e) =>
                setNewUser({ ...newUser, username: e.target.value })
              }
            />

            <input
              type="email"
              placeholder="Email"
              className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              value={newUser.email}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
            />

            <input
              type="password"
              placeholder="Password"
              className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              value={newUser.password}
              onChange={(e) =>
                setNewUser({ ...newUser, password: e.target.value })
              }
            />

            <select
              className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            >
              <option value="User">User</option>
              <option value="Manager">Manager</option>
            </select>

            <button
              onClick={createUser}
              className="bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition font-semibold"
            >
              Create User
            </button>
          </div>
        </div>
      )}

      {/* Create Card */}
      {/* Toggle Button */}
      <button
        onClick={() => setIsCardFormVisible(!isCardFormVisible)}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-semibold mb-4 block mx-auto text-sm"
      >
        {isCardFormVisible ? "Hide Card Form" : "Create New Card"}
      </button>

      {/* Form */}
      {isCardFormVisible && (
        <div className="p-6 bg-white shadow-lg rounded-lg border border-gray-200">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Create Card
          </h2>

          <div className="flex flex-col gap-4">
            {Object.keys(newCard).map((field) => (
              <input
                key={field}
                type="text"
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition w-full"
                value={(newCard as any)[field]}
                onChange={(e) =>
                  setNewCard({ ...newCard, [field]: e.target.value })
                }
              />
            ))}

            <button
              onClick={createCard}
              className="bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition font-semibold"
            >
              Create Card
            </button>
          </div>
        </div>
      )}

      {/* List of Cards */}
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">All Cards</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <div
            key={card._id}
            className="bg-white shadow-md rounded-lg border border-gray-200 p-4 hover:shadow-lg transition"
          >
            {/* Card Header */}
            <div className="flex items-center justify-between mb-2">
              {editingCardId === card._id ? (
                <input
                  type="text"
                  className="border p-1 rounded w-2/3"
                  value={editedCard.title}
                  onChange={(e) =>
                    setEditedCard({ ...editedCard, title: e.target.value })
                  }
                />
              ) : (
                <h3 className="font-bold text-lg text-gray-900">
                  {card.title}
                </h3>
              )}

              {card.domainRole && (
                <span className="text-sm text-blue-600 font-medium">
                  {card.domainRole}
                </span>
              )}
            </div>

            {/* Card Body */}
            {editingCardId === card._id ? (
              <textarea
                className="border p-2 rounded w-full mb-2"
                value={editedCard.description}
                onChange={(e) =>
                  setEditedCard({ ...editedCard, description: e.target.value })
                }
              />
            ) : (
              <p className="text-gray-700 mb-2">{card.description}</p>
            )}

            {/* Card Footer */}
            <div className="text-sm text-gray-500 space-y-1">
              {card.assignedTo && (
                <p>
                  <strong>Assigned to:</strong> {card.assignedTo.username}
                </p>
              )}
              {card.companyName && (
                <p>
                  <strong>Company:</strong> {card.companyName}
                </p>
              )}
            </div>

           
     
          </div>
        ))}
      </div>
    </div>

    <Footer />
    </>
  );
}
