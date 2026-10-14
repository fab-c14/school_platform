"use client";

import { useState } from "react";
import type { SiteContent } from "@/content/site";
import { ImageField, TextField } from "@/components/admin/fields";

const sections = ["School", "Home", "About", "Academics", "Admissions", "Campus", "News", "Office"] as const;
type Section = (typeof sections)[number];

export function Editor({ initial }: { initial: SiteContent }) {
  const [draft, setDraft] = useState(initial);
  const [section, setSection] = useState<Section>("School");
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);

  function patch(next: Partial<SiteContent>) {
    setDraft((current) => ({ ...current, ...next }));
  }

  async function save() {
    setBusy(true);
    setStatus("");
    const response = await fetch("/api/admin/site", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(draft),
    });
    const body = (await response.json()) as SiteContent & { error?: string };
    setBusy(false);
    if (!response.ok) {
      setStatus(body.error || "Save failed.");
      return;
    }
    setDraft(body);
    setStatus("Saved. Refresh the public page to see it.");
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[12rem_1fr]">
      <nav className="flex gap-2 overflow-x-auto lg:flex-col" aria-label="Editor sections">
        {sections.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setSection(item)}
            className={`px-3 py-2 text-left text-sm ${section === item ? "bg-ink text-paper" : "text-muted"}`}
          >
            {item}
          </button>
        ))}
      </nav>
      <div className="grid gap-6">
        {section === "School" ? <SchoolForm draft={draft} patch={patch} /> : null}
        {section === "Home" ? <HomeForm draft={draft} patch={patch} /> : null}
        {section === "About" ? <AboutForm draft={draft} patch={patch} /> : null}
        {section === "Academics" ? <AcademicsForm draft={draft} patch={patch} /> : null}
        {section === "Admissions" ? <AdmissionsForm draft={draft} patch={patch} /> : null}
        {section === "Campus" ? <CampusForm draft={draft} patch={patch} /> : null}
        {section === "News" ? <NewsForm draft={draft} patch={patch} /> : null}
        {section === "Office" ? <OfficeForm draft={draft} patch={patch} /> : null}
        <div className="flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={save}
            disabled={busy}
            className="bg-accent px-5 py-3 text-sm text-white active:scale-[0.98] disabled:opacity-60"
          >
            {busy ? "Saving…" : "Save changes"}
          </button>
          {status ? <p className="text-sm text-muted">{status}</p> : null}
        </div>
      </div>
    </div>
  );
}

function SchoolForm({ draft, patch }: { draft: SiteContent; patch: (next: Partial<SiteContent>) => void }) {
  return (
    <div className="grid gap-4">
      <TextField label="School name" value={draft.name} onChange={(name) => patch({ name })} />
      <TextField label="Short description" value={draft.description} onChange={(description) => patch({ description })} rows={3} />
      <TextField label="Footer note" value={draft.footer.note} onChange={(note) => patch({ footer: { note } })} rows={3} />
      {draft.nav.map((item, index) => (
        <TextField
          key={item.href}
          label={`Menu label for ${item.href}`}
          value={item.label}
          onChange={(label) => {
            const nav = draft.nav.map((row, rowIndex) => (rowIndex === index ? { ...row, label } : row));
            patch({ nav });
          }}
        />
      ))}
      <TextField label="Contact button" value={draft.contactLabel} onChange={(contactLabel) => patch({ contactLabel })} />
      <ImageField
        label="Link preview image"
        src={draft.ogImage}
        alt={draft.name}
        onChange={(next) => patch({ ogImage: next.src })}
      />
    </div>
  );
}

