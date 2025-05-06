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
    title: "users",
    path: "/users",
    icon: getIcon("fe:users"),
  },

  {
    title: "Banner List",
    path: "/banner-list",
    icon: getIcon("fe:users"),
  },
  {
    title: "Ranks",
    path: "/all-ranks",
    icon: getIcon("fe:users"),
  },
  {
    title: "Promotions",
    path: "/promotion-listing",
    icon: getIcon("fe:users"),
  },
  {
    title: "Methods",
    path: "/all-methods",
    icon: getIcon("fe:users"),
  },
  {
    title: "Levels Commission",
    path: "/commission-level",
    icon: getIcon("fe:users"),
  },
  {
    title: "Deposit",
    icon: getIcon("fe:users"),
    children: [
      {
        title: "Pending Deposit List",
        path: "/pending-list",
        icon: getIcon("fe:users"),
      },
      {
        title: "Approved Deposit List",
        path: "/approved-list",
        icon: getIcon("fe:users"),
      },
      {
        title: "Rejected Deposit List",
        path: "/rejected-list",
        icon: getIcon("fe:users"),
      },
    ],
  },
  {
    title: "Withdraw List",
    icon: getIcon("fe:users"),
    children: [
      {
        title: "Pending Withdraw List",
        path: "/pending",
        icon: getIcon("fe:users"),
      },
      {
        title: "Approved Withdraw List",
        path: "/approve",
        icon: getIcon("fe:users"),
      },
      {
        title: "Rejected Withdraw List",
        path: "/reject",
        icon: getIcon("fe:users"),
      },
    ],
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

export default navConfig;
