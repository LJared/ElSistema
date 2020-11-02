//Recoletando elementos
const consoleLogList = document.querySelector('.editor__console-logs')
const executeCodeBtn = document.querySelector('.editor__run')
const resetCodeBtn = document.querySelector('.editor__reset')

//Se inicializa el editor con el ID del div
let codeEditor = ace.edit("editorCode")
let defaultCode = 'console.log("Hola mundo cruel")'
let consoleMessages = []

let editorLib = {
    clearConsoleScreen() {
        //Limpiar el arreglo
        consoleMessages.length = 0


        //Remover todos los elementos de la lista del log
        while (consoleLogList.firstChild) {
            consoleLogList.removeChild(consoleLogList.firstChild)
        }
    },
    printToConsole() {

        consoleMessages.forEach(log => {
            const newLogItem = document.createElement('li')
            const newLogText = document.createElement('pre')

            newLogText.className = log.class;
            newLogText.textContent = `> ${log.message}`

            newLogItem.appendChild(newLogText)

            consoleLogList.appendChild(newLogItem)
        })
    },
    init() {
        //Configuracion de Ace
        //Tema
        codeEditor.setTheme("ace/theme/monokai")

        //Se configura el lenguaje de programación
        //Para obetener el highligth correcto
        codeEditor.session.setMode("ace/mode/javascript")

        //Fijar opciones
        //Lista completa: https://github.com/ajaxorg/ace/wiki/Configuring-Ace
        codeEditor.setOptions({
            //fontFamily: "Inconsolata",
            fontSize: "15pt",
            //enableBasicAutocompletion: true,
            //enableLiveAutocompletion: true
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true

        })

        //Agregar codigo por defecto
        codeEditor.setValue(defaultCode)
    }
}

//Eventos
executeCodeBtn.addEventListener("click", () => {
    //Limpiar los mensajes de la consola
    editorLib.clearConsoleScreen()

    //Recoger entrada del editor de codigo
    const userCode = codeEditor.getValue()

    //Ejecutar el codigo escrito
    try {
        new Function(userCode)()
    } catch (err) {
        console.error(err)
    }

    //Imprimir a la consola
    editorLib.printToConsole()
})

resetCodeBtn.addEventListener("click", () => {
    //Limpiar la ventana del editor de codigo
    codeEditor.setValue(defaultCode)

    //Limpiar los mensajes de la consola
    editorLib.clearConsoleScreen()
})

//Se llama a la funcion de inicializar
editorLib.init()