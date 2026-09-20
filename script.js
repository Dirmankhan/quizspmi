// Kuis Interaktif: Sistem Penjaminan Mutu Pendidikan, SNP, dan Rapor Pendidikan
// Sumber: Permendikdasmen No. 21 Tahun 2026 (SPMP), PP No. 57 Tahun 2021 (SNP),
// PP No. 4 Tahun 2022, dan Product Knowledge Rapor Pendidikan Satuan Pendidikan (2025).

const TOPICS = {
  spmi: { label: "SPMI/SPME", color: "var(--a)" },
  snp: { label: "SNP", color: "var(--b)" },
  rapor: { label: "Rapor Pendidikan", color: "var(--c)" },
};

const QUESTIONS = [
  {
    topic: "spmi",
    q: "Menurut Pasal 2 Permendikdasmen Nomor 21 Tahun 2026, apa tujuan Penjaminan Mutu Pendidikan?",
    options: [
      "Menilai kelayakan sarana dan prasarana sekolah",
      "Memastikan penyelenggaraan pendidikan memenuhi dan/atau melampaui standar yang ditetapkan secara berkelanjutan",
      "Menetapkan status akreditasi satuan pendidikan",
      "Mengalokasikan anggaran pendidikan ke daerah",
    ],
    correct: 1,
    explain: "Pasal 2 Permendikdasmen Nomor 21 Tahun 2026 menyebutkan Penjaminan Mutu Pendidikan bertujuan memastikan penyelenggaraan pendidikan memenuhi dan/atau melampaui standar yang ditetapkan secara berkelanjutan.",
  },
  {
    topic: "spmi",
    q: "Berikut ini adalah prinsip Penjaminan Mutu Pendidikan berdasarkan Pasal 3 Permendikdasmen Nomor 21 Tahun 2026, KECUALI:",
    options: ["Objektif", "Transparan", "Kompetitif", "Partisipatif"],
    correct: 2,
    explain: "Pasal 3 Permendikdasmen Nomor 21 Tahun 2026 menetapkan enam prinsip Penjaminan Mutu Pendidikan: objektif, transparan, akuntabel, komprehensif, partisipatif, dan berkelanjutan. \"Kompetitif\" bukan salah satunya.",
  },
  {
    topic: "spmi",
    q: "Berdasarkan Pasal 6 Permendikdasmen Nomor 21 Tahun 2026, di mana SPMI wajib dilaksanakan?",
    options: [
      "Hanya di satuan pendidikan negeri",
      "Di setiap satuan pendidikan",
      "Hanya di satuan pendidikan yang belum terakreditasi",
      "Hanya di tingkat kabupaten/kota",
    ],
    correct: 1,
    explain: "Pasal 6 Permendikdasmen Nomor 21 Tahun 2026 menegaskan SPMI wajib dilaksanakan di setiap satuan pendidikan, baik formal maupun nonformal.",
  },
  {
    topic: "spmi",
    q: "Menurut Pasal 8 Permendikdasmen Nomor 21 Tahun 2026, siklus SPMI (dikenal sebagai siklus 6M) dilaksanakan secara berurutan. Manakah urutan tahap yang benar?",
    options: [
      "Menetapkan → Memetakan → Merencanakan → Melaksanakan → Mengevaluasi → Mengendalikan",
      "Memetakan → Menetapkan → Melaksanakan → Merencanakan → Mengendalikan → Mengevaluasi",
      "Merencanakan → Menetapkan → Memetakan → Mengevaluasi → Melaksanakan → Mengendalikan",
      "Menetapkan → Melaksanakan → Memetakan → Merencanakan → Mengendalikan → Mengevaluasi",
    ],
    correct: 0,
    explain: "Pasal 8 Permendikdasmen Nomor 21 Tahun 2026 mengatur mekanisme SPMI dalam bentuk siklus: Menetapkan → Memetakan → Merencanakan → Melaksanakan → Mengevaluasi → Mengendalikan.",
  },
  {
    topic: "spmi",
    q: "Berdasarkan Pasal 8 Permendikdasmen Nomor 21 Tahun 2026, siklus SPMI sekurang-kurangnya dilaksanakan berapa kali dalam satu tahun?",
    options: ["1 kali", "2 kali", "3 kali", "4 kali"],
    correct: 0,
    explain: "Pasal 8 Permendikdasmen Nomor 21 Tahun 2026 menyatakan siklus SPMI sekurang-kurangnya dilaksanakan 1 kali dalam 1 tahun.",
  },
  {
    topic: "spmi",
    q: "Menurut Pasal 9 dan Pasal 12 Permendikdasmen Nomor 21 Tahun 2026, SPME (Sistem Penjaminan Mutu Eksternal) dilaksanakan oleh siapa?",
    options: [
      "Tim penjaminan mutu internal satuan pendidikan",
      "Lembaga nonstruktural yang bersifat mandiri dan profesional yang bertugas melaksanakan akreditasi",
      "Dinas Pendidikan Kabupaten/Kota",
      "Kepala satuan pendidikan bersama komite sekolah",
    ],
    correct: 1,
    explain: "Pasal 9 dan Pasal 12 Permendikdasmen Nomor 21 Tahun 2026 menyatakan SPME dilakukan oleh lembaga nonstruktural yang mandiri dan profesional, dalam praktiknya oleh BSANP melalui KAN PF dan KAN PNF.",
  },
  {
    topic: "spmi",
    q: "Menurut Pasal 11 Permendikdasmen Nomor 21 Tahun 2026, tim penjaminan mutu pada satuan pendidikan paling sedikit terdiri atas...",
    options: [
      "Kepala Dinas Pendidikan, pengawas, dan guru",
      "Pimpinan satuan pendidikan, pendidik, dan komite sekolah/pemangku kepentingan",
      "Pengawas sekolah dan orang tua peserta didik",
      "Tim BSANP dan asesor eksternal",
    ],
    correct: 1,
    explain: "Pasal 11 Permendikdasmen Nomor 21 Tahun 2026 mengatur SPMI diselenggarakan oleh tim penjaminan mutu yang paling sedikit terdiri atas pimpinan satuan pendidikan, pendidik, dan komite sekolah atau pemangku kepentingan.",
  },
  {
    topic: "snp",
    q: "Menurut Pasal 3 PP Nomor 57 Tahun 2021, Standar Nasional Pendidikan (SNP) mencakup berapa standar?",
    options: ["6 standar", "7 standar", "8 standar", "9 standar"],
    correct: 2,
    explain: "Pasal 3 PP Nomor 57 Tahun 2021 menetapkan SNP mencakup 8 standar: kompetensi lulusan, isi, proses, penilaian pendidikan, tenaga kependidikan, sarana dan prasarana, pengelolaan, dan pembiayaan.",
  },
  {
    topic: "snp",
    q: "Menurut Pasal 3 PP Nomor 57 Tahun 2021, manakah berikut ini yang BUKAN termasuk dalam 8 Standar Nasional Pendidikan?",
    options: ["Standar Isi", "Standar Pengelolaan", "Standar Akreditasi", "Standar Pembiayaan"],
    correct: 2,
    explain: "\"Standar Akreditasi\" tidak termasuk dalam 8 SNP menurut Pasal 3 PP Nomor 57 Tahun 2021. Akreditasi merupakan bagian dari SPME, bukan salah satu dari 8 standar tersebut.",
  },
  {
    topic: "snp",
    q: "Sesuai Pasal 6 ayat (1) PP Nomor 57 Tahun 2021, standar kompetensi lulusan pada jenjang pendidikan dasar difokuskan pada apa?",
    options: [
      "Persiapan menjadi anggota masyarakat yang berakhlak mulia dan mandiri",
      "Penanaman karakter sesuai nilai-nilai Pancasila serta kompetensi literasi dan numerasi",
      "Keterampilan sesuai bidang kejuruan",
      "Pengetahuan untuk melanjutkan pendidikan lebih lanjut",
    ],
    correct: 1,
    explain: "Pasal 6 ayat (1) PP Nomor 57 Tahun 2021: standar kompetensi lulusan pada jenjang pendidikan dasar difokuskan pada penanaman karakter sesuai nilai-nilai Pancasila serta kompetensi literasi dan numerasi peserta didik.",
  },
  {
    topic: "snp",
    q: "Berdasarkan Pasal 16 ayat (5) PP Nomor 57 Tahun 2021, penilaian hasil belajar peserta didik berbentuk apa?",
    options: [
      "Penilaian formatif dan sumatif",
      "Penilaian tertulis dan lisan",
      "Ujian tengah semester dan akhir semester",
      "Penilaian kognitif dan psikomotorik",
    ],
    correct: 0,
    explain: "Pasal 16 ayat (5) PP Nomor 57 Tahun 2021 menyatakan penilaian hasil belajar peserta didik berbentuk penilaian formatif dan penilaian sumatif.",
  },
  {
    topic: "snp",
    q: "Menurut Pasal 28 PP Nomor 57 Tahun 2021, rencana kerja jangka menengah satuan pendidikan disusun untuk periode berapa tahun?",
    options: ["1 tahun", "2 tahun", "4 tahun", "5 tahun"],
    correct: 2,
    explain: "Pasal 28 ayat (4) PP Nomor 57 Tahun 2021 menyatakan rencana kerja jangka menengah disusun untuk periode 4 (empat) tahun, dijabarkan setiap tahun melalui rencana kerja jangka pendek.",
  },
  {
    topic: "snp",
    q: "Berdasarkan Pasal 32 PP Nomor 57 Tahun 2021, pembiayaan pendidikan pada satuan pendidikan terdiri atas apa?",
    options: [
      "Biaya investasi dan biaya operasional",
      "Biaya rutin dan biaya pembangunan",
      "Biaya pemerintah dan biaya masyarakat",
      "Biaya langsung dan biaya tidak langsung",
    ],
    correct: 0,
    explain: "Pasal 32 ayat (2) PP Nomor 57 Tahun 2021: pembiayaan pendidikan terdiri atas biaya investasi (lahan, sarpras, SDM, modal kerja tetap) dan biaya operasional (personalia dan nonpersonalia).",
  },
  {
    topic: "snp",
    q: "Sesuai Pasal 51A PP Nomor 4 Tahun 2022, akreditasi untuk satuan/program pendidikan pada jenjang pendidikan tinggi dilaksanakan oleh?",
    options: [
      "BSANP",
      "Badan Akreditasi Nasional Perguruan Tinggi (BAN-PT)",
      "Dinas Pendidikan Provinsi",
      "Kementerian secara langsung tanpa lembaga khusus",
    ],
    correct: 1,
    explain: "Pasal 51A PP Nomor 4 Tahun 2022 mengatur akreditasi oleh Pemerintah Pusat dilaksanakan oleh badan standardisasi, penjaminan, dan pengendalian mutu untuk PAUD, dikdas, dan dikmen; serta oleh Badan Akreditasi Nasional Perguruan Tinggi untuk jenjang pendidikan tinggi.",
  },
  {
    topic: "rapor",
    q: "Rapor Pendidikan (melalui Rumah Pendidikan) diakses oleh satuan pendidikan menggunakan akun apa?",
    options: ["Akun Dapodik", "Akun belajar.id", "Akun email pribadi", "Akun NISN peserta didik"],
    correct: 1,
    explain: "Rapor Pendidikan diakses melalui situs raporpendidikan.kemendikdasmen.go.id atau Rumah Pendidikan menggunakan Akun belajar.id.",
  },
  {
    topic: "rapor",
    q: "Di dalam platform Rumah Pendidikan, Rapor Pendidikan Satuan Pendidikan berada pada ruang apa?",
    options: ["Ruang Publik", "Ruang Pemerintah", "Ruang Sekolah", "Ruang GTK"],
    correct: 2,
    explain: "Rapor Pendidikan Satuan Pendidikan tersedia di Ruang Sekolah, sedangkan Rapor Pendidikan Daerah di Ruang Pemerintah dan informasi publik di Ruang Publik.",
  },
  {
    topic: "rapor",
    q: "Berapa jumlah Indikator Prioritas Rapor Pendidikan untuk jenjang Dasar dan Menengah (Dasmen)?",
    options: ["3 indikator", "4 indikator", "6 indikator", "8 indikator"],
    correct: 2,
    explain: "Terdapat 3 Indikator Prioritas untuk PAUD, 6 Indikator Prioritas untuk jenjang Dasmen, dan tambahan 2 indikator khusus untuk jenjang SMK (total 8).",
  },
  {
    topic: "rapor",
    q: "Apa kepanjangan dari PBD dalam konteks pemanfaatan Rapor Pendidikan?",
    options: [
      "Program Bantuan Daerah",
      "Perencanaan Berbasis Data",
      "Pemetaan Berbasis Dapodik",
      "Penilaian Berkala Daerah",
    ],
    correct: 1,
    explain: "PBD adalah Perencanaan Berbasis Data, proses yang memanfaatkan hasil analisis Indikator Prioritas dan Akar Masalah pada Rapor Pendidikan untuk menyusun rencana peningkatan mutu.",
  },
  {
    topic: "rapor",
    q: "Dalam pelabelan warna capaian Rapor Pendidikan, bagaimana urutan nilai dari yang paling rendah ke paling tinggi?",
    options: [
      "Kuning < Merah < Hijau",
      "Hijau < Kuning < Merah",
      "Merah < Kuning < Hijau",
      "Merah < Hijau < Kuning",
    ],
    correct: 2,
    explain: "Urutan label warna capaian adalah Merah (paling rendah/kurang) < Kuning (sedang) < Hijau (paling tinggi/baik).",
  },
  {
    topic: "rapor",
    q: "Nilai delta pada Rapor Pendidikan diperoleh dari perhitungan apa?",
    options: [
      "Skor tahun ini dikurangi skor tahun lalu",
      "Skor tahun lalu dikurangi skor tahun ini",
      "Rata-rata skor dua tahun terakhir",
      "Selisih skor satuan pendidikan dengan rata-rata nasional",
    ],
    correct: 0,
    explain: "Nilai delta diperoleh dari skor tahun lalu dikurangkan dengan skor tahun ini, digunakan untuk melihat perubahan/pertumbuhan capaian (meningkat, tetap, atau menurun).",
  },
];

