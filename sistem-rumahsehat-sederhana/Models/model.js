const Employee = require('./employee')
const Patient = require('./patient')
const fs = require('fs')
// const { join } = require('path')



class Model {
    static readEmployee(){
        let employees = JSON.parse(fs.readFileSync('./employee.json', 'utf8'));

        return employees
    }

    static readPatient(){
        let patients = JSON.parse(fs.readFileSync('./patient.json', 'utf8'));

        return patients
    }

    static registerEmployee(name, username, password, position, callback) {
        let employees = Model.readEmployee()
        let idEmp = 0
        if (employees.length === 0) {
            idEmp= 1
        } else {
            idEmp = employees[employees.length - 1].id + 1
        }

        let result = new Employee(idEmp, name, username, password, position)
        employees.push(result)
        Model.saveEmployee(employees)

        callback(result, employees.length)
    }

    static loginEmployee(username, password, callback){
        let database = Model.readEmployee()

        let checkUsername = false
        let checkPassword = false
        let flag = false

        for (let i = 0; i < database.length; i++) {
            let emp = database[i]
            if (emp.username === username && emp.password === password) {
                checkPassword = true
                checkUsername = true
                if (emp.statusLogin === true) {
                    callback(false, emp.username)
                    flag = true
                } else {
                    emp.statusLogin = true
                }
            }   
        }

        if (!checkUsername || !checkPassword) {
            callback('username / passowrd wrong', null)
        } else if (!flag){
            callback(null, username)
        }
        Model.saveEmployee(database)
    }

    static addNewPatient(id, name, complaint, callback) {
        let databaseEmp = Model.readEmployee()
        let databasePat = Model.readPatient()
        let idPat = id
        let total = databasePat.length
        let result = ''
        
        if (total > 0) {
            idPat = databasePat[total - 1].id + 1
        } else {
            idPat = 1
        }
        
        for (let i = 0; i < databaseEmp.length; i++) {
            let emp = databaseEmp[i]
            if(emp.statusLogin === true && emp.position === 'dokter'){
                result = new Patient(idPat, name, complaint)
                databasePat.push(result)
                callback(null, total)
            } else {
                callback('tidak memilki akses untuk add patient', null)
            }    
        }
        Model.savePatient(databaseEmp)
    }

    static logoutEmployee(){
        let database = Model.readEmployee()

        for (let i = 0; i < database.length; i++) {
            let emp = database[i]
            if (emp.statusLogin === true) {
                emp.statusLogin = false
            }
        }
        Model.saveEmployee(database)
    }

    static saveEmployee(employee) {
        let data = JSON.stringify(employee, null, 4)

        fs.writeFileSync('./employee.json', data)
    }

    static savePatient(patient) {
        let data = JSON.stringify(patient, null, 4)

        fs.writeFileSync('./patient.json', data)
    }
}

module.exports = Model