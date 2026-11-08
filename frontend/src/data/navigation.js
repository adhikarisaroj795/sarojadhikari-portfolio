import { FolderKanban, House, Mail, User } from "lucide-react";

export const NAV_ITEMS = [
  { id: "home", label: "Home", icon: House },
  { id: "projects", label: "Projects", icon: FolderKanban },
  { id: "about", label: "About", icon: User },
  { id: "contact", label: "Contact", icon: Mail },
];

export const NAV_IDS = NAV_ITEMS.map((item) => item.id);
