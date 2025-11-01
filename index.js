import express from "express";
import QRCode from "qrcode";

const app = express();
const PORT = 3000;

app.get("/", async (req, res) => {
  try {
    // ✅ Replace this with your phone number
    const phoneNumber = "+919876543210"; 
    const telLink = `tel:${phoneNumber}`;

    // ✅ Generate QR code with larger size
    const qrOptions = {
      width: 400,
      margin: 2,
      color: {
        dark: "#000000",
        light: "#ffffff"
      }
    };

    const qrImage = await QRCode.toDataURL(telLink, qrOptions);

    
    // ✅ Display on webpage
    const html = `
      <html>
        <head>
          <title>Call QR Code</title>
        </head>
        <body style="text-align:center; font-family:sans-serif; background:#f8f9fa;">
          <img src="${qrImage}" alt="QR Code" style="width:250px; height:250px;" />
        </body>
      </html>
    `;
    res.send(html);
  } catch (err) {
    res.status(500).send("Error generating QR Code: " + err);
  }
});

app.listen(PORT, () =>
  console.log(`✅ Server running at http://localhost:${PORT}/qrcode`)
);
