import Analytics from "./Dash_Components/Analytics";
import Cards from "./Dash_Components/Cards";
import Core from "./Dash_Components/Core";
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
    <Cards/>
    <section className="dash-analytics">
      <Core/>
      <Analytics/>
    </section>
    </>
  );
}

export default Dashboard;
