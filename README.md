# Forum App

A fullstack forum application with JWT-based authentication, CRUD functionality for forums and comments, and a secure, scalable architecture using NestJS, Next.js, PostgreSQL, and Auth0.

---

## 🛠️ Tech Stack

### Backend
- **Framework**: [NestJS](https://nestjs.com/)
- **Authentication**: JWT via [Passport.js](http://www.passportjs.org/)
- **Database**: PostgreSQL (hosted on [Neon](https://neon.tech/))
- **ORM**: TypeORM
- **Validation**: `class-validator` with `@nestjs/swagger` support (`class-validator-shim`)
- **Logging**: [Pino](https://github.com/pinojs/pino)
- **Dev Tools**: ESLint, Prettier
- **Deployment**: Dockerized & hosted on [Render](https://render.com)

### Frontend
- **Framework**: [Next.js](https://nextjs.org/)
- **Authentication**: [Auth0](https://auth0.com/)

---

## ⚙️ Setup Instructions

### Ports
- **API (Backend)**: `http://localhost:5001`
- **Frontend (UI)**: `http://localhost:3000`

---

### Backend

#### Configure Environment Variables

Create a `.env` file:

```env
DATABASE_URL=postgres://<user>:<password>@<host>:<port>/<db>
```

#### Install dependencies

```bash
npm install
```

#### Run the backend

```bash
npm run start
```

#### Swagger Documentation

After starting the server, visit:

```bash
http://localhost:5001/swagger
```

---

### Frontend

#### Navigate to frontend

```bash
cd ../frontend
```

#### Configure Environment Variables

Create a `.env.local` file:

```env
AUTH0_DOMAIN=your-auth0-domain
AUTH0_CLIENT_ID=your-client-id
AUTH0_CLIENT_SECRET=your-client-secret
AUTH0_SECRET=your-random-secret
APP_BASE_URL=http://localhost:3000
NEXT_PUBLIC_API_BASE_URL=http://localhost:5001/v1
```

#### Install dependencies

```bash
npm install
```

#### Run the frontend

```bash
npm run dev
```

---

## 🔐 Authentication

- Auth0 is used for frontend login.
- Auth0 issues access tokens which are sent as Bearer tokens to the NestJS backend.
- Backend uses Passport with JWT strategy to protect routes.

---

## 📦 Features

### Backend

#### Forum Entity
- CRUD endpoints

#### Comment Entity
- Create, Read, Delete (Only owners can delete their comments)
- Many-to-One relation with Forum

#### Request Validation
- Strong validation using `class-validator` decorators

#### Auto-generated Swagger
- Docs generated with `@nestjs/swagger` and class-validator shim

#### Logging
- Structured logs with [Pino](https://github.com/pinojs/pino)

---

### Frontend

- Secure login with Auth0
- Authenticated API calls using issued JWT
- Forum listing, creation, and comment interaction UI

---

## 🚀 Deployment

- **Backend**: Deployed on [Render](https://render.com) using Docker
- **Database**: Hosted on [Neon](https://neon.tech)
- **Frontend**: Hosted on [Vercel](https://vercel.com/)
