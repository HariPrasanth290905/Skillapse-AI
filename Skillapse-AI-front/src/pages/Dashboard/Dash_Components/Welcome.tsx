import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { Bot } from "lucide-react";
import { useNavigate } from "react-router-dom";
function Welcome() {

  const navigate = useNavigate();
  const handleButton = () => {
    navigate('#')
  };

  useGSAP(() => {
    const content = new SplitText("#welcome p", {
      type: "lines",
    });
    // Animations
    gsap.from(content.lines, {
      x: -100,
      opacity: 0,
      duration: 0.5,
      stagger: 0.3,
      delay: 0.2,
    });
    gsap.from("#welcome button", {
      opacity: 0,
      duration: 2,
      delay: 1,
    });
    gsap.from("#welcome h1", {
      y: -50,
      opacity: 0,
      duration: 0.5,
    });
  }, []);

  return (
    <section id="welcome">
      <div>
        <Bot size={60} className="bot" />
        <h1 className="gradient-text">Welcome to Skillapse AI</h1>
      </div>
      <p>
        SkillMatch Al revolutionizes talent acquisition by leveraging advanced
        machine learning algorithms to match candidates with job opportunities
        based on skill compatibility, cultural fit, and career aspirations. Our
        platform analyzes resumes, job descriptions, and candidate profiles to
        provide precise matching recommendations
      </p>
      <button onClick={handleButton}>Find Partners</button>
    </section>
  );
}

export default Welcome;
