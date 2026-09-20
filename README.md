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

### Kolom di Sheet rekap

| Kolom | Keterangan |
|---|---|
| Timestamp | Waktu submit (waktu server Google) |
| Nama Peserta | Diisi peserta di layar awal (opsional) |
| Skor (%) | Persentase jawaban benar |
| Jumlah Benar / Total Soal | Skor mentah |
| Benar/Total per topik | SPMI/SPME, SNP, Rapor Pendidikan |
| Detail Jawaban (JSON) | Jawaban tiap soal (untuk audit/analisis lanjutan) |

## Struktur proyek

```
index.html          Markup 4 layar kuis (mulai, soal, hasil, pembahasan)
style.css            Tampilan & tema (light/dark otomatis)
script.js            Data 20 soal, logika kuis, pengiriman rekap
apps-script/Code.gs   Kode Google Apps Script untuk menerima rekap hasil kuis
```
