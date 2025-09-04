import { useGSAP } from "@gsap/react";
import { cardItems } from "./Dash";
import gsap from "gsap";
function Cards() {
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#cards",
        start: "top 80%",
        end: "bottom 20%",
      },
    });
    tl.from('#cards div',{
      y:40,
      opacity:0,
      stagger:0.2,
      duration:1,
      ease:'power1.inOut'
    })
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
