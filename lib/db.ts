import { neon } from '@neondatabase/serverless';

// Lazy initialization - solo se inicializa cuando se usa
let sqlInstance: ReturnType<typeof neon> | null = null;

function getSql() {
  if (!sqlInstance) {
    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
      throw new Error('DATABASE_URL environment variable is not set');
    }
    sqlInstance = neon(databaseUrl);
  }
  return sqlInstance;
}

// Exportar como función para que sea lazy
export const sql = (...args: Parameters<ReturnType<typeof neon>>) => {
  return getSql()(...args);
};