// Tempelkan URL Web App Google Apps Script di sini setelah deploy
// (lihat panduan di apps-script/Code.gs). Kosongkan ("") untuk menonaktifkan
// pengiriman rekap dan menjalankan kuis dalam mode lokal saja.
const RESULTS_ENDPOINT = "https://script.google.com/macros/s/AKfycbwAO_BIJAKpC-gaXmjFGEIaKD-Z_N1UDnFSya1R4YQFH3ycRrpQygS22DkYpkGZeg-pjQ/exec";

// Mengirim rekap hasil kuis ke Google Sheet admin (via Apps Script Web App).
// Menggunakan mode "no-cors" karena Apps Script Web App tidak mengirim header
// CORS; request tetap berhasil diproses di sisi server meski respons tidak
// bisa dibaca di browser. Gagal kirim tidak akan mengganggu tampilan hasil
// kuis bagi peserta (fail-silent).
function submitResultToSheet(payload) {
  if (!RESULTS_ENDPOINT) return;
  fetch(RESULTS_ENDPOINT, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(payload),
  }).catch(() => {
    // Diamkan: peserta tetap melihat hasilnya meski pengiriman rekap gagal.
  });
}

// --- State ---
let currentIndex = 0;
let answers = new Array(QUESTIONS.length).fill(null); // stores selected option index
let playerName = "";

