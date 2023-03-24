import { drizzle, PlanetScaleDatabase } from 'drizzle-orm/planetscale-serverless';
import { connect, Connection } from '@planetscale/database';

let connection: Connection | null = null;
let db: PlanetScaleDatabase | null = null;

const getDB = () => {
  if (!connection) {
    connection = connect({
      url: process.env.DATABASE_URL,
    });
  }

  if (connection && !db) {
    db = drizzle(connection);
  }

  return db!;
}


export { getDB }; 