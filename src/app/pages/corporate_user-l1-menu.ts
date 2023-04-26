import { NbMenuItem } from "@nebular/theme";

export const CORPORATE_USER_L1_MENU_ITEMS: NbMenuItem[] = [
  {
    title: "Dashboard",
    icon: { icon: "home-outline" },
    link: "/pages/dashboard",
    home: true,
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
    title: "Reports ",
    icon: { icon: "file-text-outline", pack: "eva" },
    link: "/pages/reports",
  },
  {
    title: "Settings",
    icon: { icon: "settings-outline" },
    link: "/pages/settings",
  },
];
