// src/components/UserProfileCard.jsx
interface UserProfileCardProps {
  profileImage: string;
  backgroundImage: string;
  name: string;
  location: string;
  description: string;
  twitter?: string;
  instagram?: string;
  gmail: string;
  contact: string;
  domainRole: string;
  companyName: string;
  companyDescription: string;
}

export default function UserProfileCard({
  profileImage,
  backgroundImage,
  name,
  location,
  description,
  twitter,
  instagram,
  gmail,
  contact,
  domainRole,
  companyName,
  companyDescription,
}: UserProfileCardProps) {
  return (
    <div className="max-w-md w-full bg-white shadow-lg rounded-2xl overflow-hidden">
      <div className="relative">
        <img
          src={backgroundImage}
          alt="Background"
          className="w-full h-32 object-cover"
        />
        <img
          src={profileImage}
          alt="Profile"
          className="w-24 h-24 rounded-full border-4 border-white absolute left-1/2 transform -translate-x-1/2 -bottom-12"
        />
      </div>

      <div className="pt-16 p-6 text-center">
        <h2 className="text-xl font-bold">{name}</h2>
        <p className="text-gray-600">{domainRole}</p>
        <p className="text-gray-500 text-sm mt-2">{location}</p>
        <p className="text-gray-700 mt-4">{description}</p>

        <div className="mt-4">
          <p><strong>📧 Gmail:</strong> {gmail}</p>
          <p><strong>📱 Contact:</strong> {contact}</p>
          <p><strong>🏢 Company:</strong> {companyName}</p>
          <p className="text-sm text-gray-600">{companyDescription}</p>
        </div>

        <div className="flex justify-center gap-4 mt-4">
          {twitter && (
            <a href={twitter} className="text-blue-500 hover:underline">
              Twitter
            </a>
          )}
          {instagram && (
            <a href={instagram} className="text-pink-500 hover:underline">
              Instagram
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
