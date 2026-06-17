/**
 * Dev Script — Starts both frontend and backend concurrently.
 *
 * Usage: npm run dev
 *
 * Runs:
 *   - @xapps/web  (Vite dev server on :5173)
 *   - @xapps/api  (Express server on :4000)
 *
 * TODO: Use concurrently or npm-run-all to run both in parallel.
 *       For now, instructions:
 *       Terminal 1: npm run dev:web
 *       Terminal 2: npm run dev:api
 */

const { execSync } = require('child_process');

console.log('\n🚀 XApps Development Server\n');
console.log('Start both services in separate terminals:');
console.log('  Terminal 1: npm run dev:web');
console.log('  Terminal 2: npm run dev:api');
console.log('');
console.log('Or install concurrently: npm i -D concurrently');
console.log('Then: npx concurrently "npm run dev:web" "npm run dev:api"\n');
