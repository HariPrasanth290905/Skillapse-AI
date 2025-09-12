import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { cardItems } from "./Dash";
function Cards() {
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#cards",
        start: "top 85%",
        end: "bottom 15%",
      },
    });

    tl.from("#cards div", {
      y: (i, target) => (window.innerWidth < 640 ? 20 : 40),
      opacity: 0,
      stagger: 0.2,
      duration: 1,
      ease: "power1.inOut",
    });
  }, []);

  return (
    <section id="cards">
      {cardItems.map((card) => {
        const Icon = card.icon;
        return (
          <div key={card.text}>
            <Icon color={card.color} />
            <h1>{card.text}</h1>
            <p>{card.content}</p>
          </div>
        );
      })}
    </section>
  );
}

export default Cards;