function HomeForm({ draft, patch }: { draft: SiteContent; patch: (next: Partial<SiteContent>) => void }) {
  const home = draft.home;
  function setHome(next: Partial<SiteContent["home"]>) {
    patch({ home: { ...home, ...next } });
  }
  return (
    <div className="grid gap-4">
      <TextField label="Page title" value={home.title} onChange={(title) => setHome({ title })} />
      <TextField label="Page description" value={home.description} onChange={(description) => setHome({ description })} rows={3} />
      <TextField label="Small line above the headline" value={home.eyebrow} onChange={(eyebrow) => setHome({ eyebrow })} />
      <TextField label="Headline, first line" value={home.headline[0]} onChange={(line) => setHome({ headline: [line, home.headline[1]] })} />
      <TextField label="Headline, second line" value={home.headline[1]} onChange={(line) => setHome({ headline: [home.headline[0], line] })} />
      <TextField label="Intro under the headline" value={home.lede} onChange={(lede) => setHome({ lede })} rows={3} />
      <ImageField label="Hero photo" src={home.heroImage.src} alt={home.heroImage.alt} onChange={(heroImage) => setHome({ heroImage })} />
      <TextField label="Intro title" value={home.intro.title} onChange={(title) => setHome({ intro: { ...home.intro, title } })} />
      <TextField label="Intro text" value={home.intro.body} onChange={(body) => setHome({ intro: { ...home.intro, body } })} rows={4} />
      {home.facts.map((fact, index) => (
        <div key={index} className="grid gap-3 border border-line p-3">
          <TextField
            label="Fact"
            value={fact.value}
            onChange={(value) => {
              const facts = home.facts.map((row, rowIndex) => (rowIndex === index ? { ...row, value } : row));
              setHome({ facts });
            }}
          />
          <TextField
            label="Fact label"
            value={fact.label}
            onChange={(label) => {
              const facts = home.facts.map((row, rowIndex) => (rowIndex === index ? { ...row, label } : row));
              setHome({ facts });
            }}
          />
        </div>
      ))}
      {home.paths.map((item, index) => (
        <div key={item.href} className="grid gap-3 border border-line p-3">
          <TextField
            label={`${item.href} title`}
            value={item.title}
            onChange={(title) => {
              const paths = home.paths.map((row, rowIndex) => (rowIndex === index ? { ...row, title } : row));
              setHome({ paths });
            }}
          />
          <TextField
            label="Text"
            value={item.body}
            onChange={(body) => {
              const paths = home.paths.map((row, rowIndex) => (rowIndex === index ? { ...row, body } : row));
              setHome({ paths });
            }}
            rows={3}
          />
          <ImageField
            label="Photo"
            src={item.image}
            alt={item.alt}
            onChange={(next) => {
              const paths = home.paths.map((row, rowIndex) =>
                rowIndex === index ? { ...row, image: next.src, alt: next.alt } : row,
              );
              setHome({ paths });
            }}
          />
        </div>
      ))}
      <TextField label="Facilities title" value={home.facilities.title} onChange={(title) => setHome({ facilities: { ...home.facilities, title } })} />
      <TextField label="Facilities text" value={home.facilities.body} onChange={(body) => setHome({ facilities: { ...home.facilities, body } })} rows={3} />
      <ImageField
        label="Facilities photo"
        src={home.facilities.image.src}
        alt={home.facilities.image.alt}
        onChange={(image) => setHome({ facilities: { ...home.facilities, image } })}
      />
      <TextField label="News strip title" value={home.newsTitle} onChange={(newsTitle) => setHome({ newsTitle })} />
      <TextField label="Closing title" value={home.contactBand.title} onChange={(title) => setHome({ contactBand: { ...home.contactBand, title } })} />
      <TextField label="Closing text" value={home.contactBand.body} onChange={(body) => setHome({ contactBand: { ...home.contactBand, body } })} rows={3} />
    </div>
  );
}

