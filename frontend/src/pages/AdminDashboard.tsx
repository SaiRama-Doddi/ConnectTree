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

  const [users, setUsers] = useState<User[]>([]);
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

const deleteCard = async (id: string) => {
  if (!window.confirm("Are you sure you want to delete this card?")) return;

  try {
    await axios.delete(`http://localhost:5000/api/cards/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    // Refresh the list after deletion
    setCards(cards.filter((card) => card._id !== id));
  } catch (err: any) {
    alert(err.response?.data?.message || "Error deleting card");
  }
};


    useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUsers();
  }, [token]);


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

  const startEditing = (card: any) => {
    setEditingCardId(card._id);
    setEditedCard({ ...card });
  };

  const cancelEditing = () => {
    setEditingCardId(null);
    setEditedCard({});
  };

  const updateCard = async () => {
    if (!editingCardId) return;
    try {
      await axios.put(
        `http://localhost:5000/api/cards/${editingCardId}`,
        editedCard,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setEditingCardId(null);
      setEditedCard({});
      //  fetchCards(); // refresh cards after update
    } catch (err: any) {
      console.error(err.response?.data?.message || "Failed to update card");
    }
  };
  return (
    <>
    <Navbar />




    <div className="p-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
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
{/* Form */}
{isCardFormVisible && (
  <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg border border-gray-200">
    <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
      Create Card
    </h2>

    <div className="flex flex-col gap-5">
      {/* Title */}
      <input
        type="text"
        placeholder="Title"
        className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition w-full placeholder-gray-400"
        value={newCard.title}
        onChange={(e) =>
          setNewCard({ ...newCard, title: e.target.value })
        }
      />

      {/* Description */}
      <textarea
        placeholder="Description"
        className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition w-full placeholder-gray-400 resize-none"
        value={newCard.description}
        onChange={(e) =>
          setNewCard({ ...newCard, description: e.target.value })
        }
        rows={4}
      />

      {/* AssignedTo Dropdown */}
      <div className="flex flex-col">
        <label className="font-medium text-gray-700 mb-2">
          Assign To
        </label>
        <select
          value={newCard.assignedTo}
          onChange={(e) => {
            const selectedUser = users.find(
              (u) => u._id === e.target.value
            );
            setNewCard({
              ...newCard,
              assignedTo: e.target.value,
              gmail: selectedUser?.email || "",
            });
          }}
          className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition w-full"
        >
          <option value="">Select User</option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.email} ({user._id})
            </option>
          ))}
        </select>
        {newCard.assignedTo && (
          <p className="mt-1 text-sm text-gray-600">
            Selected Email: {newCard.gmail}
          </p>
        )}
      </div>

      {/* Remaining Fields */}
      {[
        { label: "Profile Image URL", field: "profileImage" },
        { label: "Background Image URL", field: "backgroundImage" },
        { label: "Location", field: "location" },
        { label: "Domain Role", field: "domainRole" },
        { label: "Twitter URL", field: "twitter" },
        { label: "Instagram URL", field: "instagram" },
        { label: "Facebook URL", field: "facebook" },
        { label: "Contact No", field: "contactNo" },
        { label: "Company Name", field: "companyName" },
        { label: "Company Description", field: "companyDescription" },
      ].map(({ label, field }) => (
        <input
          key={field}
          type="text"
          placeholder={label}
          className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition w-full placeholder-gray-400"
          value={(newCard as any)[field]}
          onChange={(e) =>
            setNewCard({ ...newCard, [field]: e.target.value })
          }
        />
      ))}

      {/* Submit Button */}
      <button
        onClick={createCard}
        className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition font-semibold mt-3"
      >
        Create Card
      </button>
    </div>
  </div>
)}

   

   


      {/* List of Cards */}
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
          <h3 className="font-bold text-lg text-gray-900">{card.title}</h3>
        )}

        {card.domainRole && (
          <span className="text-sm text-blue-600 font-medium">
            {card.domainRole}
          </span>
        )}
      </div>

      {/* Card Body */}
      {editingCardId === card._id ? (
        <div className="flex flex-col gap-2">
          {[
            { label: "Description", field: "description" },
            { label: "Profile Image URL", field: "profileImage" },
            { label: "Background Image URL", field: "backgroundImage" },
            { label: "Location", field: "location" },
            { label: "Domain Role", field: "domainRole" },
            { label: "Gmail", field: "gmail" },
            { label: "Twitter", field: "twitter" },
            { label: "Instagram", field: "instagram" },
            { label: "Facebook", field: "facebook" },
            { label: "Contact No", field: "contact" },
            { label: "Company Name", field: "companyName" },
            { label: "Company Description", field: "companyDescription" },
          ].map(({ label, field }) => (
            <input
              key={field}
              type="text"
              placeholder={label}
              className="border p-2 rounded w-full"
              value={(editedCard as any)[field] || ""}
              onChange={(e) =>
                setEditedCard({ ...editedCard, [field]: e.target.value })
              }
            />
          ))}
        </div>
      ) : (
        <div className="text-gray-700 mb-2 space-y-1">
          <p>{card.description}</p>
          <p><strong>Location:</strong> {card.location}</p>
          <p><strong>Gmail:</strong> {card.gmail}</p>
          <p><strong>Domain Role:</strong> {card.domainRole}</p>
          <p><strong>Twitter:</strong> {card.twitter}</p>
          <p><strong>Instagram:</strong> {card.instagram}</p>
          <p><strong>Facebook:</strong> {card.facebook}</p>
          <p><strong>Contact:</strong> {card.contactNo}</p>
          <p><strong>Company:</strong> {card.companyName}</p>
          <p><strong>Company Description:</strong> {card.companyDescription}</p>
        </div>
      )}

      {/* Card Footer */}
      <div className="text-sm text-gray-500 space-y-1">
        {card.assignedTo && (
          <p>
            <strong>Assigned to:</strong> {card.assignedTo.username}
          </p>
        )}
      </div>

      {/* Action Buttons */}
      <div className="mt-3 flex gap-2">
        {editingCardId === card._id ? (
          <>
            <button
              onClick={updateCard}
              className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 text-sm"
            >
              Save
            </button>
            <button
              onClick={cancelEditing}
              className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500 text-sm"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => startEditing(card)}
              className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
            >
              Edit
            </button>

            {/* Delete Button */}
            <button
              onClick={() => deleteCard(card._id)}
              className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm"
            >
              Delete
            </button>
          </>
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
