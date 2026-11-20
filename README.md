# SevenTiming website

Official English website for **SevenTiming**, an independent software studio.

Live site: <https://seventiming.com>

The site is a single marketing page plus a privacy page. It is deliberately plain: no tracking, no cookie banner, no invented clients or statistics.

## Stack

- [Next.js 16](https://nextjs.org/) with static export (`output: "export"`)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Geist](https://vercel.com/font) via `next/font/google`
- nginx on `sf03` (`47.115.138.206`), deployed with `scripts/deploy-sf03.sh`

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
scripts/              site verification, Open Graph generation, sf03 deployment
deploy/nginx/         the sf03 vhost
```

## Content rules

The site intentionally avoids information that cannot be supported:

- No invented clients, projects, testimonials, awards, or press mentions.
- No invented metrics, team size, years in business, or founding claims.
- No office address, phone number, or social accounts that are not in use.
- Contact is limited to `hello@seventiming.com`, which must remain an active mailbox.

If you add a claim, make sure it is true and can be explained in one sentence. Prefer specifics over adjectives.

## Deployment

Production is an nginx vhost on `sf03` serving the static export from `/var/www/seventiming.com`:

```bash
bash scripts/deploy-sf03.sh               # verify, build, upload
bash scripts/deploy-sf03.sh --skip-build  # upload the existing out/
```

The script runs `pnpm verify`, mirrors `out/` to the server with `rsync --delete`, normalises file permissions, and checks that the vhost answers on `127.0.0.1`. `DEPLOY_HOST` and `DEPLOY_DIR` override the defaults.

The vhost lives in [`deploy/nginx/seventiming.com.conf`](deploy/nginx/seventiming.com.conf) and only needs reinstalling when it changes:

```bash
scp deploy/nginx/seventiming.com.conf sf03:/etc/nginx/sites-available/seventiming.com
ssh sf03 'nginx -t && systemctl reload nginx'
```

### DNS

Point both names at the server; the MX records for `hello@seventiming.com` are unrelated and must stay as they are.

| Type | Host | Value | TTL |
| --- | --- | --- | --- |
| A | `@` | `47.115.138.206` | 600 |
| A | `www` | `47.115.138.206` | 600 |

`www` answers with a 301 to the apex domain.

### HTTPS

Both names share one Let's Encrypt certificate (issued over HTTP-01, expires 2027-02-17). Certbot wrote the TLS blocks into the vhost; re-issuing is only needed if the domain set changes:

```bash
ssh sf03 'certbot --nginx -d seventiming.com -d www.seventiming.com --redirect'
```

Renewal runs from the certbot timer on the server. TLS is served over HTTP/2, plain HTTP redirects to `https://seventiming.com` in a single hop, and `https://www.seventiming.com` 301s to the apex.

### Changing the domain

Update `lib/site.ts`, the vhost `server_name` lines, and the DNS records. The canonical URL, sitemap, robots, Open Graph metadata, and JSON-LD are all derived from `site.url`.

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
