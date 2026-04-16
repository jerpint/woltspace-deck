#!/usr/bin/env bash
# Setup deck.woltspace.com — adds route to existing named tunnel + DNS record
set -euo pipefail

# Config (from .env)
ACCOUNT_ID="${CLOUDFLARE_ACCOUNT_ID:?missing CLOUDFLARE_ACCOUNT_ID}"
API_TOKEN="${CLOUDFLARE_API_TOKEN:?missing CLOUDFLARE_API_TOKEN}"
ZONE_ID="${CLOUDFLARE_ZONE_ID:?missing CLOUDFLARE_ZONE_ID}"
TUNNEL_ID="008772a0-0a92-40ba-8a95-6e291c2426e9"

HOSTNAME="deck.woltspace.com"
SERVICE="http://localhost:4010"

echo "==> Updating tunnel ingress: $HOSTNAME -> $SERVICE"

# Step 1: Update tunnel config — add deck route before existing routes
RESULT=$(curl -sf -X PUT \
  "https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/cfd_tunnel/${TUNNEL_ID}/configurations" \
  -H "Authorization: Bearer ${API_TOKEN}" \
  -H "Content-Type: application/json" \
  --data "{
    \"config\": {
      \"ingress\": [
        {\"hostname\": \"${HOSTNAME}\", \"service\": \"${SERVICE}\"},
        {\"hostname\": \"jerpint.woltspace.com\", \"service\": \"http://localhost:7777\"},
        {\"service\": \"http_status:404\"}
      ]
    }
  }")

if echo "$RESULT" | grep -q '"success":true'; then
  echo "    tunnel ingress updated"
else
  echo "    FAILED to update tunnel ingress:"
  echo "$RESULT" | python3 -m json.tool 2>/dev/null || echo "$RESULT"
  exit 1
fi

# Step 2: Create DNS CNAME record
echo "==> Creating DNS CNAME: $HOSTNAME -> ${TUNNEL_ID}.cfargotunnel.com"

# Check if record already exists
EXISTING=$(curl -sf \
  "https://api.cloudflare.com/client/v4/zones/${ZONE_ID}/dns_records?type=CNAME&name=${HOSTNAME}" \
  -H "Authorization: Bearer ${API_TOKEN}" \
  -H "Content-Type: application/json")

RECORD_COUNT=$(echo "$EXISTING" | python3 -c "import sys,json; print(json.load(sys.stdin)['result_info']['count'])" 2>/dev/null || echo "0")

if [ "$RECORD_COUNT" -gt "0" ]; then
  echo "    DNS record already exists, skipping"
else
  DNS_RESULT=$(curl -sf -X POST \
    "https://api.cloudflare.com/client/v4/zones/${ZONE_ID}/dns_records" \
    -H "Authorization: Bearer ${API_TOKEN}" \
    -H "Content-Type: application/json" \
    --data "{
      \"type\": \"CNAME\",
      \"name\": \"deck\",
      \"content\": \"${TUNNEL_ID}.cfargotunnel.com\",
      \"proxied\": true
    }")

  if echo "$DNS_RESULT" | grep -q '"success":true'; then
    echo "    DNS record created"
  else
    echo "    FAILED to create DNS record:"
    echo "$DNS_RESULT" | python3 -m json.tool 2>/dev/null || echo "$DNS_RESULT"
    exit 1
  fi
fi

echo ""
echo "Done! https://deck.woltspace.com should be live."
echo "(deck app must be running on port 4010)"
