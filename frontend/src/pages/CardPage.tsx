import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

interface Card {
  _id?: string;
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
  description: string;
}

const CardPage = () => {
  const { id } = useParams<{ id: string }>();
  const [card, setCard] = useState<Card | null>(null);

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const token = localStorage.getItem("token"); // or wherever you store it
        const { data } = await axios.get(`http://localhost:5000/api/cards/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCard(data);
      } catch (err) {
        console.error(err);
      }
    };

    if (id) fetchCard();
  }, [id]);

  if (!card) return <p>Loading...</p>;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <img src={card.backgroundImage} alt="Background" className="w-full h-40 object-cover rounded" />
      <div className="flex items-center mt-4">
        <img src={card.profileImage} alt={card.name} className="w-16 h-16 rounded-full mr-4" />
        <div>
          <h2 className="text-xl font-bold">{card.name}</h2>
          <p className="text-gray-500">{card.domainRole}</p>
        </div>
      </div>
      <p className="mt-2">{card.description}</p>
      <p><strong>Email:</strong> {card.gmail}</p>
      <p><strong>Location:</strong> {card.location}</p>
      <p><strong>Company:</strong> {card.companyName}</p>
      <p><strong>Company Desc:</strong> {card.companyDescription}</p>
      <p><strong>Contact:</strong> {card.contact}</p>
      <p><strong>Twitter:</strong> {card.twitter || "N/A"}</p>
      <p><strong>Instagram:</strong> {card.instagram || "N/A"}</p>
    </div>
  );
};

export default CardPage;
