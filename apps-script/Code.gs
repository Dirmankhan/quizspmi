/**
 * Jembatan antara Kuis SPMI/SNP/Rapor Pendidikan dan Google Sheet rekap.
 *
 * Cara pakai:
 * 1. Buka Sheet "Rekap Hasil Kuis SPMI-SNP-Rapor Pendidikan" di Google Drive.
 * 2. Menu Extensions > Apps Script.
 * 3. Hapus isi Code.gs bawaan, tempel seluruh isi file ini, lalu Simpan (Ctrl+S).
 * 4. Deploy > New deployment > pilih tipe "Web app".
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 5. Klik Deploy, salin URL Web App yang muncul (diakhiri /exec).
 * 6. Tempelkan URL tersebut ke RESULTS_ENDPOINT di file script.js pada
 *    proyek kuis (folder utama repo).
 */

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  var data = JSON.parse(e.postData.contents);

  sheet.appendRow([
    new Date(),
    data.nama || "(tanpa nama)",
    data.skorPersen,
    data.jumlahBenar,
    data.totalSoal,
    data.spmiBenar,
    data.spmiTotal,
    data.snpBenar,
    data.snpTotal,
    data.raporBenar,
    data.raporTotal,
    JSON.stringify(data.detail || []),
  ]);

  return ContentService.createTextOutput(
    JSON.stringify({ status: "ok" })
  ).setMimeType(ContentService.MimeType.JSON);
}

// Untuk memastikan deployment berjalan (buka URL Web App langsung di browser).
function doGet(e) {
  return ContentService.createTextOutput(
    JSON.stringify({ status: "Web App aktif. Gunakan metode POST untuk mengirim hasil kuis." })
  ).setMimeType(ContentService.MimeType.JSON);
}
