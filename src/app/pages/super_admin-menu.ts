import { NbMenuItem } from "@nebular/theme";

export const SUPER_ADMIN_MENU_ITEMS: NbMenuItem[] = [
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
