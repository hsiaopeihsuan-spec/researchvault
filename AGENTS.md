# ResearchVault — AGENTS.md

## Project mission
Build and maintain a Traditional Chinese research literature and structured-note workspace. Prioritize data integrity, functional correctness, accessibility, maintainability, and safe AI extension. Keep V1 small and functional.

## Stack and deployment
- Vanilla HTML, CSS, and ES modules (JavaScript); no backend, account system, paid API, or cloud synchronization.
- Browser persistence uses IndexedDB only, via `js/db.js`. Do not replace it with localStorage.
- Static deployment on GitHub Pages; preserve relative asset paths.
- Do not add dependencies or rewrite architecture without explaining necessity and risks.

## Architecture
- `index.html`: app shell.
- `css/style.css`: design system and responsive layout.
- `js/db.js`: IndexedDB stores and transactions.
- `js/service.js`: validation, data integrity, search, backup and restore.
- `js/templates.js`: stable versioned note template definitions.
- `js/app.js`: view rendering, forms and user interactions.
- UI code must not directly write IndexedDB. Validate through the service layer.

## Data contract
- `papers`: `id`, `title`, `authors`, `year`, `journal`, `doi`, `url`, `status`, `tags`, `createdAt`, `updatedAt`.
- `notes`: `id`, `title`, `templateId`, `templateVersion`, `fields`, `relatedPaperIds`, `tags`, `createdAt`, `updatedAt`.
- All IDs must be stable and unique. Do not use titles as IDs.
- Every note MUST reference at least one existing paper; references must not contain duplicates.
- A note MAY reference multiple papers.
- Deleting a paper MUST NOT create orphan notes or silently delete notes. V1 blocks deletion of any paper still referenced by notes; reassign/unlink from notes first.
- Removing the last paper link from a note is forbidden.
- Protect these rules in service validation and import validation, not only the UI.
- Preserve timestamps on edits except `updatedAt`.

## Templates and extension
- Built-in templates live in `js/templates.js` and are versioned.
- Each template defines stable `id`, `version`, `name`, `description`, and ordered field key/label pairs.
- New templates must use the shared note form, search, persistence and backup system.
- Do not remove or rename template versions still used by existing notes.
- For a schema-breaking change, design a compatible migration before implementation.
- The demonstration extension is an **Experiment Log** template. Suggested fields: objective, equipment/materials, conditions, procedure, observations/results, issues. It must still require at least one linked paper.

## Search and backup
- Search both papers and notes, including all structured note field values.
- Support keyword, type, tag, and recent-update sorting.
- JSON export contains `appName`, `schemaVersion`, `exportedAt`, `papers`, and `notes`.
- JSON import is FULL REPLACEMENT, never merge. Parse and validate everything first; show counts and explicit overwrite confirmation.
- Reject unsupported schema/template versions, duplicate IDs, invalid field types, missing references, and orphan notes.
- Replace papers and notes in one IndexedDB readwrite transaction. Never clear records before validation.
- Do not claim a backup has been verified unless it was actually parsed and validated.

## UI and research integrity
- Professional, restrained research dashboard; Traditional Chinese text; responsive mobile layouts.
- Keep labels, keyboard focus, errors, empty states, and destructive-action confirmation clear.
- Escape user-generated text when rendering; never insert untrusted HTML.
- Never fabricate real authors, DOIs, years, results, or citations. Clearly mark synthetic demo data.
- Do not commit private research notes or browser exports to the public repository.

## AI change procedure
1. Read this file and inspect affected modules.
2. State a minimal change plan and data-compatibility impact.
3. Reuse shared services and existing visual patterns.
4. Test creation, editing, persistence, search, relationships, export/restore and regression as applicable.
5. Check deployment paths and mobile layout.
6. Report files changed, tests **actually run**, failures, untested cases and known limitations. Never report unexecuted tests as passed.

## Acceptance checklist
- Papers and notes CRUD; two built-in templates.
- Every note references >=1 existing paper; delete/unlink protections work.
- Search by keyword, type and tag.
- IndexedDB persists across refreshes.
- Valid JSON backup round-trips; invalid backup leaves existing data intact.
- Dashboard reflects real data; mobile and desktop usable.
- GitHub Pages deploys correctly.
- AI can add an Experiment Log template without breaking existing records.

## V1.1 extension — PDF / Word attachments (implemented)
- V1.1 adds **one optional attachment per paper**, in addition to the existing optional URL. Both may coexist; neither is required. Supported formats are `.pdf` and `.docx` only (not legacy `.doc`).
- `js/db.js` upgrades the IndexedDB version **from 1 to 2**, creating `attachments` with `keyPath: 'paperId'`. Do not delete or recreate existing `papers`, `notes`, or `settings` stores during upgrade.
- Attachment record: `{ paperId, name, mime, blob }`; Blob is stored locally in IndexedDB, never committed to GitHub. Attachment size is 1 byte–20 MiB, and extension/MIME/signature must match.
- The UI must let users select, replace, view/download, and explicitly remove an attachment. Replacing/removing an attachment must not remove the paper, URL, or notes.
- Save a paper and its attachment change within **one IndexedDB readwrite transaction**. Deleting an unreferenced paper removes its attachment in the same transaction. Block deletion of papers still referenced by notes.
- Export schema **version 2** contains `attachments` with base64 file bytes, file name, MIME, and paper ID. Preserve legacy **version 1** import (no attachments). V2 import must validate attachment types, signatures, size, unique paper IDs, and relationships before any write.
- Import replaces `papers`, `notes`, and `attachments` in **one transaction**. Importing a V1 backup clears any existing attachments after explicit overwrite confirmation. Never silently pretend that a text-only V1 backup includes attachments.
- JSON export size increases with attachment size; keep an explicit 100 MiB import-file limit. Browser quota, private mode, and cross-device access remain limitations.
- Do not use `innerHTML` to render user-supplied attachment names without HTML escaping. Object URLs for preview/download must be revoked.
- Regression checks: existing V1 IndexedDB data remains after upgrade; PDF upload/view/download; DOCX upload/download; replace/remove; oversized or renamed invalid files rejected; backup V2 restores file bytes; V1 restore remains compatible; invalid attachment backup leaves all stores unchanged; paper deletion clears attachment; note links and search still work.
