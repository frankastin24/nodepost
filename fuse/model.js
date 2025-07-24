
const npdb = require('./db.js');

class Model {

    constructor(id) {
        this.db = npdb;

        if(typeof id != 'undefined') {
            this.getByPrimary(id);
        }
    }


    getAll(limit,offset) {

       const result = this.db.getAllRows(this.table_name,limit,offset);
  
       const array = [];

       const className = this.constructor.name;
       
       result.posts.forEach((row,index)=> {

        array[index] = new className;

        this.fields.forEach((field) => {
            array[index][field] = row[field];
        })

       })

       return array;
    }

    getWhere(where_statement,fields) {

       const result = this.db.getWhere(this.table_name,where_statement,$fields);
       
       const className = this.constructor.name;
       
       result.forEach((row,index)=> {

        array[index] = new className;

        this.fields.forEach((field) => {
            array[index][field] = row[field];
        })

       })

       return array;

    } 

    getWhereField(field_name , field_value) {
        
       const result = this.db.getWhereField(this.table_name,field_name,field_value,fields);
       
       const className = this.constructor.name;
       
       result.forEach((row,index)=> {

        array[index] = new className;

        this.fields.forEach((field) => {
            array[index][field] = row[field];
        })

       })

       return array;

    }

    hasOne(model_name) {
        
        const model = new model_name();

        const className = this.constructor.name;
       
        array = model.getWhereField(className.toLower() +'_id' , $this[this.fields[0]] );
        
        model_name = model_name.toLower();

        this[model_name] = array.length ? $array[0] : false;

    }

    isOne(model_name) {
        
        const model = new model_name();

        model.getByPrimary($this[model_name.toLower()+'_id']);

        this[model_name.toLower()] = model;

    }

    getByPrimary(value) {
       
       const result = this.db.getWhereField(this.table_name,this.fields[0],value,[]);
       
       const row = result[0];
       
       this.fields.forEach((field) => {
            array[index][field] = row[field];
       })

    }

    delete() {
        this.db.delete(this.table_name, this.fields[0], this[this.fields[0]]);
    }
    
}