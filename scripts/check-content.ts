import { readdir, readFile, access } from 'node:fs/promises';
import { join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const reportOnly = process.argv.includes('--report');
const sourceExtensions = new Set(['.ts', '.html']);
const ignoredDirectories = new Set(['.angular', '.git', 'dist', 'node_modules']);
const failures: string[] = [];
const pendingItems: string[] = [];
const unapprovedLinks = new Set<string>();

async function listFiles(directory: string): Promise<string[]> {
  let entries;
  try {
    entries = await readdir(directory, { withFileTypes: true });
  } catch {
    return [];
  }

  const nested = await Promise.all(
    entries.map(async (entry) => {
      const path = join(directory, entry.name);
      if (entry.isDirectory()) {
        return ignoredDirectories.has(entry.name) ? [] : listFiles(path);
      }
      return [path];
    }),
  );
  return nested.flat();
}

function collectStringLiterals(
  source: string,
  filename: string,
): Array<{ value: string; line: number }> {
  const tree = ts.createSourceFile(filename, source, ts.ScriptTarget.Latest, true);
  const literals: Array<{ value: string; line: number }> = [];
  const visit = (node: ts.Node): void => {
    if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
      literals.push({
        value: node.text,
        line: tree.getLineAndCharacterOfPosition(node.getStart()).line + 1,
      });
    }
    ts.forEachChild(node, visit);
  };
  visit(tree);
  return literals;
}

