import { useGSAP } from "@gsap/react";
import Analytics from "./Dash_Components/Analytics";
import Cards from "./Dash_Components/Cards";
import Core from "./Dash_Components/Core";
import Cta from "./Dash_Components/Cta";
import Nav from "./Dash_Components/Nav";
import Sidebar from "./Dash_Components/Sidebar";
import Welcome from "./Dash_Components/Welcome";
import gsap from "gsap";

function Dashboard() {
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#analytics",
        start: "top 90%",
        end: "bottom 20%",
      },
    });
    tl.from(".dash-analytics section", {
      y: 100,
      stagger: 0.2,
      opacity: 0,
      duration: 1,
      delay: 0.2,
      ease: "power3.inOut",
    });
  }, []);
  return (
    <>
      <div className="dash">
        <Sidebar />
        <Nav />
      </div>
      <Welcome />
      <Cards />
      <section className="dash-analytics">
        <Core />
        <Analytics/>
      </section>
      <Cta /></>
  );
}

export default Dashboard;
