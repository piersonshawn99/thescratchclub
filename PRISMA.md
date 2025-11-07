## Connecting Prisma to PlanetScale (quick steps)

This project includes a Prisma schema and a small Prisma client wrapper at `lib/prisma.ts`.

Follow these steps to connect your local environment and Vercel to your PlanetScale branch:

1. In PlanetScale, create a new branch from `main` (example name: `app-clean`).
   - In the PlanetScale dashboard choose your database `sc1` → Branches → New Branch.

2. In PlanetScale, create a connection for that branch and copy the connection string.
   - The connection string will look like: `mysql://<username>:<password>@<host>/<database>?sslaccept=strict`.
   - PlanetScale gives you the branch-specific connection string — use that one.

3. Set your local `.env.local` (and Vercel `DATABASE_URL`) to the branch connection string.
   Example `.env.local`:

```
DATABASE_URL="mysql://<username>:<password>@<host>/<database>?sslaccept=strict"
```

4. Install deps and generate the client:

```bash
pnpm install
pnpm prisma:generate
```

5. Push the Prisma schema to your PlanetScale branch or pull the DB state.
   - If you want Prisma to create the tables according to `prisma/schema.prisma`, run:

```bash
pnpm prisma:db:push
```

   - Alternatively, if your database already has tables and you want Prisma to introspect them, run:

```bash
pnpm prisma:db:pull
```

Notes about PlanetScale and Prisma migrations
 - PlanetScale uses non-blocking schema changes and branches. For migrations-based workflows use `prisma migrate deploy` in CI against the branch connection string. For local development `prisma db push` is simplest.
 - If you prefer migrations, create SQL migrations locally and deploy them using `prisma migrate deploy` against the branch.

6. Use the Prisma client from server code:

```ts
import prisma from '@/lib/prisma';

const users = await prisma.user.findMany();
```

If you'd like, I can:
 - Add initial seed data for memberships,
 - Create a tiny server route that creates a membership and exercise the client,
 - Or run `prisma db push` here if you provide a branch connection string (not recommended to share secrets in chat).
