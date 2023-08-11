// db.ts
import { drizzle } from "drizzle-orm/planetscale-serverless";
import { connect } from "@planetscale/database";
import { migrate } from "drizzle-orm/mysql2/migrator";
import { Simulate } from "react-dom/test-utils";
import drop = Simulate.drop;

// create the connection
const connection = connect({
  host: process.env["DATABASE_HOST"],
  username: process.env["DATABASE_USERNAME"],
  password: process.env["DATABASE_PASSWORD"],
});

export const db = drizzle(connection);

// syncs the migrations folder to PlanetScale
migrate(db as any, { migrationsFolder: "./migrations-folder" });
