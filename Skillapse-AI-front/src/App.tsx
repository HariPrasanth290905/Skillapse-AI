import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from "react-router-dom";
import Master from "./routes/Master";
import Dashboard from "./pages/Dashboard/Dashboard";
import Signin from "./pages/Signin/Signin";
import VerifyOtp from "./pages/Verify/VerifyOtp";
import Test from "./Test/Test";
import Notfound from "./Notfound";
import Profile from "./pages/Profile/Profile";
import ProtectedRoute from "./routes/ProtectedRoute";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import UserDetails from "./pages/Signup/Forms/UserDetails";
import PersonalDetails from "./pages/Signup/Forms/PersonalDetails";
import ContactDetails from "./pages/Signup/Forms/ContactDetails";
gsap.registerPlugin(ScrollTrigger, SplitText);
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Master />}>
        <Route index element={<Dashboard />} />
        <Route path="signin" element={<Signin />} />
        <Route path="verifyOtp" element={<VerifyOtp />} />
        <Route path="form/userdetails" element={<UserDetails />} />
        <Route path="form/personaldetails" element={<PersonalDetails />} />
        <Route path="form/contactdetails" element={<ContactDetails />} />
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