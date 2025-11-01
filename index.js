import express from "express";
import QRCode from "qrcode";

const app = express();
const PORT = 3000;

// vCard contact info
const vcard = `BEGIN:VCARD
VERSION:3.0
FN: Pushpender Sharma
TITLE: Founder & CEO
ORG:Bexex Global - EHS Solutions
TEL:+91 9582390987
EMAIL:hello@bexexglobal.com
URL:www.bexexglobal.com
ADR:New Delhi, India
END:VCARD`;
// Route to display QR in browser
app.get("/", async (req, res) => {
  try {
    const qrDataUrl = await QRCode.toDataURL(vcard);
    const html = `
      <h2>Contact QR Code</h2>
      <img src="${qrDataUrl}" alt="QR Code" />
      <br><br>
      <a href="/download" download="contact_qr.png">
        <button>Download QR Code</button>
      </a>
    `;
    res.send(html);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error generating QR code");
  }
});

// Route to download QR as PNG
app.get("/download", async (req, res) => {
  try {
    const qrBuffer = await QRCode.toBuffer(vcard);
    res.setHeader("Content-Disposition", "attachment; filename=contact_qr.png");
    res.setHeader("Content-Type", "image/png");
    res.send(qrBuffer);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error downloading QR code");
  }
});

app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}/qr`));