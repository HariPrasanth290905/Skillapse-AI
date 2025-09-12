import { useGSAP } from "@gsap/react";
import axios from "axios";
import gsap from "gsap";
import { Bell } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
function Nav() {
  const [username, setUserName] = useState("");
  const [position, setPosition] = useState("");
  const [profile, setProfile] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");

    if (token) {
      axios
        .get(`http://localhost:8080/user/getUser`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res);
          setUserName(res.data.username);
          setPosition(res.data.position);
          setProfile(res.data.profile);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  useGSAP(() => {
    gsap.from(".head", {
      x: -50,
      opacity: 0,
      duration: 1,
      ease: "bounce.out",
    });
  }, []);
  return (
    <nav className="flex-center">
      <h1 className="head">Dashboard</h1>
      <div>
        <Bell />
        {username ? (
          <>
            <div>
              <p>{username}</p>
              <i>
                <span className="text-gray-400">{position}</span>
              </i>
            </div>
            <img src={profile || "blank.png"} alt="Profile" />
          </>
        ) : (
          <button
          onClick={()=>{
            navigate('/signin')
          }}
          >Sign In</button>
        )}
      </div>
    </nav>
  );
}

export default Nav;
