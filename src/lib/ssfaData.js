// All content sourced from the existing Shining Stars Fostering website.
// Real staff, real testimonials, real news, real imagery — reused, not replaced.

const IMG = "https://shiningstarsfostering.com/wp-content/uploads";

export const LOGO = `${IMG}/2020/09/shining-stars-final-logo-320px.png`;
export const OFSTED_BADGE = `${IMG}/2026/02/Ofsted-Outstanding-shining-stars-fostering.webp`;
export const OFSTED_BANNER = `${IMG}/2026/02/ofsted2023-1024x439.webp`;
export const MISSION_IMG = `${IMG}/2026/02/our-mission-shining-stars-fostering-300x215-1.webp`;
export const VALUES_IMG = `${IMG}/2026/02/shining-stars-our-core-values.webp`;
export const CHILDREN_FUTURE_IMG = `${IMG}/2026/02/children-future-shining-stars-fostering-star-300x215-1.webp`;
export const LONDON_MAP = `${IMG}/2026/02/london-boroughs-around.webp`;
export const STAR_HEAD = `${IMG}/2020/02/STAR-HEAD-copy.png`;
export const OUTSTANDING_OFSTED_PNG = `${IMG}/2020/01/OutstandingOfsted-Shining-Stars-Fostering-Agency-Croydon.png`;

export const CONTACT = {
  phone: "020 8263 6260",
  mobile: "07905 209748",
  email: "info@shiningstarsfostering.com",
  phoneHref: "tel:+442082636260",
  mobileHref: "tel:+447905209748",
  address: "Sunley House, 4 Bedford Park, Croydon CR0 2AP",
  shortAddress: "Croydon, CR0 2AP",
  mapHref: "https://www.google.com/maps/search/?api=1&query=Sunley+House+4+Bedford+Park+Croydon+CR0+2AP",
  hours: "Monday – Friday, 8:00am – 6:00pm",
};

export const NAV_LINKS = [
  { label: "What is Fostering?", href: "https://www.shiningstarsfostering.com/what-is-fostering/" },
  { label: "Could You Foster?", href: "https://www.shiningstarsfostering.com/could-you-foster-children/" },
  { label: "Why Foster With Us", href: "#why" },
  { label: "Our Team", href: "#team" },
  { label: "News & Events", href: "#news" },
  { label: "Contact", href: "#contact" },
];

export const HERO_SLIDES = [
  {
    img: `${IMG}/2019/10/field-1728099_960_720-1.jpg`,
    headline: "Every child deserves to shine.",
    sub: "An independent fostering agency based in Croydon, rated Outstanding by Ofsted, supporting foster families across London and the surrounding counties.",
  },
  {
    img: `${IMG}/2019/10/photo-1508205065970-cad01cebebb4-e1571942143484-1024x596.jpeg`,
    headline: "Could you foster a child?",
    sub: "Join a family of dedicated carers, supported 24 hours a day, 7 days a week, 365 days a year.",
  },
  {
    img: `${IMG}/2025/05/London-Marathon_caroline-1024x684.png`,
    headline: "More than an agency. A family.",
    sub: "Generous allowances, ongoing training and a community that stands beside every carer and every child.",
  },
];

export const TICKER_ITEMS = [
  { label: "Recruiting Foster Carers in Medway, Kent", href: `${IMG}/2026/05/medwayrcrudat.jpeg` },
  { label: "Statement of Purpose 2025–26", href: `${IMG}/2026/05/SSFA-SOP-25-26.pdf` },
  { label: "Foster Care Fortnight ’26 — 11 to 24 May", href: "https://www.thefosteringnetwork.org.uk/get-involved/foster-care-fortnight" },
  { label: "Accredited with the Investors in People Award!", href: `${IMG}/2025/07/SSFA-IIP.pdf` },
  { label: "Black History Month ’25 — Standing Firm in Power and Pride", href: "https://shiningstarsfostering.com/the-black-history-month/" },
  { label: "Shining Stars Team take on Snowdon!", href: `${IMG}/2025/09/SSFA-Snowdon-Climb-2025C.pdf` },
  { label: "Rated Outstanding by Ofsted — read the 2023 report", href: `${IMG}/2023/09/Ofsted-Report-2023.pdf` },
  { label: "Safeguarding Newsletter — Volume VII", href: `${IMG}/2025/09/SSFA-News-Letter-Issue-7-2025-September.pdf` },
];

export const OFSTED_QUOTE =
  "“Exceptionally competent social workers run this outstanding fostering service in London and Croydon. Through leading by example, leaders and managers have created a culture of positive, respectful and supportive relationships. The agency champions the needs of asylum-seeking children and young people exceptionally well and aspects of this work are worthy of wider dissemination within the social care sector.”";

