import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Bell } from "lucide-react";
function Nav() {
  useGSAP(() => {
    gsap.from('.head',{
      x:-50,
      opacity:0,
      duration:1,
      ease:'bounce.out',
    })
  }, []);
  return (
    <nav className="flex-center">
      <h1 className="head">Dashboard</h1>
      <div>
        <Bell />
        <div>
          <p>Irah</p>
          <i>
            <span className="text-gray-400">AI Developer</span>
          </i>
        </div>
        <img src="natori.jpg" alt="pfp" />
      </div>
    </nav>
  );
}

export default Nav;
