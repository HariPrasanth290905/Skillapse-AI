import ProgressBar from '@/Components/Progressbar';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Award, Book, Star, Target } from 'lucide-react';
import { useRef } from 'react';

function Achievements() {

  const achievementsRef = useRef(null);
  const projectsRef = useRef(null);

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

  useGSAP(() => {
    gsap.from([projectsRef.current, achievementsRef.current], {
      opacity: 0,
      y: 100,
      duration: 1,
      delay: 1.5,
      ease: "power2.out",
    });
  }, [])
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Achievements */}
      <div
        className="p-6 rounded-lg border border-gray-700 trans"
        ref={achievementsRef}
      >
        <h2 className="prof-head gradient-text">
          <Award className="w-5 h-5" color="white" /> Achievements
        </h2>
        <div className="space-y-3">
          {achievements.map((a) => {
            const Icon = a.icon;
            return (
              <div
                key={a.title}
                className="flex items-start gap-3 bg-gray-800 p-3 rounded"
              >
                <div className="w-10 h-10 flex items-center justify-center rounded-xl border border-pink-500">
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
      <div
        className="p-6 rounded-lg border border-gray-700 trans"
        ref={projectsRef}
      >
        <h2 className="prof-head gradient-text">
          <Target className="w-5 h-5" color="white" /> Active Projects
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
              <ProgressBar progress={p.progress} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Achievements