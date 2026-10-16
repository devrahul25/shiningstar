export const ENQUIRE_TO = "/foster-with-us#enquire";

export const MENU = [
  { label: "Home", to: "/" },
  {
    label: "About Us",
    to: "/about",
    children: [
      { label: "About Shining Stars", to: "/about" },
      { label: "Our Dedicated Team", to: "/team" },
    ],
  },
  {
    label: "Foster With Us",
    to: "/foster-with-us",
    children: [
      { label: "What is Fostering?", to: "/what-is-fostering" },
      { label: "What fostering involves", to: "/foster-with-us#what" },
      { label: "Who can foster", to: "/foster-with-us#who" },
      { label: "Types of fostering", to: "/foster-with-us#types" },
      { label: "Your fostering journey", to: "/foster-with-us#journey" },
      { label: "Training & support", to: "/foster-with-us#training" },
      { label: "Financial support", to: "/foster-with-us#financial" },
      { label: "FAQs", to: "/foster-with-us#faqs" },
      { label: "Transfer to us", to: "https://www.shiningstarsfostering.com/how-to-transfer-to-us/" },
    ],
  },
  { label: "Kids Zone", to: "/kids-zone" },
  {
    label: "News & Events",
    to: "/news",
    children: [
      { label: "All News & Articles", to: "/news" },
      { label: "Events & Mela", to: "/#events" },
    ],
  },
  { label: "Contact", to: "#contact" },
];