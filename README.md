# Kuis SPMI, SNP & Rapor Pendidikan

Kuis interaktif 20 soal pilihan ganda tentang Sistem Penjaminan Mutu Pendidikan
(SPMI/SPME), Standar Nasional Pendidikan (SNP), dan Rapor Pendidikan Satuan
Pendidikan. Berjalan sepenuhnya sebagai halaman statis (HTML/CSS/JS), tanpa
build step.

## Menjalankan

Buka `index.html` langsung di browser, atau jalankan server statis sederhana:

```bash
python3 -m http.server 8000
```

lalu akses `http://localhost:8000`.

## Rekap hasil untuk admin (Google Sheets)

Kuis ini dapat mengirim hasil setiap peserta (nama, skor, skor per topik, dan
detail jawaban) ke Google Sheet secara otomatis melalui Google Apps Script.

Sheet rekap: **Rekap Hasil Kuis SPMI-SNP-Rapor Pendidikan** (dibuat di Google
Drive admin).

### Langkah setup (sekali saja)

1. Buka Sheet rekap di Google Drive.
2. Menu **Extensions > Apps Script**.
3. Hapus isi `Code.gs` bawaan, tempel seluruh isi file [`apps-script/Code.gs`](apps-script/Code.gs)
   dari repo ini, lalu simpan (Ctrl+S).
4. Klik **Deploy > New deployment**.
   - Pilih tipe **Web app**.
   - **Execute as**: Me.
   - **Who has access**: Anyone.
5. Klik **Deploy**, lalu salin URL Web App yang diakhiri `/exec`.
6. Buka `script.js`, isi konstanta berikut dengan URL tersebut:

   ```js
   const RESULTS_ENDPOINT = "https://script.google.com/macros/s/XXXXXXXX/exec";
   ```

7. Commit & push perubahan. Mulai saat itu, setiap peserta yang menyelesaikan
   kuis akan otomatis tercatat sebagai baris baru di Sheet rekap.

Jika `RESULTS_ENDPOINT` dikosongkan (`""`), kuis tetap berjalan normal secara
lokal — hanya saja hasil tidak dikirim ke rekap admin.

**Setiap kali isi `apps-script/Code.gs` diubah**, deployment lama TIDAK
otomatis memakai kode terbaru. Buka Apps Script editor → **Deploy > Manage
deployments** → klik ikon pensil pada deployment aktif → **Version: New
version** → **Deploy**. URL `/exec` tetap sama, tidak perlu diganti di
`script.js`/`report.js`.

### Kolom di Sheet rekap

| Kolom | Keterangan |
|---|---|
| Timestamp | Waktu submit (waktu server Google) |
| Nama Peserta | Wajib diisi peserta di layar awal |
| Skor (%) | Persentase jawaban benar |
| Jumlah Benar / Total Soal | Skor mentah |
| Benar/Total per topik | SPMI/SPME, SNP, Rapor Pendidikan |
| Detail Jawaban (JSON) | Jawaban tiap soal (untuk audit/analisis lanjutan) |

## Password kuis

Halaman kuis (`index.html`) dikunci password sebelum peserta bisa mulai:

| Password default | Diperiksa di | Ubah di |
|---|---|---|
| `spmi2026` | Browser peserta | Konstanta `QUIZ_PASSWORD` di `script.js` |

Ini proteksi ringan sisi-browser (mencegah akses tidak sengaja/casual) —
siapa pun yang membuka "View Source" bisa membacanya, karena kuis ini
halaman statis tanpa server. Cukup untuk mengontrol siapa yang mulai
mengerjakan, tapi jangan andalkan untuk data yang benar-benar rahasia.

Setelah password benar, sesi browser tersebut tidak akan ditanya lagi
sampai tab/browser ditutup — cocok untuk satu perangkat dipakai bergiliran
oleh banyak peserta dalam satu sesi kegiatan.

Report (lihat di bawah) **tidak** dikunci password — siapa pun yang membuka
`index.html`, termasuk peserta, langsung melihatnya di sebelah kuis.

## Report

Menampilkan persentase jawaban benar per topik (SPMI/SPME, SNP, Rapor
Pendidikan), dibagi dua bagian, terbuka untuk siapa saja (peserta maupun
admin):

- **Akumulasi** (bagian atas) — seluruh jawaban dari hari-hari *sebelum*
  hari ini, terus terakumulasi dari waktu ke waktu.
- **Hari Ini** (bagian bawah) — jawaban hari ini yang masuk pukul
  **07:30–11:00 WITA**. Jawaban hari ini di luar jam tersebut tidak masuk
  ke bagian mana pun (sesuai maksud laporan: memantau sesi pagi hari itu).

Report ini tampil dengan dua cara:

1. **Panel di sebelah kanan kuis** — begitu `index.html` dibuka, panel report
   langsung tampil berdampingan dengan kuis (di layar sempit/HP, panel ini
   pindah ke bawah kuis, bukan terpotong).
2. **Halaman `report.html` tersendiri** — kalau ingin ditampilkan sendirian
   (misalnya di layar proyektor terpisah tanpa kuis di sampingnya).

Keduanya mengambil data yang sama langsung dari Sheet rekap setiap halaman
dibuka atau tombol **Muat Ulang** diklik — tidak perlu setup tambahan selain
`apps-script/Code.gs` yang sama dengan yang dipakai kuis.

## Struktur proyek

```
index.html            Markup kuis (gerbang password, mulai, soal, hasil, pembahasan)
                        + panel report di sebelah kanan
report.html            Report sebagai halaman tersendiri (opsional, tanpa password)
style.css              Tampilan & tema (light/dark otomatis), dipakai kedua halaman
script.js              Data 20 soal, logika kuis, gerbang password, pengiriman rekap
report.js              Pengambilan & render data report (JSONP ke Apps Script),
                        dipakai bersama oleh index.html dan report.html
apps-script/Code.gs     Kode Google Apps Script: terima submit kuis + layani data report
```
