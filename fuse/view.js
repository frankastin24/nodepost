function parseJSX(jsx, context = {}) {
    // Helper: eval with context
    function evalWithContext(jsCode) {
        return Function(...Object.keys(context), `return ${jsCode};`)(...Object.values(context));
    }

    const htmlStack = [];
    let pos = 0;

    while (pos < jsx.length) {
        // Match next HTML or JS expression
        const htmlMatch = jsx.slice(pos).match(/^<[^>]+>(.*?)<\/[^>]+>/s);
        const jsMatch = jsx.slice(pos).match(/^{([^}]*)}/);

        if (htmlMatch && (jsMatch ? htmlMatch.index < jsMatch.index : true)) {
            // HTML block
            htmlStack.push(htmlMatch[0]);
            pos += htmlMatch.index + htmlMatch[0].length;
        } else if (jsMatch) {
            const jsCode = jsMatch[1].trim();

            // Check for foreach
            const foreachMatch = jsCode.match(/(\w+)\.forEach\s*\(\s*\(?\s*(\w+)\s*\)?\s*=>\s*([`{<])/);
            if (foreachMatch) {
                const arrName = foreachMatch[1];
                const itemVar = foreachMatch[2];

                // Find the start and end of the HTML inside foreach
                const loopStart = pos + jsMatch.index + jsMatch[0].length;
                // Assume next HTML block is the loop template
                const loopHtmlMatch = jsx.slice(loopStart).match(/^<[^>]+>(.*?)<\/[^>]+>/s);
                if (!loopHtmlMatch) throw new Error("No HTML block found after foreach!");

                const loopHtml = loopHtmlMatch[0];
                const arr = context[arrName];
                if (!Array.isArray(arr)) throw new Error(`${arrName} is not an array!`);

                arr.forEach(val => {
                    // Simple variable replacement: replace {itemVar} in HTML with value
                    let htmlFragment = loopHtml.replace(new RegExp(`{${itemVar}}`, "g"), val);
                    htmlStack.push(htmlFragment);
                });

                pos = loopStart + loopHtmlMatch[0].length;
            } else {
                // Variable echo
                try {
                    const value = evalWithContext(jsCode);
                    htmlStack.push(value);
                } catch (e) {
                    htmlStack.push(`[Error: ${e.message}]`);
                }
                pos += jsMatch.index + jsMatch[0].length;
            }
        } else {
            // No more matches
            break;
        }
    }

    return htmlStack.join('');
}

// Example usage:
const jsx = `
<div>Hello {name}</div>
<ul>
{items.forEach(item => 
    <li>{item}</li>
)}
</ul>
`;

const context = {
    name: "Frank",
    items: ["Apple", "Banana", "Cherry"]
};

console.log(parseJSX(jsx, context));
// Output:
// <div>Hello Frank</div><ul><li>Apple</li><li>Banana</li><li>Cherry</li></ul>

const getExtension = (path) => {
    const splitPath = path.split('.');
    return splitPath.length == 1 ? 'jsx' : splitPath[1];
}

const view = (path) => {

    const splitPath = path.split('/');
    const pathPartsLength = splitPath.length - 1;
    const basename = splitPath[0];

    const extension = getExtension(path);

    const theme_dir = '../np_content/themes/'+global.theme_dir+'/';

    if(pathPartsLength == 0) {

        if(extension == 'jsx') {

            const JSX = FS.readSync(global.theme_dir + path);

            global.express_res.send(parseJSX(JSX));
        
        }

    } else {

    }

}