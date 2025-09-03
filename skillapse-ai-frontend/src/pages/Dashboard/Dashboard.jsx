import Nav from "./Dash_Components/Nav";
import Sidebar from "./Dash_Components/Sidebar";
import Welcome from "./Dash_Components/Welcome";

function Dashboard() {
  return (
    <>
    <div className="dash">
      <Sidebar />
      <Nav />
    </div>
    <Welcome/>
    </>
  );
}

export default Dashboard;
