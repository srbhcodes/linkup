# Linkup

Linkup is a full-stack social app where you can post to a feed, share stories, message people, and manage connections. Think of it as a single place to stay in touch with your circle: you get a feed of posts, 24-hour stories, real-time chat, and a way to find and connect with others.

---

## What’s in it

**Feed** — Scroll through posts from people you’re connected with. Posts can be text, images, or both. You can like them.

**Stories** — Short-lived updates (text, image, or video) that disappear after 24 hours. Same idea as stories on other apps.

**Messages** — One-to-one chat with text and images. New messages show up in real time (no refresh). If you’re not on the chat screen, you get a toast notification.

**Connections** — Send connection requests, accept or reject them, and see who you’re connected with. Connection requests can trigger email notifications.

**Discover** — Search and find users by username, name, or location so you can send connection requests.

**Profile** — Your profile shows your info, cover photo, and posts. You can edit your profile; other users can view it.

The app uses **Clerk** for sign-up and login, so you don’t handle passwords yourself. Media (e.g. profile pictures, post images) is handled via **ImageKit**. Background jobs (e.g. sending emails for connection requests or deleting stories after 24 hours) run with **Inngest**.

---

## Tech stack

- **Frontend:** React 19, Vite, React Router, Redux Toolkit, Tailwind CSS, Axios, react-hot-toast
- **Backend:** Node.js, Express 5, MongoDB (Mongoose)
- **Auth:** Clerk (frontend + backend)
- **Media:** ImageKit
- **Background jobs / email:** Inngest, Nodemailer
- **Real-time:** Server-Sent Events (SSE) for live message updates

---

## Project structure

Everything lives under `pingup-full-stack/`:

- **`client/`** — React + Vite app. Pages (Feed, Messages, Connections, Discover, Profile, Create Post, Login), components, Redux slices, and API calls.
- **`server/`** — Express API. Routes for users, posts, stories, and messages; Mongoose models; Clerk auth middleware; Inngest functions for emails and story deletion; config for DB, ImageKit, Multer, Nodemailer.

You run the client and server as two separate processes (two terminals, or two deploy targets).

---

## How to run it

**1. Clone and go into the project**

```bash
git clone https://github.com/srbhcodes/linkup.git
cd linkup
```

**2. Set up the server**

```bash
cd pingup-full-stack/server
npm install
```

Create a `.env` in `pingup-full-stack/server/` with at least:

- `MONGODB_URI` — MongoDB connection string (e.g. from Atlas). The app will use a DB named `linkup`.
- `PORT` — Optional; defaults to 4000.
- Clerk env vars for the backend (see Clerk dashboard for your Express app).
- For emails (connection request, reminders, unseen messages): `SMTP_USER`, `SMTP_PASS`, `SENDER_EMAIL`, and `FRONTEND_URL` (your frontend URL for links in emails).
- For ImageKit (uploads): `IMAGEKIT_PUBLIC_KEY`, `IMAGEKIT_PRIVATE_KEY`, `IMAGEKIT_URL_ENDPOINT`.

Then start the server:

```bash
npm run server
```

(`npm run server` uses nodemon; `npm start` runs plain `node server.js`.)

**3. Set up the client**

Open a new terminal:

```bash
cd pingup-full-stack/client
npm install
```

Create a `.env` in `pingup-full-stack/client/` with:

- `VITE_CLERK_PUBLISHABLE_KEY` — From Clerk (frontend key).
- `VITE_BASEURL` — Your backend URL, e.g. `http://localhost:4000` in dev.

Then start the client:

```bash
npm run dev
```

**4. Use the app**

Open the URL Vite prints (usually `http://localhost:5173`). Sign up or sign in with Clerk, then use Feed, Stories, Messages, Connections, and Discover.

---

## Env variables quick reference

**Server (`.env` in `pingup-full-stack/server/`):**

| Variable | Purpose |
|----------|---------|
| `MONGODB_URI` | MongoDB connection string |
| `PORT` | Server port (default 4000) |
| `FRONTEND_URL` | Frontend URL (for email links) |
| `SMTP_USER`, `SMTP_PASS`, `SENDER_EMAIL` | Email (Nodemailer) |
| `IMAGEKIT_PUBLIC_KEY`, `IMAGEKIT_PRIVATE_KEY`, `IMAGEKIT_URL_ENDPOINT` | ImageKit for media |
| Clerk keys | From Clerk dashboard for your Express app |

**Client (`.env` in `pingup-full-stack/client/`):**

| Variable | Purpose |
|----------|---------|
| `VITE_CLERK_PUBLISHABLE_KEY` | Clerk frontend key |
| `VITE_BASEURL` | Backend base URL (e.g. `http://localhost:4000`) |

---

## Repo and license

Code in this repo is for the Linkup project. Use it as reference or as a base for your own project; if you reuse large parts, attribution is appreciated.
