// post-build-ping.js
import { google } from 'googleapis';

// !!! PENTING: PASTIKAN URL SITEMAP INI BENAR !!!
// URL ini harus mengarah ke sitemap-index.xml di domain live Anda.
const SITEMAP_URL = 'https://yadojoh.com/sitemap-index.xml'; 

async function pingGoogle() {
  const serviceAccountKey = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
  if (!serviceAccountKey) {
    console.warn('⚠️ GOOGLE_SERVICE_ACCOUNT_KEY tidak ditemukan. Melewatkan permintaan Indexing API.');
    return;
  }
  
  // Pastikan Anda telah menginstal packages: npm install axios googleapis
  const key = JSON.parse(serviceAccountKey);
  const jwtClient = new google.auth.JWT(
    key.client_email,
    null,
    key.private_key,
    ['https://www.googleapis.com/auth/indexing'],
    null
  );

  try {
    await jwtClient.authorize();
    
    // Memberi tahu Google bahwa sitemap telah diperbarui
    const response = await google.indexing('v3').urlNotifications.publish({
      auth: jwtClient,
      requestBody: {
        url: SITEMAP_URL,
        type: 'URL_UPDATED',
      },
    });
    
    console.log(`✅ NOTIFIKASI INDEXING API BERHASIL! Status: ${response.status}`);
    console.log('Google telah diberitahu untuk merayapi sitemap terbaru.');

  } catch (error) {
    console.error('❌ GAGAL mengirim Notifikasi Indexing API:', error.message);
  }
}

pingGoogle();