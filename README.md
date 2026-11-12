# RawonBillish (Illy) — Personal Artist Portfolio

Website portofolio pribadi & *creative playground* untuk **RawonBillish (Illy)** — *"Just a Little Artist in a Big Creative World."*

Dibangun menggunakan **Next.js (App Router)**, **React**, **TypeScript**, **Tailwind CSS v4**, **Lucide Icons**, dan **Fontsource** (`Plus Jakarta Sans`, `DM Sans`, `JetBrains Mono`) dengan sistem data JSON semi-dinamis sehingga konten, karya, bahasa (`EN` / `ID`), dan tautan sosial mudah diubah tanpa perlu menyentuh kode komponen UI.

---

## Daftar Isi

- [1. Menjalankan Proyek Secara Lokal](#1-menjalankan-proyek-secara-lokal)
- [2. Peta Cepat: Mau Ubah Apa? Edit di Mana?](#2-peta-cepat-mau-ubah-apa-edit-di-mana)
- [3. Struktur Folder Proyek](#3-struktur-folder-proyek)
- [4. Panduan Mengubah Konten & Karya](#4-panduan-mengubah-konten--karya)
  - [A. Menambah, Mengedit, atau Menghapus Artwork](#a-menambah-mengedit-atau-menghapus-artwork)
  - [B. Mengubah Profil, Ketertarikan, Software/Tools & Journey](#b-mengubah-profil-ketertarikan-softwaretools--journey)
  - [C. Mengaktifkan atau Mengubah Sosial Media & Email](#c-mengaktifkan-atau-mengubah-sosial-media--email)
  - [D. Mengubah Teks Website (Bahasa Inggris & Indonesia)](#d-mengubah-teks-website-bahasa-inggris--indonesia)
  - [E. Mengganti Gambar Maskot Utama](#e-mengganti-gambar-maskot-utama)
- [5. Mengubah Tampilan, Warna, Font & Metadata](#5-mengubah-tampilan-warna-font--metadata)
- [6. Menyimpan Perubahan ke GitHub](#6-menyimpan-perubahan-ke-github)

---

## 1. Menjalankan Proyek Secara Lokal

Pastikan sudah terpasang **Node.js** dan **npm**, lalu jalankan perintah berikut di folder proyek:

```bash
# 1. Install dependencies (cukup sekali di awal atau saat ada paket baru)
npm install

# 2. Jalankan mode development
npm run dev
```

Setelah berjalan, buka browser ke **`http://localhost:3000`**.

Perintah lain yang tersedia di `package.json`:

| Perintah | Fungsi |
|---|---|
| `npm run dev` | Menjalankan server development dengan auto-reload |
| `npm run build` | Membangun versi produksi di folder `.next/` |
| `npm run start` | Menjalankan hasil build produksi |
| `npm run lint` | Memeriksa aturan linting Next.js |

---

## 2. Peta Cepat: Mau Ubah Apa? Edit di Mana?

| Bagian yang Ingin Diubah | Lokasi File |
|---|---|
| Daftar artwork, judul, kategori, tahun, deskripsi, karya unggulan (*Selected Creations*) | `src/data/artworks.json` |
| File gambar artwork yang tampil di website | `public/images/artworks/` |
| Nama artist, tagline, ketertarikan kreatif, daftar tools/software, cerita perjalanan (*journey*) | `src/data/profile.json` |
| Tautan Instagram, Behance, ArtStation, Email, atau platform lain | `src/data/socials.json` |
| Gambar maskot utama di Hero & About | `public/images/mascot-main.png` |
| Seluruh teks UI versi **Bahasa Inggris (EN)** | `src/data/translations/en.json` |
| Seluruh teks UI versi **Bahasa Indonesia (ID)** | `src/data/translations/id.json` |
| Judul tab browser & deskripsi SEO | `src/app/layout.tsx` |
| Palet warna utama, animasi, latar titik kertas | `src/styles/globals.css` |
| Tampilan masing-masing section (Navbar, Hero, Gallery, Lightbox, About, Contact) | `src/components/` |

> **Catatan:** Folder `artwork/` dan `Identitas/` di root adalah folder arsip sumber asli. Website membaca gambar langsung dari folder `public/images/`.

---

## 3. Struktur Folder Proyek

```text
PortofolioIlly/
├── public/
│   └── images/
│       ├── mascot-main.png         # Aset gambar maskot resmi yang dipakai website
│       └── artworks/               # Seluruh file gambar karya + subfolder fps/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Font lokal (@fontsource), metadata judul & deskripsi
│   │   └── page.tsx                # Halaman utama
│   ├── components/
│   │   ├── PortfolioApp.tsx        # Pengatur bahasa (EN/ID) & state lightbox
│   │   ├── navigation/Navbar.tsx   # Navigasi atas, switcher EN/ID, menu mobile
│   │   ├── hero/HeroSection.tsx    # Banner hero & posisi maskot pop-out
│   │   ├── gallery/
│   │   │   ├── SelectedCreations.tsx   # Grid bento asimetris "Selected Creations"
│   │   │   └── CreativePlayground.tsx  # Galeri filter 5 kategori "Playground"
│   │   ├── artwork/
│   │   │   ├── ArtworkCard.tsx     # Kartu artwork (pixel art, hover, frame)
│   │   │   └── ArtworkLightbox.tsx # Modal pratinjau + Prev/Next + pemutar frame
│   │   ├── about/AboutSection.tsx  # Section "Behind the Art"
│   │   ├── contact/ContactSection.tsx  # Section "Let's Connect!"
│   │   ├── layout/
│   │   │   ├── PageBackdrop.tsx    # Latar belakang kertas & ornamen halus
│   │   │   └── Footer.tsx          # Footer bawah
│   │   └── ui/Reveal.tsx           # Animasi muncul lembut saat scroll
│   ├── data/
│   │   ├── artworks.json           # Data seluruh artwork
│   │   ├── profile.json            # Data profil, ketertarikan, tools, journey
│   │   ├── socials.json            # Konfigurasi sosial media & email
│   │   └── translations/
│   │       ├── en.json             # Teks antarmuka Bahasa Inggris
│   │       └── id.json             # Teks antarmuka Bahasa Indonesia
│   ├── lib/
│   │   ├── data.ts                 # Pembaca & pengurut data JSON
│   │   └── types.ts                # Tipe TypeScript
│   └── styles/
│       └── globals.css             # Variabel warna, tipografi & animasi CSS
├── artwork/                        # Folder arsip karya mentah (tidak diload langsung)
├── Identitas/                      # Referensi identitas akun
└── mascot-main.png                 # File sumber maskot
```

---

## 4. Panduan Mengubah Konten & Karya

### A. Menambah, Mengedit, atau Menghapus Artwork

1. **Simpan gambar** ke dalam folder `public/images/artworks/`.
   - Gunakan nama file yang rapi tanpa spasi atau emoji, misalnya `my-new-oc.png`.
2. **Buka** `src/data/artworks.json` dan tambahkan (atau ubah) entri objek JSON di dalam array `[ ... ]`.

Contoh struktur lengkap satu artwork:

```json
{
  "id": "art-025",
  "title": "Judul Karya Baru",
  "slug": "judul-karya-baru",
  "category": "Illustrations",
  "year": "2026",
  "thumbnail": "/images/artworks/my-new-oc.png",
  "image": "/images/artworks/my-new-oc.png",
  "description": "Short English description shown in the lightbox.",
  "descriptionId": "Deskripsi singkat bahasa Indonesia di lightbox.",
  "tools": ["ibisPaint X"],
  "featured": false,
  "isPixelArt": false,
  "aspect": "portrait",
  "order": 25
}
```

Penjelasan tiap properti di `src/data/artworks.json`:

| Properti | Keterangan |
|---|---|
| `id` | ID unik karya (misal `"art-025"`). Tidak boleh sama dengan karya lain. |
| `title` | Judul karya yang tampil di kartu dan lightbox. |
| `slug` | Nama unik huruf kecil dengan tanda `-`. |
| `category` | Harus salah satu dari 5 kategori: `"OC Universe"`, `"Illustrations"`, `"Pixel Playground"`, `"Random Creations"`, atau `"Experiments"`. |
| `year` | Tahun pembuatan (teks, misal `"2026"`). |
| `thumbnail` | Path gambar untuk kartu galeri (diawali `/images/...`). |
| `image` | Path gambar resolusi penuh untuk lightbox (bisa sama dengan `thumbnail`). |
| `description` | Deskripsi versi **EN**. Kosongkan (`""`) jika ingin tampilan lightbox minimalis fokus pada gambar saja. |
| `descriptionId` | Deskripsi versi **ID** (opsional; jika kosong akan memakai `description`). |
| `tools` | Array nama aplikasi, misal `["ibisPaint X", "Aseprite"]`. Isi `[]` jika tidak ingin dicantumkan. |
| `featured` | `true` = tampil di bagian atas **Selected Creations** (maksimal 6 karya pertama dengan `featured: true` yang tampil di grid asimetris). `false` = hanya tampil di **Playground**. |
| `isPixelArt` | Opsional. Isi `true` untuk pixel art agar rendering tetap tajam (*pixelated / crisp-edges*) dan tidak blur. |
| `aspect` | Rasio kartu di Playground: `"portrait"` (`3:4`), `"square"` (`1:1`), atau `"landscape"` (`4:3`). |
| `frames` | Opsional. Array path gambar berurutan (seperti pada `"art-006"`) untuk animasi *frame-by-frame* saat hover & pemutar Play/Pause di lightbox. |
| `order` | Angka urutan tampil (kecil ke besar). |

> **Menghapus karya:** Cukup hapus objek karya terkait dari `src/data/artworks.json` (pastikan tanda koma `,` antar objek JSON tetap valid).

---

### B. Mengubah Profil, Ketertarikan, Software/Tools & Journey

Buka file **`src/data/profile.json`**:

1. **Identitas & Tagline:** Ubah `artistName`, `nickname`, `handle`, `tagline`, dan `taglineId`.
2. **Ketertarikan Kreatif (`interests`):** Ubah `labelEn`, `labelId`, `noteEn`, dan `noteId` untuk masing-masing item.
3. **Daftar Software & Tools (`tools`):** Saat ini masih menggunakan placeholder. Ubah `name` dengan aplikasi asli yang dipakai dan ganti `"status"` menjadi `"confirmed"`, contoh:
   ```json
   "tools": [
     { "name": "ibisPaint X", "status": "confirmed" },
     { "name": "Aseprite", "status": "confirmed" }
   ]
   ```
   *(Mengubah `"status"` ke `"confirmed"` otomatis mengganti gaya chip dari garis putus-putus placeholder menjadi badge navy solid).*
4. **Catatan Perjalanan Kreatif (`journeyPlaceholderEn` & `journeyPlaceholderId`):** Ganti teks placeholder dengan cerita perjalanan kreatif pribadi Illy dalam bahasa Inggris dan Indonesia.

---

### C. Mengaktifkan atau Mengubah Sosial Media & Email

Buka file **`src/data/socials.json`**:

```json
[
  {
    "id": "instagram",
    "platform": "Instagram",
    "handle": "@rawonbillish",
    "url": "https://instagram.com/rawonbillish",
    "configured": true
  },
  {
    "id": "behance",
    "platform": "Behance",
    "handle": "@username",
    "url": "https://www.behance.net/username",
    "configured": true
  },
  {
    "id": "email",
    "platform": "Email",
    "handle": "nama@email.com",
    "url": "mailto:nama@email.com",
    "configured": true
  }
]
```

- Ubah `"configured": false` menjadi **`true`** dan isi `"url"` serta `"handle"` agar tombol langsung aktif dan bisa diklik.
- Untuk email, awali `url` dengan `mailto:`.
- Untuk menambah platform baru (misalnya X/Twitter, TikTok, Cara, YouTube), tambahkan objek baru ke dalam array di `src/data/socials.json`.

---

### D. Mengubah Teks Website (Bahasa Inggris & Indonesia)

Semua teks statis—seperti sapaan Hero (`Hey, I'm RawonBillish!`), judul section, label tombol CTA, subjudul Playground, teks *Behind the Art*, dan pesan penutup—berada di:
- **`src/data/translations/en.json`** (versi Inggris)
- **`src/data/translations/id.json`** (versi Indonesia)

Pastikan struktur key JSON di kedua file tetap sama agar switcher `EN | ID` berjalan mulus.

---

### E. Mengganti Gambar Maskot Utama

1. Siapkan file PNG transparan baru.
2. Timpa file **`public/images/mascot-main.png`** (atau simpan dengan nama baru lalu ubah nilai `"mascotImage"` di `src/data/profile.json`).
3. Jika rasio atau proporsi tinggi maskot berubah drastis, sesuaikan kelas tinggi pada `src/components/hero/HeroSection.tsx` (`h-[405px]` / `lg:h-[515px]`).

---

## 5. Mengubah Tampilan, Warna, Font & Metadata

- **Palet Warna Resmi (`src/styles/globals.css` & komponen Tailwind):**
  - Deep Navy: `#1B2945` (`--navy`)
  - Slate Blue: `#34445F` (`--slate`)
  - Warm White: `#F5F3F0` (`--warm-white`)
  - Terracotta: `#A96850` (`--terracotta`)
  - Dusty Beige: `#D5B5A5` (`--beige`)
  - Pure White: `#FFFFFF` (`--pure-white`)
  > **Tips:** Karena komponen juga memakai kelas warna utilitas Tailwind seperti `bg-[#1B2945]` dan `text-[#A96850]`, lakukan *Search & Replace* di folder `src/` jika ingin mengganti palet warna secara menyeluruh.
- **Font & Judul Tab Browser (`src/app/layout.tsx`):**
  - Ubah `metadata.title` dan `metadata.description` di `src/app/layout.tsx` untuk mengganti judul pada tab browser dan deskripsi halaman.
  - Font menggunakan paket lokal `@fontsource` (`Plus Jakarta Sans`, `DM Sans`, `JetBrains Mono`) sehingga website tetap tampil konsisten bahkan saat build offline.
- **Tata Letak Grid *Selected Creations* (`src/components/gallery/SelectedCreations.tsx`):**
  - Mengambil 6 item pertama dengan `"featured": true` (`artworks.slice(0, 6)`). Ubah angka `order` di `src/data/artworks.json` untuk mengatur karya mana yang berada di slot besar (`01`) atau slot pendamping (`02`–`06`).

---

## 6. Menyimpan Perubahan ke GitHub

Setelah selesai mengubah file atau menambah karya baru, cek bahwa build tetap aman lalu push ke GitHub:

```bash
# Cek kompilasi TypeScript & build produksi
npm run build

# Simpan dan upload perubahan ke GitHub
git add .
git commit -m "update: memperbarui karya dan profil portofolio"
git push
```
