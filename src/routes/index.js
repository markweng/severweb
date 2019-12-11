import React, { lazy, Suspense } from "react";
import AsynLoadingComponent from "@/components/asynLoadingComponent";
import RouteModule from "./routeModule";

/**
 *  运营端页面 和 登录页面 大页面 路由
 */
const routes = [
  {
    path: "/login",
    exact: true,
    component: lazy(() => import("../pages/login"))
  },
  {
    path: "/",
    component: lazy(() => import("../pages/main"))
  }
];

class Router extends React.Component {
  render() {
    return (
      <Suspense fallback={<AsynLoadingComponent/>}>
        <RouteModule routes={routes} />
      </Suspense>
    );
  }
}

export default Router;
