# SevenTiming website

Official English website for **SevenTiming**, an independent software studio.

The site is a single marketing page plus a privacy page. It is deliberately plain: no tracking, no cookie banner, no invented clients or statistics.

## Stack

- [Next.js 16](https://nextjs.org/) with static export (`output: "export"`)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Geist](https://vercel.com/font) via `next/font/google`
- GitHub Pages for hosting, deployed by GitHub Actions

## Local development

```bash
pnpm install
pnpm dev
```

Open <http://localhost:3000>.

## Verification

```bash
pnpm verify
```

This runs a production build, TypeScript checks, ESLint, and `scripts/verify-site.mjs`. The verification script checks the exported HTML for required metadata, canonical URLs, structured data, working local links, real image assets, and placeholder or false-domain leftovers.

## Project structure

```text
app/
  layout.tsx          shared shell, fonts, metadata, Organization JSON-LD
  page.tsx            home page
  privacy/page.tsx    privacy page
  not-found.tsx       404 page
  sitemap.ts          sitemap metadata route
  robots.ts           robots metadata route
  globals.css         design tokens and small motion layer
components/           header, footer, wordmark
lib/site.ts           canonical name, URL, email, and description
public/               exported images and Open Graph card
scripts/              site verification and Open Graph generation
.github/workflows/    GitHub Pages deployment
```

## Content rules

The site intentionally avoids information that cannot be supported:

- No invented clients, projects, testimonials, awards, or press mentions.
- No invented metrics, team size, years in business, or founding claims.
- No office address, phone number, or social accounts that are not in use.
- Contact is limited to `hello@seventiming.com`, which must remain an active mailbox.

If you add a claim, make sure it is true and can be explained in one sentence. Prefer specifics over adjectives.

## Deployment

Pushing to `main` runs [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), builds the static export, and publishes `out/` to GitHub Pages.

One-time repository setup:

1. In **Settings → Pages**, set **Build and deployment → Source** to **GitHub Actions**.
2. Set the custom domain to `seventiming.com`.
3. Add the DNS records below at the domain registrar (Aliyun / HiChina for this domain).
4. After the certificate is issued, enable **Enforce HTTPS**.

### DNS records

| Type | Host | Value | TTL |
| --- | --- | --- | --- |
| A | `@` | `185.199.108.153` | 600 |
| A | `@` | `185.199.109.153` | 600 |
| A | `@` | `185.199.110.153` | 600 |
| A | `@` | `185.199.111.153` | 600 |
| CNAME | `www` | `guihaihu.github.io` | 600 |

Do not remove the existing MX records. `hello@seventiming.com` is hosted by Aliyun enterprise mail, and the MX records are already configured for that service.

The `github.io` project URL (`https://guihaihu.github.io/seventiming.com/`) serves the same build before the custom domain is attached. Because the project is exported for a root domain, its `_next` asset paths are absolute; use the custom domain for the complete site.

### Changing the domain

Update `lib/site.ts` and the DNS records. The canonical URL, sitemap, robots, Open Graph metadata, and JSON-LD are all derived from `site.url`.

## Images

Two photographs from [Unsplash](https://unsplash.com/license) are used as abstract structural imagery. No attribution is required by the license, but the sources are recorded here:

- `public/hero.webp`: <https://images.unsplash.com/photo-1486406146926-c627a92ad1ab>
- `public/structure.webp`: <https://images.unsplash.com/photo-1487958449943-2429e8be8625>

Both images are decorative. They are not presented as studio work, offices, or client projects.

## Open Graph image

`public/og.png` is generated from `scripts/og-template.html`:

```bash
bash scripts/make-og.sh
```

The script uses local Chrome through `CHROME_BIN` (default: macOS Google Chrome). Run it again after changing the template or the wordmark.

## Contact

hello@seventiming.com
