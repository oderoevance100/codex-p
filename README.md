# Portfolio backend

API for the "Order a service" and "Reviews" sections of the portfolio site.
Plain Node.js + Express, organized into modules (routes → controllers →
models), with data saved to JSON files on disk — no database server to set
up.

```
backend/
├── server.js                    entry point, wires everything together
├── src/
│   ├── routes/                  defines URLs, delegates to controllers
│   │   ├── orders.routes.js
│   │   └── reviews.routes.js
│   ├── controllers/             request/response handling per resource
│   │   ├── orders.controller.js
│   │   └── reviews.controller.js
│   ├── models/                  data shape + validation, no I/O
│   │   ├── order.model.js
│   │   └── review.model.js
│   ├── middleware/
│   │   ├── errorHandler.js
│   │   └── notFound.js
│   ├── utils/
│   │   └── mailer.js            optional email-on-new-order
│   └── db.js                    tiny JSON-file read/write helper
├── data/
│   ├── orders.json               created/updated automatically
│   └── reviews.json              created/updated automatically
└── public/                      index.html + services.html are served from here
```

## Run it

Requires Node.js 18+.

```bash
cd backend
npm install
cp .env.example .env      # then edit .env — at minimum set ADMIN_KEY
npm start
```

Open **http://localhost:3000** — that's the site itself (served from
`public/`), already wired up to the API on the same origin, so nothing
else needs configuring for it to work locally.

For live development with auto-restart: `npm run dev`.

## Email on new orders (optional)

Without SMTP settings in `.env`, every order request is still saved to
`data/orders.json` — you just won't get an email. To get emailed:

1. Fill in `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` in `.env`.
2. For Gmail: turn on 2-Step Verification, then create an **App Password**
   (Google Account → Security → App passwords) and use that as `SMTP_PASS`,
   not your normal Gmail password.

## API

| Method | Path          | Auth               | Purpose                              |
|--------|---------------|---------------------|---------------------------------------|
| GET    | `/api/reviews`| —                   | List reviews + average rating         |
| POST   | `/api/reviews`| —                   | Submit a review                       |
| POST   | `/api/orders` | —                   | Submit a service request              |
| GET    | `/api/orders` | `x-admin-key` header| List all submitted requests (private) |
| GET    | `/api/health` | —                   | Liveness check                        |

**POST /api/reviews** body:
```json
{ "name": "Jane", "rating": 5, "comment": "Great to work with." }
```

**POST /api/orders** body:
```json
{
  "name": "Jane",
  "email": "jane@example.com",
  "service": "Dashboard & BI build",
  "timeline": "Within a month",
  "details": "We need a live sales dashboard for..."
}
```

**GET /api/orders** — to view submitted requests, send the header
`x-admin-key: <value from your .env>`. Example:
```bash
curl -H "x-admin-key: your-secret-here" http://localhost:3000/api/orders
```

## Deploying

This is a plain Express app, so it runs on any Node host (Render, Railway,
Fly.io, a VPS, etc.). Two things to change for production:

1. **Storage**: JSON files work for low volume but aren't safe for
   concurrent writes at scale, and most hosts wipe the filesystem on
   redeploy. Swap `src/db.js` for a real database (Postgres, SQLite via a
   proper driver, MongoDB…) when you outgrow this — nothing outside that
   one file needs to change.
2. **Environment variables**: set `ADMIN_KEY`, `OWNER_EMAIL`, and the SMTP
   variables on the host instead of committing `.env`.