export const WHY_CHOOSE = [
  {
    icon: "Clock",
    color: "blue",
    title: "24/7 Support, 365 Days",
    body: "A high level of support every hour of every day — from local staff who genuinely know you, your family and the young people you look after.",
  },
  {
    icon: "GraduationCap",
    color: "green",
    title: "Ongoing Training",
    body: "A regular training programme with an individual development plan for every carer, built on the Secure Base Model.",
  },
  {
    icon: "HeartHandshake",
    color: "orange",
    title: "A True Family Feel",
    body: "Carers, their children, children in care and staff — all one family. You will be warmly welcomed, always.",
  },
  {
    icon: "PoundSterling",
    color: "purple",
    title: "Generous Allowances",
    body: "Fostering allowance starting from £450 a week for a mainstream child, significantly higher for children with additional needs.",
  },
  {
    icon: "Users",
    color: "blue",
    title: "Dedicated Social Worker",
    body: "Your own named Supervising Social Worker, with frequent visits — four or more when required — formal and informal.",
  },
  {
    icon: "Sparkles",
    color: "green",
    title: "Social Events & Fun Days",
    body: "Exciting days out, family fun days and festive parties throughout the year — because belonging matters.",
  },
];

export const TEAM = [
  { name: "Shabnam", title: "Director / Responsible Individual", img: `${IMG}/2018/03/IMG20191008WA0018.webp` },
  { name: "Yasir", title: "Director / Registered Manager", img: `${IMG}/2018/04/IMG_2710.webp` },
  { name: "Pete", title: "Fostering Service Manager", img: `${IMG}/2018/05/Pete-2.webp` },
  { name: "Alison", title: "Team Manager", img: `${IMG}/2018/08/alison.webp` },
  { name: "Saif", title: "Sr. Supervising Social Worker", img: `${IMG}/2018/10/PHOTO.webp` },
  { name: "Sabeen", title: "Educational Consultant", img: `${IMG}/2018/12/IMG_2778.webp` },
  { name: "Alia", title: "Supervising Social Worker", img: `${IMG}/2020/10/team_shining_stars.webp` },
  { name: "Tracey", title: "Sensory Needs & Behavioural Practitioner", img: `${IMG}/2020/10/tracey.webp` },
  { name: "Vicky", title: "Safeguarding Manager", img: `${IMG}/2020/12/vicky.webp` },
  { name: "Azizur", title: "Senior Placement Social Worker", img: `${IMG}/2021/04/PHOTO_2021.webp` },
  { name: "Caroline", title: "Operations Manager", img: `${IMG}/2022/11/Caroline.webp` },
  { name: "Amy", title: "Team Manager", img: `${IMG}/2022/11/amy.webp` },
  { name: "Munnaza", title: "Safeguarding Social Worker", img: `${IMG}/2022/11/Munnaza.webp` },
  { name: "Rachael Redican", title: "Safeguarding Social Worker", img: `${IMG}/2023/01/RachaelRedican.webp` },
  { name: "Collins Etebu", title: "Supervising Social Worker", img: `${IMG}/2023/01/CollinsEtebu1.webp` },
  { name: "Yasir Afzal", title: "IT & Admin Support", img: `${IMG}/2023/04/Yasir_Afzal2.webp` },
  { name: "Rukhshanda Jabeen", title: "Sr. Assessment & Recruitment Social Worker", img: `${IMG}/2023/04/Rakshanda2.webp` },
  { name: "Mary", title: "Supervising Social Worker", img: `${IMG}/2023/06/Maryobano.webp` },
  { name: "Mohammad Abuzar", title: "Supervising Social Worker", img: `${IMG}/2023/11/Abuzar.webp` },
  { name: "Aiman", title: "Supervising Social Worker", img: `${IMG}/2024/05/Aiman_Khalid.webp` },
  { name: "Mohammed Muneer", title: "Supervising Social Worker", img: `${IMG}/2024/10/Muneer.webp` },
  { name: "Agnes Birungi", title: "Supervising Social Worker", img: `${IMG}/2025/01/AgnesBirungi.webp` },
  { name: "Mensur Hamid", title: "Support Worker", img: `${IMG}/2025/05/MensurHamid.webp` },
  { name: "Nedal Zoya", title: "Supervising Social Worker", img: `${IMG}/2025/05/Nedal.webp` },
  { name: "Gwen Monfared", title: "Systemic Therapist Practitioner", img: `${IMG}/2025/09/Gwen.webp` },
  { name: "Aleeza Hasan", title: "Supervising Social Worker", img: `${IMG}/2025/09/Aleeza_3.webp` },
  { name: "Sue", title: "Supervising Social Worker", img: `${IMG}/2026/05/Sue-360x360.jpeg` },
];

