import addGandaki from "../assets/projects/addgandaki.webp";
import bankLoan from "../assets/projects/bank-loan.webp";
import digiMad from "../assets/projects/digimad.webp";
import dvExcellus from "../assets/projects/dvexcellus.webp";
import euroAsia from "../assets/projects/euroasia.webp";
import khetiCrm from "../assets/projects/kheti-crm.webp";
import khetiWebsite from "../assets/projects/kheti-website.webp";
import kisanCare from "../assets/projects/kisancare.webp";
import nepaliCalendar from "../assets/projects/nepali-calendar.webp";
import messaging from "../assets/projects/messaging.webp";

export const FEATURED = [
  {
    id: "kheti-crm",
    title: "Kheti CRM Dashboard",
    kind: "Sole developer",
    summary:
      "Operations dashboard for an agri-fintech platform: farmer KYC, loan orders, branch analytics, field-visit tracking and real-time staff chat.",
    tech: ["React", "Node.js", "MongoDB", "Socket.IO", "AG Grid"],
    image: khetiCrm,
    url: null,
  },
  {
    id: "bank-loan",
    title: "Bank Loan-Processing Dashboard",
    kind: "Sole developer",
    summary:
      "Bank-side system for verifying and approving farmer loans through maker → checker → finalizer workflows, deployed on the bank’s own servers.",
    tech: ["React", "Express", "MongoDB", "Docker", "Nginx"],
    image: bankLoan,
    url: null,
  },
  {
    id: "messaging",
    title: "Real-time Messaging",
    kind: "Sole developer · part of Kheti CRM",
    summary:
      "Staff chat with group conversations, attachments that expire 15 minutes after viewing and push notifications, plus a Rocket.Chat integration that lets 10,000+ farmers message the CRM team.",
    tech: ["Socket.IO", "Rocket.Chat", "Firebase (FCM)", "Node.js", "MongoDB"],
    image: messaging,
    imagePosition: "right top",
    url: null,
  },
  {
    id: "addgandaki",
    title: "AddGandaki",
    kind: "Frontend developer",
    summary:
      "Government agriculture platform for Gandaki Province with dashboards for farmers, vendors and staff, live market prices and budget reporting.",
    tech: ["React", "REST APIs"],
    image: addGandaki,
    url: null,
  },
];

export const MORE_WORK = [
  {
    id: "kheti-website",
    title: "Kheti",
    summary: "Public website for the Kheti agri-fintech platform.",
    image: khetiWebsite,
    url: "https://kheti.farm",
  },
  {
    id: "nepali-calendar",
    title: "nepali-calendar-react",
    summary: "Open-source Bikram Sambat calendar component, published on npm.",
    image: nepaliCalendar,
    url: "https://www.npmjs.com/package/@adhikarisaroj795/nepali-calendar-react",
  },
  {
    id: "kisancare",
    title: "KisanCare",
    summary:
      "Agriculture services website with video hero and product catalogue.",
    image: kisanCare,
    url: "https://kisancare.com.np",
  },
  {
    id: "euroasia",
    title: "Euro Asia Employment Service",
    summary: "Recruitment agency website with job listings and an admin panel.",
    image: euroAsia,
    url: "https://euroasiaemploymentservice.com.np",
  },
  {
    id: "dvexcellus",
    title: "Dv Excellus",
    summary: "Company website for an agri-food technology firm.",
    image: dvExcellus,
    url: "https://dvexcellus.com.np",
  },
  {
    id: "digimad",
    title: "DigiMad",
    summary: "Website for a social-impact technology organisation.",
    image: digiMad,
    url: "https://digimad.org",
  },
];
