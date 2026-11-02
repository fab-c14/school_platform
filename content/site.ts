/**
 * All public copy lives here.
 * Replace names, dates, and sentences when the school sends final text.
 * Image files live in /public/images and can be swapped without changing layout.
 */

export const defaultSite = {
  name: "Welkin International School",
  description:
    "Welkin International School in Sevar Thandipora, Lolab. Modern learning with Islamic values. Excel with Purpose.",
  ogImage: "/images/gathering.jpg",
  contact: {
    addressLines: ["Sevar Thandipora", "Lolab"],
    phoneDisplay: "7006384265",
    phoneHref: "tel:+917006384265",
    phoneAltDisplay: "9906720949",
    phoneAltHref: "tel:+919906720949",
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
      href: "/admissions",
      label: "Admissions",
      children: [
        { href: "/apply", label: "Apply" },
        { href: "/admissions", label: "How to apply" },
      ],
    },
    { href: "/campus", label: "Facilities" },
    { href: "/gallery", label: "Gallery" },
    { href: "/contact", label: "Contact Us" },
  ],
  contactLabel: "Contact Us",
  home: {
    title: "Welkin International School",
    description:
      "Welkin International School, Sevar Thandipora, Lolab. Excel with Purpose.",
    eyebrow: "Sevar Thandipora, Lolab",
    headline: ["Excel with", "purpose."],
    lede: "A school in Sevar Thandipora, Lolab, joining modern learning with faith. Call 7006384265.",
    primaryCta: { href: "/apply", label: "Apply" },
    secondaryCta: { href: "/about", label: "About the school" },
    heroImage: {
      src: "/images/generated/hero-campus.jpg",
      alt: "A quiet school courtyard in the mountains of Lolab",
    },
    heroGallery: [
      {
        src: "/images/generated/classroom.jpg",
        alt: "A sunlit classroom with wooden desks and books",
      },
      {
        src: "/images/generated/books.jpg",
        alt: "Open books and a Qur'an on a wooden desk",
      },
    ],
    intro: {
      title: "Modern learning and Islamic values.",
      body: "The Chairman, Iftekhar Ul Akbar, describes the school as a trust: intellect, character, and faith taught together, for the children of North Lolab.",
    },
    facts: [
      { value: "North Lolab", label: "A school rooted in our own region" },
      { value: "Qur'an and science", label: "Tajweed, Arabic, and modern subjects" },
      { value: "7006384265", label: "Office phone" },
    ],
    paths: [
      {
        href: "/admissions",
        title: "Admissions",
        body: "Call the office and ask about a place for your child.",
        image: "/images/life/young-blue.jpg",
        alt: "Younger students in blue uniform outside Welkin International School",
      },
      {
        href: "/academics",
        title: "Academics",
        body: "Qur'an with Tajweed, Arabic, and the modern sciences.",
        image: "/images/life/khaki-class.jpg",
        alt: "Boys in khaki uniform with their teacher",
      },
      {
        href: "/campus",
        title: "Facilities",
        body: "Classrooms, the yard, and days the school spends outdoors.",
        image: "/images/life/blue-building.jpg",
        alt: "A class in blue and white outside the school building",
      },
      {
        href: "/news",
        title: "News",
        body: "Photographs the school has shared from class and gatherings.",
        image: "/images/life/girls-hills.jpg",
        alt: "Girls in maroon uniform with the hills behind them",
      },
    ],
    facilities: {
      title: "Classes, the yard, and gatherings.",
      body: "The photographs on this site are from the school itself: classrooms, the grounds, and days spent outside.",
      image: {
        src: "/images/girls-yard.jpg",
        alt: "Girls of Welkin International School lined up in the yard, with mountains behind them",
      },
      items: ["Classrooms", "The yard", "Assembly", "Outings"],
    },
    newsTitle: "Latest from the school",
    contactBand: {
      title: "Ask the school office.",
      body: "Call 7006384265 or 9906720949. The form on the contact page checks your note on this site. It does not send mail yet.",
    },
  },
  about: {
    title: "About",
    description:
      "Chairman Iftekhar Ul Akbar on Welkin International School, Sevar Thandipora, Lolab.",
    lede: "A message from the Chairman, Iftekhar Ul Akbar, for the families of Sevar Thandipora, Lolab.",
    story: {
      title: "A word from the Chairman",
      paragraphs: [
        "Assalamu Alaikum Warahmatullahi Wabarakatuh. It is with great pleasure and a profound sense of responsibility that I extend my warmest greetings to each of you. It fills my heart with gratitude to see a long-cherished dream taking shape: a school that blends modern education with Islamic values, nurturing minds and souls together.",
        "I studied in Srinagar, across several reputed institutions. Later, Allah blessed me with the chance to teach students from the primary level up to aspirants preparing for NEET, the Civil Services (IAS, IPS, IFS, and KAS), and JKSSB. Through those years, one reality continued to pain me: how few students from our own region, especially from North Lolab, were among them.",
        "It saddens me that our villages still lack the institutions and mentors our youth need. In recent years, more than 30,000 students have been recruited through JKSSB and JKPSC, yet only three or four candidates have qualified from North Lolab. That is not a lack of talent. It is a lack of nurturing, exposure, and early guidance.",
        "At our school we want students who are academically proficient, morally grounded, and spiritually enriched. We want them able to contribute to society with compassion, integrity, and justice, and equipped for both this life and the Hereafter.",
        "Neighbouring districts have moved ahead in modern education and in Islamic learning. Inspired by that, we envision a school of holistic education: modern sciences, the Qur'an with Tajweed, the basic tenets of Islam, and a strong foundation in Arabic and other languages. Insha'Allah, that will shape scholars, professionals, and leaders who make this community proud.",
        "We believe that education is an Amanah, a sacred trust, and a responsibility we must fulfill with sincerity. The school should give not only information, but formation: intellect, character, and faith together. With parents, teachers, and well-wishers, every child should be able to discover their potential and grow with purpose.",
        "Here, you matter, no matter where you have come from.",
        "May Allah (SWT) bless our efforts, guide our intentions, and help us build a learning experience worthy of our students. May He make this institution a beacon of knowledge, faith, and excellence for generations to come.",
      ],
      image: {
        src: "/images/chairman.jpg",
        alt: "Iftekhar Ul Akbar, Chairman of Welkin International School",
      },
    },
    valuesTitle: "What the school is for",
    values: [
      {
        title: "An Amanah",
        body: "Education is a sacred trust. The school treats it as a responsibility, carried with sincerity.",
      },
      {
        title: "Formation, not only information",
        body: "Intellect, character, and faith are taught together, so a child grows with purpose.",
      },
      {
        title: "For North Lolab",
        body: "Modern sciences sit beside the Qur'an with Tajweed, the tenets of Islam, and Arabic.",
      },
    ],
    leadershipTitle: "Chairman",
    leadershipNote: "Jazakumullahu Khairan.",
    leaders: [{ role: "Chairman, MSc, MPhil, Botany", name: "Iftekhar Ul Akbar" }],
  },
  academics: {
    title: "Academics",
    description:
      "Qur'an with Tajweed, Arabic, and modern sciences at Welkin International School.",
    lede: "The Chairman's aim is a holistic education: modern subjects beside the Qur'an, Islamic studies, and Arabic.",
    stages: [
      {
        index: "Faith",
        title: "Qur'an and Islamic studies",
        body: "Students learn the Qur'an with Tajweed and the basic tenets of Islam, as part of the school day rather than an extra.",
      },
      {
        index: "Languages",
        title: "Arabic and other languages",
        body: "Arabic is a foundation, taught with the other languages a student needs for further study.",
      },
      {
        index: "Sciences",
        title: "Modern subjects",
        body: "The school joins that religious learning with modern sciences, so students from North Lolab can go further in both.",
      },
    ],
    practiceTitle: "What the classrooms show",
    practices: [
      {
        title: "Classes together",
        body: "The photographs are of real classes: girls and boys in uniform, in rooms with a plain blue wall and a carpeted floor.",
      },
      {
        title: "Teachers present",
        body: "Teachers stand with the students in the yard, at assembly, and on outings. The office phone is 7006384265.",
      },
      {
        title: "A wider aim",
        body: "The Chairman has taught from primary classes through competitive examinations. The school's hope is that children from this region can reach that far.",
      },
    ],
    image: {
      src: "/images/class-one.jpg",
      alt: "Students of Welkin International School standing in a classroom",
    },
  },
  admissions: {
    title: "Admissions",
    description:
      "How to apply to Welkin International School. Confirm dates with the office on 7006384265.",
    lede: "Admission starts with a phone call. The office numbers are 7006384265 and 9906720949, at Sevar Thandipora, Lolab.",
    steps: [
      {
        title: "Call the office",
        body: "Give the child’s name, the class you are asking about, and a phone number. You can also use the form on this page.",
      },
      {
        title: "Visit",
        body: "Ask the office for a time to see the school and meet the people who teach.",
      },
      {
        title: "Bring papers",
        body: "The office will tell you which papers to bring. Do not rely on a list until they confirm it.",
      },
      {
        title: "Wait for the office",
        body: "The school will say what happens next. There is no published calendar on this page yet.",
      },
    ],
    datesTitle: "When to call",
    datesNote: "The office has not published a session calendar here. Call 7006384265 before you rely on a date.",
    dates: [
      { label: "Office", value: "7006384265" },
      { label: "Helpline", value: "9906720949" },
    ],
  },
  campus: {
    title: "Facilities",
    description:
      "Classrooms, the yard, and outdoor gatherings at Welkin International School, Sevar Thandipora, Lolab.",
    lede: "These are places the school has photographed: class, the building and yard, assembly, and a day outside.",
    places: [
      {
        title: "Classrooms",
        body: "Classes meet against a plain blue wall, on a carpeted floor. Girls and boys wear the school uniform.",
        image: "/images/class-two.jpg",
        alt: "A class of girls and boys in uniform inside a blue-walled room",
      },
      {
        title: "The yard",
        body: "Students gather in the yard, with the hills of Lolab behind them.",
        image: "/images/life/maroon-yard.jpg",
        alt: "A class of girls in maroon uniform in the school yard",
      },
      {
        title: "Assembly",
        body: "Students and teachers stand together in the school yard.",
        image: "/images/life/blue-line.jpg",
        alt: "Students and teachers lined up in the school yard",
      },
      {
        title: "Outings",
        body: "Boys in uniform in the garden, and the whole school outdoors with the mountains behind.",
        image: "/images/life/boys-garden.jpg",
        alt: "Boys in blue uniform in a garden",
      },
    ],
    moreTitle: "Where the school is",
    more: [
      {
        title: "Address",
        body: "Welkin International School, Sevar Thandipora, Lolab.",
      },
      {
        title: "Office",
        body: "Call 7006384265. The school has not sent a transport or fees note for this page.",
      },
    ],
  },
  news: {
    title: "News",
    description: "Photographs and notices from Welkin International School.",
    lede: "The school has shared photographs of classes and gatherings. Written notices will be added when the office sends them.",
    items: [
      {
        date: "2026-10-16",
        title: "Classes photographed",
        body: "The school sent photographs of classes taken on 16 October 2026. They are on the gallery page.",
      },
      {
        date: "2026-08-27",
        title: "A day in the garden",
        body: "Students and teachers gathered outdoors on 27 August 2026, with the mountains behind them.",
      },
    ],
  },
  contactPage: {
    title: "Contact",
    description:
      "Phone and address for Welkin International School, Sevar Thandipora, Lolab.",
    lede: "The office is at Sevar Thandipora, Lolab. Call 7006384265 or 9906720949 on school days.",
  },
  apply: {
    title: "Join the Welkin family.",
    note: "Admissions are open. Fill in the form below and the office will call you to talk through the next step.",
    success:
      "The office has the application. Keep 7006384265 saved and call if you need to add anything.",
    fields: {
      parent: "Parent or guardian",
      student: "Student",
      className: "Class",
      email: "Email",
      phone: "Phone",
      message: "Anything the office should know",
    },
    submit: "Submit application",
  },
  form: {
    title: "Write to the office",
    note: "The office keeps this note. Email is not sent yet.",
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
