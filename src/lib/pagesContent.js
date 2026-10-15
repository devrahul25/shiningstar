// Page copy for About, Foster With Us and Kids Zone.
// Facts come from the existing Shining Stars website; gaps are marked "to be confirmed".
import {
  ShieldCheck, Home, Heart, Ear, LifeBuoy, Clock, UserCheck, GraduationCap, Sparkles, Brain, Users,
  Siren, Moon, Baby, CalendarRange, House, Gavel, UsersRound, Globe, BookOpen, Smile, Phone, Megaphone,
} from "lucide-react";

const IMG = "https://shiningstarsfostering.com/wp-content/uploads";
export const SITE = "https://www.shiningstarsfostering.com";

export const HERO_IMGS = {
  about: `${IMG}/2025/05/London-Marathon_caroline-1024x684.png`,
  foster: `${IMG}/2019/10/photo-1508205065970-cad01cebebb4-e1571942143484-1024x596.jpeg`,
  kids: `${IMG}/2019/10/field-1728099_960_720-1.jpg`,
};

export const ABOUT_STORY = [
  "We are determined to make a difference to the lives of children by bringing a fresh perspective to foster care provision.",
  "We place children at the heart of our organisation by placing them at the heart of a community which values them and supports their needs.",
  "Shining Stars was set up and is run by experienced social workers. Our strong, stable and caring family environment model places children with carers who truly have faith in children, and in their future.",
];

export const VALUES = [
  { icon: ShieldCheck, color: "blue", title: "Safety", body: "Every child deserves a safe, stable and nurturing home. Safeguarding guides everything we do." },
  { icon: Home, color: "green", title: "Belonging", body: "Carers, their families, children in care and our staff are one Shining Stars family." },
  { icon: Heart, color: "orange", title: "Respect", body: "We respect and celebrate diversity, and promote equal opportunities across the agency." },
  { icon: Ear, color: "purple", title: "Listening", body: "We listen to children, young people, foster carers and their own children, and act on what we hear." },
  { icon: LifeBuoy, color: "blue", title: "Support", body: "We stand beside our foster families from the first conversation and throughout their journey." },
];

export const SUPPORT = [
  { icon: Clock, color: "blue", title: "Support around the clock", body: "Support is available 24 hours a day, 7 days a week, 365 days a year." },
  { icon: UserCheck, color: "green", title: "Your own supervising social worker", body: "Every foster family has a named supervising social worker who visits regularly." },
  { icon: GraduationCap, color: "orange", title: "Ongoing training", body: "A regular training programme and an individual development plan for every carer, built on the Secure Base Model." },
  { icon: Brain, color: "purple", title: "Specialist practitioners", body: "Our team includes an educational consultant, a sensory needs and behavioural practitioner and a systemic therapist practitioner." },
  { icon: ShieldCheck, color: "blue", title: "Safeguarding team", body: "A dedicated safeguarding manager and safeguarding social workers help keep children safe." },
  { icon: Sparkles, color: "green", title: "Events and days out", body: "Family fun days, festive parties and days out bring our foster families together." },
];

export const FOSTER_INVOLVES = [
  { icon: Home, color: "blue", title: "A safe, caring home", body: "Offering a child or young person a stable and nurturing home, for as long as they need it." },
  { icon: Users, color: "green", title: "Working as a team", body: "Working closely with your supervising social worker, the child's social worker and other professionals." },
  { icon: GraduationCap, color: "orange", title: "Learning and growing", body: "Taking part in training so you can meet each child's needs with confidence." },
];

export const PLACEMENTS = [
  { icon: Siren, color: "orange", title: "Emergency", body: "Same-day placements, usually within 24 hours." },
  { icon: Moon, color: "purple", title: "Respite", body: "Short breaks that give families or other carers a rest, or additional support." },
  { icon: CalendarRange, color: "blue", title: "Short-term & bridging", body: "Care while a child or young person waits for a more permanent placement." },
  { icon: House, color: "green", title: "Long-term", body: "Where a child or young person is expected to stay until independence." },
  { icon: UserCheck, color: "blue", title: "Solo", body: "Care for children with complex needs who need a higher level of support and supervision." },
  { icon: Baby, color: "orange", title: "Parent & child", body: "Supporting a mother and/or father to develop their parenting skills with their child." },
  { icon: UsersRound, color: "green", title: "Siblings", body: "Keeping brothers and sisters together in the same foster home." },
  { icon: Gavel, color: "purple", title: "Remand", body: "Caring for young people remanded by the courts into public care." },
  { icon: Globe, color: "blue", title: "Unaccompanied asylum-seeking children", body: "Supporting children and young people whose residency status in the UK is yet to be decided." },
];

