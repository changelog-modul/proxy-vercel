export default async function handler(req, res) {
  try {
    const rawUrl = req.url.replace(/^\/api\/proxy\/?/, "");
    const target = decodeURIComponent(rawUrl);

    if (!target.startsWith("http://") && !target.startsWith("https://")) {
      return res.status(400).send("Invalid URL");
    }

    const response = await fetch(target);
    const text = await response.text();

    res.setHeader("Content-Type", "text/plain");
    res.status(200).send(text);

  } catch (err) {
    res.status(500).send("Proxy error: " + err.message);
  }
}
