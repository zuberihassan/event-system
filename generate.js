const QRCode = require("qrcode");
const fs = require("fs");

async function generateQR(name, code) {
  const folder = "./qrcodes";
  if (!fs.existsSync(folder)) fs.mkdirSync(folder);

  const filePath = `${folder}/${name}-${code}.png`;

  await QRCode.toFile(filePath, code);
  console.log("QR generated:", filePath);
}

// Example:
generateQR("John Doe", "A001");
