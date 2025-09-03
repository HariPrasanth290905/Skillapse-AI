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
import Welcome from "./pages/Dashboard/Dash_Components/Welcome";
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Master />}>
        <Route index element={<Dashboard />} />
        <Route path="test" element={<Welcome />} />
        <Route path="*" element={<Notfound />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
