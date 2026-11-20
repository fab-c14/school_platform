import { readFile } from "node:fs/promises";
import { createClient } from "@supabase/supabase-js";
import { defaultSite } from "../content/site.ts";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
const keyName = "site";

async function seedSite() {
  if (!url || !key) throw new Error("Set the Supabase project URL and server key first.");
  const notifications = JSON.parse(await readFile(new URL("../supabase/notices.json", import.meta.url), "utf8"));
  const db = createClient(url, key, { auth: { persistSession: false } });

  for (let attempt = 0; attempt < 3; attempt++) {
    const table = db.from("site_content");
    const { data: existing, error: readError } = await table.select("body,updated_at").eq("key", keyName).maybeSingle();
    if (readError?.code === "PGRST205") throw new Error("Apply supabase/schema.sql in the Supabase SQL Editor before running this seed.");
    if (readError) throw new Error(readError.message);
    if (Array.isArray(existing?.body?.notifications)) {
      console.log("The site already stores its notices in Supabase.");
      return;
    }

    const body = { ...(existing?.body ?? defaultSite), notifications };
    const updated_at = new Date(Math.max(Date.now(), existing ? Date.parse(existing.updated_at) + 1 : 0)).toISOString();
    const write = existing
      ? table.update({ body, updated_at }).eq("key", keyName).eq("updated_at", existing.updated_at)
      : table.upsert({ key: keyName, body, updated_at }, { onConflict: "key", ignoreDuplicates: true });
    const { data, error } = await write.select("key").maybeSingle();
    if (error) throw new Error(error.message);
    if (data) {
      console.log(`Seeded ${notifications.length} notices in the Supabase site record.`);
      return;
    }
  }
  throw new Error("Another update changed the site record. Retry the seed.");
}

seedSite().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
