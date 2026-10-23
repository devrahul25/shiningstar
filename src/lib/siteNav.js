export const ENQUIRE_TO = "/foster-with-us#enquire";

export const MENU = [
  { label: "Home", to: "/" },
  {
    label: "About Us",
    to: "/about",
    children: [
      { label: "About Shining Stars", to: "/about" },
      { label: "Meet the SSFA Team", to: "/team" },
      { label: "Equality & Diversity", to: "/equality-diversity-shining-stars-fostering/" },
      { label: "Independent Fostering Agency (IFA)", to: "/services/independent-fostering-agency/" },
      { label: "Local Authorities & Statement of Purpose", to: "/local-authorities-shining-stars-fostering/" },
      { label: "Foster Carer Testimonials", to: "/testimonials-all-foster-carer/" },
    ],
  },
  {
    label: "Foster With Us",
    to: "/foster-with-us",
    columns: [
      {
        title: "Guides & Overview",
        items: [
          { label: "What is Fostering?", to: "/what-is-fostering-2/" },
          { label: "Why Foster With Us?", to: "/why-foster-with-us/" },
          { label: "Could You Foster?", to: "/could-you-foster-children/" },
          { label: "Types of Placement", to: "/types-of-placement-shiningstars/" },
          { label: "Why Do People Foster?", to: "/why-do-people-foster/" },
          { label: "Fostering Care Fortnight", to: "/fostering-care-fortnight/" },
        ],
      },
      {
        title: "Allowances & Application",
        items: [
          { label: "Fostering Allowances & Pay", to: "/fostering-allowance-shiningstars/" },
          { label: "How to Transfer to Us", to: "/how-to-transfer-to-us/" },
          { label: "Apply to Become a Foster Carer", to: "/how-to-become-foster-carer/" },
          { label: "Myths About Fostering", to: "/myths-fostering-shining-stars/" },
          { label: "Frequently Asked Questions (FAQ)", to: "/frequently-asked-questions-faq/" },
          { label: "Work From Home", to: "/work-from-home/" },
        ],
      },
    ],
  },
  {
    label: "Kids Zone",
    to: "/kids-zone",
    children: [
      { label: "Children & Young People Zone", to: "/children-young-people-zone/" },
      { label: "Children & Young People Guides", to: "/children-young-people-guides/" },
      { label: "Birth Children Guides", to: "/kids-zone/birth-children-guides-to-foster-care/" },
      { label: "UASC Guides to Foster Care", to: "/uasc-guides-to-foster-care/" },
      { label: "SSFA Comfort Box", to: "/shining-stars-fostering-comfort-box/" },
      { label: "SSFA Step Up Pack", to: "/shining-stars-fostering-step-up-pack/" },
      { label: "Our Safeguarding Toolkit", to: "/safeguarding-toolkit/" },
      { label: "Fun Zone", to: "/fun-zone/" },
      { label: "Important Contacts", to: "/important-contacts/" },
      { label: "Children's Days Out", to: "/fostering-days-out/" },
      { label: "Educational Support", to: "/fostering-educational-support-fostering-agency-croydon/" },
    ],
  },
  {
    label: "News & More",
    to: "/news",
    children: [
      { label: "All News & Articles", to: "/news" },
      { label: "Events & Calendar", to: "/events" },
      { label: "Refer A Friend", to: "/refer-a-friend-shining-stars/" },
      { label: "Vacancy: Social Worker", to: "/vacancies-ssw/" },
      { label: "Vacancy: Business Development", to: "/vacancies-businessdm/" },
      { label: "Complaints Procedure", to: "/complaints-shining-stars/" },
      { label: "Privacy Policy", to: "/privacy-policy-shining-stars-fostering/" },
      { label: "Our Site Cookies", to: "/our-site-cookies/" },
    ],
  },
  { label: "Contact", to: "/contact-us/" },
];