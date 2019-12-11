import { lazy } from "react";

const sideMenu = [
  {
    name: "首页",
    path: "/",
    icon: "icon-xiazai45",
    api: ""
  },
  {
    name: "用户管理",
    icon: "icon-yonghu1",
    key: "user",
    children: [
      {
        name: "普通用户列表",
        path: "/user/list"
      },
      {
        name: "普通商家列表",
        path: "/saler/list"
      },
      {
        name: "认证审核",
        path: "/user/auditList"
      },
      {
        name: "短信推送",
        path: "/sms"
      }
    ]
  },
  {
    name: "商城管理",
    icon: "icon-shangcheng1",
    key: "mall",
    children: [
      {
        name: "商城配置",
        path: "/setting/mall"
      },
      {
        name: "活动配置",
        path: "/setting/activity"
      }
    ]
  },
  {
    name: "商品管理",
    icon: "icon-shangpin",
    key: "goods",
    children: [
      {
        name: "商品列表",
        path: "/goods/list"
      },
      {
        name: "上架审核",
        path: "/goods/shelf"
      }
    ]
  },
  {
    name: "订单管理",
    icon: "icon-order_icon",
    key: "order",
    children: [
      {
        name: "订单列表",
        path: "/order/list"
      }
    ]
  },
  {
    name: "优惠券管理",
    icon: "icon-shangpin",
    key: "discount",
    children: [
      {
        name: "优惠券列表",
        path: "/discount/list"
      },
      {
        name: "用户的券",
        path: "/discount/user/list"
      }
    ]
  },
  {
    name: "在线客服",
    icon: "icon-shangpin",
    key: "online",
    children: [
      {
        name: "咨询列表",
        path: "/online/list"
      }
    ]
  },
  {
    name: "财务管理",
    icon: "icon-shangpin",
    key: "finance",
    children: [
      {
        name: "资金流水",
        path: "/finance/list"
      },
      {
        name: "提现管理",
        path: "/finance/cash/list"
      }
    ]
  }
];

export default sideMenu;
