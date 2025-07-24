const env = require('./enviromentals');
const sqlite3 = require("sqlite3").verbose();

class fuseDB {

    constructor(host, db_user, db_password) {

        if (env.mode == 'production' || env.forceMYSQL == 'true') {

            this.db_type = 'mysql';

        } else {
            this.connection = this.connectToSQLite();
            this.db_type = 'sqlite';
        }

    }

    query(query) {
        if (this.db_type == 'sqlite') {

            this.connection.exec(query);

        } else {

        }
    }

    delete(table_name,primary_key,primary_value) {
        this.query(`DELETE FROM ${table_name} WHERE ${primary_key} = ${primary_value}`);
    }

    connectToSQLite() {

        const db = new sqlite3.Database('../postnode.db', (error) => {
            if (error) {
                return console.error(error.message);
            }
        });
        console.log("Connection with SQLite has been established");
        return db;

    }

    createTable(name, data) {

        $sql = `
        CREATE TABLE ${name} (`;

        const numRows = data.length - 1;

        data.forEach((row, index) => {
            $sql += `${row[0]} ${row[2]} ` + (row[3] ? 'PRIMARY KEY ' : '') + (row[4] ? 'AUTOINCREMENT' : '') + (numRows == index ? '' : ',');
        })

        $sql += ')';

        this.query($sql);

    }

    getAllRows(table_name, fields_to_return ) {
        const array = [];

        const numFields = typeof fields_to_return == 'undefined' ? 0 : fields_to_return.length;
        
        const fields = typeof fields == 'undefined' ? '*' : fields_to_return.reduce((field,index) => {
            return field + (numFields == index ? '' : ',');
        },'')

        db.each(`SELECT ${fields} FROM ${table_name}`, (error, row) => {
            if (error) {
            throw new Error(error.message);
            }
            array.push(row);
        });
        return array;
    }
    getWhere(table_name, where,fields_to_return) {

         const array = [];

        const numFields = typeof fields_to_return == 'undefined' ? 0 : fields_to_return.length;
        
        const fields = typeof fields == 'undefined' ? '*' : fields_to_return.reduce((field,index) => {
            return field + (numFields == index ? '' : ',');
        },'')

        db.each(`SELECT ${fields} FROM ${table_name} WHERE ${where}`, (error, row) => {
            if (error) {
            throw new Error(error.message);
            }
            array.push(row);
        });
        return array;

    }

    insert(table_name, data) {

        let sql = `INSERT INTO ${table_name} (`;

        const values = [];
        const numRows = data.length - 1;

        data.forEach((item, index) => {
            sql += "`" + item[0] + "`" + (index == numRows ? '' : ',');
            values.push(item[1]);
        })

        db.run(
            sql,
            values,
            function (error) {
                if (error) {
                    console.error(error.message);
                }
                console.log(`Inserted a row with the ID: ${this.lastID}`);
            }
        );



    }

    updateRow(table_name, primary_key_name, primary_key_value, data) {
        let sql = `UPDATE ${table_name} `;

        const values = [];
        const numRows = data.length - 1;

        data.forEach((item, index) => {
            sql += " SET `" + item[0] + "` = ? " + (index == numRows ? '' : ',');
            values.push(item[1]);
        })

        sql += `WHERE ? = ?`;

        values.push(primary_key_name);
        values.push(primary_key_value);

        this.connection.run(
            sql,
            values,
            function (error) {
                if (error) {
                    console.error(error.message);
                }
                console.log(`Row ${id} has been updated`);
            }
        );

    }


}