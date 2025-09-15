import { Edit, Save } from "lucide-react";

export type ProfileAboutProps = {
  id:string;
  aboutMe: string;
  isEditing: boolean;
  saving: boolean;
  onChange: (value: string) => void;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
  containerRef: React.RefObject<HTMLDivElement>;
};

export default function ProfileAbout({
  aboutMe,
  isEditing,
  saving,
  onChange,
  onEdit,
  onSave,
  onCancel,
  containerRef,
}: ProfileAboutProps) {
  return (
    <div className="lg:col-span-2 p-6 rounded-lg border trans border-gray-700" ref={containerRef}>
      <h2 className="prof-head gradient-text">About Me</h2>
      {isEditing ? (
        <textarea
          value={aboutMe}
          onChange={(e) => onChange(e.target.value)}
          className="w-full min-h-32 p-2 bg-gray-800 border border-gray-600 rounded"
        />
      ) : (
        <p className="text-gray-400">{aboutMe}</p>
      )}
      <div className="flex justify-end pt-2">
        {isEditing ? (
          <div className="flex gap-3">
            <button onClick={onSave} className="prof-button" disabled={saving}>
              <Save className="w-4 h-4" /> {saving ? "Saving..." : "Save About"}
            </button>
            <button onClick={onCancel} className="prof-button" disabled={saving}>
              Cancel
            </button>
          </div>
        ) : (
          <button onClick={onEdit} className="prof-button">
            <Edit className="w-4 h-4" /> Edit About
          </button>
        )}
      </div>
    </div>
  );
}
