import { createRoute } from "@tanstack/react-router"
import { rootRoute } from "./routeTree"
import DashboardPage from "../pages/DasboardPage"
import { checkAuth } from "../utils/helper"

export const dasboardRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/dashboard',
    component: DashboardPage,
    beforeLoad: checkAuth
})