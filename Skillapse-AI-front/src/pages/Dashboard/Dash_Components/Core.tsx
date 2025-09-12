import { Settings } from "lucide-react";
import { coreDetails } from "./Dash";


function Core() {
  return (
    <section id="core">
      <div className="core-title">
        <Settings color="#f6339a" size={30} />
        <h1>What we offer</h1>
      </div>
     
        <ul className="core-list">
          {coreDetails.map(
            (core)=>(
              <li key={core.text}>
                <h3>{core.text}</h3>
                <span>{core.content}</span>
              </li>
            )
          )}
        </ul>
      
    </section>
  );
}

export default Core;
