import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Master from "./pages/Master";
import Dashboard from "./pages/Dashboard/Dashboard";
import "./App.css";
import Notfound from "./Notfound";
import Test from "./Test/Test";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Signup from "./pages/Signup/Signup";

gsap.registerPlugin(ScrollTrigger);
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Master />}>
        <Route index element={<Dashboard />} />
        <Route path="signup" element={<Signup />} />
        <Route path="test" element={<Test />} />
        <Route path="*" element={<Notfound />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
