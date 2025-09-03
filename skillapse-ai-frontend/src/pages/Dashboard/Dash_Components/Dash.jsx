import { 
  LayoutDashboard, 
  Folder, 
  BarChart3, 
  User, 
  Settings 
} from "lucide-react";

const menuItems = [
  { text: "Dashboard", icon: <LayoutDashboard color="white" />, path: "/" },
  { text: "Projects", icon: <Folder color="white" />, path: "/projects" },
  { text: "Analytics", icon: <BarChart3 color="white" />, path: "/analytics" },
  { text: "Profile", icon: <User color="white" />, path: "/profile" },
  { text: "Settings", icon: <Settings color="white" />, path: "/settings" },
];

export default menuItems;
