// src/lib/sanityClient.ts
import { createClient } from "@sanity/client";

// Gunakan import.meta.env untuk mengambil variabel dari ENV
// Variabel ini harus ditambahkan ke Cloudflare Pages!
const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID;
const dataset = import.meta.env.PUBLIC_SANITY_DATASET || "production"; 

// Catatan: Di Astro, ENV yang akan diakses saat build (dan juga 
// di browser jika Anda menggunakan client-side scripting) harus diawali PUBLIC_

if (!projectId) {
    // Pesan error ini akan muncul jika Anda lupa menambahkan ENV di Cloudflare atau .env lokal
    throw new Error("Missing PUBLIC_SANITY_PROJECT_ID in Environment Variables.");
}

export const client = createClient({
  projectId,
  dataset,
  apiVersion: "v2022-03-07",
  useCdn: true,
});