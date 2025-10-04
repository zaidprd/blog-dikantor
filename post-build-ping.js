// post-build-ping.js
import { google } from 'googleapis';

// Ganti jika sitemap Anda tidak di lokasi ini
const SITEMAP_URL = 'https://yadojoh.com/sitemap-index.xml'; 

async function pingGoogle() {
  // Mengambil kredensial dari variabel lingkungan baru
  const clientEmail = process.env.GCP_CLIENT_EMAIL; 
  const privateKey = process.env.GCP_PRIVATE_KEY;

  if (!clientEmail || !privateKey) {
    console.error('❌ GAGAL: Kredensial GCP (GCP_CLIENT_EMAIL atau GCP_PRIVATE_KEY) tidak ditemukan di Environment Variables Cloudflare.');
    console.error('Pastikan Anda telah mengatur variabel ini dengan benar.');
    return;
  }

  // Membuat klien JWT untuk otentikasi
  const jwtClient = new google.auth.JWT(
    clientEmail,
    null,
    // Mengganti \\n menjadi newline yang dibutuhkan oleh kunci privat
    privateKey.replace(/\\n/g, '\n'), 
    ['https://www.googleapis.com/auth/indexing'],
    null
  );

  try {
    await jwtClient.authorize();
    
    // Mengirim notifikasi ke Google
    const response = await google.indexing('v3').urlNotifications.publish({
      auth: jwtClient,
      requestBody: {
        url: SITEMAP_URL,
        type: 'URL_UPDATED',
      },
    });
    
    console.log(`✅ NOTIFIKASI INDEXING API BERHASIL! Status: ${response.status}`);

  } catch (error) {
    console.error('❌ GAGAL mengirim Notifikasi Indexing API (Check GSC Status):', error.message);
  }
}

pingGoogle();