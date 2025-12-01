# Cloudflare DNS record for api.labs.teleports.cloud -> Render
resource "cloudflare_record" "api_subdomain" {
  zone_id = var.cloudflare_zone_id
  name    = "api.labs" // Cloudflare manages labs.teleports.cloud directly
  content = "labs-teleports-cloud.onrender.com"
  type    = "CNAME"
  proxied = false
  ttl     = 1
}
