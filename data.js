// Jawara Sunda - Gamifikasi Bahasa Sunda
// Data untuk materi dan soal kuis

const materials = [
    {
        id: 1,
        title: "Salam dan Perkenalan",
        level: 1,
        content: `
            <h3>Hai, teman-teman! Mari belajar bahasa Sunda!</h3>
            <p>Bahasa Sunda adalah bahasa daerah yang indah dari Jawa Barat. Mari kita mulai dengan salam dan perkenalan.</p>
            <h4>Salam dalam Bahasa Sunda:</h4>
            <ul>
                <li><strong>Halo</strong> = "Halo" atau "Wilujeng"</li>
                <li><strong>Selamat pagi</strong> = "Wilujeng énjing"</li>
                <li><strong>Selamat siang</strong> = "Wilujeng siang"</li>
                <li><strong>Selamat sore</strong> = "Wilujeng sonten"</li>
                <li><strong>Selamat malam</strong> = "Wilujeng wengi"</li>
            </ul>
            <h4>Perkenalan:</h4>
            <ul>
                <li><strong>Nama saya...</strong> = "Abdi nami..."</li>
                <li><strong>Saya dari...</strong> = "Abdi ti..."</li>
                <li><strong>Umur saya...</strong> = "Umur abdi..."</li>
            </ul>
            <p>Coba latihan: "Wilujeng énjing! Abdi nami Ahmad. Abdi ti Bandung. Umur abdi 10 taun."</p>
        `
    },
    {
        id: 2,
        title: "Keluarga dan Anggota Tubuh",
        level: 2,
        content: `
            <h3>Mengenal Keluarga dan Anggota Tubuh</h3>
            <p>Mari kita pelajari kata-kata untuk keluarga dan bagian tubuh dalam bahasa Sunda!</p>
            <h4>Anggota Keluarga:</h4>
            <ul>
                <li><strong>Ayah</strong> = "Bapa"</li>
                <li><strong>Ibu</strong> = "Indung"</li>
                <li><strong>Kakak laki-laki</strong> = "Lanceuk"</li>
                <li><strong>Kakak perempuan</strong> = "Rarang"</li>
                <li><strong>Adik laki-laki</strong> = "Adi"</li>
                <li><strong>Adik perempuan</strong> = "Nonoman"</li>
            </ul>
            <h4>Anggota Tubuh:</h4>
            <ul>
                <li><strong>Kepala</strong> = "Sirah"</li>
                <li><strong>Mata</strong> = "Panon"</li>
                <li><strong>Hidung</strong> = "Irung"</li>
                <li><strong>Mulut</strong> = "Sungut"</li>
                <li><strong>Tangan</strong> = "Leungeun"</li>
                <li><strong>Kaki</strong> = "Suku"</li>
            </ul>
        `
    },
    {
        id: 3,
        title: "Makanan dan Minuman",
        level: 3,
        content: `
            <h3>Makanan dan Minuman Favorit</h3>
            <p>Yuk, belajar nama makanan dan minuman dalam bahasa Sunda!</p>
            <h4>Makanan:</h4>
            <ul>
                <li><strong>Nasi</strong> = "Sangu"</li>
                <li><strong>Ayam</strong> = "Hayam"</li>
                <li><strong>Ikan</strong> = "Lauk"</li>
                <li><strong>Sayur</strong> = "Lalab"</li>
                <li><strong>Buah</strong> = "Buah"</li>
            </ul>
            <h4>Minuman:</h4>
            <ul>
                <li><strong>Air</strong> = "Cai"</li>
                <li><strong>Susu</strong> = "Susu"</li>
                <li><strong>Teh</strong> = "Teh"</li>
                <li><strong>Jus</strong> = "Jus"</li>
            </ul>
            <p>Contoh kalimat: "Abdi hoyong tuang sangu jeung lauk hayam."</p>
        `
    },
    {
        id: 4,
        title: "Hewan dan Alam",
        level: 4,
        content: `
            <h3>Dunia Hewan dan Alam Sekitar</h3>
            <p>Mari eksplorasi nama hewan dan alam dalam bahasa Sunda!</p>
            <h4>Hewan:</h4>
            <ul>
                <li><strong>Kucing</strong> = "Ucing"</li>
                <li><strong>Anjing</strong> = "Anjing"</li>
                <li><strong>Sapi</strong> = "Sapi"</li>
                <li><strong>Kuda</strong> = "Kuda"</li>
                <li><strong>Burung</strong> = "Manuk"</li>
            </ul>
            <h4>Alam:</h4>
            <ul>
                <li><strong>Gunung</strong> = "Gunung"</li>
                <li><strong>Sungai</strong> = "Walungan"</li>
                <li><strong>Laut</strong> = "Laut"</li>
                <li><strong>Hutan</strong> = "Leuweung"</li>
                <li><strong>Matahari</strong> = "Panonpoé"</li>
            </ul>
        `
    },
    {
        id: 5,
        title: "Angka dan Waktu",
        level: 5,
        content: `
            <h3>Belajar Angka dan Waktu</h3>
            <p>Yuk, hitung dan sebutkan waktu dalam bahasa Sunda!</p>
            <h4>Angka 1-10:</h4>
            <ul>
                <li>1 = Hiji</li>
                <li>2 = Dua</li>
                <li>3 = Tilu</li>
                <li>4 = Opat</li>
                <li>5 = Lima</li>
                <li>6 = Genep</li>
                <li>7 = Tujuh</li>
                <li>8 = Dalapan</li>
                <li>9 = Salapan</li>
                <li>10 = Sapuluh</li>
            </ul>
            <h4>Hari dalam Seminggu:</h4>
            <ul>
                <li>Senin = Senén</li>
                <li>Selasa = Salasa</li>
                <li>Rabu = Rebo</li>
                <li>Kamis = Kemis</li>
                <li>Jumat = Jumaah</li>
                <li>Sabtu = Saptu</li>
                <li>Minggu = Minggu</li>
            </ul>
        `
    }
];

