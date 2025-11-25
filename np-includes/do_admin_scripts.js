module.exports = (in_footer) => {
    let html = '';
    let dependancyTree = {};

    // Example input: global.admin_scripts = [...]
    // Build a map for quick lookup
    const scriptMap = {};
    if (!Array.isArray(global.admin_scripts)) return html;

    global.admin_scripts.forEach(script => {
        scriptMap[script.name] = script;
    });

    // Helper to resolve dependencies recursively
    const visited = new Set();

    function renderScript(name) {
        if (visited.has(name)) return;
        visited.add(name);

        const script = scriptMap[name];
        if (!script) return;

        // Resolve dependencies first
        if (Array.isArray(script.dependacies)) {
            script.dependacies.forEach(dep => renderScript(dep));
        }

        // Now include this script
        if(in_footer && script.in_footer) {
            html += `<script src="${script.url}" rel="script" ></script>`;
        }
        if(!in_footer && !script.in_footer) {
            html += `<script src="${script.url}" rel="script" /></script>`;
        }
       
    }

    // Render all scripts, resolving dependencies
    global.admin_scripts.forEach(script => {
        renderScript(script.name);
    });

    return html;
}