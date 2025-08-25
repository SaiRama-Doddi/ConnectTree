import { useEffect, useState } from "react";
import axios from "axios";

type Card = {
  _id: string;
  title: string;
  description: string;
  profileImage: string;
  backgroundImage: string;
  name: string;
  location: string;
  twitter?: string;
  instagram?: string;
  gmail: string;
  contact: string;
  domainRole: string;
  companyName: string;
  companyDescription: string;
};

export default function UserDashboard() {
  const [card, setCard] = useState<Card | null>(null);
  const token = localStorage.getItem("token");
  

  useEffect(() => {
    if (!token) return;

    // 🔹 Fetch single card for logged-in user
    axios
      .get("http://localhost:5000/api/cards/68ac4b4d67a0f90c88217853", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setCard(res.data))
      .catch((err) => console.error(err));
  }, [token]);

  if (!card) return <p className="p-6">Loading your card...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">User Dashboard</h1>

      {/* Single Card */}
      <div className="border p-4 my-4 rounded bg-white shadow-md">
        {/* Profile & Background */}
        <div className="mb-4">
          <img
            src={card.backgroundImage}
            alt="Background"
            className="w-full h-32 object-cover rounded"
          />
          <img
            src={card.profileImage}
            alt="Profile"
            className="w-20 h-20 rounded-full border-4 border-white shadow -mt-10 ml-4"
          />
        </div>

        {/* User Info */}
        <h3 className="text-lg font-bold">{card.name}</h3>
        <p className="text-gray-600">{card.domainRole}</p>
        <p className="text-gray-500 text-sm">{card.location}</p>
        <p className="text-gray-700 mt-2">{card.description}</p>

        {/* Company Info */}
        <div className="mt-3">
          <p>
            <strong>📧 Gmail:</strong> {card.gmail}
          </p>
          <p>
            <strong>📱 Contact:</strong> {card.contact}
          </p>
          <p>
            <strong>🏢 Company:</strong> {card.companyName}
          </p>
          <p className="text-sm text-gray-600">
            {card.companyDescription}
          </p>
        </div>

        {/* Social Links */}
        <div className="flex gap-4 mt-3">
          {card.twitter && (
            <a
              href={card.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Twitter
            </a>
          )}
          {card.instagram && (
            <a
              href={card.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-500 hover:underline"
            >
              Instagram
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
