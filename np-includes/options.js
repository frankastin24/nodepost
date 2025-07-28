const Option = require('../models/Option')
const NPError = require('./npError')

const updateOption = (name,value) => {
    if(typeof name == 'undefined') {
        return NPError(__dirname+'options.js:6', 'Option name undefined');
    }
    if(typeof value == 'undefined') {
        return NPError(__dirname+'options.js:6', 'Option value undefined');
    }
    
   const foundOptions = Option.findAll({
        where: {
            key: name
        }
    })

    

    if(typeof value !== 'string') {
        value = JSON.stringify(value);   
    }

    if(foundOptions.length == 0) {
        Option.create({
            key:name,
            value:value
        })
    } else {
        foundOptions[0].value = value;
    }

}

const getOption = (name) => {
    if(typeof name == 'undefined') {
        return NPError(__dirname+'options.js:37', 'Option name undefined');
    }
   
    
   const foundOptions = Option.findAll({
        where: {
            key: name
        }
    })

    if(foundOptions.length == 0) {
        return false;
    }

    
    const parsedJSON =  JSON.parse(foundOptions[0].value);

    if(parsedJSON) {
        return parsedJSON;
    } else {
        return foundOptions[0].value;
    }

}

const deleteOption = (name) => {
     const foundOptions = Option.findAll({
        where: {
            key: name
        }
    })

    if(foundOptions.length == 0) {
        return false;
    }

    foundOptions[0].delete();
    return true;
} 

module.exports = {updateOption,getOption,deleteOption};