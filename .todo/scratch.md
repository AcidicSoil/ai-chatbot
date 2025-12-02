const gemini = geminiCli({
  authType:
    process.env.GEMINI_AUTH_TYPE === "api-key" ||
    process.env.GEMINI_AUTH_TYPE === "gemini-api-key"
      ? (process.env.GEMINI_AUTH_TYPE as "api-key" | "gemini-api-key")
      : "oauth-personal",
  apiKey:
    process.env.GEMINI_AUTH_TYPE === "api-key" ||
    process.env.GEMINI_AUTH_TYPE === "gemini-api-key"
      ? process.env.GEMINI_API_KEY
      : undefined,
});
