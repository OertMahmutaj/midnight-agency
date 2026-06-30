import { config } from "dotenv";
import path from "path";
import { defineConfig } from "prisma/config";

// Load .env.local
config({ path: path.join(process.cwd(), ".env.local") });

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    // Prisma CLI uses DIRECT_URL for migrations/push, 
    // and your app uses DATABASE_URL for runtime.
    url: process.env.DIRECT_URL as string,
  },
});