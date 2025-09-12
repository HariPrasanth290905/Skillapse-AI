import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

interface ProgressBarProps {
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  const barRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    if (barRef.current) {
      gsap.fromTo(
        barRef.current,
        { width: "0%" },
        {
          width: `${progress}%`,
          duration: 1.2,
          ease: "power3.out",
          delay: 0.3,
        }
      );
    }
  }, [progress]);

  return (
    <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
      <div
        ref={barRef}
        className="a-bar"
      ></div>
    </div>
  );
};

export default ProgressBar;
