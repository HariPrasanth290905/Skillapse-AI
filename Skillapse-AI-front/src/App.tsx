import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from "react-router-dom";
import Master from "./routes/Master";
import Dashboard from "./pages/Dashboard/Dashboard";
import Signin from "./pages/Signin/Signin";
import VerifyOtp from "./pages/Verify/VerifyOtp";
import Test from "./Test/Test";
import Notfound from "./Notfound";
import Signup from "./pages/Signup/Signup";
import Profile from "./pages/Profile/Profile";
import ProtectedRoute from "./routes/ProtectedRoute";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
gsap.registerPlugin(ScrollTrigger,SplitText);
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Master />}>
        <Route index element={<Dashboard />} />
        <Route path="signup" element={<Signup />} />
        <Route path="signin" element={<Signin />} />
        <Route path="verifyOtp" element={<VerifyOtp />} />
        <Route element={<ProtectedRoute />}>
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="test" element={<Test />} />

        <Route path="*" element={<Notfound />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;