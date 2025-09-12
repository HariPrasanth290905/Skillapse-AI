import { useGSAP } from "@gsap/react";
import gsap from "gsap";

function Cta() {
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#cta",
        start: window.innerWidth < 640 ? "top 95%" : "top 85%",
      },
    });

    tl.from("#cta", {
      opacity: 0,
      y: 20, // small upward reveal effect
      duration: 1,
      delay: window.innerWidth < 640 ? 0.2 : 0.4,
      ease: "expo.inOut",
    });
  }, []);

  return (
    <section id="cta">
      <div className="cta-sec">
        <div className="cta-title">
          <h2 className="mb-4 text-3xl font-extrabold">
            Ready to Redefine Your Career Path?
          </h2>
          <p className="cta-text">
            Harness the future of AI-driven skill mapping. Thousands are already
            using <span className="font-semibold text-white">Skillapse AI</span>{" "}
            to unlock hidden skills, build stronger career journeys, and stay
            ahead of the curve.
          </p>

          <div className="cta-butt-sec">
            <a
              href="#"
              className="cta-button bg-pink-500 cta-button-pink"
              aria-label="Start free trial"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 5v14M5 12h14"
                />
              </svg>
              Start Free Trial
            </a>

            <a
              href="#"
              className="cta-button bg-sky-500 cta-button-sky"
              aria-label="Schedule demo"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <path d="M16 2v4M8 2v4" />
              </svg>
              Explore more
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Cta;
