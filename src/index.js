"use strict"
import "./sass/style.scss"
let inputCreateTask = document.querySelector('.input__creatTask')

let tasks = []

class Task {
    constructor(title, text, date) {
        // this.id = 0
        this.title = title
        this.text = text
        this.date = date
    }
}

function createTask(objTask) {
    tasks.push(objTask)
    let taskHTML = document.createElement('div')
    taskHTML.classList.add('task')
    taskHTML.innerHTML = objTask.text
    let checkBox = document.createElement('input')
    checkBox.type = "checkbox"
    taskHTML.append(checkBox)
    document.body.append(taskHTML)
}


inputCreateTask.addEventListener('keyup', (event) => {
    if (event.keyCode === 13) {
        createTask(new Task('', inputCreateTask.value, '22.02.2001'))
    }
})

console.log(tasks)