function AboutForm({ draft, patch }: { draft: SiteContent; patch: (next: Partial<SiteContent>) => void }) {
  const about = draft.about;
  function setAbout(next: Partial<SiteContent["about"]>) {
    patch({ about: { ...about, ...next } });
  }
  return (
    <div className="grid gap-4">
      <TextField label="Page title" value={about.title} onChange={(title) => setAbout({ title })} />
      <TextField label="Page description" value={about.description} onChange={(description) => setAbout({ description })} rows={3} />
      <TextField label="Opening text" value={about.lede} onChange={(lede) => setAbout({ lede })} rows={3} />
      <TextField label="Story title" value={about.story.title} onChange={(title) => setAbout({ story: { ...about.story, title } })} />
      {about.story.paragraphs.map((paragraph, index) => (
        <TextField
          key={index}
          label={`Story paragraph ${index + 1}`}
          value={paragraph}
          onChange={(next) => {
            const paragraphs = about.story.paragraphs.map((row, rowIndex) => (rowIndex === index ? next : row));
            setAbout({ story: { ...about.story, paragraphs } });
          }}
          rows={4}
        />
      ))}
      <ImageField
        label="Story photo"
        src={about.story.image.src}
        alt={about.story.image.alt}
        onChange={(image) => setAbout({ story: { ...about.story, image } })}
      />
      <TextField label="Values title" value={about.valuesTitle} onChange={(valuesTitle) => setAbout({ valuesTitle })} />
      {about.values.map((value, index) => (
        <div key={index} className="grid gap-3 border border-line p-3">
          <TextField
            label="Value"
            value={value.title}
            onChange={(title) => {
              const values = about.values.map((row, rowIndex) => (rowIndex === index ? { ...row, title } : row));
              setAbout({ values });
            }}
          />
          <TextField
            label="Text"
            value={value.body}
            onChange={(body) => {
              const values = about.values.map((row, rowIndex) => (rowIndex === index ? { ...row, body } : row));
              setAbout({ values });
            }}
            rows={3}
          />
        </div>
      ))}
      <TextField label="Leadership title" value={about.leadershipTitle} onChange={(leadershipTitle) => setAbout({ leadershipTitle })} />
      <TextField label="Leadership note" value={about.leadershipNote} onChange={(leadershipNote) => setAbout({ leadershipNote })} rows={3} />
      {about.leaders.map((leader, index) => (
        <div key={index} className="grid gap-3 border border-line p-3 sm:grid-cols-2">
          <TextField
            label="Role"
            value={leader.role}
            onChange={(role) => {
              const leaders = about.leaders.map((row, rowIndex) => (rowIndex === index ? { ...row, role } : row));
              setAbout({ leaders });
            }}
          />
          <TextField
            label="Name"
            value={leader.name}
            onChange={(name) => {
              const leaders = about.leaders.map((row, rowIndex) => (rowIndex === index ? { ...row, name } : row));
              setAbout({ leaders });
            }}
          />
        </div>
      ))}
    </div>
  );
}

function AcademicsForm({ draft, patch }: { draft: SiteContent; patch: (next: Partial<SiteContent>) => void }) {
  const page = draft.academics;
  function setPage(next: Partial<SiteContent["academics"]>) {
    patch({ academics: { ...page, ...next } });
  }
  return (
    <div className="grid gap-4">
      <TextField label="Page title" value={page.title} onChange={(title) => setPage({ title })} />
      <TextField label="Page description" value={page.description} onChange={(description) => setPage({ description })} rows={3} />
      <TextField label="Opening text" value={page.lede} onChange={(lede) => setPage({ lede })} rows={3} />
      {page.stages.map((stage, index) => (
        <div key={stage.index} className="grid gap-3 border border-line p-3">
          <TextField
            label="Stage"
            value={stage.title}
            onChange={(title) => {
              const stages = page.stages.map((row, rowIndex) => (rowIndex === index ? { ...row, title } : row));
              setPage({ stages });
            }}
          />
          <TextField
            label="Text"
            value={stage.body}
            onChange={(body) => {
              const stages = page.stages.map((row, rowIndex) => (rowIndex === index ? { ...row, body } : row));
              setPage({ stages });
            }}
            rows={3}
          />
        </div>
      ))}
      <TextField label="Week title" value={page.practiceTitle} onChange={(practiceTitle) => setPage({ practiceTitle })} />
      {page.practices.map((item, index) => (
        <div key={index} className="grid gap-3 border border-line p-3">
          <TextField
            label="Practice"
            value={item.title}
            onChange={(title) => {
              const practices = page.practices.map((row, rowIndex) => (rowIndex === index ? { ...row, title } : row));
              setPage({ practices });
            }}
          />
          <TextField
            label="Text"
            value={item.body}
            onChange={(body) => {
              const practices = page.practices.map((row, rowIndex) => (rowIndex === index ? { ...row, body } : row));
              setPage({ practices });
            }}
            rows={3}
          />
        </div>
      ))}
      <ImageField label="Academics photo" src={page.image.src} alt={page.image.alt} onChange={(image) => setPage({ image })} />
    </div>
  );
}

