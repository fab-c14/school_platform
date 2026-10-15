/**
 * All public copy lives here.
 * Replace names, dates, and sentences when the school sends final text.
 * Image files live in /public/images and can be swapped without changing layout.
 */

export const defaultSite = {
  name: "Welkin International School",
  description:
    "Welkin International School in Sevar Thandipora, Lolab. The school motto is Excel with Purpose.",
  ogImage: "/images/og.jpg",
  contact: {
    addressLines: ["Sevar Thandipora", "Lolab"],
    phoneDisplay: "7006384265",
    phoneHref: "tel:+917006384265",
    email: "",
    hours: "Monday to Friday, 8:00 to 15:30",
  },
  nav: [
    { href: "/", label: "Home" },
    {
      href: "/about",
      label: "School",
      children: [
        { href: "/about", label: "About the school" },
        { href: "/about#leadership", label: "Leadership" },
      ],
    },
    { href: "/motto", label: "Motto" },
    {
      href: "/academics",
      label: "Academics",
      children: [
        { href: "/academics", label: "How we teach" },
        { href: "/academics#week", label: "The school week" },
      ],
    },
    {
      href: "/downloads",
      label: "Downloads",
      children: [{ href: "/downloads", label: "Notices and lists" }],
    },
    {
      href: "/admissions",
      label: "Admissions",
      children: [
        { href: "/admissions", label: "How to apply" },
        { href: "/register", label: "Online registration" },
      ],
    },
    {
      href: "/campus",
      label: "Facilities",
      children: [
        { href: "/campus", label: "Campus" },
        { href: "/campus#places", label: "Labs, library, and sport" },
      ],
    },
    { href: "/alumni", label: "Alumni" },
    { href: "/register", label: "Online Registration" },
    { href: "/careers", label: "Careers" },
    {
      href: "/gallery",
      label: "Gallery",
      children: [{ href: "/gallery", label: "Photographs" }],
    },
    {
      href: "/students",
      label: "Student Corner",
      children: [
        { href: "/news", label: "News" },
        { href: "/students", label: "Student life" },
      ],
    },
  ],
  contactLabel: "Contact Us",
  home: {
    title: "Welkin International School",
    description:
      "Welkin International School, Sevar Thandipora, Lolab. Excel with Purpose.",
    eyebrow: "Sevar Thandipora, Lolab",
    headline: ["Excel with", "purpose."],
    lede: "Welkin International School at Sevar Thandipora, Lolab. Call the office on 7006384265.",
    primaryCta: { href: "/admissions", label: "Admissions" },
    secondaryCta: { href: "/campus", label: "Facilities" },
    heroImage: {
      src: "/images/campus.jpg",
      alt: "Courtyard of a low brick school building with a shade tree",
    },
    intro: {
      title: "A school day with a clear shape.",
      body: "Mornings start in class, afternoons leave room for labs, sport, and clubs. Teachers stay with a group long enough to know how each student works. The lines below are placeholders until the school confirms its own facts.",
    },
    facts: [
      { value: "Early years–XII", label: "Classes on offer" },
      { value: "Day school", label: "Students go home each afternoon" },
      { value: "Four houses", label: "For sport, clubs, and assembly" },
    ],
    paths: [
      {
        href: "/admissions",
        title: "Admissions",
        body: "How to apply, and the dates we are using until the real calendar arrives.",
        image: "/images/classroom.jpg",
        alt: "Empty classroom with wooden desks and a large window",
      },
      {
        href: "/academics",
        title: "Academics",
        body: "Primary, middle, and secondary, and how a week of learning is described.",
        image: "/images/lab.jpg",
        alt: "School science laboratory with benches and glassware",
      },
      {
        href: "/campus",
        title: "Facilities",
        body: "Labs, library, sport, art, the bus route, and how the campus is kept safe.",
        image: "/images/library.jpg",
        alt: "School library with wooden shelves and a long reading table",
      },
      {
        href: "/news",
        title: "News",
        body: "A short list of sample stories. Real notices will replace these.",
        image: "/images/sports.jpg",
        alt: "Empty school sports ground in late daylight",
      },
    ],
    facilities: {
      title: "Rooms that get used every week.",
      body: "Science, books, sport, and art sit on the same campus, a short walk from class.",
      image: {
        src: "/images/art.jpg",
        alt: "Art room with easels, brushes, and a north-facing window",
      },
      items: ["Science labs", "Library", "Sports ground", "Art room"],
    },
    newsTitle: "Latest from the school",
    contactBand: {
      title: "Ask the school office.",
      body: "Call, write, or send a note. The form on the contact page only checks what you typed. It does not send mail yet.",
    },
  },
  about: {
    title: "About",
    description:
      "About Welkin International School in Sevar Thandipora, Lolab.",
    lede: "The school stands in Sevar Thandipora, Lolab. A fuller history can be added when the office sends it.",
    story: {
      title: "Built for a full school day, not a brochure.",
      paragraphs: [
        "The campus is a set of low buildings around a courtyard. Classrooms face the light. The library, labs, and art room are close enough that a double period does not disappear into a walk.",
        "Families are asked to treat this text as temporary. Names, years, and claims on this page are samples so the layout can be reviewed before the school’s own words are dropped in.",
      ],
      image: {
        src: "/images/campus.jpg",
        alt: "School courtyard with brick buildings and a shade tree",
      },
    },
    valuesTitle: "What the school asks of itself",
    values: [
      {
        title: "Know the student",
        body: "Classes stay small enough that a teacher can see who is stuck and who is ready to go further.",
      },
      {
        title: "Keep the week steady",
        body: "A published timetable, homework that fits the evening, and sport that is part of the day rather than an extra.",
      },
      {
        title: "Tell families plainly",
        body: "Reports, meetings, and notices in ordinary language, with dates a parent can put on a calendar.",
      },
    ],
    leadershipTitle: "Leadership",
    leadershipNote:
      "Names below are blanks. Replace them when the school confirms who should appear.",
    leaders: [
      { role: "Principal", name: "Name to be confirmed" },
      { role: "Head of academics", name: "Name to be confirmed" },
      { role: "Head of student life", name: "Name to be confirmed" },
    ],
  },
  academics: {
    title: "Academics",
    description:
      "Primary, middle, and secondary at Welkin International School.",
    lede: "Three stages, one campus. Subject lists here are samples and should be replaced with the school’s real scheme.",
    stages: [
      {
        index: "01",
        title: "Primary",
        body: "Reading, number, and a wide afternoon of art, movement, and stories. The aim is a child who can work quietly and ask a clear question.",
      },
      {
        index: "02",
        title: "Middle",
        body: "Subject teachers, a first laboratory course, and a library period that is actually on the timetable. Homework is set so it can be finished.",
      },
      {
        index: "03",
        title: "Secondary",
        body: "Board-facing classes with room for labs, sport, and a weekly tutorial. Subject choices on this page are placeholders until the school publishes its list.",
      },
    ],
    practiceTitle: "How a week is put together",
    practices: [
      {
        title: "Morning classes",
        body: "Language, mathematics, and the sciences take the first half of the day, when attention is highest.",
      },
      {
        title: "Afternoon studios",
        body: "Art, sport, and clubs sit after lunch so they are not squeezed into a leftover slot.",
      },
      {
        title: "A known adult",
        body: "Each class has a mentor who is the first call for families, separate from subject marks.",
      },
    ],
    image: {
      src: "/images/classroom.jpg",
      alt: "Sunlit classroom with rows of wooden desks",
    },
  },
  admissions: {
    title: "Admissions",
    description:
      "How to apply to Welkin International School. Confirm dates with the office on 7006384265.",
    lede: "The steps are real enough to read. The dates are samples and must be replaced before this page is published.",
    steps: [
      {
        title: "Write to the office",
        body: "Send the child’s name, the class you are asking for, and a phone number. Use the form on this page or call.",
      },
      {
        title: "Visit",
        body: "The school will offer a time to walk the campus and meet the class teacher or the principal.",
      },
      {
        title: "Submit papers",
        body: "Birth record, the last report card, and a photograph. The exact list will be confirmed with the real admissions note.",
      },
      {
        title: "A short interaction",
        body: "Younger children spend time in a classroom. Older students sit a short written paper in language and mathematics.",
      },
    ],
    datesTitle: "Sample dates",
    datesNote: "Replace this table before families rely on it.",
    dates: [
      { label: "Enquiries open", value: "1 November 2026" },
      { label: "Campus visits", value: "November and December 2026" },
      { label: "Interactions", value: "January 2027" },
      { label: "Offers", value: "February 2027" },
      { label: "Session begins", value: "April 2027" },
    ],
  },
  campus: {
    title: "Facilities",
    description:
      "Labs, library, sports ground, art room, transport, and safety at Welkin International School, Sevar Thandipora.",
    lede: "A compact campus: class, books, labs, and a field within one gate.",
    places: [
      {
        title: "Science labs",
        body: "Benches for middle and secondary science, with glassware stored where students can reach it under supervision.",
        image: "/images/lab.jpg",
        alt: "Laboratory benches with beakers and microscopes",
      },
      {
        title: "Library",
        body: "A quiet room with shelves and a long table. Reading period is on the timetable, not only at break.",
        image: "/images/library.jpg",
        alt: "Library shelves and a reading table",
      },
      {
        title: "Sports ground",
        body: "A field and a simple track used for houses, games, and the annual sports day.",
        image: "/images/sports.jpg",
        alt: "Green sports field and an empty stand",
      },
      {
        title: "Art room",
        body: "Easels, paper, and daylight. Work dries on the wall before it goes home.",
        image: "/images/art.jpg",
        alt: "Art room with easels beside a large window",
      },
    ],
    moreTitle: "Getting here, and staying safe",
    more: [
      {
        title: "Transport",
        body: "A bus route covers the neighbourhoods named in the school’s transport note. Stops and fees are not final in this draft.",
      },
      {
        title: "Safety",
        body: "A gate register, a known adult at pickup, and a visitor pass. The full safety note will replace this sentence.",
      },
    ],
  },
  news: {
    title: "News",
    description:
      "News from Welkin International School. Stories here are samples until the office sends real notices.",
    lede: "Three sample stories so the page has a shape. Delete them when the first real notice is ready.",
    items: [
      {
        date: "2026-09-12",
        title: "Sports day on the back field",
        body: "Houses ran the track in the afternoon. Results will be posted here once the school sends them. This paragraph is a sample.",
      },
      {
        date: "2026-08-20",
        title: "Library week",
        body: "Each class spent a period choosing a book to finish before the next assembly. Titles will be listed when the librarian confirms them.",
      },
      {
        date: "2026-07-04",
        title: "New families visited",
        body: "The office hosted a morning walk for families asking about the next session. Dates for the next visit are on the admissions page as samples.",
      },
    ],
  },
  contactPage: {
    title: "Contact",
    description:
      "Phone and address for Welkin International School, Sevar Thandipora, Lolab.",
    lede: "The office answers on school days during the hours below. Numbers and the address are placeholders.",
  },
  form: {
    title: "Write to the office",
    note: "This form checks your note on this page only. It does not email the school yet.",
    success:
      "The note looks complete. Nothing was sent. When the school connects a mailbox, this same form can deliver it.",
    fields: {
      parent: "Parent or guardian",
      student: "Student",
      email: "Email",
      phone: "Phone",
      message: "Note",
    },
    submit: "Check note",
  },
  footer: {
    note: "Welkin International School, Sevar Thandipora, Lolab. Excel with Purpose.",
  },
};

export type SiteContent = typeof defaultSite;
export type NewsItem = SiteContent["news"]["items"][number];

export function formatNewsDate(iso: string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  }).format(new Date(`${iso}T00:00:00+05:30`));
}
