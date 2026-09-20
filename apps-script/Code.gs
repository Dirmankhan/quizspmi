/**
 * Jembatan antara Kuis SPMI/SNP/Rapor Pendidikan, Google Sheet rekap, dan
 * halaman report admin (report.html).
 *
 * Cara pakai:
 * 1. Buka Sheet "Rekap Hasil Kuis SPMI-SNP-Rapor Pendidikan" di Google Drive.
 * 2. Menu Extensions > Apps Script.
 * 3. Hapus isi Code.gs bawaan, tempel seluruh isi file ini, lalu Simpan (Ctrl+S).
 * 4. Deploy > New deployment > pilih tipe "Web app".
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 5. Klik Deploy, salin URL Web App yang muncul (diakhiri /exec).
 * 6. Tempelkan URL tersebut ke RESULTS_ENDPOINT di script.js dan ke
 *    REPORT_ENDPOINT di report.js pada proyek kuis (folder utama repo).
 *
 * Jika kode ini diubah lagi setelah deploy pertama: Deploy > Manage
 * deployments > ikon pensil pada deployment aktif > Version: New version >
 * Deploy. Deployment lama tidak otomatis memakai kode terbaru.
 */

// Zona waktu WITA, dipakai untuk menentukan "hari ini" dan jendela jam
// laporan hari berjalan.
var TIMEZONE = "Asia/Makassar";
var WINDOW_START_MINUTES = 7 * 60 + 30; // 07:30 WITA
var WINDOW_END_MINUTES = 11 * 60; // 11:00 WITA

// Indeks kolom pada Sheet (0-based), mengikuti urutan appendRow di doPost().
var COL = {
  TIMESTAMP: 0,
  NAMA: 1,
  SKOR_PERSEN: 2,
  JUMLAH_BENAR: 3,
  TOTAL_SOAL: 4,
  SPMI_BENAR: 5,
  SPMI_TOTAL: 6,
  SNP_BENAR: 7,
  SNP_TOTAL: 8,
  RAPOR_BENAR: 9,
  RAPOR_TOTAL: 10,
};

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

// doGet melayani dua hal:
// - ?action=report&callback=...  -> data report (JSONP)
// - tanpa parameter -> health check biasa (buka URL /exec langsung)
function doGet(e) {
  var params = (e && e.parameter) || {};

  if (params.action === "report") {
    return respond({ status: "ok", data: buildReport() }, params.callback);
  }

  return respond(
    {
      status:
        "Web App aktif. Gunakan metode POST untuk mengirim hasil kuis, atau ?action=report untuk mengambil rekap.",
    },
    params.callback
  );
}

// Membungkus JSON sebagai JSONP (callback(...)) bila diminta, supaya
// report.html bisa membaca data lintas origin tanpa terhambat CORS.
function respond(payload, callback) {
  var json = JSON.stringify(payload);
  if (callback) {
    return ContentService.createTextOutput(callback + "(" + json + ");").setMimeType(
      ContentService.MimeType.JAVASCRIPT
    );
  }
  return ContentService.createTextOutput(json).setMimeType(ContentService.MimeType.JSON);
}

function buildReport() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  var values = sheet.getDataRange().getValues();
  var rows = values.slice(1); // buang baris header

  var todayStr = Utilities.formatDate(new Date(), TIMEZONE, "yyyy-MM-dd");

  var akumulasi = emptyGroup();
  var hariIni = emptyGroup();

  rows.forEach(function (row) {
    var timestamp = row[COL.TIMESTAMP];
    if (!(timestamp instanceof Date)) return;

    var dateStr = Utilities.formatDate(timestamp, TIMEZONE, "yyyy-MM-dd");

    if (dateStr < todayStr) {
      // Akumulasi: semua jawaban dari hari-hari sebelum hari ini.
      addRowToGroup(akumulasi, row);
      return;
    }

    if (dateStr === todayStr) {
      var hour = Number(Utilities.formatDate(timestamp, TIMEZONE, "H"));
      var minute = Number(Utilities.formatDate(timestamp, TIMEZONE, "m"));
      var minutesOfDay = hour * 60 + minute;
      if (minutesOfDay >= WINDOW_START_MINUTES && minutesOfDay <= WINDOW_END_MINUTES) {
        // Hari berjalan: jawaban hari ini yang masuk pukul 07:30-11:00 WITA.
        addRowToGroup(hariIni, row);
      }
    }
  });

  return {
    generatedAt: new Date().toISOString(),
    timezone: TIMEZONE,
    windowLabel: "07:30 - 11:00 WITA",
    akumulasi: finalizeGroup(akumulasi, null),
    hariIni: finalizeGroup(hariIni, todayStr),
  };
}

function emptyGroup() {
  return {
    participants: 0,
    spmiBenar: 0,
    spmiTotal: 0,
    snpBenar: 0,
    snpTotal: 0,
    raporBenar: 0,
    raporTotal: 0,
  };
}

function addRowToGroup(group, row) {
  group.participants += 1;
  group.spmiBenar += Number(row[COL.SPMI_BENAR]) || 0;
  group.spmiTotal += Number(row[COL.SPMI_TOTAL]) || 0;
  group.snpBenar += Number(row[COL.SNP_BENAR]) || 0;
  group.snpTotal += Number(row[COL.SNP_TOTAL]) || 0;
  group.raporBenar += Number(row[COL.RAPOR_BENAR]) || 0;
  group.raporTotal += Number(row[COL.RAPOR_TOTAL]) || 0;
}

function pct(benar, total) {
  return total > 0 ? Math.round((benar / total) * 1000) / 10 : null;
}

function finalizeGroup(group, dateLabel) {
  var totalBenar = group.spmiBenar + group.snpBenar + group.raporBenar;
  var totalSoal = group.spmiTotal + group.snpTotal + group.raporTotal;
  return {
    participants: group.participants,
    dateLabel: dateLabel,
    overallPct: pct(totalBenar, totalSoal),
    topics: {
      spmi: { benar: group.spmiBenar, total: group.spmiTotal, pct: pct(group.spmiBenar, group.spmiTotal) },
      snp: { benar: group.snpBenar, total: group.snpTotal, pct: pct(group.snpBenar, group.snpTotal) },
      rapor: { benar: group.raporBenar, total: group.raporTotal, pct: pct(group.raporBenar, group.raporTotal) },
    },
  };
}