function AdmissionsForm({ draft, patch }: { draft: SiteContent; patch: (next: Partial<SiteContent>) => void }) {
  const page = draft.admissions;
  function setPage(next: Partial<SiteContent["admissions"]>) {
    patch({ admissions: { ...page, ...next } });
  }
  return (
    <div className="grid gap-4">
      <TextField label="Page title" value={page.title} onChange={(title) => setPage({ title })} />
      <TextField label="Page description" value={page.description} onChange={(description) => setPage({ description })} rows={3} />
      <TextField label="Opening text" value={page.lede} onChange={(lede) => setPage({ lede })} rows={3} />
      {page.steps.map((step, index) => (
        <div key={index} className="grid gap-3 border border-line p-3">
          <TextField
            label="Step"
            value={step.title}
            onChange={(title) => {
              const steps = page.steps.map((row, rowIndex) => (rowIndex === index ? { ...row, title } : row));
              setPage({ steps });
            }}
          />
          <TextField
            label="Text"
            value={step.body}
            onChange={(body) => {
              const steps = page.steps.map((row, rowIndex) => (rowIndex === index ? { ...row, body } : row));
              setPage({ steps });
            }}
            rows={3}
          />
        </div>
      ))}
      <TextField label="Dates title" value={page.datesTitle} onChange={(datesTitle) => setPage({ datesTitle })} />
      <TextField label="Dates note" value={page.datesNote} onChange={(datesNote) => setPage({ datesNote })} rows={2} />
      {page.dates.map((row, index) => (
        <div key={index} className="grid gap-3 sm:grid-cols-2">
          <TextField
            label="Date label"
            value={row.label}
            onChange={(label) => {
              const dates = page.dates.map((item, rowIndex) => (rowIndex === index ? { ...item, label } : item));
              setPage({ dates });
            }}
          />
          <TextField
            label="Date"
            value={row.value}
            onChange={(value) => {
              const dates = page.dates.map((item, rowIndex) => (rowIndex === index ? { ...item, value } : item));
              setPage({ dates });
            }}
          />
        </div>
      ))}
    </div>
  );
}

function CampusForm({ draft, patch }: { draft: SiteContent; patch: (next: Partial<SiteContent>) => void }) {
  const page = draft.campus;
  function setPage(next: Partial<SiteContent["campus"]>) {
    patch({ campus: { ...page, ...next } });
  }
  return (
    <div className="grid gap-4">
      <TextField label="Page title" value={page.title} onChange={(title) => setPage({ title })} />
      <TextField label="Page description" value={page.description} onChange={(description) => setPage({ description })} rows={3} />
      <TextField label="Opening text" value={page.lede} onChange={(lede) => setPage({ lede })} rows={3} />
      {page.places.map((place, index) => (
        <div key={index} className="grid gap-3 border border-line p-3">
          <TextField
            label="Place"
            value={place.title}
            onChange={(title) => {
              const places = page.places.map((row, rowIndex) => (rowIndex === index ? { ...row, title } : row));
              setPage({ places });
            }}
          />
          <TextField
            label="Text"
            value={place.body}
            onChange={(body) => {
              const places = page.places.map((row, rowIndex) => (rowIndex === index ? { ...row, body } : row));
              setPage({ places });
            }}
            rows={3}
          />
          <ImageField
            label="Photo"
            src={place.image}
            alt={place.alt}
            onChange={(next) => {
              const places = page.places.map((row, rowIndex) =>
                rowIndex === index ? { ...row, image: next.src, alt: next.alt } : row,
              );
              setPage({ places });
            }}
          />
        </div>
      ))}
      <TextField label="Lower section title" value={page.moreTitle} onChange={(moreTitle) => setPage({ moreTitle })} />
      {page.more.map((item, index) => (
        <div key={index} className="grid gap-3 border border-line p-3">
          <TextField
            label="Title"
            value={item.title}
            onChange={(title) => {
              const more = page.more.map((row, rowIndex) => (rowIndex === index ? { ...row, title } : row));
              setPage({ more });
            }}
          />
          <TextField
            label="Text"
            value={item.body}
            onChange={(body) => {
              const more = page.more.map((row, rowIndex) => (rowIndex === index ? { ...row, body } : row));
              setPage({ more });
            }}
            rows={3}
          />
        </div>
      ))}
    </div>
  );
}

