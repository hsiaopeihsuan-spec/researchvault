# ResearchVault 更新紀錄

## V1.1 — 文獻附件擴充
- 文獻網址與 PDF／DOCX 附件可同時存在。
- 支援每篇文獻一個附件（最大 20 MiB）：新增、更換、移除、下載，PDF 可開啟預覽。
- IndexedDB 資料庫由版本 1 升級至 2，新增 attachments store；保留既有文獻與筆記。
- JSON 備份格式由 schemaVersion 1 升級至 2，包含附件內容；仍支援匯入 V1 備份。
- 還原前驗證附件與關聯，文獻、筆記、附件以同一交易覆蓋。
- AGENTS.md 新增附件規範、相容性與驗收測試。

## GitHub 更新方式
將此版本 ZIP 解壓縮，**上傳解壓縮後的內容**到原有 `researchvault` repository 根目錄；GitHub 對同名檔案會要求提交更新。若 GitHub 網頁上傳不允許覆蓋同名檔案，請逐一點開 `js/db.js`、`js/service.js`、`js/app.js`、`README.md`、`AGENTS.md`，以網頁編輯器取代內容後提交，或使用 GitHub Desktop / Git 進行整批更新。不要把 ZIP 當成網站首頁上傳。

## 部署後測試
1. 重新整理 GitHub Pages，確認舊文獻仍存在。
2. 編輯舊文獻，同時保留網址並選擇 PDF 或 DOCX，儲存。
3. 點選查看，確認附件名稱、下載或 PDF 開啟。
4. 重新整理後再查看附件，確認保存。
5. 編輯更換附件，再勾選移除，分別測試。
6. 匯出 JSON，確認 `schemaVersion: 2` 與 `attachments`；再進行還原。
7. 嘗試上傳超過 20 MiB 的檔案，確認被拒絕。

## 注意
- 目前尚未完成在你的 GitHub Pages 網址上的實際瀏覽器操作測試。
- 附件不會同步至其他裝置；清除瀏覽器網站資料可能導致遺失。
- JSON 內嵌 Base64，檔案體積會大於原始附件。
