const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const request = require("request");
const { Builder, By, Key, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const proxy = require("selenium-webdriver/proxy");
const proxyChain = require("proxy-chain");
require('console-stamp')(console, {
  format: ':date(yyyy/mm/dd HH:MM:ss.l)'
});

// Load environment variables
require("dotenv").config();

// Set up ChromeDriver
require("chromedriver");

const CRX_URL = "https://clients2.google.com/service/update2/crx?response=redirect&acceptformat=crx2,crx3&prodversion=112&x=id%3D${extensionId}%26installsource%3Dondemand%26uc";
const USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36";

const extensionId = "caacbgbklghmpodbdafajbgdnegacfmo";
const USER = process.env.APP_USER || "";
const PASSWORD = process.env.APP_PASS || "";
const ALLOW_DEBUG = !!process.env.DEBUG?.length || false;
const EXTENSION_FILENAME = "app.crx";
const PROXY = process.env.PROXY || undefined;

// Display startup banner
console.log("\n");
console.log("========================================================");
console.log("                Gradient Network Bot");
console.log("--------------------------------------------------------");
console.log("  Developer: Xiaolin (@yoyomyoyoa)");
console.log("--------------------------------------------------------");
console.log("  Disclaimer:");
console.log("  1. This project is for educational purposes only.");
console.log("  2. Any consequences of using this project are the user's responsibility.");
console.log("  3. Please comply with relevant laws and regulations. Do not misuse.");
console.log("========================================================");
console.log("\n");

console.log("-> Starting the program...");
console.log("-> Account:", USER);
console.log("-> Password:", PASSWORD);
console.log("-> Proxy:", PROXY);
console.log("-> Debug Mode:", ALLOW_DEBUG ? "Enabled" : "Disabled");

if (!USER || !PASSWORD) {
  console.error("Please set the environment variables APP_USER and APP_PASS.");
  process.exit(1);
}

if (ALLOW_DEBUG) {
  console.log("-> Debug mode enabled! Screenshots and console logs will be generated on errors.");
}

async function downloadExtension(extensionId) {
  const url = CRX_URL.replace("${extensionId}", extensionId);
  const headers = {
    "User-Agent": USER_AGENT,
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.5",
    "Accept-Encoding": "gzip, deflate, br",
    "Connection": "keep-alive",
    "Upgrade-Insecure-Requests": "1"
  };

  console.log("-> Downloading extension from:", url);

  // Force re-download of the extension
  if (fs.existsSync(EXTENSION_FILENAME)) {
    console.log("-> Deleting old extension file...");
    fs.unlinkSync(EXTENSION_FILENAME);
  }

  return new Promise((resolve, reject) => {
    request({ url, headers, encoding: null }, (error, response, body) => {
      if (error) {
        console.error("-> Error downloading extension:", error);
        return reject(error);
      }
      if (response.statusCode !== 200) {
        console.error("-> Failed to download extension! Status code:", response.statusCode);
        return reject(new Error(`Failed to download extension! Status code: ${response.statusCode}`));
      }
      fs.writeFileSync(EXTENSION_FILENAME, body);
      if (ALLOW_DEBUG) {
        const md5 = crypto.createHash("md5").update(body).digest("hex");
        console.log("-> Extension MD5:", md5);
      }
      console.log("-> Extension downloaded successfully!");
      resolve();
    });
  });
}

// Function to take a screenshot
async function takeScreenshot(driver, filename) {
  if (!ALLOW_DEBUG) {
    return;
  }

  const data = await driver.takeScreenshot();
  fs.writeFileSync(filename, Buffer.from(data, "base64"));
}

// Additional code goes here...

(async function main() {
  let driver;
  try {
    await downloadExtension(extensionId);
    console.log("-> Extension downloaded successfully.");
    // Additional startup processes...
  } catch (error) {
    console.error("-> An error occurred:", error.message);
    process.exit(1);
  }
})();