function NewsForm({ draft, patch }: { draft: SiteContent; patch: (next: Partial<SiteContent>) => void }) {
  const page = draft.news;
  function setPage(next: Partial<SiteContent["news"]>) {
    patch({ news: { ...page, ...next } });
  }
  return (
    <div className="grid gap-4">
      <TextField label="Page title" value={page.title} onChange={(title) => setPage({ title })} />
      <TextField label="Page description" value={page.description} onChange={(description) => setPage({ description })} rows={3} />
      <TextField label="Opening text" value={page.lede} onChange={(lede) => setPage({ lede })} rows={3} />
      {page.items.map((item, index) => (
        <div key={index} className="grid gap-3 border border-line p-3">
          <TextField
            label="Date (YYYY-MM-DD)"
            value={item.date}
            onChange={(date) => {
              const items = page.items.map((row, rowIndex) => (rowIndex === index ? { ...row, date } : row));
              setPage({ items });
            }}
          />
          <TextField
            label="Title"
            value={item.title}
            onChange={(title) => {
              const items = page.items.map((row, rowIndex) => (rowIndex === index ? { ...row, title } : row));
              setPage({ items });
            }}
          />
          <TextField
            label="Text"
            value={item.body}
            onChange={(body) => {
              const items = page.items.map((row, rowIndex) => (rowIndex === index ? { ...row, body } : row));
              setPage({ items });
            }}
            rows={4}
          />
          <button
            type="button"
            className="w-fit text-sm text-accent"
            onClick={() => setPage({ items: page.items.filter((_, rowIndex) => rowIndex !== index) })}
          >
            Remove story
          </button>
        </div>
      ))}
      <button
        type="button"
        className="w-fit border border-ink px-4 py-2 text-sm"
        onClick={() =>
          setPage({
            items: [
              ...page.items,
              { date: new Date().toISOString().slice(0, 10), title: "New story", body: "Write the story here." },
            ],
          })
        }
      >
        Add story
      </button>
    </div>
  );
}

function OfficeForm({ draft, patch }: { draft: SiteContent; patch: (next: Partial<SiteContent>) => void }) {
  const contact = draft.contact;
  return (
    <div className="grid gap-4">
      <TextField
        label="Address line 1"
        value={contact.addressLines[0]}
        onChange={(line) => patch({ contact: { ...contact, addressLines: [line, contact.addressLines[1]] } })}
      />
      <TextField
        label="Address line 2"
        value={contact.addressLines[1]}
        onChange={(line) => patch({ contact: { ...contact, addressLines: [contact.addressLines[0], line] } })}
      />
      <TextField
        label="Phone"
        value={contact.phoneDisplay}
        onChange={(phoneDisplay) => patch({ contact: { ...contact, phoneDisplay } })}
      />
      <TextField label="Email" value={contact.email} onChange={(email) => patch({ contact: { ...contact, email } })} />
      <TextField label="Hours" value={contact.hours} onChange={(hours) => patch({ contact: { ...contact, hours } })} />
      <TextField label="Contact page title" value={draft.contactPage.title} onChange={(title) => patch({ contactPage: { ...draft.contactPage, title } })} />
      <TextField
        label="Contact page description"
        value={draft.contactPage.description}
        onChange={(description) => patch({ contactPage: { ...draft.contactPage, description } })}
        rows={3}
      />
      <TextField
        label="Contact page opening text"
        value={draft.contactPage.lede}
        onChange={(lede) => patch({ contactPage: { ...draft.contactPage, lede } })}
        rows={3}
      />
      <TextField label="Form title" value={draft.form.title} onChange={(title) => patch({ form: { ...draft.form, title } })} />
      <TextField label="Form note" value={draft.form.note} onChange={(note) => patch({ form: { ...draft.form, note } })} rows={3} />
      <TextField label="Form success message" value={draft.form.success} onChange={(success) => patch({ form: { ...draft.form, success } })} rows={3} />
      <TextField label="Submit button" value={draft.form.submit} onChange={(submit) => patch({ form: { ...draft.form, submit } })} />
    </div>
  );
}
