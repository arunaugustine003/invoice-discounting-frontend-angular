import { NbMenuItem } from "@nebular/theme";

let corporateID = sessionStorage.getItem("corporateID");
console.log(corporateID);
export const CORPORATE_MENU_ITEMS: NbMenuItem[] = [
  {
    title: "Dashboard",
    icon: { icon: "home-outline" },
    link: "/pages/dashboard",
    home: true,
  },
  {
    title: "Vendors",
    icon: { icon: "settings-outline" },
    link: "/pages/place-order/"+ corporateID,
  },
  {
    title: "Users",
    icon: { icon: "settings-outline" },
    link: "/pages/corporate-users/"+ corporateID,
  },
  {
    title: "Settings",
    icon: { icon: "settings-outline" },
    link: "/pages/settings",
  },
];
