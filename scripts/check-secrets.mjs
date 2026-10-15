// Blocks secrets from entering the repository.
//   node scripts/check-secrets.mjs --staged   (pre-commit hook: lines being added)
//   node scripts/check-secrets.mjs --all      (CI: every tracked file)
// Exits 1 and names the file if anything looks like a credential.
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";

const patterns = [
  ["Resend API key", /\bre_[A-Za-z0-9]{8,}_[A-Za-z0-9]{12,}\b/],
  ["Stripe key", /\b[sr]k_(live|test)_[A-Za-z0-9]{16,}\b/],
  ["AWS access key", /\bAKIA[0-9A-Z]{16}\b/],
  ["GitHub token", /\bgh[pousr]_[A-Za-z0-9]{30,}\b/],
  ["Google API key", /\bAIza[0-9A-Za-z_-]{35}\b/],
  ["Private key", /-----BEGIN [A-Z ]*PRIVATE KEY-----/],
  ["Hard-coded secret", /\b(api[_-]?key|secret|password|token)\s*[:=]\s*["'][^"'\s]{12,}["']/i],
];
const ignoredFiles = [
  /^package-lock\.json$/,
  /^scripts\/check-secrets\.mjs$/,
  /\.(png|jpe?g|ico|woff2?|webp|avif)$/,
];
const git = (...args) => execFileSync("git", args, { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });

const findings = [];
const scan = (file, text) => {
  if (ignoredFiles.some((re) => re.test(file))) return;
  text.split("\n").forEach((line, i) => {
    for (const [name, re] of patterns) if (re.test(line)) findings.push(`${file}:${i + 1}  ${name}`);
  });
};

if (process.argv.includes("--all")) {
  for (const file of git("ls-files").split("\n").filter(Boolean)) {
    let text;
    try {
      text = readFileSync(file, "utf8");
    } catch {
      continue;
    }
    scan(file, text);
  }
} else {
  // Only lines being added in this commit.
  let file = "";
  for (const line of git("diff", "--cached", "-U0", "--no-color").split("\n")) {
    if (line.startsWith("+++ b/")) file = line.slice(6);
    else if (line.startsWith("+") && !line.startsWith("+++")) scan(file, line.slice(1));
  }
  // Never commit env files other than the example.
  for (const f of git("diff", "--cached", "--name-only").split("\n").filter(Boolean)) {
    if (/(^|\/)\.env(\.|$)/.test(f) && !f.endsWith(".env.example")) findings.push(`${f}  environment file`);
  }
}

if (findings.length) {
  console.error("Possible secrets found — commit blocked:\n  " + findings.join("\n  "));
  console.error(
    "Move the value to .env.local / hosting settings. If this is a false positive, adjust scripts/check-secrets.mjs.",
  );
  process.exit(1);
}
console.log("check-secrets: no secrets found");
