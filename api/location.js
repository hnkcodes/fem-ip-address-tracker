export default async function handler(req, res) {
  const apiKey = process.env.IPIFY_API_KEY;
  const { ipAddress, domain } = req.query;
  const clientIp = req.headers["x-forwarded-for"];
  const params = new URLSearchParams({
    apiKey,
  });

  if (ipAddress) {
    params.append("ipAddress", ipAddress);
  } else if (domain) {
    params.append("domain", domain);
  } else if (clientIp) {
    params.append("ipAddress", clientIp);
  }

  const response = await fetch(
    `https://geo.ipify.org/api/v2/country,city?${params}`,
  );

  const data = await response.json();

  return res.status(200).json(data);
}
