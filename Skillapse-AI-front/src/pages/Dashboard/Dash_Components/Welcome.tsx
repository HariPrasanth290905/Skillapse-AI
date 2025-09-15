import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Bot } from "lucide-react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

function Welcome() {
  const [isStarted, setStart] = useState(false);
  const navigate = useNavigate();

  const botContainerRef = useRef<HTMLDivElement | null>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const pRef = useRef<HTMLParagraphElement | null>(null);

  const handleButton = () => {
    // Navigate to an actual route instead of '#'
    navigate("/partners");
  };

  useGSAP(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const botContainer = botContainerRef.current;
    const size = 500;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const steps = 50;

    if (!prefersReduced && botContainer) {
      const tl = gsap.timeline({ repeat: -1 });
      for (let i = 0; i < steps; i++) {
        const x = Math.random() * (vw - size);
        const y = Math.random() * (vh - size);
        const duration = 0.5 + Math.random() * 2;
        tl.to(botContainer, { x, y, duration, ease: "power1.inOut" });
      }
      tl.pause();
      timelineRef.current = tl;
    }

    // Animate heading
    gsap.from("#welcome h1", {
      y: -30,
      opacity: 0,
      duration: 0.5,
      ease: "power2.out",
    });

    // Animate button
    gsap.from("#welcome button", {
      opacity: 0,
      duration: 1,
      delay: 0.8,
      ease: "power2.out",
    });

    // Animate paragraph lines with SplitText
    if (pRef.current) {
      const split = new SplitText(pRef.current, { type: "lines" });
      gsap.from(split.lines, {
        x: -50,
        opacity: 0,
        stagger: 0.1,
        delay: 0.2,
        duration: 0.6,
        ease: "power2.out",
      });
    }
  }, []);

  const handleClick = () => {
    const tl = timelineRef.current;
    if (!tl) return;

    if (isStarted) {
      tl.pause();
      gsap.to(botContainerRef.current, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "power2.inOut",
        onComplete: () => {
          gsap.to(botContainerRef.current, {
            rotation: 15,
            duration: 0.1,
            yoyo: true,
            repeat: 5,
            ease: "power1.inOut",
            clearProps: "rotation",
          });
        },
      });
    } else {
      tl.play(0);
    }

    setStart(!isStarted);
  };

  return (
    <section id="welcome">
      <div>
        <div
          ref={botContainerRef}
          onClick={handleClick}
          style={{ display: "inline-block", cursor: "pointer" }}
        >
          <Bot size={60} className="will-change-transform text-pink-500" />
        </div>
        <h1 className="gradient-text">Welcome to Skillapse AI</h1>
      </div>
      <p ref={pRef}>
        SkillMatch AI revolutionizes talent acquisition by leveraging advanced
        machine learning algorithms to match candidates with job opportunities
        based on skill compatibility, cultural fit, and career aspirations. Our
        platform analyzes resumes, job descriptions, and candidate profiles to
        provide precise matching recommendations.
      </p>
      <button onClick={handleButton}>Find Partners</button>
    </section>
  );
}

export default Welcome;
