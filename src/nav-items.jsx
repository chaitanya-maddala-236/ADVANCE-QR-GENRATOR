
import { HomeIcon, Zap } from "lucide-react";
import Index from "./pages/Index.jsx";
import Landing from "./pages/Landing.jsx";

/**
 * Central place for defining the navigation items. Used for navigation components and routing.
 */
export const navItems = [
  {
    title: "Home",
    to: "/",
    icon: <HomeIcon className="h-4 w-4" />,
    page: <Landing />,
  },
  {
    title: "Generator",
    to: "/generator",
    icon: <Zap className="h-4 w-4" />,
    page: <Index />,
  },
];