// --- Elements ---
const screens = {
  start: document.getElementById("screen-start"),
  quiz: document.getElementById("screen-quiz"),
  result: document.getElementById("screen-result"),
  review: document.getElementById("screen-review"),
};

function showScreen(name) {
  Object.values(screens).forEach((s) => s.classList.remove("active"));
  screens[name].classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// --- Start screen ---
const elNameInput = document.getElementById("player-name");
const elNameError = document.getElementById("name-error");

elNameInput.addEventListener("input", () => {
  elNameError.hidden = true;
  elNameInput.classList.remove("invalid");
});

document.getElementById("btn-start").addEventListener("click", () => {
  const name = elNameInput.value.trim();
  if (!name) {
    elNameError.hidden = false;
    elNameInput.classList.add("invalid");
    elNameInput.focus();
    return;
  }
  playerName = name;
  currentIndex = 0;
  answers = new Array(QUESTIONS.length).fill(null);
  renderQuestion();
  showScreen("quiz");
});

// Mengembalikan perangkat ke layar awal, siap dipakai peserta berikutnya
// dengan nama baru (mendukung penggunaan 1 perangkat bergiliran).
function goHome() {
  currentIndex = 0;
  answers = new Array(QUESTIONS.length).fill(null);
  playerName = "";
  elNameInput.value = "";
  elNameError.hidden = true;
  elNameInput.classList.remove("invalid");
  showScreen("start");
  elNameInput.focus();
}

document.getElementById("btn-home-quiz").addEventListener("click", () => {
  const hasProgress = answers.some((a) => a !== null);
  if (hasProgress && !confirm("Yakin ingin membatalkan kuis ini dan kembali ke beranda? Jawaban yang sudah diisi akan hilang.")) {
    return;
  }
  goHome();
});

document.getElementById("btn-home-result").addEventListener("click", goHome);
document.getElementById("btn-home-review").addEventListener("click", goHome);

// --- Quiz rendering ---
const elCounter = document.getElementById("question-counter");
const elTopicTag = document.getElementById("topic-tag");
const elProgressFill = document.getElementById("progress-fill");
const elQuestionText = document.getElementById("question-text");
const elOptionsList = document.getElementById("options-list");
const elBtnPrev = document.getElementById("btn-prev");
const elBtnNext = document.getElementById("btn-next");
const elAnswerStatus = document.getElementById("answer-status");

const LETTERS = ["A", "B", "C", "D", "E", "F"];

function renderQuestion() {
  const item = QUESTIONS[currentIndex];
  const total = QUESTIONS.length;

  elCounter.textContent = `Soal ${currentIndex + 1} / ${total}`;
  elTopicTag.textContent = TOPICS[item.topic].label;
  elProgressFill.style.width = `${((currentIndex + 1) / total) * 100}%`;
  elQuestionText.textContent = item.q;

  elOptionsList.innerHTML = "";
  const selected = answers[currentIndex];

  item.options.forEach((optText, idx) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "option";
    btn.innerHTML = `<span class="opt-letter">${LETTERS[idx]}</span><span>${optText}</span>`;

    if (idx === selected) btn.classList.add("selected");

    btn.addEventListener("click", () => selectAnswer(idx));
    elOptionsList.appendChild(btn);
  });

  elBtnPrev.disabled = currentIndex === 0;
  elBtnNext.disabled = selected === null;
  elAnswerStatus.textContent = selected !== null ? "Jawaban tersimpan" : "";

  elBtnNext.textContent = currentIndex === total - 1 ? "Lihat Hasil →" : "Selanjutnya →";
}

