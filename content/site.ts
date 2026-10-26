/**
 * All public copy lives here.
 * Replace names, dates, and sentences when the school sends final text.
 * Image files live in /public/images and can be swapped without changing layout.
 */

export const defaultSite = {
  name: "Welkin International School",
  description:
    "Welkin International School in Sever Thandipora, Lolab. Modern learning with Islamic values. Excel with Purpose.",
  ogImage: "/images/gathering.jpg",
  contact: {
    addressLines: ["Sever Thandipora", "Lolab"],
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
      "Welkin International School, Sever Thandipora, Lolab. Excel with Purpose.",
    eyebrow: "Sever Thandipora, Lolab",
    headline: ["Excel with", "purpose."],
    lede: "A school in Sever Thandipora, Lolab, joining modern learning with faith. Call 7006384265.",
    primaryCta: { href: "/admissions", label: "Admissions" },
    secondaryCta: { href: "/about", label: "Chairman" },
    heroImage: {
      src: "/images/gathering.jpg",
      alt: "Students and teachers of Welkin International School outdoors, with mountains behind them",
    },
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
        image: "/images/class-three.jpg",
        alt: "A primary class of Welkin International School against a blue classroom wall",
      },
      {
        href: "/academics",
        title: "Academics",
        body: "Qur'an with Tajweed, Arabic, and the modern sciences.",
        image: "/images/class-two.jpg",
        alt: "Students in blue and white uniform seated in class",
      },
      {
        href: "/campus",
        title: "Facilities",
        body: "Classrooms, the yard, and days the school spends outdoors.",
        image: "/images/campus-group.jpg",
        alt: "Younger students and teachers outside the school building",
      },
      {
        href: "/news",
        title: "News",
        body: "Photographs the school has shared from class and gatherings.",
        image: "/images/assembly.jpg",
        alt: "Students seated outdoors at a school gathering",
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
      body: "Call 7006384265. The form on the contact page checks your note on this site. It does not send mail yet.",
    },
  },
  about: {
    title: "About",
    description:
      "Chairman Iftekhar Ul Akbar on Welkin International School, Sever Thandipora, Lolab.",
    lede: "A message from the Chairman, Iftekhar Ul Akbar, for the families of Sever Thandipora, Lolab.",
    story: {
      title: "A word from the Chairman",
      paragraphs: [
        "It is with great pleasure and a profound sense of responsibility that I extend my warmest greetings to each of you. It fills my heart with gratitude to see a long-cherished dream taking shape: a school that blends modern education with Islamic values, nurturing minds and souls together.",
        "I studied in Srinagar, across several reputed institutions. Later, Allah blessed me with the chance to teach students from the primary level up to aspirants preparing for NEET, the Civil Services (IAS, IPS, IFS, and KAS), and JKSSB. Through those years, one reality continued to pain me: how few students from our own region, especially from North Lolab, were among them.",
        "At our school we want students who are academically proficient, morally grounded, and spiritually enriched. We want them able to contribute to society with compassion, integrity, and justice, and equipped for both this life and the Hereafter.",
        "Neighbouring districts have moved ahead in modern education and in Islamic learning. Inspired by that, we envision a school of holistic education: modern sciences, the Qur'an with Tajweed, the basic tenets of Islam, and a strong foundation in Arabic and other languages. Insha'Allah, that will shape scholars, professionals, and leaders who make this community proud.",
        "We believe that education is an Amanah, a sacred trust, and a responsibility we must fulfill with sincerity. The school should give not only information, but formation: intellect, character, and faith together. With parents, teachers, and well-wishers, every child should be able to discover their potential and grow with purpose.",
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
    lede: "Admission starts with a phone call. The office number is 7006384265, at Sever Thandipora, Lolab.",
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
    dates: [{ label: "Office", value: "7006384265" }],
  },
  campus: {
    title: "Facilities",
    description:
      "Classrooms, the yard, and outdoor gatherings at Welkin International School, Sever Thandipora, Lolab.",
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
        body: "Younger students gather outside the school building, with the hills of Lolab behind them.",
        image: "/images/campus-group.jpg",
        alt: "Younger students and teachers outside a school building in the hills",
      },
      {
        title: "Assembly",
        body: "Students sit together outdoors for a gathering, with families and teachers around them.",
        image: "/images/assembly.jpg",
        alt: "A large outdoor gathering of students and families",
      },
      {
        title: "Outings",
        body: "Boys in uniform on a green outing, and the whole school in a garden with the mountains behind.",
        image: "/images/boys-outing.jpg",
        alt: "Boys in blue uniform with a teacher in a park",
      },
    ],
    moreTitle: "Where the school is",
    more: [
      {
        title: "Address",
        body: "Welkin International School, Sever Thandipora, Lolab.",
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
      "Phone and address for Welkin International School, Sever Thandipora, Lolab.",
    lede: "The office is at Sever Thandipora, Lolab. Call 7006384265 on school days.",
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
    note: "Welkin International School, Sever Thandipora, Lolab. Excel with Purpose.",
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
