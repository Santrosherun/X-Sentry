const { SerialPort } = require('serialport')
const prompt = require("prompt-sync")({ sigint: true });


//PONER PUERTO SERIAL CORRECTO, EL QUE SE ESTE USANDO CON EL ARDUINO.
const port = new SerialPort({ path: '/dev/tty-usbserial1', baudRate: 9600 })
let inProcess = true

let startMovement = () => {
    port.write('empezarrecorrido', function(err) {
        if (err) {
          return console.log('Error on write: ', err.message)
        }
        console.log('message written')
      })
}



// Open errors will be emitted as an error event
port.on('error', function(err) {
  console.log('Error: ', err.message)
})

while(inProcess){
    let input = prompt()
    if(input == 'shoot'){
        console.log('movement started')
        startMovement()
    }else{
        console.log('enter a correct command')
    }
}