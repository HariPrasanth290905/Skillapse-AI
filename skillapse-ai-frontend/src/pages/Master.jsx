import { Outlet } from "react-router-dom";
import Sidebar from "./Dashboard/Dash_Components/Sidebar";

function Master() {
  return (
  <div style={{display:'flex'}} className="mx-9 w-full">
  <Sidebar/>

  <main style={{ flexGrow: 1, padding: "20px" }}>
    <Outlet />
  </main>
</div>

  );
}

export default Master;
