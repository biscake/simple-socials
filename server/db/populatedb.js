const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  username VARCHAR ( 255 ),
  pwHash VARCHAR ( 255 )
);
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    host: 'localhost',
    database: 'simple_socials',
    user: 'lard',
    password: 'ljh10001'
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
