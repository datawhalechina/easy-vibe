const fs = require('fs');
const path = require('path');

const rootDir = process.cwd();
const docsReadmeDir = path.join(rootDir, 'docs-readme');
const rootReadmePath = path.join(rootDir, 'README.md');

const locales = [
  { code: 'zh-CN', name: '简体中文' },
  { code: 'zh-TW', name: '繁體中文' },
  { code: 'en-US', name: 'English' },
  { code: 'ja-JP', name: '日本語' },
  { code: 'es-ES', name: 'Español' },
  { code: 'fr-FR', name: 'Français' },
  { code: 'tlh', name: 'Klingon' },
  { code: 'ko-KR', name: '한국어' },
  { code: 'ar-SA', name: 'العربية' },
  { code: 'tr-TR', name: 'Türkçe' },
  { code: 'vi-VN', name: 'Tiếng_Việt' },
  { code: 'de-DE', name: 'Deutsch' },
  { code: 'bn-BD', name: 'বাংলা' }
];

function generateNavBlock(isRoot) {
  const links = locales.map(locale => {
    const href = isRoot ? `docs-readme/${locale.code}/README.md` : `../${locale.code}/README.md`;
    return `  <a href="${href}"><img alt="${locale.name}" src="https://img.shields.io/badge/${locale.name}-d9d9d9"></a>`;
  });
  
  return `<p align="center">\n${links.join('\n')}\n</p>`;
}

function updateFile(filePath, isRoot) {
  if (!fs.existsSync(filePath)) {
    console.log(`File not found: ${filePath}`);
    return;
  }
  
  let content = fs.readFileSync(filePath, 'utf8');
  const newNavBlock = generateNavBlock(isRoot);
  
  // Regex to match the existing nav block. It starts with <p align="center"> and contains the badges.
  // The badges in previous versions had slightly different names/links, but they all were inside <p align="center"> ... </p>
  // We look for the block containing "简体中文" or "English" to be sure it's the language nav.
  
  const regex = /<p align="center">\s*<a href=".*README.*\.md"><img alt=".*".*>\s*<\/a>[\s\S]*?<\/p>/;
  
  if (regex.test(content)) {
    content = content.replace(regex, newNavBlock);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${filePath}`);
  } else {
    console.log(`Nav block not found in ${filePath}`);
    // Fallback: try to find where it should be (after the main title block?)
    // In previous steps, we saw it's after the main title block div end or inside it.
    // Let's try to match a simpler pattern if the complex one fails, or manual inspection might be needed.
    // Given I just wrote them, they should match.
  }
}

// Update root README
updateFile(rootReadmePath, true);

// Update docs-readme files
locales.forEach(locale => {
  const filePath = path.join(docsReadmeDir, locale.code, 'README.md');
  updateFile(filePath, false);
});
