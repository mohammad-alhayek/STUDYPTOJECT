import fs from "fs";
import path from "path";

export const languageMiddleware = (req, res, next) => {
  const lang = req.headers["accept-language"] === "ar" ? "ar" : "en";

  const filePath = path.join(process.cwd(), "locales", `${lang}.json`);
  const fileData = fs.readFileSync(filePath, "utf8");
  const translations = JSON.parse(fileData);

  req.__ = (key) => {
    return translations[key] || key;
  };

  next();
};
