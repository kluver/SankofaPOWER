import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"), 
    // New line for the profile page
    route("profile", "routes/profile.tsx")
] satisfies RouteConfig;
