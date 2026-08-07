# Uptime Monitoring Setup (Free Tier)

Nahid Perfumes' backend runs on Render's **free tier**, which sleeps
after ~15 minutes of no traffic and takes 20-30s to wake up on the next
request. Two layers keep it awake and/or watched, both free:

1. `.github/workflows/keep-alive.yml` — pings the backend every 10
   minutes, 24/7, so it rarely falls asleep in the first place.
2. An external uptime monitor (this doc) — a second, independent
   pinger, **and** it alerts you (email/SMS/Slack) the moment the
   backend actually goes down, which GitHub Actions alone does not.

Use the dedicated `GET /api/ping` endpoint for both — it's intentionally
minimal (no DB query, no auth, no business logic), so it always responds
in well under 50ms and never gets skewed by a slow database.

```
GET https://nahidperfume-backend.onrender.com/api/ping
→ 200 { "status": "ok" }
```

Set up **at least one** of the two below. Both together gives redundant
coverage in case one service has an outage of its own.

---

## Option 1: UptimeRobot

1. Go to **uptimerobot.com** → sign up (free plan: 50 monitors, 5-minute
   checks).
2. Click **+ Add New Monitor**.
3. Configure:
   - **Monitor Type**: HTTP(s)
   - **Friendly Name**: `Nahid Perfumes API`
   - **URL**: `https://nahidperfume-backend.onrender.com/api/ping`
   - **Monitoring Interval**: 5 minutes (free plan minimum)
4. Under **Alert Contacts**, add your email (and optionally SMS/Slack/
   Telegram — UptimeRobot supports these on the free plan too).
5. Save. UptimeRobot will now ping every 5 minutes and email you within
   minutes of any downtime, plus it doubles as an extra keep-alive ping.

**Optional — status page**: UptimeRobot's free plan includes a public
status page (Settings → Status Pages) if you ever want a
`status.nahidperfumes.com`-style page to point customers to during an
incident.

---

## Option 2: Better Stack (formerly Better Uptime)

1. Go to **betterstack.com/uptime** → sign up (free plan: 10 monitors,
   3-minute checks — tighter than UptimeRobot's free tier).
2. Click **Create monitor**.
3. Configure:
   - **URL to monitor**: `https://nahidperfume-backend.onrender.com/api/ping`
   - **Check frequency**: 3 minutes
   - **Request type**: GET
   - **Expected status code**: 200
4. Under **On-call & escalation**, add your email/phone — Better Stack's
   free plan supports email, and phone/SMS call escalation if a check
   fails repeatedly.
5. Save. Better Stack will now check every 3 minutes and alert you on
   failure, plus (like UptimeRobot) it acts as an extra keep-alive ping.

**Optional — status page**: Better Stack's free plan also includes a
public status page (Status Pages → Create) if wanted.

---

## Why `/api/ping` and not `/api/health`

`/api/health` runs a real `SELECT 1` against the database — useful for
diagnosing DB connectivity by hand, but the wrong choice for an uptime
monitor: a slow/cold database would make `/api/health` look "down" even
when the API itself is fine, and a monitor hitting it every few minutes
adds needless DB load. `/api/ping` is registered before the rate
limiter, body parser, and any DB access — it answers immediately
regardless of what else is happening in the app.

## What "good" looks like

- UptimeRobot/Better Stack dashboard shows ~100% uptime with response
  times under a few hundred ms most of the time.
- Occasional slower responses (a few seconds) right after a period of
  no traffic are expected — that's the free-tier cold start, now rare
  thanks to the GitHub Actions keep-alive ping.
- If you see frequent multi-second spikes even during active traffic,
  that's worth investigating separately (not a cold-start symptom).
