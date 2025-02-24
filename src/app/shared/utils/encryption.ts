import * as CryptoJS from 'crypto-js';

// Cambiar clave segura y almacenarla env
const encryptionKey = '12345678901234567890123456789012'; 

export function encrypt(data: string): string {
  return CryptoJS.AES.encrypt(data, encryptionKey).toString();
}

export function decrypt(encryptedData: string): any {
  const bytes = CryptoJS.AES.decrypt(encryptedData, encryptionKey);
  const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
  return JSON.parse(decryptedData);
}