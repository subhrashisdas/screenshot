const os = require("os");

const express = require("express");
const puppeteer = require("puppeteer-core");

const app = express();

const { PORT = 3000, CHROMIUM_PATH } = process.env;

let browser;

app.get("/", async (_, res) => {
  res.json({
    platform: os.platform(),
    release: os.release(),
    type: os.type(),
    version: os.version(),
  });
});

app.get("/:url.:path", async (req, res) => {
  try {
    const { url, path } = req.params;
    const decodedUrl = Buffer.from(url, "base64").toString("utf-8");

    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });

    await page.goto(decodedUrl, { waitUntil: "networkidle2", timeout: 60000 });
    const screenshot = await page.screenshot({ fullPage: true, type: path });

    res.set("Content-Type", "image/" + path).end(screenshot);
    await page.close();
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).end("Failed to take the screenshot: " + error.message);
  }
});

process.on("exit", async () => {
  await browser.close();
});

app.listen(
  PORT,
  async () => {
    browser = await puppeteer.launch({ executablePath: CHROMIUM_PATH });
    console.log(`Server is running on http://localhost:${PORT}`);
  },
);
