import { Home, Users, Book, Bookmark, UserCheck } from "lucide-react";
export const navigationLinks = [
  {
    href: "/library",
    label: "Library"
  },

  {
    img: "/icons/user.svg",
    selectedImg: "/icons/user-fill.svg",
    href: "/my-profile",
    label: "My Profile"
  }
];

export const adminSideBarLinks = [
  {
    icon: Home,
    route: "/admin",
    text: "Home"
  },
  {
    icon: Users,
    route: "/admin/users",
    text: "All Users"
  },
  {
    icon: Book,
    route: "/admin/books",
    text: "All Books"
  },
  {
    icon: Bookmark,
    route: "/admin/book-requests",
    text: "Borrow Requests"
  },
  {
    icon: UserCheck,
    route: "/admin/account-requests",
    text: "Account Requests"
  }
];

export const FIELD_NAMES = {
  fullName: "Full name",
  email: "Email",
  universityId: "University ID Number",
  password: "Password",
  universityCard: "Upload University ID Card"
};

export const FIELD_TYPES = {
  fullName: "text",
  email: "email",
  universityId: "number",
  password: "password"
};
