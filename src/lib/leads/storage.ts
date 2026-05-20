import { appendFile, mkdir } from "fs/promises";
import path from "path";
import type { StoredLead } from "./schema";

const defaultLogPath = path.join(process.cwd(), "data", "leads.jsonl");

export async function logLead(lead: StoredLead) {
  const logPath = process.env.LEADS_LOG_PATH?.trim() || defaultLogPath;
  await mkdir(path.dirname(logPath), { recursive: true });
  await appendFile(logPath, `${JSON.stringify(lead)}\n`, "utf8");
}
