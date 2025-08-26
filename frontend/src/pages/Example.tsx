import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // npm install jwt-decode

type Card = {
  _id: string;
  title: string;
  description: string;
  assignedTo?: { username: string };
};

interface JwtPayload {
  id: string; // assuming your backend puts user ID in token as 'id'
  email?: string;
  [key: string]: any;
}

interface Props {
  token: string;
}

export default function CardDetails({ token }: Props) {
  const [card, setCard] = useState<Card | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) return;

    try {
      const decoded: JwtPayload = jwtDecode<JwtPayload>(token); // decode token
      const userId = decoded.id;

      axios
        .get(`http://localhost:5000/api/cards/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setCard(res.data))
        .catch((err) => {
          console.error(err);
          setError(err.response?.data?.message || "Failed to fetch card");
        })
        .finally(() => setLoading(false));
    } catch (err) {
      console.error("Invalid token", err);
      setError("Invalid token");
      setLoading(false);
    }
  }, [token]);

  if (loading) return <p>Loading card...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!card) return <p>No card found.</p>;

  return (
    <div className="border p-4 rounded shadow-md max-w-md mx-auto mt-4">
      <h2 className="text-xl font-bold">{card.title}</h2>
      <p>{card.description}</p>
      {card.assignedTo && <p>Assigned to: {card.assignedTo.username}</p>}
    </div>
  );
}
