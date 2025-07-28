const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const babelParser = require('@babel/parser');
const traverse = require('@babel/traverse').default;

/**
 * Parse JSX file and render HTML string with Node context
 * @param {string} filePath - Path to the JSX file
 * @param {object} nodeContext - Variables and functions accessible in Node
 * @param {object} parsedImports - Used for recursive import tracking
 * @returns {string} - Final rendered HTML string
 */
function parseJSX(jsxCode, nodeContext = {}, parsedImports = {}) {
 
  // Find require() statements for JSX imports
  const requireRegex = /require\(['"`](.+\.jsx)['"`]\)/g;

  const imports = {};
  
  let match;
  
  while ((match = requireRegex.exec(jsxCode))) {
    const importPath = match[1];
    const fullImportPath = path.resolve(path.dirname(filePath), importPath);
    if (!parsedImports[importPath]) {
      // Recursively parse imported JSX
      parsedImports[importPath] = parseJSX(fullImportPath, nodeContext, parsedImports);
    }
    // Store output for custom tag replacement
    imports[path.basename(importPath, '.jsx')] = parsedImports[importPath];
  }

  // Parse JSX code with Babel
  let ast;
  try {
    ast = babelParser.parse(jsxCode, {
      sourceType: 'module',
      plugins: ['jsx'],
    });
  } catch (err) {
    throw new Error('Failed to parse JSX: ' + err.message);
  }

  // Gather variables, functions, and JSX blocks
  const declared = {};
  let htmlCode = '';
  let unusedJS = '';
  traverse(ast, {
    VariableDeclarator({ node }) {
      try {
        // Only handle simple literal assignments
        if (node.init && node.init.type === 'Literal') {
          declared[node.id.name] = node.init.value;
        }
      } catch (e) {}
    },
    FunctionDeclaration({ node }) {
      try {
        // Convert Babel function AST to executable function (simplified)
        

        declared[node.id.name] = eval(`(${jsxCode.substring(node.start, node.end)})`);
      } catch (e) {}
    },
    JSXElement({ node }) {
      // Extract JSX as HTML string
      htmlCode += jsxToHtml(node, declared, nodeContext);
    },
    ExpressionStatement({ node }) {
      // Collect unused JS (not handled above)
      unusedJS += jsxCode.substring(node.start, node.end) + '\n';
    }
  });

  // Merge with provided nodeContext
  Object.assign(declared, nodeContext);

  // Parse HTML and replace JS expressions
  const $ = cheerio.load(htmlCode, { xmlMode: false });

  // Replace variables/functions in HTML {{var}}
  $('*').each((i, el) => {
    if (el.type === 'tag') {
      $(el).html(
        $(el)
          .html()
          .replace(/\{\{(.+?)\}\}/g, (m, expr) => {
            try {
              if (declared[expr.trim()] !== undefined) {
                return typeof declared[expr.trim()] === 'function'
                  ? declared[expr.trim()]()
                  : declared[expr.trim()];
              }
              return nodeContext[expr.trim()] !== undefined
                ? nodeContext[expr.trim()]
                : m;
            } catch {
              return m;
            }
          })
      );
    }
  });

  // Handle for-loops and map functions
  // (You may want to parse AST for robust handling)
  htmlCode = htmlCode.replace(/<!--\s*for\s*\((.+?)\)\s*{(.+?)}\s*-->/gs, (m, loopExpr, loopHtml) => {
    let out = '';
    try {
      const [decl, arrName] = loopExpr.match(/let (\w+) of (\w+)/).slice(1);
      const arr = declared[arrName] || nodeContext[arrName] || [];
      arr.forEach(item => {
        out += loopHtml.replace(/\{\{(\w+)\}\}/g, (mm, v) => (v === decl ? item : mm));
      });
    } catch {
      out = m;
    }
    return out;
  });

  // Replace custom tags with imported JSX output
  Object.entries(imports).forEach(([tag, htmlStr]) => {
    $(tag).replaceWith(htmlStr);
  });

  // Add unused JS into <script> block
  let scriptBlock = unusedJS ? `<script>\n${unusedJS}\n</script>` : '';

  return $.html() + scriptBlock;
}

/**
 * Converts a Babel JSXElement AST node to HTML string
 * @param {object} node
 * @param {object} declared
 * @param {object} nodeContext
 */
function jsxToHtml(node, declared, nodeContext) {
  // Only handles simple JSX, for demonstration
  let tag = node.openingElement.name.name;
  let attrs = node.openingElement.attributes
    .map(attr => `${attr.name.name}="${attr.value.value}"`)
    .join(' ');
  let children = node.children
    .map(child =>
      child.type === 'JSXText'
        ? child.value
        : child.type === 'JSXExpressionContainer'
        ? declared[child.expression.name] || nodeContext[child.expression.name] || ''
        : child.type === 'JSXElement'
        ? jsxToHtml(child, declared, nodeContext)
        : ''
    )
    .join('');
  return `<${tag}${attrs ? ' ' + attrs : ''}>${children}</${tag}>`;
}

module.exports = parseJSX;