function selectAnswer(idx) {
  answers[currentIndex] = idx;
  renderQuestion();
}

elBtnPrev.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    renderQuestion();
  }
});

elBtnNext.addEventListener("click", () => {
  if (currentIndex < QUESTIONS.length - 1) {
    currentIndex++;
    renderQuestion();
  } else {
    showResult();
  }
});

// --- Result screen ---
function showResult() {
  const total = QUESTIONS.length;
  let correctCount = 0;
  const topicStats = {};
  Object.keys(TOPICS).forEach((t) => (topicStats[t] = { correct: 0, total: 0 }));

  QUESTIONS.forEach((item, i) => {
    topicStats[item.topic].total++;
    if (answers[i] === item.correct) {
      correctCount++;
      topicStats[item.topic].correct++;
    }
  });

  const pct = Math.round((correctCount / total) * 100);

  document.getElementById("result-name").textContent = `Hasil kuis untuk ${playerName}`;
  document.getElementById("score-value").textContent = `${pct}%`;
  document.getElementById("score-ring").style.setProperty("--pct", pct);
  document.getElementById("score-correct").textContent = correctCount;
  document.getElementById("score-total").textContent = total;

  let title, message;
  if (pct >= 90) {
    title = "Luar Biasa!";
    message = "Pemahaman Anda tentang SPMI, SNP, dan Rapor Pendidikan sangat kuat.";
  } else if (pct >= 70) {
    title = "Kerja Bagus!";
    message = "Pemahaman Anda sudah baik. Pelajari kembali soal yang keliru untuk lebih mantap.";
  } else if (pct >= 50) {
    title = "Cukup Baik";
    message = "Dasar pemahaman sudah ada. Yuk pelajari kembali pembahasan di bawah.";
  } else {
    title = "Ayo Belajar Lagi";
    message = "Baca kembali Permendikdasmen Nomor 21 Tahun 2026, PP Nomor 57 Tahun 2021, dan materi Rapor Pendidikan.";
  }
  document.getElementById("result-title").textContent = title;
  document.getElementById("score-message").textContent = message;

  submitResultToSheet({
    nama: playerName,
    skorPersen: pct,
    jumlahBenar: correctCount,
    totalSoal: total,
    spmiBenar: topicStats.spmi.correct,
    spmiTotal: topicStats.spmi.total,
    snpBenar: topicStats.snp.correct,
    snpTotal: topicStats.snp.total,
    raporBenar: topicStats.rapor.correct,
    raporTotal: topicStats.rapor.total,
    detail: QUESTIONS.map((item, i) => ({
      soal: i + 1,
      topik: item.topic,
      jawaban: answers[i],
      benar: answers[i] === item.correct,
    })),
  });

  const breakdownEl = document.getElementById("topic-breakdown");
  breakdownEl.innerHTML = "";
  Object.entries(topicStats).forEach(([key, stat]) => {
    const topicPct = stat.total ? Math.round((stat.correct / stat.total) * 100) : 0;
    const row = document.createElement("div");
    row.className = "tb-row";
    row.innerHTML = `
      <div class="tb-row-head">
        <span class="tb-name">${TOPICS[key].label}</span>
        <span class="tb-score">${stat.correct}/${stat.total}</span>
      </div>
      <div class="tb-track">
        <div class="tb-fill" style="width:${topicPct}%;background:${TOPICS[key].color}"></div>
      </div>
    `;
    breakdownEl.appendChild(row);
  });

  showScreen("result");
}

