const fs = require('fs');
const path = require('path');

// Rebuild the generated cover from text chunks before Hexo scans source/.
// This keeps the original raster illustration while allowing it to live in git.
hexo.extend.filter.register('before_generate', () => {
  const dataDir = path.join(hexo.base_dir, 'asset_data', 'ai-farming-arrives');
  const outDir = path.join(hexo.source_dir, 'gallery', 'ai-farming-arrives');
  const parts = fs.readdirSync(dataDir)
    .filter((name) => name.startsWith('cover.b64.'))
    .sort();

  const encoded = parts
    .map((name) => fs.readFileSync(path.join(dataDir, name), 'utf8').trim())
    .join('');

  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'cover.jpg'), Buffer.from(encoded, 'base64'));
});
