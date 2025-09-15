import { useState, useRef, useEffect } from "react";
import axios from "axios";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Skills from "./Profile Components/Skills";
import Achievements from "./Profile Components/Achievements";
import ProfileHeader from "./Profile Components/ProfileHeader";
import ProfileContact from "./Profile Components/ProfileContact";
import ProfileAbout from "./Profile Components/ProfileAbout";

export default function Profile() {
  const [originalProfile, setOriginalProfile] = useState({
    username: "",
    fullName: "",
    position: "",
    email: "",
    phone: "",
    address: "",
    aboutMe: "",
    company: "",
    experience: "",
    joinDate: "",
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  // Per-section edit and saving states
  const [isEditingHeader, setIsEditingHeader] = useState<boolean>(false);
  const [isEditingContact, setIsEditingContact] = useState<boolean>(false);
  const [isEditingAbout, setIsEditingAbout] = useState<boolean>(false);

  const [profile, setProfile] = useState({
    id: "",
    username: "",
    fullName: "",
    position: "",
    email: "",
    phone: "",
    address: "",
    aboutMe: "",
    // company: "",
    experience: "",
    joinDate: "",
  });

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    const fetchProfile = async () => {
      try {
        setError(null);
        setLoading(true);
        const res = await axios.get(`http://localhost:8080/user/getUser`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = res.data || {};
        console.log(data)
        // Map backend user data into our local profile shape safely
        const mapped = {
          id: data.id || data.userid || "",
          username: data.username || data.username || "",
          fullName: data.fullName || "",
          position: data.position || data.position || "",
          email: data.email || "",
          phone: data.phone || "",
          address: data.address || data.city || "",
          aboutMe: data.bio || data.about || "",
          experience: data.experience || data.yearsOfExperience || "",
          joinDate: data.joinDate || data.createdAt || "",
        };
        setProfile(mapped);
        setOriginalProfile({
          username: mapped.username,
          position: mapped.position,
          fullName: mapped.fullName,
          email: mapped.email,
          phone: mapped.phone,
          address: mapped.address,
          aboutMe: mapped.aboutMe,
          company: data.company || "",
          experience: mapped.experience,
          joinDate: mapped.joinDate,
        });
      } catch (err: unknown) {
        console.error(err);
        const msg = (err as { response?: { data?: { message?: string } } }).response?.data?.message;
        setError(msg || "Failed to load profile information.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const [savingHeader, setSavingHeader] = useState(false);
  const [savingContact, setSavingContact] = useState(false);
  const [savingAbout, setSavingAbout] = useState(false);

  const handleSaveHeader = async () => {
    try {
      setSavingHeader(true);
      setError(null);
      const token = sessionStorage.getItem("accessToken");
      const payload = {
        id: profile.id,
        username: profile.username,
        position: profile.position,
        experience: profile.experience,
      };
      await axios.put(`http://localhost:8080/user/update`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      // sync originals for header fields after successful save
      setOriginalProfile((prev) => ({
        ...prev,
        username: profile.username,
        position: profile.position,
        experience: profile.experience,
      }));
      setIsEditingHeader(false);
    } catch (e) {
      const err = e as { response?: { data?: { message?: string } } };
      console.error(err);
      setError(
        err.response?.data?.message ||
        "Failed to update header info. Please try again."
      );
    } finally {
      setSavingHeader(false);
    }
  };

  const handleSaveContact = async () => {
    try {
      setSavingContact(true);
      setError(null);
      const token = sessionStorage.getItem("accessToken");
      const payload = {
        id: profile.id,
        email: profile.email,
        phone: profile.phone,
        address: profile.address,
      };
      await axios.put(`http://localhost:8080/user/update`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      // sync originals for contact fields after successful save
      setOriginalProfile((prev) => ({
        ...prev,
        email: profile.email,
        phone: profile.phone,
        address: profile.address,
      }));
      setIsEditingContact(false);
    } catch (e) {
      const err = e as { response?: { data?: { message?: string } } };
      console.error(err);
      setError(
        err.response?.data?.message ||
        "Failed to update contact. Please try again."
      );
    } finally {
      setSavingContact(false);
    }
  };

  const handleSaveAbout = async () => {
    try {
      setSavingAbout(true);
      setError(null);
      const token = sessionStorage.getItem("accessToken");
      const payload = {
        id: profile.id,
        bio: profile.aboutMe,
      };
      await axios.put(`http://localhost:8080/user/update`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      // sync originals for about field after successful save
      setOriginalProfile((prev) => ({
        ...prev,
        aboutMe: profile.aboutMe,
      }));
      setIsEditingAbout(false);
    } catch (e) {
      const err = e as { response?: { data?: { message?: string } } };
      console.error(err);
      setError(
        err.response?.data?.message ||
        "Failed to update about section. Please try again."
      );
    } finally {
      setSavingAbout(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  // Cancel handlers to revert draft edits
  const handleCancelHeader = () => {
    setProfile((prev) => ({
      ...prev,
      username: originalProfile.username,
      position: originalProfile.position,
      company: originalProfile.company,
      experience: originalProfile.experience,
    }));
    setIsEditingHeader(false);
  };

  const handleCancelContact = () => {
    setProfile((prev) => ({
      ...prev,
      email: originalProfile.email,
      phone: originalProfile.phone,
      address: originalProfile.address,
    }));
    setIsEditingContact(false);
  };

  const handleCancelAbout = () => {
    setProfile((prev) => ({
      ...prev,
      aboutMe: originalProfile.aboutMe,
    }));
    setIsEditingAbout(false);
  };

  // GSAP animation refs
  const profileHeaderRef = useRef<HTMLDivElement>(null!);
  const contactRef = useRef<HTMLDivElement>(null!);
  const aboutRef = useRef<HTMLDivElement>(null!);

  useGSAP(() => {
    // GSAP Animations
    gsap.from(profileHeaderRef.current, {
      opacity: 0,
      y: -50,
      duration: 1,
      ease: "power2.out",
    });

    gsap.from(contactRef.current, {
      opacity: 0,
      x: -100,
      duration: 1,
      delay: 0.5,
      ease: "power2.out",
    });
    gsap.from(aboutRef.current, {
      opacity: 0,
      x: 100,
      duration: 1,
      delay: 0.5,
      ease: "power2.out",
    });


  }, []);

  if (loading) {
    return (
      <div className="min-h-screen p-6 flex items-center justify-center">
        <p className="text-gray-400">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 ">
      <div className="w-10/12 mx-auto space-y-8">
        {error && (
          <div className="p-3 border border-red-500 rounded text-red-400 bg-red-900/20">
            {error}
          </div>
        )}
        {/* Header */}
        <ProfileHeader
          profile={{ id: profile.id, username: profile.username, fullName: profile.fullName, position: profile.position, experience: profile.experience, joinDate: profile.joinDate }}
          isEditing={isEditingHeader}
          saving={savingHeader}
          onChange={handleInputChange}
          onEdit={() => setIsEditingHeader(true)}
          onSave={handleSaveHeader}
          onCancel={handleCancelHeader}
          containerRef={profileHeaderRef}
        />

        {/* Contact + Bio */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <ProfileContact
            profile={{ id: profile.id, email: profile.email, phone: profile.phone, address: profile.address }}
            isEditing={isEditingContact}
            saving={savingContact}
            onChange={handleInputChange}
            onEdit={() => setIsEditingContact(true)}
            onSave={handleSaveContact}
            onCancel={handleCancelContact}
            containerRef={contactRef}
          />
          <ProfileAbout
            id={profile.id}
            aboutMe={profile.aboutMe}
            isEditing={isEditingAbout}
            saving={savingAbout}
            onChange={(v) => handleInputChange("aboutMe", v)}
            onEdit={() => setIsEditingAbout(true)}
            onSave={handleSaveAbout}
            onCancel={handleCancelAbout}
            containerRef={aboutRef}
          />
        </div>

        {/* Skills */}

        <Skills />

        {/* Achievements & Projects */}
        <Achievements />
      </div>
    </div>
  );
}
