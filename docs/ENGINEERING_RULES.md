# Panduan Teknis & Standar Rekayasa Perangkat Lunak

Dokumen ini merupakan pedoman baku pengembangan bagi seluruh *engineer* dan pengembang yang bekerja pada repositori **pencipta-comunity**. Seluruh kode yang di-commit ke repositori ini wajib mematuhi standar di bawah ini untuk menjaga kualitas, performa, dan kemudahan pemeliharaan (*maintainability*).

---

## 1. Kebijakan Visual & Ikonografi 
- **Aturan**: Gunakan pustaka ikon resmi `lucide-react` atau icon library lain dengan stroke width dan ukuran proporsional.

---

## 2. Standar TypeScript Ketat (Strict Mode)
Proyek ini mengaktifkan konfigurasi TypeScript paling ketat (`strict: true`, `noImplicitAny: true`, `strictNullChecks: true`, `noUncheckedIndexedAccess: true`).
- **Hindari Penggunaan `any`**: Selalu definisikan tipe data domain secara eksplisit atau gunakan `unknown` disertai *type narrowing*.
- **Pemisahan Tipe Domain**: Letakkan interface dan tipe data domain pada file terdedikasi (contoh: `types/assistant.types.ts`) agar mudah di-import ulang dan diuji.
- **Index Access Aman**: Ketika mengakses elemen array dengan indeks numerik atau properti dinamis objek, selalu lakukan pengecekan keberadaan nilai (*truthiness check*).

---

## 3. Pola State Management & Lifecycle React 19
Untuk mencegah penurunan performa akibat *cascading re-renders*:
- **Dilarang Memanggil `setState` Sinkron di dalam `useEffect`**:
  - *Salah*: Membaca data `localStorage` di dalam `useEffect` lalu memanggil `setConversations(data)`. Pola ini memicu render ganda dan peringatan React.
  - *Benar*: Gunakan **Lazy State Initializer** pada deklarasi `useState`:
    ```tsx
    const [conversations, setConversations] = useState<ConversationSession[]>(getStoredConversations);
    ```
- **Fungsi `useEffect` Hanya untuk Sinkronisasi Eksternal**:
  - Gunakan `useEffect` murni untuk sinkronisasi ke sistem luar (seperti menyimpan perubahan ke `localStorage`, atau mendaftarkan *event listener* global keyboard `Cmd+K` / `Escape`).

---

## 4. Struktur Folder Modular & "Human-Friendly"
Setiap fitur besar/domain harus dirancang modular, terisolasi, dan mudah dipahami oleh anggota tim baru:
```
src/components/<nama-fitur>/
  ├── context/       # State management (Context Provider & Custom Hook)
  ├── types/         # Definisi TypeScript interface domain
  ├── data/          # Mock data, konstanta, atau seed dataset awal
  ├── ui/            # Komponen tampilan atomik/molekul yang terfokus
  ├── widget/        # Komponen interaktif pelengkap (FAB, drawer popup)
  ├── <nama-fitur>-workspace.tsx  # Kontainer utama yang menggabungkan seluruh modul
  └── index.ts       # Public API barrel export
```
- **Prinsip Tanggung Jawab Tunggal**: Buat file berukuran ringkas (< 200-300 baris) dengan fokus tugas yang jelas.
- **Barrel Export**: Selalu sediakan `index.ts` sehingga modul lain dapat mengimpor komponen dengan rapi:
  ```tsx
  import { AssistantWorkspace, FloatingAssistantWidget } from "@/components/assistant";
  ```

---

## 5. Konsistensi Brand & Reusable Primitives
- **Komponen Logo Terpusat**: Seluruh kebutuhan logo wajib mengimpor komponen global [`src/components/ui/logo.tsx`](file:///home/denisetiya/development/tecnofest/community-assistant/src/components/ui/logo.tsx):
  ```tsx
  import { Logo } from "@/components/ui/logo";
  <Logo size="md" />
  ```
  Komponen ini mendukung ukuran `sm`, `md`, `lg`, `xl` dengan optimasi aset `next/image` dan prioritas pemuatan.
- **Nama Brand Resmi**: Selalu gunakan penamaan resmi `pencipta-comunity`. Jangan menggunakan nama brand lama atau alias lain.
- **Sistem Device Viewport**: Viewport emulator global berada di `src/context/viewport-context.tsx` dan `src/components/layout/global-viewport.tsx` untuk kemudahan pengujian UI di mode `Responsive` (default), `Android`, dan `iOS`.

---

## 6. Batasan Server/Client & Keamanan Data
- **Pemisahan Server dan Client**: Kode server (`src/server/*`, koneksi database Prisma, API key LLM) **tidak boleh** diimpor ke dalam Client Component (`"use client"`).
- **Validasi Input API dengan Zod**: Semua request handler di `src/app/api/*` wajib memvalidasi body request menggunakan Zod schema sebelum diteruskan ke domain service.
- **Keamanan Kunci Lingkungan**: Kunci API seperti `AI_API_KEY` dan `DATABASE_URL` hanya boleh diakses di lingkungan server backend.

---

## 7. Format Pesan Commit Git
Gunakan format konvensi commit standar (*Conventional Commits*) yang jelas dan deskriptif:
- `feat(assistant): add capsule multimodal input with attachment support`
- `fix(viewport): resolve layout overflow in mobile drawer view`
- `refactor(ui): extract global Logo component to src/components/ui/logo.tsx`
- `docs: update engineering guidelines and project structure`
