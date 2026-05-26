# Case Inbox Workflow

How raw client case material gets converted into publishable anonymized case files. This document is tracked; the actual `_inbox/` folder and its contents are gitignored.

## Folder map

```
cases/
  CASE-TEMPLATE.md              ← tracked, the per-case markdown template
  CASE-INBOX-WORKFLOW.md        ← tracked, this file
  case-001.md                   ← tracked, anonymized publishable cases
  case-002.md
  ...
  _inbox/                       ← gitignored, raw non-anonymized material
    README-DROP-CASES-HERE.txt  ← user-facing instructions (rich version)
    case-001-ai-flag-uw/
      decision-letter.pdf
      my-appeal-draft.docx
      turnitin-report.pdf
      ...
    case-002-...
```

## Pipeline

1. **User drops raw material** into `cases/_inbox/case-NNN-slug/` or `cases/_inbox/case-NNN.zip`.

2. **User signals readiness** in chat: "case 001 ready" or similar.

3. **Assistant reads everything** in the inbox folder for that case.

4. **Assistant writes `cases/case-NNN.md`** following `CASE-TEMPLATE.md`:
   - Frontmatter: case_id, pillar (P1-P6), jurisdiction (US/UK/US/UK), date, anonymized status
   - Anonymization checklist completed
   - C-S-O master draft (Case / Structure / Outcome)
   - Content mapping (links to derived X thread + IG carousel posts)

5. **Anonymization rules** (mandatory, from spec §1):
   - No school name → tier abstraction ("R1 public flagship", "Russell Group", "Ivy League", "regional public US university")
   - No course code or name → category ("200-level STEM intro", "graduate humanities seminar")
   - No specific dates → relative ("Fall semester", "mid-semester")
   - No professor names, departments, office references
   - No demographic identifiers beyond what's pedagogically essential
   - No direct quotes longer than 1 sentence (paraphrase instead)
   - No allegation-evidence detail that could let an outsider identify the student via search

6. **User reviews the anonymized version** BEFORE it becomes content source. Flags any leak.

7. **Once approved**, the case becomes draft source for X thread + IG carousel via the dual-format workflow (spec §3.1).

8. **Raw material stays in `_inbox/`** indefinitely (gitignored) as evidence and re-reference. Never delete.

## Why this separation matters

- Raw material may contain PII even in seemingly innocuous places (file metadata, screenshot timestamps, email headers, file naming patterns at the student's institution).
- The git history must NEVER contain identifying data — even one accidental commit and the repo is permanently compromised.
- Anonymization is a one-way operation we do BEFORE anything becomes public-facing.

## Per-case lifecycle

```
[drop in _inbox]
    ↓
[assistant reads, drafts cases/case-NNN.md]
    ↓
[user reviews anonymized version]
    ↓ approve
[case is published-source]
    ↓
[becomes X thread + IG carousel via dual-format workflow]
    ↓
[posts archive at posts/YYYYMMDD-{x|ig}-PN-slug.md]
```

## Bulk processing

For W1: spec calls for 10 anonymized cases. User can drop them as a batch. Assistant will process and produce a single PR-style review of all 10 anonymized files at once for user sign-off.
