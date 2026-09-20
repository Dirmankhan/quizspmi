// Report Kuis: persentase jawaban benar per topik (SPMI/SPME, SNP, Rapor
// Pendidikan), dibagi dua kelompok:
// - Akumulasi: seluruh jawaban dari hari-hari SEBELUM hari ini.
// - Hari Ini: jawaban hari ini yang masuk pukul 07:30-11:00 WITA.
// Terbuka untuk siapa saja yang membuka halaman ini, tanpa password.

// Samakan dengan RESULTS_ENDPOINT di script.js (satu deployment Apps Script
// yang sama melayani submit kuis dan report ini).
const REPORT_ENDPOINT = "https://script.google.com/macros/s/AKfycbwAO_BIJAKpC-gaXmjFGEIaKD-Z_N1UDnFSya1R4YQFH3ycRrpQygS22DkYpkGZeg-pjQ/exec";

const TOPIC_META = {
  spmi: { label: "SPMI/SPME", color: "var(--a)" },
  snp: { label: "SNP", color: "var(--b)" },
  rapor: { label: "Rapor Pendidikan", color: "var(--c)" },
};

// Mengambil data report via JSONP: Apps Script Web App tidak mengirim header
// CORS, jadi fetch() biasa tidak bisa membaca responsnya lintas origin.
// JSONP (memuat <script src="...&callback=nama_fungsi">) tidak terhambat
// CORS karena memakai mekanisme <script>, bukan XHR/fetch.
function fetchReportJSONP() {
  return new Promise((resolve, reject) => {
    const callbackName = "__quizReportCb_" + Date.now();

    const timeoutId = setTimeout(() => {
      cleanup();
      reject(new Error("Waktu tunggu habis. Periksa koneksi internet Anda."));
    }, 15000);

    function cleanup() {
      clearTimeout(timeoutId);
      delete window[callbackName];
      if (script.parentNode) script.parentNode.removeChild(script);
    }

    window[callbackName] = (payload) => {
      cleanup();
      resolve(payload);
    };

    const script = document.createElement("script");
    script.src = REPORT_ENDPOINT + "?action=report&callback=" + callbackName;
    script.onerror = () => {
      cleanup();
      reject(new Error("Gagal menghubungi server rekap."));
    };
    document.head.appendChild(script);
  });
}

function formatDateLabel(dateStr) {
  const [y, m, d] = dateStr.split("-").map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  return date.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
}

function renderGroup(statsEl, metaEl, group, metaExtra) {
  const metaParts = [`${group.participants} peserta`];
  if (metaExtra) metaParts.push(metaExtra);
  metaEl.textContent = metaParts.join(" · ");

  if (group.participants === 0) {
    statsEl.innerHTML = `<p class="report-empty">Belum ada data pada periode ini.</p>`;
    return;
  }

  const overallText = group.overallPct !== null ? `${group.overallPct}%` : "-";
  let html = `<div class="report-overall">Rata-rata keseluruhan: <strong>${overallText}</strong></div>`;

  Object.entries(TOPIC_META).forEach(([key, meta]) => {
    const t = group.topics[key];
    const width = t.pct !== null ? t.pct : 0;
    const pctText = t.pct !== null ? `${t.pct}%` : "-";
    html += `
      <div class="tb-row">
        <div class="tb-row-head">
          <span class="tb-name">${meta.label}</span>
          <span class="tb-score">${t.benar}/${t.total} (${pctText})</span>
        </div>
        <div class="tb-track">
          <div class="tb-fill" style="width:${width}%;background:${meta.color}"></div>
        </div>
      </div>`;
  });

  statsEl.innerHTML = html;
}

function renderReport(data) {
  document.getElementById("report-generated-at").textContent =
    "Diperbarui " + new Date(data.generatedAt).toLocaleString("id-ID", { dateStyle: "medium", timeStyle: "short" }) + " WITA";

  renderGroup(document.getElementById("akumulasi-stats"), document.getElementById("akumulasi-meta"), data.akumulasi, null);

  const hariIniExtra = data.hariIni.dateLabel
    ? `${formatDateLabel(data.hariIni.dateLabel)} · ${data.windowLabel}`
    : data.windowLabel;
  renderGroup(document.getElementById("harini-stats"), document.getElementById("harini-meta"), data.hariIni, hariIniExtra);
}

async function loadReport() {
  const errorEl = document.getElementById("report-load-error");
  const loadingEl = document.getElementById("report-loading");
  errorEl.hidden = true;
  loadingEl.hidden = false;

  try {
    const res = await fetchReportJSONP();
    if (res.status !== "ok") {
      throw new Error(res.message || "Gagal memuat report.");
    }
    renderReport(res.data);
  } catch (err) {
    errorEl.textContent = err.message || "Gagal memuat report.";
    errorEl.hidden = false;
  } finally {
    loadingEl.hidden = true;
  }
}

document.getElementById("btn-refresh").addEventListener("click", loadReport);

loadReport();
