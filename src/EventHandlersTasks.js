import { Task, addTask, storageTasks } from './TaskController.js'
let inputCreateTask = document.querySelector('.input__creatTask')

export class EventHandlersTasks {
    static handlerDeleteTask(event, id) {
        fetch(`http://127.0.0.1:4000/api/tasks/${id}`, { method: "DELETE" })
        let deletableObject = {}
        let deletableObjectIndex = 0
        for (let index = 0; index < storageTasks.length; index++) {
            if (storageTasks[index].id === id) {
                deletableObject = storageTasks[index]
                deletableObjectIndex = index
                break;
            }
        }
        deletableObject.remove()
        storageTasks.splice(deletableObjectIndex, 1)
    }

    static handlerAddTask(event) {
        if (event.keyCode === 13) {
            fetch('http://127.0.0.1:4000/api/tasks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json;charset=utf-8' },
                body: JSON.stringify({ text: inputCreateTask.value })
            })
            addTask(false, new Task('', inputCreateTask.value, '22.02.2001'))
        }

    }

    static handlerUpdateTask(event) {
        fetch('http://127.0.0.1:4000/api/tasks', {
            method: "PUT",
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            body: JSON.stringify({ _id: event.path[1].id, completed: true })
        })
    }
}