export const TESTIMONIALS = [
  {
    name: "Abida & Khalid",
    img: `${IMG}/2019/10/abida-bushra-khalid-200x200.jpg`,
    quote:
      "We have been working at Shining Stars Fostering Agency since 2016. They are available 24/7 regardless of their busy schedule and always make sure that me, my family and the looked after children are well and happy.",
  },
  {
    name: "Atiya & Nadeem",
    img: `${IMG}/2019/10/fostercarer-atiya-hussain-200x200.jpg`,
    quote:
      "The support we receive is excellent from our agency, would definitely recommend Shining Star.",
  },
  {
    name: "Shiraz & Nosheen",
    img: `${IMG}/2019/10/Shiraz-n-Nosheen-200x200.jpg`,
    quote:
      "Our experiences with Shining Stars Fostering have all been positive, and all the staff are very helpful and encouraging. With the commitment of all professionals working together as a team, we are able to make positive changes to a young person's life.",
  },
  {
    name: "Matilda & Edmir",
    img: `${IMG}/2017/08/MatildaandEddie-photo-200x200.jpg`,
    quote:
      "We just want to thank you for all your help in making our fostering experience so enjoyable. We really appreciate your time answering all our questions. The Shining Stars team are all stars — I don't know how we would manage without their help.",
  },
  {
    name: "Yvonne K.",
    img: `${IMG}/2017/08/YvonneKing-200x200.jpg`,
    quote:
      "Thank you Shining Stars for recognising my work as a foster carer. I feel so appreciated and pleased that me and my daughter can give back when it matters. My only regret is that we didn't start earlier.",
  },
];

export const EVENTS = [
  {
    title: "Family Fun Mela",
    date: "Sat 27 July",
    time: "12:00pm – 4:00pm",
    venue: "The Warren, Croydon Road, Hayes, Bromley",
    town: "Bromley, BR2 7AL",
    color: "orange",
    href: "https://shiningstarsfostering.com/event/family-fun-mela/",
  },
  {
    title: "Foster Care Fortnight ’26",
    date: "Mon 11 – Sun 24 May",
    time: "National Campaign",
    venue: "The Fostering Network",
    town: "UK-wide",
    color: "blue",
    href: "https://www.thefosteringnetwork.org.uk/get-involved/foster-care-fortnight",
  },
  {
    title: "Snowdon Climb 2025",
    date: "Team Challenge",
    time: "Charity Climb",
    venue: "Mount Snowdon",
    town: "Wales",
    color: "green",
    href: `${IMG}/2025/09/SSFA-Snowdon-Climb-2025C.pdf`,
  },
];

export const NEWS = [
  {
    title: "Black History Month 2025 — “Standing Firm in Power and Pride”",
    excerpt: "This October, Shining Stars proudly celebrates Black History Month — recognising the achievements, culture and belonging of Black communities.",
    img: `${IMG}/2019/10/photo-1508205065970-cad01cebebb4-e1571942143484-1024x596.jpeg`,
    tag: "Awareness Days",
    href: "https://shiningstarsfostering.com/the-black-history-month/",
  },
  {
    title: "London Marathon — Caroline & Nik",
    excerpt: "Our Operations Manager Caroline and her husband Nik ran the London Marathon for UK Youth — showing endless commitment and tenacity.",
    img: `${IMG}/2025/05/London-Marathon_caroline-1024x684.png`,
    tag: "Foster Carer News",
    href: "https://shiningstarsfostering.com/london-marathon/",
  },
  {
    title: "BBC: Foster Carers Change Our Lives",
    excerpt: "In London nearly 10,000 children are in need of a foster care placement. Hear what is being done — and why foster carers matter.",
    img: `${IMG}/2024/05/b45efb40-1901-11ef-876b-c77a1c45f857.jpg1_.webp`,
    tag: "News & Updates",
    href: "https://shiningstarsfostering.com/foster-carers-change-our-lives/",
  },
  {
    title: "Training Calendar 2024–25 for Foster Carers",
    excerpt: "Training is an important part of your development as a foster carer — ongoing, before approval and throughout your journey.",
    img: LOGO,
    tag: "Blog",
    href: "https://shiningstarsfostering.com/training/",
  },
  {
    title: "Refugee Week — Celebrating Sanctuary",
    excerpt: "A UK-wide festival celebrating the contributions, creativity and resilience of refugees and people seeking sanctuary.",
    img: `${IMG}/2022/06/refugee-week-1024x290.jpg`,
    tag: "Awareness Days",
    href: "https://shiningstarsfostering.com/refugee-week-2022-is-a-uk-wide-festival-celebrating-refugees-and-people-seeking-sanctuary/",
  },
  {
    title: "Modern Slavery Is Closer Than You Think",
    excerpt: "Modern slavery is happening in the UK today. Learn how to spot the signs and help safeguard children and young people.",
    img: `${IMG}/2021/05/modern-slavery-shining-stars-fostering-1024x768.jpg`,
    tag: "Safeguarding",
    href: "https://shiningstarsfostering.com/modern-slavery-and-child-trafficking/",
  },
];

export const STATEMENTS = [
  "I am thinking to foster",
  "I am ready to foster and would like to start the application process.",
  "I have previous experience of fostering",
  "I am currently a foster carer but would like to transfer",
  "I have no experience of fostering but would like to foster",
];

export const HOW_FOUND = [
  "Google / Search Engine",
  "Friends or Relative",
  "Another Foster Carer",
  "Social Media (Facebook/Twitter)",
  "Other",
];