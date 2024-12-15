import { sequelize } from '../config/database';
import * as fs from 'fs';
import * as path from 'path';

// Declare __dirname for TypeScript
declare const __dirname: string;

async function setupDatabase() {
  try {
    // Read SQL files using relative paths from src/scripts
    const schemaSQL = fs.readFileSync(
      path.resolve(process.cwd(), './sql/schema.sql'),
      'utf-8'
    );

    const seedsSQL = fs.readFileSync(
      path.resolve(process.cwd(), './sql/seeds.sql'),
      'utf-8'
    );

    // Connect to database
    await sequelize.authenticate();
    console.log('Database connection established successfully.');

    // Run schema and seeds
    await sequelize.query(schemaSQL);
    console.log('Schema created successfully');

    await sequelize.query(seedsSQL);
    console.log('Seeds inserted successfully');

    console.log('Database setup completed');
  } catch (error) {
    console.error('Error setting up database:', error);
    console.error('Error details:', error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
}

setupDatabase();