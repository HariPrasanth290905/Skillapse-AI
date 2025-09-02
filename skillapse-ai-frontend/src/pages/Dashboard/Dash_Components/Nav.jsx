import { Bell } from "lucide-react";
function Nav() {
  return (
    <nav className="flex-center">
      <h1>Dashboard</h1>
      <div>
        <Bell />
        <div>
          <p>Irah</p>
          <i>
            <span>AI Developer</span>
          </i>
        </div>
        <img src="natori.jpg" alt="pfp" />
      </div>
    </nav>
  );
}

export default Nav;
