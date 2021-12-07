import Home from "./pages/Home";
import Instructors from "./pages/Instructors";
import Major from "./pages/Major";
import Students from "./pages/Student";
const routes = [
  { path: "", element: <Home /> },
  { path: "/home", element: <Home /> },
  { path: "/majors", element: <Major /> },
  { path: "/instructors", element: <Instructors /> },
  { path: "/students", element: <Students /> },
];
export default routes;