export const JOURNEY = [
  { title: "Initial conversation", body: "Call us for an informal, no-obligation chat about fostering and your circumstances." },
  { title: "Application", body: "If you would like to go ahead, we will help you complete your application." },
  { title: "Assessment", body: "A social worker gets to know you and your household and assesses your suitability." },
  { title: "Panel & approval", body: "Your assessment goes to the fostering panel, which makes a recommendation on approval." },
  { title: "Ongoing support", body: "Once approved, you receive training, supervision and round-the-clock support." },
];

export const TRAINING = [
  { icon: GraduationCap, color: "blue", title: "Training before approval", body: "Training to help you understand fostering before you are approved." },
  { icon: BookOpen, color: "green", title: "Ongoing programme", body: "A regular training programme with an individual development plan, based on the Secure Base Model.", href: `${SITE}/training/`, linkLabel: "See the training calendar" },
  { icon: Clock, color: "orange", title: "24/7 support", body: "Help is available every hour of every day from staff who know you and your family." },
];

export const FAQS = [
  { q: "Do I have to commit to anything when I call?", a: "No. The first call is an informal conversation. You can ask questions, learn about fostering and decide in your own time whether it is right for you." },
  { q: "Can I foster?", a: "Foster carers come from many different backgrounds, cultures and family situations. Whether fostering is right for you depends on your circumstances, which we will talk through with you individually." },
  { q: "What will you ask me?", a: "We will ask a little about you, your home and why you are interested in fostering, and we will answer your questions about what happens next." },
  { q: "How long does it take to become a foster carer?", a: "This varies from person to person. Our team can explain what to expect during your first conversation. (Typical timescale: content to be confirmed.)" },
  { q: "I already foster with another agency. Can I transfer?", a: "Yes, existing foster carers can transfer to Shining Stars. Call us to talk through the process, or read our guide to transferring." },
];

export const KIDS_LIVING = [
  { icon: Home, color: "blue", title: "A safe home", body: "Living somewhere safe, with adults who look after you and care about how you are feeling." },
  { icon: Smile, color: "green", title: "Being yourself", body: "Your culture, faith, interests and identity matter. You should be able to be you." },
  { icon: Heart, color: "orange", title: "People on your side", body: "Your foster carer and your social workers are there to help you be healthy, safe and happy." },
];

export const OUTCOMES = ["Be healthy", "Stay safe", "Enjoy and achieve", "Make a positive contribution", "Achieve economic well-being"];

export const TALK_TO = [
  { icon: Home, color: "blue", title: "Your foster carer", body: "The person you live with is usually the best first person to talk to about anything." },
  { icon: UserCheck, color: "green", title: "Your social worker", body: "Your own social worker from your local council is there to make sure your needs are met." },
  { icon: Users, color: "orange", title: "Shining Stars staff", body: "Our supervising social workers support your foster family and are happy to listen to you too." },
  { icon: Megaphone, color: "purple", title: "An independent advocate", body: "An advocate can help you say what you want. Coram Voice offers free advocacy for children in care.", href: "https://coramvoice.org.uk/", linkLabel: "Visit Coram Voice" },
  { icon: Phone, color: "blue", title: "Childline", body: "Free, private and available 24 hours a day on 0800 1111, or online.", href: "https://www.childline.org.uk/", linkLabel: "Visit Childline" },
];

export const RESOURCE_GROUPS = [
  { title: "Younger children", color: "orange", links: [
    { label: "Children's Guide to Foster Care", desc: "Our own guide explaining what foster care is.", href: `${IMG}/2025/08/Childrens-Guide-Shining-Stars-Fostering-Agency2025.pdf` },
    { label: "Childline: for under 12s", desc: "Games, activities and help with worries.", href: "https://www.childline.org.uk/kids/" },
  ]},
  { title: "Young people", color: "blue", links: [
    { label: "Childline", desc: "Advice, message boards and 1-2-1 counsellor chat.", href: "https://www.childline.org.uk/" },
    { label: "Coram Voice", desc: "Help to have your say and get your rights.", href: "https://coramvoice.org.uk/" },
    { label: "Become", desc: "The charity for children in care and young care leavers.", href: "https://becomecharity.org.uk/" },
  ]},
  { title: "Staying safe & your rights", color: "green", links: [
    { label: "CEOP Education", desc: "Staying safe online and reporting worries.", href: "https://www.ceopeducation.co.uk/" },
    { label: "Children's Commissioner: Help at Hand", desc: "Advice for children in care: 0800 528 0731.", href: "https://www.childrenscommissioner.gov.uk/help-at-hand/" },
    { label: "Shining Stars Children & Young People Zone", desc: "Our current page for children and young people.", href: `${SITE}/children-young-people-zone/` },
  ]},
];