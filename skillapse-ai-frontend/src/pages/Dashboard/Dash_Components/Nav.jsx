import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Bell } from "lucide-react";
import { useState } from "react";
function Nav() {

  const [name,setName] = useState('User');
  const [role,setRole] = useState('AI Developer')

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
          <p>{name}</p>
          <i>
            <span className="text-gray-400">{role}</span>
          </i>
        </div>
        <img src="natori.jpg" alt="pfp" />
      </div>
    </nav>
  );
}

export default Nav;
