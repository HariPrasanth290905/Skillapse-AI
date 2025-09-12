import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function Progressbar({ value = 0 }) {
  useGSAP(()=>{
    gsap.from('.a-bar',{
      x:-500,
      delay:0.5,
      duration:1,
      ease:'power3.in'
    })
  },[])
  return (
    <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
      <div className="a-bar" style={{ width: `${value}%` }}></div>
    </div>
  );
}
