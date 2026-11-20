This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## School office

Copy `.env.example` to `.env.local` if you are setting up a new checkout. Set `ADMIN_EMAIL`, `ADMIN_PASSWORD`, and `AUTH_SECRET` for sign-in. Use the project URL from Supabase for `NEXT_PUBLIC_SUPABASE_URL` and set `SUPABASE_SECRET_KEY` (or `SUPABASE_SERVICE_ROLE_KEY`) on the server. Apply [the database schema](supabase/schema.sql) in that project's SQL Editor, then restart the app.

For a new database, run `node --env-file=.env.local scripts/seed-site.mjs` with Node 22.18+ after applying the schema. The seed loads the original notices and preserves an existing notice list.

Open `/admin` to edit content, publish notices to Home or Admissions, upload public PDFs, and review complete applications and enquiries in Office Desk.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
