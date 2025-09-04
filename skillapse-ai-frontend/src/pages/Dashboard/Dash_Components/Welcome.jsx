import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { Bot } from "lucide-react";
function Welcome() {
  useGSAP(() => {
    const content = new SplitText("#welcome p", {
      type: "lines",
    });
    gsap.from(content.lines, {
      x: -100,
      opacity: 0,
      duration: 0.5,
      stagger: 0.3,
      delay: 0.2,
      ease:'power2.inOut'
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
        <Bot size={60} className="bot"/>
        <h1>Welcome to Skillapse AI</h1>
      </div>
      <p>
        SkillMatch Al revolutionizes talent acquisition by leveraging advanced
        machine learning algorithms to match candidates with job opportunities
        based on skill compatibility, cultural fit, and career aspirations. Our
        platform analyzes resumes, job descriptions, and candidate profiles to
        provide precise matching recommendations
      </p>
      <button>Find Partners</button>
    </section>
  );
}

export default Welcome;
