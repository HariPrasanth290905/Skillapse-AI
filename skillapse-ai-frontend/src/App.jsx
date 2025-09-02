import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Master from "./pages/Master";
import Dashboard from "./pages/Dashboard/Dashboard";
import "./App.css";
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Master />}>
        <Route index element={<Dashboard />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
