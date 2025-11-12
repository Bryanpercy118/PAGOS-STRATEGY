import fs from "fs";
import path from "path";
import url from "url";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

export function loadAllStrategies() {
  const files = fs.readdirSync(__dirname);

  files.forEach(async (file) => {
    if (file.endsWith("Strategy.js") && file !== "IPaymentStrategy.js") {
      const modulePath = path.join(__dirname, file);
      await import(url.pathToFileURL(modulePath).href);
    }
  });
}
