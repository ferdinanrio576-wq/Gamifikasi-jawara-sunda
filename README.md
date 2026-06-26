# Jawara Sunda - Gamifikasi Bahasa Sunda

Aplikasi edukasi gamifikasi untuk siswa Sekolah Dasar yang bertujuan meningkatkan minat belajar Bahasa Sunda melalui pendekatan learning by playing.

## 🎯 Tujuan Sistem
- Meningkatkan motivasi belajar siswa
- Meningkatkan engagement dan retention
- Membentuk kebiasaan belajar rutin
- Membuat pembelajaran lebih interaktif dan tidak membosankan

## 👤 Aktor
- User: Siswa SD

## 🧩 Fitur Utama

### 1. Autentikasi
- Login user dengan avatar personalization
- Validasi user
- Logout

### 2. Dashboard
- Tombol Play Quiz
- Pilih materi
- Leaderboard
- Progress belajar
- Badge & achievement
- Daily challenges

### 3. Pembelajaran
- User memilih materi
- Sistem menampilkan materi
- User dapat mengulang materi
- Materi terbuka berdasarkan level (unlock system)
- 10 materi bahasa Sunda lengkap

### 4. Kuis
- User mengerjakan kuis
- Sistem memvalidasi jawaban
- Sistem menghitung skor
- Menampilkan hasil kuis
- Soal random + timer (anti-cheat)
- Feedback animasi untuk jawaban benar/salah

### 5. Sistem Gamifikasi
#### 🎯 Point System
- Login harian: +5 poin (1x/hari)
- Selesaikan materi: +15 poin
- Kuis: +20 poin per soal benar
- Challenge: +30 poin
- Referral: +50 poin

#### 🎁 Bonus
- Perfect score: +10 poin
- Streak bonus: +5 poin per hari berturut-turut
- Level up celebration: +25 poin

#### 🏆 Level System
- 10 level dengan nama identitas Sunda:
  - Level 1: Pemula Sunda
  - Level 2: Pengenal Sunda
  - Level 3: Penjelajah Sunda
  - Level 4: Pencinta Budaya
  - Level 5: Jawara Muda
  - Level 6: Jawara Sejati
  - Level 7-10: Master Sunda

#### 🏅 Badge System (Tiered)
- **Bronze**: 2 materi selesai (+25 poin)
- **Silver**: 4 materi selesai (+60 poin)
- **Gold**: 5 materi selesai (+100 poin)

#### 🔥 Streak System
- Login harian berturut-turut
- Bonus poin untuk streak panjang
- Reset jika melewatkan hari

#### 📊 Leaderboard
- Peringkat berdasarkan poin total
- Peringkat berdasarkan streak
- Peringkat berdasarkan level

## 🛠️ Teknologi
- **Frontend**: HTML5, CSS3, JavaScript ES6+
- **Styling**: Custom CSS dengan animasi
- **Storage**: localStorage untuk persistensi data
- **Font**: Google Fonts (Comic Neue)
- **Responsive**: Mobile & Desktop friendly

## 📁 Struktur File
```
├── index.html          # Main HTML structure
├── css/
│   └── style.css       # Complete styling & animations
├── js/
│   ├── app.js          # Core application logic
│   └── data.js         # Content & game data
└── README.md           # Documentation
```

## 🚀 Cara Menjalankan
1. Buka file `index.html` di browser web
2. Masukkan nama lengkap (maksimal 20 karakter)
3. Pilih avatar favorit
4. Klik "Masuk" untuk mulai belajar
5. Jelajahi fitur gamifikasi yang tersedia

## 🎮 Gameplay Flow
1. **Login** → Pilih avatar → Dashboard
2. **Belajar** → Pilih materi → Baca → Selesai (+15 poin)
3. **Kuis** → Jawab soal → Lihat skor → Bonus poin
4. **Challenge** → Claim daily reward (+30 poin)
5. **Progress** → Lihat statistik → Unlock level baru
6. **Leaderboard** → Lihat peringkat → Motivasi bersaing

