import React, { lazy, Suspense } from "react";
import AsynLoadingComponent from "@/components/asynLoadingComponent";
import RouteModule from "./routeModule";

/**
 *  运营端中间子页面路由
 */

const routes = [
  /**
   *  商城管理
   */
  {
    //商城设置
    path: "/setting/mall",
    exact: true,
    component: lazy(() => import("../pages/main/setting/mall/index.js"))
  },
  {
    //活动设置
    path: "/setting/activity",
    exact: true,
    component: lazy(() => import("../pages/main/setting/activity/index.js"))
  },
  {
    //轮播图新增，编辑
    path: "/mall/banner/edit",
    exact: true,
    component: lazy(() => import("../pages/main/setting/mall/banner/edit"))
  },

  /**
   *  商品管理
   */
  {
    //上架审核
    path: "/goods/shelf",
    exact: true,
    component: lazy(() => import("../pages/main/goods/shelf"))
  },
  {
    //上架审核详情
    path: "/goods/shelf/detail",
    exact: true,
    component: lazy(() => import("../pages/main/goods/shelfDetail"))
  },
  {
    //商品列表
    path: "/goods/list",
    exact: true,
    component: lazy(() => import("../pages/main/goods/list"))
  },
  {
    //商品列表详情
    path: "/goods/list/detail",
    exact: true,
    component: lazy(() => import("../pages/main/goods/listDetail"))
  },
  /**
   *  商家管理
   */

  {
    //商家列表
    path: "/saler/list",
    exact: true,
    component: lazy(() => import("../pages/main/saler/list"))
  },
  {
    //商家商品列表
    path: "/saler/goods/list",
    exact: true,
    component: lazy(() => import("../pages/main/saler/goodsList"))
  },
  {
    //商家详情
    path: "/saler/detail",
    exact: true,
    component: lazy(() => import("../pages/main/saler/detail"))
  },
  {
    //新增商家
    path: "/saler/add",
    exact: true,
    component: lazy(() => import("../pages/main/saler/add"))
  },

  /**
   *  用户管理
   */
  {
    //用户审核列表
    path: "/user/auditList",
    exact: true,
    component: lazy(() => import("../pages/main/user/userAuditList"))
  },
  {
    //用户审核详情
    path: "/user/detail/audit",
    exact: true,
    component: lazy(() => import("../pages/main/user/userAuditDetail"))
  },
  {
    //用户列表
    path: "/user/list",
    exact: true,
    component: lazy(() => import("../pages/main/user/list"))
  },
  {
    //用户详情
    path: "/user/detail",
    exact: true,
    component: lazy(() => import("../pages/main/user/userDetail"))
  },
  {
    //新增用户
    path: "/user/add",
    exact: true,
    component: lazy(() => import("../pages/main/user/addUser"))
  },
  {
    //签约商品
    path: "/user/signingGoods",
    exact: true,
    component: lazy(() => import("../pages/main/user/signingGoods"))
  },
  {
    //签约商品详情
    path: "/user/signingGoods/detail",
    exact: true,
    component: lazy(() => import("../pages/main/user/signingGoodsDetail"))
  },
  /**
   *  订单管理
   */
  {
    //订单列表
    path: "/order/list",
    exact: true,
    component: lazy(() => import("../pages/main/order/list"))
  },
  {
    //订单列表
    path: "/order/orderDetail",
    exact: true,
    component: lazy(() => import("../pages/main/order/orderDetail"))
  },
  /**
   *  优惠券
   */
  {
    //优惠券列表
    path: "/discount/list",
    exact: true,
    component: lazy(() => import("../pages/main/discount/list"))
  },
  {
    //用户的券
    path: "/discount/user/list",
    exact: true,
    component: lazy(() => import("../pages/main/discount/user"))
  },
  /**
   *  在线客服
   */
  {
    //咨询列表
    path: "/online/list",
    exact: true,
    component: lazy(() => import("../pages/main/online/list"))
  },
  /**
   *  财务管理
   */
  {
    //资金流水
    path: "/finance/list",
    exact: true,
    component: lazy(() => import("../pages/main/finance/list"))
  },
  {
    //提现管理
    path: "/finance/cash/list",
    exact: true,
    component: lazy(() => import("../pages/main/finance/cash"))
  },

  {
    path: "/",
    component: lazy(() => import("../pages/home"))
  }
];

class Router extends React.Component {
  render() {
    return (
      <Suspense fallback={<AsynLoadingComponent />}>
        <RouteModule routes={routes} />
      </Suspense>
    );
  }
}

export default Router;
