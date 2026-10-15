// Lists every piece of content still missing or awaiting approval.
// Usage: npm run content:audit            (report)
//        npm run content:audit -- --strict (exit 1 if anything is outstanding — use before launch)
//
// Reads content/*.ts directly (Node strips the TypeScript types).
import { existsSync } from "node:fs";
import { companyFacts, homeCopy, sectors, aboutCopy, productsCopy, contactCopy } from "../content/company.ts";
import { products } from "../content/products.ts";

const missing = [];
const drafts = [];

function checkCopy(where, field) {
  if (!field.text) missing.push(`${where}: ${field.need}`);
  else if (!field.approved) drafts.push(`${where}: "${field.text}"`);
}

function walk(where, value) {
  if (value && typeof value === "object" && "need" in value && "approved" in value)
    return checkCopy(where, value);
  if (Array.isArray(value)) return value.forEach((v, i) => walk(`${where}[${i}]`, v));
  if (value && typeof value === "object")
    for (const [k, v] of Object.entries(value)) walk(`${where}.${k}`, v);
}

for (const [key, value] of Object.entries(companyFacts)) {
  if (value === null && key !== "linkedin") missing.push(`companyFacts.${key}`); // LinkedIn is optional
}
walk("homeCopy", homeCopy);
walk("sectors", sectors);
walk("aboutCopy", aboutCopy);
walk("productsCopy", productsCopy);
walk("contactCopy", contactCopy);

for (const p of products) {
  for (const key of ["category", "summary", "audience", "problem"]) {
    if (p[key] === null) missing.push(`products.${p.slug}.${key}`);
  }
  if (p.status === "unknown") missing.push(`products.${p.slug}.status`);
  if (p.capabilities.length === 0) missing.push(`products.${p.slug}.capabilities`);
  if (p.screenshots.length === 0) missing.push(`products.${p.slug}.screenshots`);
  if (!p.confirmed) drafts.push(`products.${p.slug}: not yet confirmed by Arcaisys`);
  for (const shot of p.screenshots) {
    if (!existsSync(new URL(`../public${shot.src}`, import.meta.url)))
      missing.push(`products.${p.slug}: file not found ${shot.src}`);
    if (!shot.alt) missing.push(`products.${p.slug}: alt text for ${shot.src}`);
  }
}

const env = ["NEXT_PUBLIC_SITE_URL", "RESEND_API_KEY", "CONTACT_TO_EMAIL", "CONTACT_FROM_EMAIL"].filter(
  (k) => !process.env[k],
);

console.log(`\nMissing content (${missing.length})`);
missing.forEach((m) => console.log(`  - ${m}`));
console.log(`\nDrafts awaiting approval (${drafts.length})`);
drafts.forEach((d) => console.log(`  - ${d}`));
console.log(`\nEnvironment variables not set in this shell (${env.length})`);
env.forEach((e) => console.log(`  - ${e}`));
console.log("");

const outstanding = missing.length + drafts.length;
if (process.argv.includes("--strict") && outstanding > 0) {
  console.error(`Not ready to launch: ${outstanding} content item(s) outstanding.`);
  process.exit(1);
}
