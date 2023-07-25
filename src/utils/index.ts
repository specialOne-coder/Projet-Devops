import { linkedin, medium } from "../assets/index";

export const navLinks = [
  {
    id: "/",
    title: "Home",
  },
  {
    id: "/about",
    title: "About",
  }
];

export const connectedNavLinks = [
  {
    id: "/",
    title: "Home",
  },
  {
    id: "/about",
    title: "About",
  },
  {
    id: "/other",
    title: "Other Page",
  }
];

export const shortAddress = (addresses: string[]) => {
  for (let index in addresses) {
    if (addresses[index]) {
      return (
        addresses[index].slice(0, 6) + "..." + addresses[index].slice(-6)
      );
    }
  }
};


export const socialMedia = [
  {
    id: "social-media-1",
    icon: medium,
    link: "",
  },
  {
    id: "social-media-4",
    icon: linkedin,
    link: "",
  },
];

