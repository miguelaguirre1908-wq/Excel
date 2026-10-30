/**
 * Cryptographic utility for Megapack Excel 10 en 1
 * Uses AES-GCM + PBKDF2 key derivation matching the user's encrypted BLOB.
 */

export const WA_NUMBER = "573148246523";
export const WA_FORMATTED = "314 824 6523";
export const ACCOUNT_HOLDER = "Miguel Aguirre";
export const ENCRYPTED_BLOB = "cqLZJ71RcnfPDRTeFDnDvuRmir1RzYTqqlOABBHljL/+goPK7eBp3vPHuZBSGedweAnUj5TyknbCOk+9vNChyFEtCXFW1CUStF0M75ClqHcQf+OtjSVo57nSrXxaNXM7tk6nHNdjif0B/5MI5eBwb3uoFtrvELQEAOMgazCBdx0AqNo=";

export const DEMO_PASSWORDS = ["DEMO", "EXCEL10", "PROTOTIPO", "MIGUEL2026", "ACCESO10"];
export const DEMO_DRIVE_URL = "https://drive.google.com/drive/folders/1MegapackExcel10en1_CursosCompletos_Drive";

function b64ToUint8(s: string): Uint8Array {
  return Uint8Array.from(atob(s), (c) => c.charCodeAt(0));
}

/**
 * Decrypts the secret Google Drive URL using the user-provided password
 * with Web Crypto API (PBKDF2 SHA-256 + AES-GCM).
 */
export async function decryptDriveUrl(password: string): Promise<string> {
  const cleanPassword = password.trim();
  
  if (!cleanPassword) {
    throw new Error("Escribe la contraseña para continuar.");
  }

  // Support demo passwords for prototyping & client previewing
  if (DEMO_PASSWORDS.includes(cleanPassword.toUpperCase())) {
    return DEMO_DRIVE_URL;
  }

  if (!window.crypto || !window.crypto.subtle) {
    throw new Error("Tu navegador no soporta criptografía moderna. Usa Chrome, Edge o Safari.");
  }

  try {
    const rawData = b64ToUint8(ENCRYPTED_BLOB);
    const enc = new TextEncoder();
    
    // Import raw password as key material
    const keyMaterial = await crypto.subtle.importKey(
      "raw",
      enc.encode(cleanPassword),
      "PBKDF2",
      false,
      ["deriveKey"]
    );

    // Salt is first 16 bytes, 100,000 iterations PBKDF2
    const salt = rawData.slice(0, 16);
    const derivedKey = await crypto.subtle.deriveKey(
      {
        name: "PBKDF2",
        salt: salt,
        iterations: 100000,
        hash: "SHA-256",
      },
      keyMaterial,
      { name: "AES-GCM", length: 256 },
      false,
      ["decrypt"]
    );

    // IV is bytes 16 to 28 (12 bytes for AES-GCM)
    const iv = rawData.slice(16, 28);
    // Ciphertext is remaining bytes
    const ciphertext = rawData.slice(28);

    const decryptedBuffer = await crypto.subtle.decrypt(
      { name: "AES-GCM", iv: iv },
      derivedKey,
      ciphertext
    );

    const decodedUrl = new TextDecoder().decode(decryptedBuffer);
    return decodedUrl;
  } catch (err) {
    throw new Error(
      "Contraseña incorrecta. Revisa mayúsculas y números, o pídela enviando tu comprobante por WhatsApp."
    );
  }
}

export function buildWhatsAppUrl(customText?: string): string {
  const text = customText || "Hola Miguel, ya realicé el pago del Megapack de Excel. Adjunto mi comprobante para recibir la contraseña.";
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
}

export function saveUnlockState(driveUrl: string): void {
  try {
    localStorage.setItem(
      "megapack_access",
      JSON.stringify({
        unlocked: true,
        driveUrl,
        timestamp: Date.now(),
      })
    );
  } catch (e) {
    // ignore
  }
}

export function getStoredUnlockState(): { unlocked: boolean; driveUrl: string } | null {
  try {
    const raw = localStorage.getItem("megapack_access");
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function clearStoredUnlockState(): void {
  try {
    localStorage.removeItem("megapack_access");
  } catch {
    // ignore
  }
}
