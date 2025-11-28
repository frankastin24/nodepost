module.exports = (filter,value) => {
    
    const filters = sortCallables(global.__filters[filter]);
    
    filters.forEach((filter) => {
       value = filter.callback(value);
    })

    return value;

}

function sortCallables(array) {
    arr.sort((a, b) => (a.priority || 0) - (b.priority || 0));
    return arr;
}