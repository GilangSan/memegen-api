import { createCanvas, loadImage, registerFont } from 'canvas'
import path from 'path'

// Daftarkan font Impact
registerFont('./impact.ttf', { family: 'Impact' });

/**
 * Generate meme image with auto-scaling text size.
 * @param {Buffer|string} imageInput - Buffer atau path gambar
 * @param {string} topText
 * @param {string} bottomText
 * @returns {Promise<Buffer>}
 */
async function generateMeme(imageInput, topText, bottomText) {
  const image = await loadImage(imageInput);
  const canvas = createCanvas(image.width, image.height);
  const ctx = canvas.getContext('2d');

  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

  const maxWidth = canvas.width * 0.95; // 95% of canvas width
  const centerX = canvas.width / 2;

  ctx.fillStyle = 'white';
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 5;
  ctx.textAlign = 'center';

  // Fungsi untuk menyesuaikan font size berdasarkan lebar teks
  function getFittingFontSize(text, maxSize, yBaseline) {
    let fontSize = maxSize;
    ctx.textBaseline = yBaseline;
    do {
      ctx.font = `bold ${fontSize}px Impact`;
      const textWidth = ctx.measureText(text.toUpperCase()).width;
      if (textWidth <= maxWidth) break;
      fontSize -= 2;
    } while (fontSize > 10);
    return fontSize;
  }

  // Gambar teks atas
  const topSize = getFittingFontSize(topText, canvas.height / 8, 'top');
  ctx.font = `bold ${topSize}px Impact`;
  ctx.strokeText(topText.toUpperCase(), centerX, 10);
  ctx.fillText(topText.toUpperCase(), centerX, 10);

  // Gambar teks bawah
  const bottomSize = getFittingFontSize(bottomText, canvas.height / 8, 'bottom');
  ctx.font = `bold ${bottomSize}px Impact`;
  ctx.strokeText(bottomText.toUpperCase(), centerX, canvas.height - 10);
  ctx.fillText(bottomText.toUpperCase(), centerX, canvas.height - 10);

  return canvas.toBuffer('image/jpeg');
}

export default generateMeme