const quizQuestions = []; // Deprecated - use materialQuizzes instead

// Soal Kuis yang disesuaikan dengan setiap Materi
const materialQuizzes = {
    1: [ // Materi: Salam dan Perkenalan
        {
            question: "Apa arti kata 'Wilujeng' dalam bahasa Indonesia?",
            options: ["Selamat", "Halo", "Terima kasih", "Maaf"],
            correct: 0
        },
        {
            question: "Bagaimana cara mengatakan 'Selamat pagi' dalam bahasa Sunda?",
            options: ["Wilujeng sonten", "Wilujeng énjing", "Wilujeng siang", "Wilujeng wengi"],
            correct: 1
        },
        {
            question: "Apa arti 'Abdi nami' dalam bahasa Indonesia?",
            options: ["Saya dari", "Nama saya", "Umur saya", "Aku adalah"],
            correct: 1
        },
        {
            question: "Bagaimana cara mengatakan 'Selamat sore' dalam bahasa Sunda?",
            options: ["Wilujeng énjing", "Wilujeng siang", "Wilujeng sonten", "Wilujeng wengi"],
            correct: 2
        },
        {
            question: "Apa arti 'Abdi ti' dalam bahasa Indonesia?",
            options: ["Saya dari", "Nama saya", "Umur saya", "Aku adalah"],
            correct: 0
        },
        {
            question: "Bagaimana cara mengatakan 'Selamat malam' dalam bahasa Sunda?",
            options: ["Wilujeng énjing", "Wilujeng siang", "Wilujeng sonten", "Wilujeng wengi"],
            correct: 3
        },
        {
            question: "Apa arti 'Umur abdi' dalam bahasa Indonesia?",
            options: ["Saya dari", "Nama saya", "Umur saya", "Aku adalah"],
            correct: 2
        },
        {
            question: "Bagaimana cara menyapa seseorang dalam bahasa Sunda?",
            options: ["Halo", "Wilujeng", "Permisi", "Terima kasih"],
            correct: 1
        },
        {
            question: "Apa arti 'Taun' dalam bahasa Sunda?",
            options: ["Hari", "Bulan", "Tahun", "Minggu"],
            correct: 2
        },
        {
            question: "Bagaimana cara mengatakan 'Umur saya 10 tahun' dalam bahasa Sunda?",
            options: ["Umur abdi 10 taun", "Abdi 10 taun", "Taun abdi 10", "Abdi nami 10"],
            correct: 0
        }
    ],
    2: [ // Materi: Keluarga dan Anggota Tubuh
        {
            question: "Apa arti kata 'Bapa' dalam bahasa Sunda?",
            options: ["Ibu", "Ayah", "Kakak", "Adik"],
            correct: 1
        },
        {
            question: "Bagaimana cara mengatakan 'Mata' dalam bahasa Sunda?",
            options: ["Sirah", "Panon", "Irung", "Sungut"],
            correct: 1
        },
        {
            question: "Apa arti kata 'Indung' dalam bahasa Sunda?",
            options: ["Ayah", "Ibu", "Kakak", "Adik"],
            correct: 1
        },
        {
            question: "Bagaimana cara mengatakan 'Kepala' dalam bahasa Sunda?",
            options: ["Sirah", "Panon", "Irung", "Sungut"],
            correct: 0
        },
        {
            question: "Apa arti kata 'Lanceuk' dalam bahasa Sunda?",
            options: ["Kakak perempuan", "Kakak laki-laki", "Adik laki-laki", "Adik perempuan"],
            correct: 1
        },
        {
            question: "Bagaimana cara mengatakan 'Hidung' dalam bahasa Sunda?",
            options: ["Sirah", "Panon", "Irung", "Sungut"],
            correct: 2
        },
        {
            question: "Apa arti kata 'Rarang' dalam bahasa Sunda?",
            options: ["Kakak perempuan", "Kakak laki-laki", "Adik laki-laki", "Adik perempuan"],
            correct: 0
        },
        {
            question: "Bagaimana cara mengatakan 'Mulut' dalam bahasa Sunda?",
            options: ["Sirah", "Panon", "Irung", "Sungut"],
            correct: 3
        },
        {
            question: "Apa arti kata 'Leungeun' dalam bahasa Sunda?",
            options: ["Kepala", "Tangan", "Kaki", "Telinga"],
            correct: 1
        },
        {
            question: "Bagaimana cara mengatakan 'Kaki' dalam bahasa Sunda?",
            options: ["Sirah", "Leungeun", "Suku", "Sungut"],
            correct: 2
        }
    ],
    3: [ // Materi: Makanan dan Minuman
        {
            question: "Apa arti kata 'Sangu' dalam bahasa Sunda?",
            options: ["Ayam", "Nasi", "Ikan", "Sayur"],
            correct: 1
        },
        {
            question: "Bagaimana cara mengatakan 'Ayam' dalam bahasa Sunda?",
            options: ["Lauk", "Hayam", "Lalab", "Buah"],
            correct: 1
        },
        {
            question: "Apa arti kata 'Lauk' dalam bahasa Sunda?",
            options: ["Nasi", "Ayam", "Ikan", "Sayur"],
            correct: 2
        },
        {
            question: "Bagaimana cara mengatakan 'Sayur' dalam bahasa Sunda?",
            options: ["Lauk", "Lalab", "Buah", "Sangu"],
            correct: 1
        },
        {
            question: "Apa arti kata 'Cai' dalam bahasa Sunda?",
            options: ["Susu", "Teh", "Air", "Jus"],
            correct: 2
        },
        {
            question: "Bagaimana cara mengatakan 'Susu' dalam bahasa Sunda?",
            options: ["Cai", "Susu", "Teh", "Jus"],
            correct: 1
        },
        {
            question: "Apa arti kata 'Teh' dalam bahasa Sunda?",
            options: ["Air", "Susu", "Teh", "Jus"],
            correct: 2
        },
        {
            question: "Bagaimana cara mengatakan 'Buah' dalam bahasa Sunda?",
            options: ["Lauk", "Lalab", "Buah", "Sangu"],
            correct: 2
        },
        {
            question: "Apa arti 'tuang' dalam kalimat 'Abdi hoyong tuang sangu jeung lauk hayam'?",
            options: ["Melihat", "Makan", "Membeli", "Memasak"],
            correct: 1
        },
        {
            question: "Bagaimana cara mengatakan 'Jus' dalam bahasa Sunda?",
            options: ["Cai", "Susu", "Teh", "Jus"],
            correct: 3
        }
    ],
    4: [ // Materi: Hewan dan Alam
        {
            question: "Apa arti kata 'Ucing' dalam bahasa Sunda?",
            options: ["Anjing", "Kucing", "Sapi", "Kuda"],
            correct: 1
        },
        {
            question: "Bagaimana cara mengatakan 'Anjing' dalam bahasa Sunda?",
            options: ["Ucing", "Anjing", "Sapi", "Kuda"],
            correct: 1
        },
        {
            question: "Apa arti kata 'Sapi' dalam bahasa Sunda?",
            options: ["Kucing", "Anjing", "Sapi", "Kuda"],
            correct: 2
        },
        {
            question: "Bagaimana cara mengatakan 'Kuda' dalam bahasa Sunda?",
            options: ["Ucing", "Anjing", "Sapi", "Kuda"],
            correct: 3
        },
        {
            question: "Apa arti kata 'Manuk' dalam bahasa Sunda?",
            options: ["Kucing", "Sapi", "Burung", "Kuda"],
            correct: 2
        },
        {
            question: "Bagaimana cara mengatakan 'Gunung' dalam bahasa Sunda?",
            options: ["Walungan", "Laut", "Leuweung", "Gunung"],
            correct: 3
        },
        {
            question: "Apa arti kata 'Walungan' dalam bahasa Sunda?",
            options: ["Gunung", "Sungai", "Laut", "Hutan"],
            correct: 1
        },
        {
            question: "Bagaimana cara mengatakan 'Hutan' dalam bahasa Sunda?",
            options: ["Walungan", "Laut", "Leuweung", "Gunung"],
            correct: 2
        },
        {
            question: "Apa arti kata 'Panonpoé' dalam bahasa Sunda?",
            options: ["Bulan", "Matahari", "Bintang", "Awan"],
            correct: 1
        },
        {
            question: "Bagaimana cara mengatakan 'Laut' dalam bahasa Sunda?",
            options: ["Walungan", "Laut", "Leuweung", "Gunung"],
            correct: 1
        }
    ],
    5: [ // Materi: Angka dan Waktu
        {
            question: "Bagaimana cara mengatakan angka '1' dalam bahasa Sunda?",
            options: ["Hiji", "Dua", "Tilu", "Opat"],
            correct: 0
        },
        {
            question: "Apa arti angka 'Dua' dalam bahasa Sunda?",
            options: ["1", "2", "3", "4"],
            correct: 1
        },
        {
            question: "Bagaimana cara mengatakan angka '3' dalam bahasa Sunda?",
            options: ["Hiji", "Dua", "Tilu", "Opat"],
            correct: 2
        },
        {
            question: "Apa arti angka 'Opat' dalam bahasa Sunda?",
            options: ["2", "3", "4", "5"],
            correct: 2
        },
        {
            question: "Bagaimana cara mengatakan angka '5' dalam bahasa Sunda?",
            options: ["Genep", "Tujuh", "Lima", "Dalapan"],
            correct: 2
        },
        {
            question: "Apa arti 'Senén' dalam bahasa Sunda?",
            options: ["Selasa", "Senin", "Rabu", "Kamis"],
            correct: 1
        },
        {
            question: "Bagaimana cara mengatakan 'Selasa' dalam bahasa Sunda?",
            options: ["Senén", "Salasa", "Rebo", "Kemis"],
            correct: 1
        },
        {
            question: "Apa arti 'Rebo' dalam bahasa Sunda?",
            options: ["Selasa", "Rabu", "Kamis", "Jumat"],
            correct: 1
        },
        {
            question: "Bagaimana cara mengatakan 'Sabtu' dalam bahasa Sunda?",
            options: ["Kemis", "Jumaah", "Saptu", "Minggu"],
            correct: 2
        },
        {
            question: "Apa arti 'Minggu' dalam bahasa Sunda?",
            options: ["Senin", "Sabtu", "Minggu", "Jumat"],
            correct: 2
        }
    ]
};

