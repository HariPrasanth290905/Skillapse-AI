import { Briefcase, Calendar, Camera, Edit, Save } from "lucide-react";

export type ProfileHeaderProps = {
  profile: {
    id: string;
    username: string;
    fullName: string;
    position: string;
    experience: string;
    joinDate: string;
  };
  isEditing: boolean;
  saving: boolean;
  onChange: (field: string, value: string) => void;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;

  containerRef: React.RefObject<HTMLDivElement>;
};

export default function ProfileHeader({
  profile,
  isEditing,
  saving,
  onChange,
  onEdit,
  onSave,
  onCancel,
  containerRef,
}: ProfileHeaderProps) {
  return (
    <div className="prof-header trans" ref={containerRef}>
      <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
        {/* Avatar */}
        <div className="relative">
          <img src="/natori.jpg" alt="Profile" className="w-24 h-24 rounded-full" />
          <button className="prof-img">
            <Camera className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Info */}
        <div className="space-y-2">
          {isEditing ? (
            <>
              <input
                value={profile.fullName}
                onChange={(e) => onChange("fullName", e.target.value)}
                className="text-2xl font-bold bg-gray-800 border border-gray-600 p-2 rounded w-full"
              />
              <input
                value={profile.position}
                onChange={(e) => onChange("position", e.target.value)}
                className="text-lg bg-gray-800 border border-gray-600 p-2 rounded w-full"
              />
            </>
          ) : (
            <>
              <h1 className="text-3xl font-bold gradient-text">{profile.fullName}</h1>
              <p className="text-xl text-gray-400">{profile.position}</p>
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

        {/* Action Buttons for Header */}
        <div className="lg:ml-auto flex gap-3">
          {isEditing ? (
            <>
              <button onClick={onSave} className="prof-button" disabled={saving}>
                <Save className="w-4 h-4" /> {saving ? "Saving..." : "Save Header"}
              </button>
              <button onClick={onCancel} className="prof-button" disabled={saving}>
                Cancel
              </button>
            </>
          ) : (
            <button onClick={onEdit} className="prof-button">
              <Edit className="w-4 h-4" /> Edit Header
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
