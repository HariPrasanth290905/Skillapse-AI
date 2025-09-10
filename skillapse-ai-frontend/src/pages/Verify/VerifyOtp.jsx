import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function VerifyOtp() {
  const location = useLocation();
  const inputs = useRef([]);
  const navigate = useNavigate();
  const { email, username } = location.state || {};
  const [timeLeft, setTimeLeft] = useState(600);

  //Timer
  useEffect(() => {
    if (timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  // Time format
  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const sec = (seconds % 60).toString().padStart(2, "0");
    return `${min}:${sec}`;
  };

  // Value is entered
  const handleChange = (value, idx) => {
    if (/[^0-9]/.test(value)) return;
    if (value && idx < inputs.current.length - 1) {
      inputs.current[idx + 1].focus();
    }
    inputs.current[idx].value = value;
  };

  //On Key down
  const handleKeyDown = (key, idx) => {
    if (key === "Backspace" && !inputs.current[idx].value && idx > 0) {
      inputs.current[idx - 1].focus();
    } else if (key === " " && idx < inputs.current.length - 1) {
      inputs.current[idx + 1].focus();
    }
  };

  //Send otp to backend
  const handleClick = () => {
    const otp = inputs.current.map((input) => input.value).join("");
    axios
      .post(
        `http://localhost:8080/auth/verifyOtp`,
        { otp, email, username },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        sessionStorage.setItem("accessToken", res.data);
        navigate("/", { replace: true });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="verify">
      <div className="top">
        <h1 className="text-gray-400 font-bold text-4xl">Verify OTP</h1>
        <h3>
          <span className="text-xl">{formatTime(timeLeft)}</span>
        </h3>
      </div>
      <div className="otp">
        {Array.from({ length: 6 }).map((_, idx) => (
          <input
            key={idx}
            maxLength={1}
            inputMode="numeric"
            ref={(el) => (inputs.current[idx] = el)}
            onChange={(e) => {
              handleChange(e.target.value, idx);
            }}
            onKeyDown={(e) => {
              handleKeyDown(e.key, idx);
            }}
            type="text"
          />
        ))}
      </div>
      <div>
        <button onClick={handleClick}>Verify</button>
        <br />
      </div>
    </div>
  );
}

export default VerifyOtp;
