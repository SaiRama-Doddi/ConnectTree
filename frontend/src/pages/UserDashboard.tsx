import React, { useEffect, useState } from 'react';
import axios from 'axios';
import image1 from '../assets/local_business-D587cmfd 1 (1).png';
import image2 from '../assets/IT_marketplace-W9MwSQhD 1.png';
import image3 from '../assets/professional_networking-Cu1XISy5 1.png';
import image4 from '../assets/offline_networking-BMjdeQi7 1.png';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { 
  Store,
  Monitor,
  Users,
  UserCheck,
  Calculator,
  Share,
  Share2,
  QrCode,
  Save,
  Mail,
  Phone,
  Building,
  MapPin,
  Twitter,
  Instagram,
  UserPlus,
  MessageCircle,
  X
} from 'lucide-react';

type Card = {
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
};

type User = {
  _id?: string;
  username: string;
  email: string;
  role: string;
};

interface ShareButtonProps {
  card: {
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
  };
}

function App() {
  const [user, setUser] = useState<User>({ username: "", email: "", role: "" });
    const [isModalOpen, setIsModalOpen] = useState(false);
  const [card, setCard] = useState<Card>({
    profileImage: "",
    backgroundImage: "",
    name: "",
    location: "",
    twitter: "",
    instagram: "",
    gmail: "",
    contact: "",
    domainRole: "",
    companyName: "",
    companyDescription: "",
    description: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [activeTab, setActiveTab] = useState("Contact");
  const token = localStorage.getItem("token");



  const cardText = `
Gmail: ${card.gmail}
Location: ${card.location}
Domain Role: ${card.domainRole}
Company: ${card.companyName}
Company Description: ${card.companyDescription}
Contact: ${card.contact}
Twitter: ${card.twitter || "N/A"}
Instagram: ${card.instagram || "N/A"}
Description: ${card.description}
`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(cardText);
    alert("Card copied to clipboard!");
  };


  // Static service cards data
  const serviceCards = [
    {
      id: 1,
      title: "Find Local Businesses",
      description: "Find diverse local businesses from different industry.",
      image:image1,
      icon: <Store className="w-8 h-8 text-blue-600" />,
      bgColor: "bg-blue-50",
      buttonText: "Explore More",
      buttonColor: "bg-blue-600 hover:bg-blue-700"
    },
    {
      id: 2,
      title: "IT Market Place: Connect with companies",
      description: "Connect with IT companies and explore opportunities.",
      image:image2,
      icon: <Monitor className="w-8 h-8 text-purple-600" />,
      bgColor: "bg-purple-50",
      buttonText: "Explore More",
      buttonColor: "bg-purple-600 hover:bg-purple-700"
    },
    {
      id: 3,
      title: "Explore Professional Networking",
      description: "Connect and explore with global professionals.",
      image:image3,
      icon: <Users className="w-8 h-8 text-green-600" />,
      bgColor: "bg-green-50",
      buttonText: "Explore More",
      buttonColor: "bg-green-600 hover:bg-green-700"
    },
    {
      id: 4,
      title: "Offline Business Networking",
      description: "Find Offline Business Network in your nearby location.",
      icon: <UserCheck className="w-8 h-8 text-orange-600" />,
      image:image4,
      bgColor: "bg-orange-50",
      buttonText: "Explore More",
      buttonColor: "bg-orange-600 hover:bg-orange-700"
    },
    {
      id: 5,
      title: "Simplify Your Business Accounts with Khata Tracker!",
      description: "From expenses to income - manage it all with Khata Tracker.",
      icon: <Calculator className="w-8 h-8 text-teal-600" />,
      bgColor: "bg-teal-50",
      buttonText: "Start 7 days free trial",
      buttonColor: "bg-teal-600 hover:bg-teal-700"
    }
  ];

  const tabs = ["Contact", "Services", "Products", "Gallery"];

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }
    axios
      .get("http://localhost:5000/api/profile/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUser(res.data.user);
        setCard(res.data.card || card);
      })
      .catch((err) => setError(err.response?.data?.message || "Failed to load"))
      .finally(() => setLoading(false));
  }, [token]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCard({ ...card, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    axios
      .put("http://localhost:5000/api/profile/update", card, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setSuccess(res.data.message))
      .catch((err) => setError(err.response?.data?.message || "Update failed"));
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "Contact":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-3">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Phone className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="font-medium text-gray-900">{card.contact || "9848652785"}</p>
                  <p className="text-sm text-gray-500">Phone</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Mail className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="font-medium text-gray-900">{card.gmail || "contact@connectree.co"}</p>
                  <p className="text-sm text-gray-500">Email</p>
                </div>
              </div>
            </div>
          </div>
        );
      case "Services":
        return (
          <div className="space-y-3">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">IT Solutions</h4>
              <p className="text-sm text-blue-700">Complete software development and IT consulting services</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-semibold text-green-900 mb-2">Web Development</h4>
              <p className="text-sm text-green-700">Modern web applications and responsive websites</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <h4 className="font-semibold text-purple-900 mb-2">Mobile Apps</h4>
              <p className="text-sm text-purple-700">iOS and Android application development</p>
            </div>
          </div>
        );
      case "Products":
        return (
          <div className="space-y-3">
            <div className="p-4 bg-orange-50 rounded-lg">
              <h4 className="font-semibold text-orange-900 mb-2">ConnecTree Platform</h4>
              <p className="text-sm text-orange-700">Business networking and connection platform</p>
            </div>
            <div className="p-4 bg-teal-50 rounded-lg">
              <h4 className="font-semibold text-teal-900 mb-2">Khata Tracker</h4>
              <p className="text-sm text-teal-700">Business accounting and expense management</p>
            </div>
          </div>
        );
      case "Gallery":
        return (
          <div className="grid grid-cols-2 gap-3">
            <div className="aspect-square bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-semibold">Project 1</span>
            </div>
            <div className="aspect-square bg-gradient-to-br from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-semibold">Project 2</span>
            </div>
            <div className="aspect-square bg-gradient-to-br from-orange-400 to-red-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-semibold">Project 3</span>
            </div>
            <div className="aspect-square bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-semibold">Project 4</span>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
    
     <Navbar />
      {/* Main Content */}
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-6 p-6">
          {/* Left Container: Profile Section */}
          <div className="lg:w-1/2 space-y-6">
            {/* Form (conditionally rendered) */}
            {showForm && (
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Edit Profile</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input 
                      type="text" 
                      name="name" 
                      placeholder="Full Name" 
                      value={card.name} 
                      onChange={handleChange} 
                      className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
                    />
                    <input 
                      type="text" 
                      name="location" 
                      placeholder="Location" 
                      value={card.location} 
                      onChange={handleChange} 
                      className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input 
                      type="text" 
                      name="domainRole" 
                      placeholder="Domain Role" 
                      value={card.domainRole} 
                      onChange={handleChange} 
                      className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
                    />
                    <input 
                      type="text" 
                      name="companyName" 
                      placeholder="Company Name" 
                      value={card.companyName} 
                      onChange={handleChange} 
                      className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
                    />
                  </div>

                  <textarea 
                    name="companyDescription" 
                    placeholder="Company Description" 
                    value={card.companyDescription} 
                    onChange={handleChange} 
                    rows={3}
                    className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none" 
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input 
                      type="text" 
                      name="contact" 
                      placeholder="Contact" 
                      value={card.contact} 
                      onChange={handleChange} 
                      className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
                    />
                    <input 
                      type="email" 
                      name="gmail" 
                      placeholder="Gmail" 
                      value={card.gmail} 
                      onChange={handleChange} 
                      className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input 
                      type="url" 
                      name="twitter" 
                      placeholder="Twitter URL" 
                      value={card.twitter} 
                      onChange={handleChange} 
                      className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
                    />
                    <input 
                      type="url" 
                      name="instagram" 
                      placeholder="Instagram URL" 
                      value={card.instagram} 
                      onChange={handleChange} 
                      className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
                    />
                  </div>

                  <textarea 
                    name="description" 
                    placeholder="Description" 
                    value={card.description} 
                    onChange={handleChange} 
                    rows={4}
                    className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none" 
                  />

                  <button 
                    type="submit" 
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium w-full md:w-auto"
                  >
                    Save Changes
                  </button>
                  
                  {success && <p className="text-green-600 mt-2 p-3 bg-green-50 rounded-lg">{success}</p>}
                  {error && <p className="text-red-600 mt-2 p-3 bg-red-50 rounded-lg">{error}</p>}
                </form>
              </div>
            )}

            {/* Live Preview */}
            <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
              <div className="flex justify-between items-center p-6 border-b bg-gray-50">
                <h2 className="text-xl font-bold text-gray-900">Live Preview</h2>
                <button
                  onClick={() => setShowForm(!showForm)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                  {showForm ? "Hide Form" : "Edit Profile"}
                </button>
              </div>

              <div className="relative">
                {card.backgroundImage ? (
                  <img 
                    src={card.backgroundImage} 
                    alt="Background" 
                    className="w-full h-32 object-cover" 
                  />
                ) : (
                  <div className="w-full h-32 bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-500"></div>
                )}
                
                {card.profileImage ? (
                  <img 
                    src={card.profileImage} 
                    alt="Profile" 
                    className="w-20 h-20 rounded-full border-4 border-white shadow-lg absolute -bottom-10 left-6" 
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full border-4 border-white shadow-lg absolute -bottom-10 left-6 bg-gray-300 flex items-center justify-center">
                    <span className="text-gray-600 text-2xl font-bold">
                      {card.name ? card.name.charAt(0).toUpperCase() : "S"}
                    </span>
                  </div>
                )}
              </div>

              <div className="p-6 pt-12">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{card.name || "Shaik Ahmad Alisha"}</h3>
                    <p className="text-blue-600 font-medium">{card.domainRole || "UI/UX designer"}</p>
                    <p className="text-gray-500 text-sm flex items-center mt-1">
                      <MapPin className="w-4 h-4 mr-1" />
                      {card.location || "Visakhapatnam, Andhra Pradesh"}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center gap-2">
                      <MessageCircle className="w-4 h-4" />
                      Get in Touch
                    </button>
                    <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium flex items-center gap-2">
                      <UserPlus className="w-4 h-4" />
                      Follow
                    </button>
                  </div>
                </div>

                <p className="text-gray-700 mb-4 leading-relaxed">
                  {card.description || "Connectree Softech Solutions Pvt Ltd is a company that appears to be based in Visakhapatnam, India, and offers a variety of IT services and solutions. They have job openings available and are hiring for various positions, according to their LinkedIn."}
                </p>

                {/* Action Buttons */}
                <div className="flex gap-3 mb-6">
                  <button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition-colors text-sm font-medium"
                   onClick={() => setIsModalOpen(true)}>
                    <Share2 className="w-4 h-4" />
                    Share
                  </button>
                  <button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition-colors text-sm font-medium">
                    <QrCode className="w-4 h-4" />
                    QR
                  </button>
                  <button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition-colors text-sm font-medium">
                    <Share className="w-4 h-4" />
                    Send My Card
                  </button>
                  <button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition-colors text-sm font-medium">
                    <Save className="w-4 h-4" />
                    Save contact
                  </button>
                </div>



{/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative">
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-lg font-semibold mb-4">Share Card</h2>
            <textarea
              readOnly
              value={cardText}
              className="w-full h-48 p-2 border border-gray-300 rounded mb-4 resize-none"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={copyToClipboard}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                Copy
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
                {/* Tabs */}
                <div className="border-b border-gray-200 mb-4">
                  <nav className="flex space-x-8">
                    {tabs.map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                          activeTab === tab
                            ? "border-blue-500 text-blue-600"
                            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </nav>
                </div>

                {/* Tab Content */}
                <div className="min-h-[200px]">
                  {renderTabContent()}
                </div>

                {/* Social Links */}
                {(card.twitter || card.instagram) && (
                  <div className="flex gap-3 mt-6 pt-4 border-t border-gray-100">
                    {card.twitter && (
                      <a 
                        href={card.twitter} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="flex items-center gap-2 text-blue-500 hover:text-blue-600 transition-colors text-sm font-medium"
                      >
                        <Twitter className="w-4 h-4" />
                        Twitter
                      </a>
                    )}
                    {card.instagram && (
                      <a 
                        href={card.instagram} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="flex items-center gap-2 text-pink-500 hover:text-pink-600 transition-colors text-sm font-medium"
                      >
                        <Instagram className="w-4 h-4" />
                        Instagram
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Container: Service Cards */}
          <div className="lg:w-1/2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {serviceCards.map((service) => (
                <div key={service.id} className={`bg-white-600 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}>
                  <div className="flex flex-col h-full">
                   <div className="flex items-center justify-between mb-4">
                   <div className="p-3 bg-white rounded-lg shadow-sm flex items-center justify-center">
                    <img
                    src={service.image}
                    alt={service.title}
                   className="w-18 h-18 object-contain"
                     />
                   </div>
                </div>  
                    <h3 className="font-bold text-gray-900 text-lg mb-3 leading-tight">
                      {service.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-6 flex-grow leading-relaxed">
                      {service.description}
                    </p>
                    
                    <button className={`bg-blue-600 text-white px-4 py-3 rounded-lg transition-all font-medium text-sm hover:scale-105 transform`}>
                      {service.buttonText}
                    </button>
                  </div>
                </div>
              ))}

              {/* Learn More Card */}
              <div className="md:col-span-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="text-center md:text-left">
                    <h3 className="font-bold text-xl mb-2">Learn More</h3>
                    <p className="text-blue-100 mb-4 md:mb-0">
                      Discover additional tools and services to grow your business network
                    </p>
                  </div>
                  <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center gap-2 whitespace-nowrap">
                    Learn More
                    <Share className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>



      <Footer />
    </div>


  );
}

export default App;