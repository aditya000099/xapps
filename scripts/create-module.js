/**
 * Module Scaffolding Script
 *
 * Usage: npm run create-module -- --name=school --display="School Management"
 *
 * Copies modules/_template/ to modules/{name}/, replaces all placeholders,
 * and creates a proper package.json for the new module.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

// Parse CLI args
const args = process.argv.slice(2);
const getArg = (name) => {
  const arg = args.find(a => a.startsWith(`--${name}=`));
  return arg ? arg.split('=').slice(1).join('=') : null;
};

const moduleName = getArg('name');
const displayName = getArg('display');

if (!moduleName) {
  console.error('❌ Missing --name argument');
  console.log('Usage: npm run create-module -- --name=school --display="School Management"');
  process.exit(1);
}

const display = displayName || moduleName.charAt(0).toUpperCase() + moduleName.slice(1);
const basePath = moduleName;
const templateDir = path.join(ROOT, 'modules', '_template');
const targetDir = path.join(ROOT, 'modules', moduleName);

if (fs.existsSync(targetDir)) {
  console.error(`❌ Module "${moduleName}" already exists at ${targetDir}`);
  process.exit(1);
}

// Recursively copy a directory
function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    // Rename .template files by stripping the suffix
    const destName = entry.name.replace(/\.template$/, '');
    const destPath = path.join(dest, destName);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      let content = fs.readFileSync(srcPath, 'utf8');

      // Replace all placeholders
      content = content.replaceAll('__MODULE_NAME__', moduleName);
      content = content.replaceAll('__DISPLAY_NAME__', display);
      content = content.replaceAll('__BASE_PATH__', basePath);
      content = content.replaceAll('__API_PREFIX__', `/api/${basePath}`);

      fs.writeFileSync(destPath, content, 'utf8');
    }
  }
}

copyDir(templateDir, targetDir);

// Create .gitkeep dirs that the template references
const gitkeepDirs = [
  'client/pages',
  'client/components',
  'client/hooks',
  'client/store',
  'server/controllers',
  'server/services',
  'server/models',
  'server/migrations',
  'server/seeders',
  'server/validators',
];

for (const dir of gitkeepDirs) {
  const fullDir = path.join(targetDir, dir);
  fs.mkdirSync(fullDir, { recursive: true });
  const gitkeep = path.join(fullDir, '.gitkeep');
  if (!fs.existsSync(gitkeep)) {
    fs.writeFileSync(gitkeep, '', 'utf8');
  }
}

console.log(`✅ Module "${moduleName}" created at modules/${moduleName}/`);
console.log('');
console.log('Next steps:');
console.log(`  1. Run \`npm install\` to link the new workspace`);
console.log(`  2. In your app's server: import { routes } from '@xapps/module-${moduleName}/server';`);
console.log(`  3. In your app's client: import { routes, navItems } from '@xapps/module-${moduleName}/client';`);
