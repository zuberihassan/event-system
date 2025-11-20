const fs = require("fs");
const QRCode = require("qrcode");
const path = require("path");

async function generateQR(name, code) {
    const folder = path.join(__dirname, "output");
    if (!fs.existsSync(folder)) fs.mkdirSync(folder);

    const qrText = `https://your-domain-or-localhost/?code=${code}`;

    const filePath = path.join(folder, `${code}.png`);
    await QRCode.toFile(filePath, qrText);

    console.log(`Generated QR for ${name} -> ${filePath}`);
}

async function generateFromList() {
    const guests = [
        { name: "Zuberi", code: "A001" },
        { name: "Shufaa", code: "A002" },
        { name: "Mama Mwana", code: "A003" }
    ];

    for (let g of guests) {
        await generateQR(g.name, g.code);
    }
}

generateFromList();
