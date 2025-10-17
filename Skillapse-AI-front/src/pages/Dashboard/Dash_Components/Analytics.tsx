import { BarChart3 } from "lucide-react";
import { useState } from "react";
import Progressbar from "../../../Components/Progressbar";

function Analytics() {

  const [activeUsers, _setActiveUsers] = useState(0);
  const [rating, _setRating] = useState(0)
  const [efficiency, _setEfficiency] = useState(0);

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
          <span>numbers.</span>
        </div>
        <div>
          <h1>{rating}/5</h1>
          <span>numbers.</span>
        </div>
        {/* Row */}
      </div>
      <div className="eff">
        <div className="eff-head">
          <p>Matching Efficiency</p>
          <p>0%</p>
        </div>
        <Progressbar progress={efficiency} />
      </div>
    </section>
  );
}

export default Analytics;
