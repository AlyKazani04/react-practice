import { createClient } from '@neondatabase/neon-js';

// Initialize with Managed BetterAuth
// Use your Neon database URL without credentials or query parameters.
// Example: https://ep-example.c-2.us-east-1.aws.neon.tech/neondb
export const client = createClient({
  auth: {
    url: import.meta.env.VITE_NEON_DATABASE_AUTH_URL,
    allowAnonymous: true
  },
  dataApi: {
    url: import.meta.env.VITE_NEON_DATABASE_API_URL
  }
});
