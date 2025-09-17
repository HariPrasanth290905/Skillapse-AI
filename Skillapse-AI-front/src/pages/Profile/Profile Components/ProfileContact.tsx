import { Edit, Mail, MapPin, Phone, Save, User } from "lucide-react";

export type ProfileContactProps = {
  profile: {
    id: string;
    contact: {
      email: string;
      phone: string;
      address: string;
    };
    company?: string;
  };
  isEditing: boolean;
  saving: boolean;
  onChange: (field: string, value: string) => void;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
  containerRef: React.RefObject<HTMLDivElement>;
};

export default function ProfileContact({
  profile,
  isEditing,
  saving,
  onChange,
  onEdit,
  onSave,
  onCancel,
  containerRef,
}: ProfileContactProps) {
  // console.log('Contact recieved -> ',profile)
  return (
    <div className="p-6 rounded-lg border border-gray-700 trans" ref={containerRef}>
      <h2 className="prof-head gradient-text">
        <User className="w-5 h-5" color="white" /> Contact
      </h2>
      {isEditing ? (
        <div className="space-y-3">
          <input
            placeholder="Email"
            value={profile.contact.email}
            onChange={(e) => onChange("email", e.target.value)}
            className="w-full p-2 bg-gray-800 border border-gray-600 rounded"
          />
          <input
            placeholder="Phone"
            value={profile.contact.phone}
            onChange={(e) => onChange("phone", e.target.value)}
            className="w-full p-2 bg-gray-800 border border-gray-600 rounded"
          />
          <input
            placeholder="Location"
            value={profile.contact.address}
            onChange={(e) => onChange("address", e.target.value)}
            className="w-full p-2 bg-gray-800 border border-gray-600 rounded"
          />
          <div className="flex justify-end pt-2 gap-3">
            <button onClick={onSave} className="prof-button" disabled={saving}>
              <Save className="w-4 h-4" /> {saving ? "Saving..." : "Save Contact"}
            </button>
            <button onClick={onCancel} className="prof-button" disabled={saving}>
              Cancel
            </button>
          </div>
        </div>
      ) : (
        (() => {
          console.log('from return',profile.contact)
          const hasContact = Boolean((profile.contact.email || "").trim() || (profile.contact.phone || "").trim() || (profile.contact.address || "").trim());
          if (!hasContact) {
            return (
              <div className="space-y-3">
                <p className="text-gray-400">No contact information added yet.</p>
                <button type="button" className="prof-button" onClick={onEdit}>
                  Add Contact
                </button>
              </div>
            );
          }
          return (
            <div className="space-y-3">
              <p className="flex gap-2 items-center">
                <Mail className="w-4 h-4 text-pink-400" /> {profile.contact.email}
              </p>
              <p className="flex gap-2 items-center">
                <Phone className="w-4 h-4 text-blue-400" /> {profile.contact.phone}
              </p>
              <p className="flex gap-2 items-center">
                <MapPin className="w-4 h-4 text-green-400" /> {profile.contact.address}
              </p>
              <div className="flex justify-end pt-2">
                <button type="button" className="prof-button" onClick={onEdit}>
                  <Edit className="w-4 h-4" /> Edit Contact
                </button>
              </div>
            </div>
          );
        })()
      )}
    </div>
  );
}
