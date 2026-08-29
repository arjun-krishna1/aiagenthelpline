import { list, put } from "@vercel/blob";

const [id, visibility] = process.argv.slice(2);

if (!id || !["public", "private"].includes(visibility)) {
  console.error(
    "Usage: npm run report:visibility -- <report-id> <public|private>",
  );
  process.exit(1);
}

if (!process.env.BLOB_READ_WRITE_TOKEN) {
  console.error("BLOB_READ_WRITE_TOKEN is not configured.");
  process.exit(1);
}

const pathname = `reports/${id}.json`;
const { blobs } = await list({ prefix: pathname, limit: 2 });
const blob = blobs.find((candidate) => candidate.pathname === pathname);

if (!blob) {
  console.error(`Report ${id} was not found.`);
  process.exit(1);
}

const response = await fetch(`${blob.url}?v=${blob.uploadedAt.getTime()}`, {
  cache: "no-store",
});

if (!response.ok) {
  console.error(`Could not read report ${id}.`);
  process.exit(1);
}

const report = await response.json();
report.public = visibility === "public";

await put(pathname, JSON.stringify(report), {
  access: "public",
  addRandomSuffix: false,
  allowOverwrite: true,
  contentType: "application/json; charset=utf-8",
});

console.log(`Report ${id} is now ${visibility}.`);
