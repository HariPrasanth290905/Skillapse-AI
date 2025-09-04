import {
  LayoutDashboard,
  Folder,
  BarChart3,
  User,
  Settings,
  Search,
  CloudLightning,
  Shield,
  TrendingUp,
} from "lucide-react";

// Menu items with icon components and color
const menuItems = [
  { text: "Dashboard", icon: LayoutDashboard, path: "/" },
  { text: "Projects", icon: Folder, path: "/projects" },
  { text: "Analytics", icon: BarChart3, path: "/analytics" },
  { text: "Profile", icon: User, path: "/profile" },
  { text: "Settings", icon: Settings, path: "/settings" },
];

// Card items with icon components and color
const cardItems = [
  {
    text: "Smart Matching",
    icon: Search,
    color: "#f6339a",
    content:
      "Advanced algorithms analyze skills, experience, and cultural fit for optimal matches.",
  },
  {
    text:'Real-time Processing',
    icon:CloudLightning,
    color:'#7DF9FF',
    content:'Instant candidate evaluation and job matching with live updates and notifications.'
  },
  {
    text:'Bias-Free Evaluation',
    icon:Shield,
    color:'#BF00FF',
    content:'Objective assesment framework elliminates unconscious bias in hiring decisions.'
  },
  {
    text:'Predictive analysis',
    icon:TrendingUp,
    color:'#f6339a',
    content:'Data-driven insights predict candidate success and long-term job satisfaction.'
  }
];

const coreDetails = [
  {
    text: 'Smart Skill Understanding',
    content: 'Our AI understands skills the way people describe them, not just keywords.'
  },
  {
    text: 'Intelligent Person Matching',
    content: 'Advanced AI models instantly connect the right people to the right you with high accuracy.'
  },
  {
    text: 'Context-Aware Recommendations',
    content: 'Finds matches with related skills and roles, opening more opportunities for candidates.'
  },
  {
    text: 'Seamless Automated Screening',
    content: 'Cuts down hours of manual work by ranking candidates based on the best fit for each role.'
  }
];


//--------------------------------------------

// Platform Impact – Skill Match AI

// 25,000+ Skill Matches Already Powered by AI

// 1,000+ Jobs & Projects Successfully Matched

// 4.9/5 Satisfaction Rating from Early Users

// 94% Matching Accuracy Delivering Faster, Smarter Hiring
export { menuItems, cardItems, coreDetails };