## 📈 Metrik Kesuksesan
- Tingkat completion materi > 80%
- Rata-rata session time > 15 menit
- User retention rate > 70%
- Daily active users konsisten

## 🎨 UI/UX Design
- **Color Scheme**: Warna cerah anak-anak friendly
- **Typography**: Comic Neue untuk kemudahan membaca
- **Animations**: Smooth transitions & gamification effects
- **Navigation**: Breadcrumb & back buttons
- **Responsive**: Adaptive untuk semua device

## 🔧 Development Notes
- Built with vanilla JavaScript (no frameworks)
- Modular class-based architecture
- localStorage untuk data persistence
- Anti-cheat measures pada kuis
- Comprehensive error handling

---
**Dibuat untuk**: Mata Kuliah Gamifikasi
**Tanggal**: April 2026
**Status**: ✅ Production Ready
- Streak login: +5 poin tambahan

#### ❌ Penalti
- Tidak menyelesaikan challenge: -5 poin

### 6. Level System (Progression)
Naik level setiap 100 poin
- Level 1–3: Pemula Sunda
- Level 4–6: Penjelajah Sunda
- Level 7–9: Jawara Muda
- Level 10+: Master Sunda

### 7. Badge System (Achievement)
- Beginner → login pertama
- Consistent User → login 7 hari
- Ahli Kuis → skor 100
- Explorer → selesai 10 materi
- Master Sunda → mencapai level tinggi

### 8. Leaderboard
- Ranking berdasarkan poin
- Tampilkan posisi user
- Update real-time

### 9. Challenge System
- Challenge harian & mingguan
- Reward poin
- Hanya bisa diklaim 1x

### 10. Streak System
- Hitung login harian berturut-turut
- Berikan bonus poin
- Reset jika terputus

### 11. Progress Tracking
- Progress belajar user
- Riwayat kuis
- Level saat ini
- Badge yang sudah didapat

## 🚀 Cara Menjalankan

1. Buka file `index.html` di browser web (Chrome, Firefox, Edge, dll.)
2. Aplikasi akan langsung berjalan tanpa perlu server

## 📊 Teknologi yang Digunakan

- HTML5
- CSS3 (dengan animasi dan gradient)
- JavaScript (ES6+)
- Local Storage untuk penyimpanan data

## 🎨 UI/UX Guidelines

- Desain ceria, colorful, ramah anak SD
- Navigasi sederhana
- Feedback visual (animasi saat dapat poin/badge)
- Gunakan bahasa sederhana

## 🛡️ Aturan Tambahan

- Reward tidak bisa diulang
- Poin harian dibatasi
- Challenge memiliki deadline
- Soal kuis random
- Timer pada kuis

## 📈 Evaluasi Sistem

- Engagement (frekuensi penggunaan)
- Retention (kembali menggunakan aplikasi)
- Completion rate (penyelesaian materi)
- User satisfaction

## 📁 Struktur Proyek

```
jawara-sunda/
├── index.html          # File utama HTML
├── css/
│   └── style.css       # Styling aplikasi
├── js/
│   ├── app.js          # Logika utama aplikasi
│   └── data.js         # Data materi dan soal kuis
└── assets/             # Folder untuk gambar dan asset lainnya
```

## 🔧 Fitur Teknis

- Responsive design untuk berbagai ukuran layar
- Animasi CSS untuk feedback visual
- Local Storage untuk persistensi data
- Timer untuk kuis dengan anti-cheat
- Sistem level dan unlock content
- Leaderboard dengan sorting real-time

## 📝 Catatan Pengembang

Aplikasi ini dibuat sebagai prototype untuk demonstrasi konsep gamifikasi dalam pembelajaran bahasa Sunda. Untuk production, disarankan untuk:

1. Menggunakan database untuk penyimpanan data
2. Menambahkan authentication yang lebih aman
3. Implementasi server-side untuk leaderboard global
4. Menambahkan lebih banyak materi dan soal
5. Testing pada berbagai device dan browser

---

**Dibuat dengan ❤️ untuk siswa SD Indonesia**