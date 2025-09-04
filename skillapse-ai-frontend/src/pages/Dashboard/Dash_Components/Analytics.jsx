import { BarChart3, LucideChartBar } from "lucide-react";
import Progressbar from "./Progressbar";

function Analytics() {
  return (
    <section id="analytics">
      <div className="a-title">
        <BarChart3 color="#7DF9FF" />
        <h1>Platform Analytics</h1>
      </div>
      {/* Row */}
      <div className="a-match">
        <h1>0</h1>
        <span>No of Active Users</span>
      </div>
      {/* Row */}
      <div className="rates">
        <div>
          <h1>0</h1>
          <span>numbers lala</span>
        </div>
        <div>
          <h1>0/5</h1>
          <span>numbers lala</span>
        </div>
        {/* Row */}
      </div>
      <div className="eff">
        <div className="eff-head">
          <p>Matching Efficiency</p>
          <p>0%</p>
        </div>
        <Progressbar value={70}/>
      </div>
    </section>
  );
}

export default Analytics;
