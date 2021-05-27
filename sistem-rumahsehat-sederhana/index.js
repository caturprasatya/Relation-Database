const argv = process.argv
const command = argv[2]
const dataUser= argv.slice(3)
const complaint = argv.slice(5)
const Controller = require('./Controllers/controller.js')

switch (command) {
    case 'register':
        Controller.register(dataUser[0], dataUser[3], dataUser[1], dataUser[2])
        break;
    case 'login':
        Controller.login(dataUser[0], dataUser[1])
        break;
    case 'addPatient':
        Controller.addPatient(dataUser[0], dataUser[1], complaint)
        break;
    case 'logout':
        Controller.logutAccount()
        break;
    default:
        break;
}