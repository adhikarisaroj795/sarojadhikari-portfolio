# sarojadhikari.info.np

My personal portfolio: a React single-page site with a small Express API for the contact form.

## Stack

- **Frontend:** React 19, Vite, Tailwind CSS v4
- **Backend:** Node.js, Express 5, Zod, Nodemailer, Helmet, express-rate-limit

## Structure

```
frontend/   React app — content lives in src/data/*.js
backend/    POST /api/contact → validates, rate-limits, emails me
```

## Run locally

```bash
# backend
cd backend && npm install && cp .env.example .env && npm run dev

# frontend (proxies /api to the backend)
cd frontend && npm install && npm run dev
```

Set `MAIL_DRY_RUN=true` in `backend/.env` to print emails instead of sending them.

## Notes

- Project screenshots of private dashboards use blurred or test data.
- Content (projects, experience, skills) is edited in `frontend/src/data/`.
