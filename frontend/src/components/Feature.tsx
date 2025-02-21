import { Users, Shield, Globe2 } from "lucide-react";

export const Feature = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-24">
      <div className="grid md:grid-cols-3 gap-12">
        {[
          {
            icon: <Users />,
            title: "Instant Matching",
            description: "Get connected with random people from around the world in seconds"
          },
          {
            icon: <Shield />,
            title: "Safe & Secure",
            description: "Advanced moderation and safety features to protect our users"
          },
          {
            icon: <Globe2 />,
            title: "Global Community",
            description: "Connect with millions of users from over 190 countries"
          },
        ].map(({ icon, title, description }, index) => (
          <div key={index} className="text-center">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto">
              <span aria-hidden="true" className="w-8 h-8">{icon}</span>
            </div>
            <h3 className="text-xl font-semibold mt-6 text-white">{title}</h3>
            <p className="mt-4 text-gray-400">{description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
