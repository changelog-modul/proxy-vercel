export default async function handler(req, res) {
  try {
    const target = req.query.url;

    if (!target || !/^https?:\/\//.test(target)) {
      return res.status(400).send("Invalid URL");
    }

    const r = await fetch(target, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Accept": "*/*"
      }
    });

    const t = await r.text();

    res.setHeader("Content-Type", "text/plain");
    res.status(200).send(t);

  } catch (e) {
    res.status(500).send("Proxy error: " + e.message);
  }
}
