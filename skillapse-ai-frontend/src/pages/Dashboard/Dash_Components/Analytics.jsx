import { BarChart3 } from "lucide-react";
import Progressbar from "./Progressbar";
import { use, useState } from "react";

function Analytics() {

  const [activeUsers,setActiveUsers] = useState(0);
  const [rating,setRating] = useState(0)
  
  return (
    <section id="analytics">
      <div className="a-title">
        <BarChart3 color="#7DF9FF" />
        <h1>Platform Analytics</h1>
      </div>
      {/* Row */}
      <div className="a-match">
        <h1>{activeUsers}</h1>
        <span>No of Active Users</span>
      </div>
      {/* Row */}
      <div className="rates">
        <div>
          <h1>0</h1>
          <span>numbers lala</span>
        </div>
        <div>
          <h1>{rating}/5</h1>
          <span>numbers lala</span>
        </div>
        {/* Row */}
      </div>
      <div className="eff">
        <div className="eff-head">
          <p>Matching Efficiency</p>
          <p>0%</p>
        </div>
        <Progressbar value={70} />
      </div>
    </section>
  );
}

export default Analytics;
