import fs from "fs";
import path from "path";

export const languageMiddleware = (req, res, next) => {
  const acceptLanguage = req.headers["accept-language"]?.toLowerCase() || "en";

  const lang =
    acceptLanguage.includes("ar") || req.query.lang === "ar" ? "ar" : "en";

  try {
    const filePath = path.join(process.cwd(), "locales", `${lang}.json`);
    const fileData = fs.readFileSync(filePath, "utf8");
    const translations = JSON.parse(fileData);

    req.__ = (key) => {
      return translations[key] || key;
    };
  } catch (error) {
    console.error("Language file error:", error);
    req.__ = (key) => key;
  }

  next();
};
