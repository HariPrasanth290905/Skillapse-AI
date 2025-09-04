export default function Progressbar({ value = 0 }) {
  return (
    <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
      <div className="a-bar" style={{ width: `${value}%` }}></div>
    </div>
  );
}