// Level Names - Progression Identity (NOT just numbers!)
const levelNames = [
    "Pemula Sunda",        // Level 1 - Beginner
    "Pengenal Sunda",      // Level 2
    "Penjelajah Sunda",    // Level 3
    "Pencinta Budaya",     // Level 4
    "Jawara Muda",         // Level 5 - Mid tier
    "Jawara Sejati",       // Level 6
    "Guru Sunda",          // Level 7
    "Legenda Sunda",       // Level 8
    "Master Sunda",        // Level 9
    "Juara Bahasa Sunda"   // Level 10 - Ultimate
];

// Avatar Options for Personalization
const avatarOptions = [
    { id: 1, emoji: '🦄', name: 'Unicorn Ajaib' },
    { id: 2, emoji: '🐼', name: 'Panda Lucu' },
    { id: 3, emoji: '🐨', name: 'Koala Imut' },
    { id: 4, emoji: '🐬', name: 'Lumba-lumba' },
    { id: 5, emoji: '🧚', name: 'Peri Ceria' },
    { id: 6, emoji: '🎈', name: 'Balon Ceria' }
];

// TIERED BADGE SYSTEM - Bronze, Silver, Gold (NOT just unlock/lock!)
const badges = [
    { 
        id: 'first_step', 
        name: 'Langkah Pertama', 
        description: 'Login pertama kali', 
        icon: '👣',
        tiers: [
            { tier: 'bronze', requirement: { loginCount: 1 }, reward: '+10 poin bonus' },
            { tier: 'silver', requirement: { loginCount: 5 }, reward: '+25 poin bonus' },
            { tier: 'gold', requirement: { loginCount: 10 }, reward: '+50 poin bonus' }
        ]
    },
    { 
        id: 'consistent_warrior', 
        name: 'Prajurit Konsisten', 
        description: 'Login hari-hari berturut-turut', 
        icon: '🔥',
        tiers: [
            { tier: 'bronze', requirement: { streak: 3 }, reward: '+20 poin' },
            { tier: 'silver', requirement: { streak: 7 }, reward: '+50 poin' },
            { tier: 'gold', requirement: { streak: 14 }, reward: '+100 poin' }
        ]
    },
    { 
        id: 'quiz_champion', 
        name: 'Juara Kuis', 
        description: 'Jawab kuis dengan sempurna', 
        icon: '🏆',
        tiers: [
            { tier: 'bronze', requirement: { perfectQuizScores: 1 }, reward: '+30 poin' },
            { tier: 'silver', requirement: { perfectQuizScores: 3 }, reward: '+60 poin' },
            { tier: 'gold', requirement: { perfectQuizScores: 5 }, reward: '+100 poin' }
        ]
    },
    { 
        id: 'knowledge_seeker', 
        name: 'Pencari Ilmu', 
        description: 'Selesaikan materi pembelajaran', 
        icon: '📚',
        tiers: [
            { tier: 'bronze', requirement: { completedMaterials: 2 }, reward: '+25 poin' },
            { tier: 'silver', requirement: { completedMaterials: 4 }, reward: '+60 poin' },
            { tier: 'gold', requirement: { completedMaterials: 5 }, reward: '+100 poin' }
        ]
    },
    { 
        id: 'master_level', 
        name: 'Ahli Bahasa Sunda', 
        description: 'Capai level tertinggi', 
        icon: '👑',
        tiers: [
            { tier: 'bronze', requirement: { level: 5 }, reward: '+50 poin' },
            { tier: 'silver', requirement: { level: 8 }, reward: '+100 poin' },
            { tier: 'gold', requirement: { level: 10 }, reward: '+200 poin' }
        ]
    }
];

// Daily Challenge Templates - Small missions for daily engagement
const dailyChallenges = [
    { id: 1, title: 'Kuis Kilat', description: 'Selesaikan 1 kuis hari ini', reward: '+30 poin', type: 'quiz' },
    { id: 2, title: 'Pelajar Rajin', description: 'Pelajari 2 materi hari ini', reward: '+25 poin', type: 'material' },
    { id: 3, title: 'Sempurna!', description: 'Dapatkan skor 100 di kuis', reward: '+50 poin', type: 'perfect' },
    { id: 4, title: 'Materi Master', description: 'Selesaikan semua materi yang tersedia', reward: '+40 poin', type: 'all_materials' },
    { id: 5, title: 'Streak Keeper', description: 'Jangan lewatkan login hari ini', reward: '+15 poin', type: 'login' }
];