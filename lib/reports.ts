import { list, put } from "@vercel/blob";

export type Report = {
  id: string;
  title: string;
  body: string;
  publishedAt: string;
  public: boolean;
};

const REPORT_PREFIX = "reports/";

export async function saveReport(report: Report) {
  return put(`${REPORT_PREFIX}${report.id}.json`, JSON.stringify(report), {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json; charset=utf-8",
  });
}

export async function getReports(): Promise<Report[]> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return [];

  const blobs = [];
  let cursor: string | undefined;

  do {
    const page = await list({ prefix: REPORT_PREFIX, limit: 100, cursor });
    blobs.push(...page.blobs);
    cursor = page.hasMore ? page.cursor : undefined;
  } while (cursor);

  const reports = await Promise.all(
    blobs.map(async (blob) => {
      const response = await fetch(
        `${blob.url}?v=${blob.uploadedAt.getTime()}`,
        { cache: "no-store" },
      );
      if (!response.ok) return null;
      return (await response.json()) as Report;
    }),
  );

  return reports
    .filter(
      (report): report is Report => report !== null && report.public === true,
    )
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );
}
