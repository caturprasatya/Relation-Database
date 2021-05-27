const { callbackify } = require('util')
const Model = require('../Models/model.js')
const View = require('../Views/view.js')

class Controller {
    static register(name, username, password, position) {
        Model.registerEmployee(name, username, password, position, (biodata, total) => {
            View.successAddEmployee(biodata, total)
        })
    }

    static login(username, password) {
        Model.loginEmployee(username, password, (err, data) => {
            if (err) {
                View.loginError(err)
            } else if (err === false) { 
                View.loginDetected(data)
            } else if(err === null){
                View.loginSuccess(data)
            }           
        })
    }

    static addPatient(id, name, complaint) {
        Model.addNewPatient(id, name, complaint, (err, total) =>{
            if (err) {
                View.cannotAdd(err)
            } else {
                View.successAdd(total)
            }
        })
    }

    static logutAccount(){
        Model.logoutEmployee()
        View.logout()
    }

}

module.exports = Controller