// component
import Iconify from "../../components/Iconify";

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: "dashboard",
    path: "/dashboard",
    icon: getIcon("eva:pie-chart-2-fill"),
  },
  {
    title: "Users",
    path: "/users",
    icon: getIcon("fa6-solid:users"),
  },
  {
    title: "Payment Methods",
    path: "/all-methods",
    icon: getIcon("material-symbols:payments"),
  },
  {
    title: "Deposits",
    icon: getIcon("hugeicons:reverse-withdrawal-01"),
    children: [
      {
        title: "Pending Deposit List",
        path: "/pending-list",
        icon: getIcon("mdi:receipt-text-pending"),
      },
      {
        title: "Approved Deposit List",
        path: "/approved-list",
        icon: getIcon("mdi:tick-circle"),
      },
      {
        title: "Rejected Deposit List",
        path: "/rejected-list",
        icon: getIcon("mdi:cross-circle"),
      },
    ],
  },
  {
    title: "Withdrawals",
    icon: getIcon("ph:hand-deposit-fill"),
    children: [
      {
        title: "Pending Withdraw List",
        path: "/pending",
        icon: getIcon("mdi:receipt-text-pending"),
      },
      {
        title: "Approved Withdraw List",
        path: "/approve",
        icon: getIcon("mdi:tick-circle"),
      },
      {
        title: "Rejected Withdraw List",
        path: "/reject",
        icon: getIcon("mdi:cross-circle"),
      },
    ],
  },
  {
    title: "Ranks",
    path: "/all-ranks",
    icon: getIcon("icon-park-outline:ranking"),
  },
  {
    title: "Levels Commission",
    path: "/commission-level",
    icon: getIcon("healthicons:low-income-level-outline-24px"),
  },
  {
    title: "Banners",
    path: "/banner-list",
    icon: getIcon("ph:flag-banner-fill"),
  },

  {
    title: "Promotions",
    path: "/promotion-listing",
    icon: getIcon("hugeicons:promotion"),
  },

  // example: collapsible sidebar routes
  // {
  //   title: "parent",
  //   path: "/parent",
  //   icon: getIcon("fe:users"),
  //   children: [
  //     {
  //       title: "child1",
  //       path: "/parent/child1",
  //       icon: getIcon("fe:users"),
  //     },
  //     {
  //       title: "child2",
  //       path: "/parent/child2",
  //       icon: getIcon("fe:users"),
  //     },
  //   ],
  // },
];

export const superAdminNavConfig = [
  {
    title: "dashboard",
    path: "/dashboard",
    icon: getIcon("eva:pie-chart-2-fill"),
  },
  {
    title: "Businesses",
    path: "/business-list",
    icon: getIcon("material-symbols:payments"),
  },
  {
    title: "Users",
    path: "/users",
    icon: getIcon("fa6-solid:users"),
  }
];

export default navConfig;
