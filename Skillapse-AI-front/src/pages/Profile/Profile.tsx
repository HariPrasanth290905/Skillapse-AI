import { useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Calendar,
  Edit,
  Save,
  Camera,
  Star,
  TrendingUp,
  Award,
  Target,
  Book,
} from "lucide-react";
import Progressbar from "../../Components/Progressbar";
import Analytics from "../Dashboard/Dash_Components/Analytics";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState({
    name: "Alex Thompson",
    title: "Full Stack Developer",
    email: "alex.thompson@skillmatch.ai",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    bio: "Passionate full-stack developer with 5+ years of experience building scalable web applications. Expert in React, Node.js, and cloud technologies with a strong focus on user experience and performance optimization.",
    company: "Tech Innovators Inc.",
    experience: "5+ Years",
    joinDate: "March 2023",
  });

  const skills = [
    { name: "React", level: 95 },
    { name: "TypeScript", level: 90 },
    { name: "Node.js", level: 88 },
    { name: "Python", level: 85 },
    { name: "PostgreSQL", level: 82 },
    { name: "AWS", level: 100 },
  ];
  const achievements = [
    { icon: Star, title: "Top Performer", description: "Ranked in top 5%" },
    { icon: Award, title: "Innovation Award", description: "Best solution 2024" },
    { icon: Target, title: "Goal Achiever", description: "100% completion" },
    { icon: Book, title: "Mentor", description: "Guided 10+ juniors" },
  ];

  const projects = [
    { name: "E-commerce Platform", progress: 100, status: "Completed" },
    { name: "AI Dashboard", progress: 75, status: "In Progress" },
    { name: "Mobile App", progress: 30, status: "Planning" },
  ];

  const handleSave = () => {
    setIsEditing(false);
    console.log("Profile saved:", profile);
  };

  const handleInputChange = (field: string, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen text-white font-sans bg-black p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="prof-header trans">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
            {/* Avatar */}
            <div className="relative">
              <img
                src="/natori.jpg"
                alt="Profile"
                className="w-25 h-25 rounded-full"
              />
              <button className="prof-img">
                <Camera className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Info */}
            <div className="space-y-2">
              {isEditing ? (
                <>
                  <input
                    value={profile.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="text-2xl font-bold bg-gray-800 border border-gray-600 p-2 rounded w-full"
                  />
                  <input
                    value={profile.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    className="text-lg bg-gray-800 border border-gray-600 p-2 rounded w-full"
                  />
                </>
              ) : (
                <>
                  <h1 className="text-3xl font-bold gradient-text">{profile.name}</h1>
                  <p className="text-xl text-gray-400">{profile.title}</p>
                </>
              )}

              <div className="flex gap-3 mt-3">
                <span className="experience prof-badge">
                  <Briefcase className="w-4 h-4" /> {profile.experience}
                </span>
                <span className="since prof-badge">
                  <Calendar className="w-4 h-4" /> Since {profile.joinDate}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="lg:ml-auto flex gap-3">
              {isEditing ? (
                <button
                  onClick={handleSave}
                  className="prof-button"
                >
                  <Save className="w-4 h-4" /> Save Details
                </button>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="prof-button"
                >
                  <Edit className="w-4 h-4" /> Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Contact + Bio */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Contact */}
          <div className="p-6 rounded-lg border border-gray-700 trans">
            <h2 className="prof-head gradient-text">
              <User className="w-5 h-5"  color="white" /> Contact
            </h2>
            {isEditing ? (
              <div className="space-y-3">
                <input
                  value={profile.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="w-full p-2 bg-gray-800 border border-gray-600 rounded"
                />
                <input
                  value={profile.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="w-full p-2 bg-gray-800 border border-gray-600 rounded"
                />
                <input
                  value={profile.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                  className="w-full p-2 bg-gray-800 border border-gray-600 rounded"
                />
              </div>
            ) : (
              <div className="space-y-3">
                <p className="flex gap-2 items-center">
                  <Mail className="w-4 h-4 text-pink-400" /> {profile.email}
                </p>
                <p className="flex gap-2 items-center">
                  <Phone className="w-4 h-4 text-blue-400" /> {profile.phone}
                </p>
                <p className="flex gap-2 items-center">
                  <MapPin className="w-4 h-4 text-green-400" /> {profile.location}
                </p>
                <p className="flex gap-2 items-center">
                  <Briefcase className="w-4 h-4 text-yellow-400" />{" "}
                  {profile.company}
                </p>
              </div>
            )}
          </div>

          {/* Bio */}
          <div className="lg:col-span-2 p-6 rounded-lg border trans border-gray-700">
            <h2 className="prof-head gradient-text">About Me</h2>
            {isEditing ? (
              <textarea
                value={profile.bio}
                onChange={(e) => handleInputChange("bio", e.target.value)}
                className="w-full min-h-32 p-2 bg-gray-800 border border-gray-600 rounded"
              />
            ) : (
              <p className="text-gray-400">{profile.bio}</p>
            )}
          </div>
        </div>

        {/* Skills */}
        <div className="p-6 rounded-lg border border-gray-700 trans">
          <h2 className="prof-head gradient-text">
            <TrendingUp className="w-5 h-5" color="white"/> Skills & Expertise
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {skills.map((skill) => (
              <div key={skill.name} className="flex flex-col gap-5">
                <div className="flex justify-between">
                  <span>{skill.name}</span>
                  <span>{skill.level}%</span>
                </div>
                <Progressbar progress={skill.level} />
              </div>
            ))}
          </div>
        </div>
        {/* Achievements & Projects */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 ">
          {/* Achievements */}
          <div className="p-6 rounded-lg border border-gray-700 trans">
            <h2 className="prof-head gradient-text">
              <Award className="w-5 h-5" color="white"/> Achievements
            </h2>
            <div className="space-y-3">
              {achievements.map((a) => {
                const Icon = a.icon;
                return (
                  <div
                    key={a.title}
                    className="flex items-start gap-3 bg-gray-800 p-3 rounded"
                  >
                    <div className="w-10 h-10 bg-pink-600 flex items-center justify-center rounded">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{a.title}</h4>
                      <p className="text-gray-400 text-sm">{a.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Projects */}
          <div className="p-6 rounded-lg border border-gray-700 trans">
            <h2 className="prof-head gradient-text">
              <Target className="w-5 h-5" color="white"/> Active Projects
            </h2>
            <div className="space-y-4">
              {projects.map((p) => (
                <div key={p.name} className="bg-gray-800 p-3 rounded">
                  <div className="flex justify-between">
                    <span>{p.name}</span>
                    <span className="px-2 py-1 text-xs bg-gray-700 rounded">
                      {p.status}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-700 mt-2 rounded">
                    <div
                      className="h-2 bg-blue-500 rounded"
                      style={{ width: `${p.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