document.getElementById("btn-retry").addEventListener("click", () => {
  currentIndex = 0;
  answers = new Array(QUESTIONS.length).fill(null);
  renderQuestion();
  showScreen("quiz");
});

document.getElementById("btn-review").addEventListener("click", () => {
  renderReview();
  showScreen("review");
});

document.getElementById("btn-back-result").addEventListener("click", () => {
  showScreen("result");
});

// --- Review screen ---
function renderReview() {
  const listEl = document.getElementById("review-list");
  listEl.innerHTML = "";

  QUESTIONS.forEach((item, i) => {
    const userIdx = answers[i];
    const isCorrect = userIdx === item.correct;
    const userText = userIdx !== null ? `${LETTERS[userIdx]}. ${item.options[userIdx]}` : "Tidak dijawab";
    const correctText = `${LETTERS[item.correct]}. ${item.options[item.correct]}`;

    const div = document.createElement("div");
    div.className = "review-item";
    div.innerHTML = `
      <div class="review-item-head">
        <span class="review-num">Soal ${i + 1} &middot; ${TOPICS[item.topic].label}</span>
        <span class="review-badge ${isCorrect ? "correct" : "incorrect"}">${isCorrect ? "Benar" : "Salah"}</span>
      </div>
      <p class="review-question">${item.q}</p>
      <p class="review-answer-row"><span class="label">Jawaban Anda:</span> <span class="value ${isCorrect ? "correct" : "incorrect"}">${userText}</span></p>
      ${!isCorrect ? `<p class="review-answer-row"><span class="label">Jawaban benar:</span> <span class="value correct">${correctText}</span></p>` : ""}
      <p class="review-explain">${item.explain}</p>
    `;
    listEl.appendChild(div);
  });
}