function hasCopilotWebSocketClaim(source: string, filename: string): boolean {
  const tree = ts.createSourceFile(filename, source, ts.ScriptTarget.Latest, true);
  let hasClaim = false;
  const visit = (node: ts.Node): void => {
    if (ts.isObjectLiteralExpression(node)) {
      const idProperty = node.properties.find(
        (property) =>
          ts.isPropertyAssignment(property) &&
          property.name.getText(tree).replace(/["']/g, '') === 'id' &&
          ts.isStringLiteral(property.initializer) &&
          property.initializer.text === 'ai-copilot',
      );
      if (idProperty && /\bwebsockets?\b/i.test(node.getText(tree))) hasClaim = true;
    }
    if (!hasClaim) ts.forEachChild(node, visit);
  };
  visit(tree);
  return hasClaim;
}

/** Testimonial objects marked verified must also carry publicationAuthorized: true. */
function unauthorizedTestimonials(source: string, filename: string): string[] {
  const tree = ts.createSourceFile(filename, source, ts.ScriptTarget.Latest, true);
  const offenders: string[] = [];
  const propertyText = (node: ts.ObjectLiteralExpression, name: string): string | undefined => {
    const property = node.properties.find(
      (candidate): candidate is ts.PropertyAssignment =>
        ts.isPropertyAssignment(candidate) && candidate.name.getText(tree) === name,
    );
    return property?.initializer.getText(tree).replace(/["']/g, '');
  };
  const visit = (node: ts.Node): void => {
    if (
      ts.isObjectLiteralExpression(node) &&
      propertyText(node, 'status') === 'verified' &&
      propertyText(node, 'quote') !== undefined &&
      propertyText(node, 'publicationAuthorized') !== 'true'
    ) {
      offenders.push(propertyText(node, 'id') ?? 'sans id');
    }
    ts.forEachChild(node, visit);
  };
  visit(tree);
  return offenders;
}

async function main(): Promise<void> {
  const allFiles = await listFiles(root);
  const appFiles = allFiles.filter(
    (path) =>
      path.startsWith(join(root, 'src', 'app')) &&
      sourceExtensions.has(path.slice(path.lastIndexOf('.'))),
  );
  const approvedPath = join(root, 'scripts', 'approved-repositories.json');
  const approvedRepositories = new Set<string>(JSON.parse(await readFile(approvedPath, 'utf8')));
  const blockedRepositories = new Set([
    'alten-copilot',
    'ai-copilot-platform',
    'ebank-backend',
    'ebank-frontend',
    'messenger',
    'demo-conflit',
    'tprest',
    'tpdatarest',
    'littlelemon',
    'sounds_of_morocco',
    'som',
    'renewable-energy-app',
    'portfolio',
    'handmade_portfolio',
    'react_portfolio',
    'crud_springboot',
    'movie-recommendation-system',
    'store-springboot',
    'restspringboot',
    'scrapping-tutto',
    'studenthub',
    'collectionsjava',
    'challenge_java',
    'to-do-list-react',
    'learn-react',
    'learnjs',
    'learn_c',
  ]);

  for (const path of appFiles) {
    const text = await readFile(path, 'utf8');
    const sourceLiterals = path.endsWith('.ts') ? collectStringLiterals(text, path) : [];
    const renderedText = path.endsWith('.html')
      ? text.replace(/<!--[^]*?-->/g, '')
      : sourceLiterals.map((literal) => literal.value).join('\n');
    const displayPath = relative(root, path).replaceAll('\\', '/');
    const forbidden: Array<[RegExp, string]> = [
      [/\b5\s+microservices\b/i, '5 microservices'],
      [/\bAzure\s+OpenAI\b/i, 'Azure OpenAI'],
      [
        /\b(?:expert|architecte|architect|senior|leader|passionné|passionnee|dynamique)\b/i,
        'vocabulaire interdit',
      ],
      [
        /\b(?:force de proposition|solutions innovantes|au service de|de A à Z)\b/i,
        'formulation interdite',
      ],
      [/\b(?:com\.alten\.|ai-copilot-platform|alten-copilot)\b/i, 'donnée interne ALTEN'],
    ];

    for (const [pattern, label] of forbidden) {
      const match = pattern.exec(renderedText);
      if (match) failures.push(`${displayPath}: ${label} (« ${match[0]} »)`);
    }
    if (path.endsWith('.ts') && hasCopilotWebSocketClaim(text, path)) {
      failures.push(`${displayPath}: WebSockets associé au Copilot`);
    }
    if (path.endsWith('testimonials.data.ts')) {
      for (const id of unauthorizedTestimonials(text, path)) {
        failures.push(`${displayPath}: témoignage « ${id} » verified sans publicationAuthorized`);
      }
    }

    for (const literal of sourceLiterals) {
      // EmailJS ids belong in the generated environment file, never in source code.
      if (/^(?:service|template)_[a-z0-9]{6,}$/i.test(literal.value.trim())) {
        failures.push(`${displayPath}:${literal.line} identifiant EmailJS écrit en dur`);
      }
      if (/TODO\(hamza\)|⏸️|🔒/.test(literal.value)) {
        pendingItems.push(`${displayPath}:${literal.line} ${literal.value}`);
      }
      for (const match of literal.value.matchAll(/https:\/\/github\.com\/ELGHAD\/([\w.-]+)/gi)) {
        const repository = match[1];
        const normalizedRepository = repository.toLowerCase();
        // Linkable only when listed in approved-repositories.json and not blocked above.
        if (
          blockedRepositories.has(normalizedRepository) ||
          !approvedRepositories.has(repository)
        ) {
          unapprovedLinks.add(`https://github.com/ELGHAD/${repository}`);
        }
      }
      for (const match of literal.value.matchAll(/(?:cv|resume)\/([\w.-]+\.pdf)/gi)) {
        const cvPath = join(root, 'public', 'cv', match[1]);
        try {
          await access(cvPath);
        } catch {
          failures.push(`${displayPath}:${literal.line} CV absent de public/cv/: ${match[1]}`);
        }
      }
    }

    if (path.endsWith('.html')) {
      for (const image of text.matchAll(/<img\b[^>]*>/gi)) {
        // Static alt="…" or an Angular binding ([alt] / [attr.alt]) for bilingual text.
        if (!/(?:\balt|\[(?:attr\.)?alt\])\s*=/.test(image[0])) {
          failures.push(`${displayPath}: image sans attribut alt`);
        }
      }
    }
  }

  const secretPattern =
    /(?:sk-[A-Za-z0-9_-]{20,}|AKIA[0-9A-Z]{16}|AIza[0-9A-Za-z_-]{30,}|gh[pousr]_[A-Za-z0-9_]{20,}|-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----)/;
  for (const path of allFiles) {
    if (!/\.(?:[cm]?[jt]s|json|html|scss|css|md|yml|yaml|txt|xml)$/i.test(path)) continue;
    const text = await readFile(path, 'utf8');
    if (secretPattern.test(text))
      failures.push(`${relative(root, path).replaceAll('\\', '/')}: motif de secret détecté`);
  }

  const referencePath = join(root, 'docs', 'portfolio', 'PORTFOLIO_CONTENT.md');
  const reference = await readFile(referencePath, 'utf8').catch(() => '');
  for (const [index, line] of reference.split(/\r?\n/).entries()) {
    if (/TODO\(hamza\)|⏸️|🔒/.test(line)) {
      pendingItems.push(`docs/portfolio/PORTFOLIO_CONTENT.md:${index + 1} ${line.trim()}`);
    }
  }

  if (reportOnly) {
    console.log('Pending facts and TODOs:');
    console.log(
      pendingItems.length ? pendingItems.map((item) => `- ${item}`).join('\n') : '- none',
    );
    console.log('\nUnapproved repository links:');
    console.log(
      unapprovedLinks.size ? [...unapprovedLinks].map((link) => `- ${link}`).join('\n') : '- none',
    );
    return;
  }

  for (const repository of unapprovedLinks)
    failures.push(`Lien de dépôt non approuvé: ${repository}`);
  if (failures.length) {
    console.error(`check:content failed (${failures.length} issue(s)):`);
    for (const failure of failures) console.error(`- ${failure}`);
    process.exitCode = 1;
    return;
  }
  console.log('check:content passed.');
}

await main();
