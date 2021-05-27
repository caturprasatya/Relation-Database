// const { Module } = require("module");

class View {
    static successAddEmployee(employee, total) {
        console.log(`Save data success {"username": ${employee.username}, "password": ${employee.password}, "role": ${employee.position} }. Total employee : ${total}`)
    }

    static loginError(err) {
        console.log(err)
    }

    static loginSuccess(user) {
        console.log(`user ${user} logged successfully`)
    }

    static loginDetected(user) {
        console.log(`user ${user} logged in. You need to logout fisrt.`)
    }

    static cannotAdd(err) {
        console.log(err)
    }

    static successAdd(total) {
        console.log(`data pasien berhasil ditambahkan. Total data pasien : ${total}`)
    }

    static logout(){
        console.log(`user has been successfully logout`)
    }
}

module.exports = View