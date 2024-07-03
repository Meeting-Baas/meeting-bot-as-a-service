import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import * as schema from './schema';

const client = new Pool({
    connectionString: "postgres://user:password@host:port/db",
  });

export const db = drizzle(client, { schema });