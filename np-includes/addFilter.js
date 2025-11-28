module.exports = (filter, callback,priority) => {
    
    if(!global.__filters) {
        global.__filters = {

        }
    }

    if(!global.__filters[filter]) {
        global.__filters[filter] = [];
    }

    global.__filters[filter].push({
        callback,
        priority
    })

}