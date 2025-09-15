import ProgressBar from '@/Components/Progressbar'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { TrendingUp } from 'lucide-react';
import { useRef } from 'react';

function Skills() {

    const skills = [
    { name: "React", level: 95 },
    { name: "TypeScript", level: 90 },
    { name: "Node.js", level: 88 },
    { name: "Python", level: 85 },
    { name: "PostgreSQL", level: 82 },
    { name: "AWS", level: 100 },
  ];

  const skillsRef = useRef(null);
  useGSAP(() => {
    gsap.from(skillsRef.current, {
      opacity: 0,
      y: 100,
      duration: 1,
      delay: 0.5,
      ease: "power2.out",
    });

  }, [])

  return (
    <div
      className="p-6 rounded-lg border border-gray-700 trans"
      ref={skillsRef}
    >
      <h2 className="prof-head gradient-text">
        <TrendingUp className="w-5 h-5" color="white" /> Skills & Expertise
      </h2>
      <div className="grid md:grid-cols-2 gap-6">
        {skills.map((skill) => (
          <div key={skill.name} className="flex flex-col gap-5">
            <div className="flex justify-between">
              <span>{skill.name}</span>
              <span>{skill.level}%</span>
            </div>
            <ProgressBar progress={skill.level} />
          </div>
        ))}
      </div>
    </div>)
}

export default Skills