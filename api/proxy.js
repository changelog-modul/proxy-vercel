export default async function handler(req, res) {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const target = url.searchParams.get("url");

    if (!target || !/^https?:\/\//.test(target)) {
      res.statusCode = 400;
      return res.end("Invalid URL");
    }

    const r = await fetch(target, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Accept": "*/*"
      }
    });

    const text = await r.text();

    res.setHeader("Content-Type", "text/plain");
    res.statusCode = 200;
    res.end(text);

  } catch (e) {
    res.statusCode = 500;
    res.end("Proxy error: " + e.message);
  }
}
