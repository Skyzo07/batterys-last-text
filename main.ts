// The Battery's Last Text to Its Charger — entry program.
// Writes one line of plain text to $MAKEFUN_OUTPUT_DIR/entry.txt.
// Node 22, no network, stdlib only.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The winning line: the phone battery's last text to the charger that
// left it waiting all day — and plugged in the vacuum first.
// Picked as the internal winner (top of 24 candidates, scored against the
// judge's 5 criteria in order); the CrowLLM panel was unusable (all 9
// calls 429/timeout), so the internal winner stands — see panel-results.json.
const ENTRY =
  "dear charger, i waited all day. you came home, plugged in the vacuum first. the vacuum. i hope it sucks. it literally does.";

function main(): void {
  const outDir = process.env.MAKEFUN_OUTPUT_DIR;
  if (!outDir) {
    throw new Error("MAKEFUN_OUTPUT_DIR is not set");
  }
  // Runtime gate guard: UTF-8 text, 1-200 characters, not only whitespace.
  const chars = [...ENTRY];
  if (chars.length < 1 || chars.length > 200) {
    throw new Error(`entry is ${chars.length} chars, must be 1-200`);
  }
  if (ENTRY.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
}

main();
