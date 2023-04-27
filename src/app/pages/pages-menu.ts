import { NbMenuItem } from "@nebular/theme";

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: "Dashboard",
    icon: { icon: "home-outline" },
    link: "/pages/dashboard",
    home: true,
  },
  {
    title: "Corporates",
    icon: { icon: "npm-outline", pack: "eva" },
    link: "/pages/corporates",
  },
  {
    title: "Vendors",
    icon: { icon: "briefcase-outline" },
    link: "/pages/vendors",
  },
  {
    title: "Orders",
    icon: { icon: "layers-outline" },
    link: "/pages/orders",
  },
  {
    title: "Place Order",
    icon: { icon: "layers-outline" },
    link: "/pages/place-order",
  },
  {
    title: "Invoices L1",
    icon: { icon: "layers-outline" },
    link: "/pages/invoices-l1/1",
  },
  {
    title: "Invoices L2",
    icon: { icon: "layers-outline" },
    link: "/pages/invoices-lx/1",
  },
  {
    title: "Reports ",
    icon: { icon: "file-text-outline", pack: "eva" },
    link: "/pages/reports",
  },
  {
    title: "Settings",
    icon: { icon: "settings-outline" },
    link: "/pages/settings",
  },
  {
    title: "Table",
    icon: { icon: "star-outline" },
    link: "/pages/smart-table",
  },
  {
    title: "Buttons",
    icon: { icon: "star-outline" },
    link: "/pages/buttons",
  },
  {
    title: "Icons",
    icon: { icon: "star-outline" },
    link: "/pages/icons",
  },
];
