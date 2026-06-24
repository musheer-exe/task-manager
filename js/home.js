// const { response } = require("express");

const sessionKeyfromApiSavedinLocalStorage = localStorage.getItem('sessionkey')

const authbutton = document.querySelector('.authone');

// auth button

authbutton.addEventListener('click', async function () {

    const checkauth = await checkauthfunc();
})



// Add new Task button 

const addNewTaskButton = document.querySelector('.add-new-button')

addNewTaskButton.addEventListener('click', function () {
    clearpopup()

    createpopupfunc()


    // get user names

    const newTaskAssignee1 = document.querySelector('.assignee1');

    newTaskAssignee1.addEventListener('focus', async function () {
        const response = await getusers()

        createuserdropdown(response)
    })





    // New Task save Button 

    const saveNewTaskButton = document.querySelector('.save');
    saveNewTaskButton.addEventListener('click', async function () {
        console.log('click')
        const taskTitle = document.querySelector('.textarea').value;
        const taskDescription = document.querySelector('.textarea1').value;
        const newTaskStatus = document.querySelector('.status').value;
        const newTaskAssignee = document.querySelector('.assignee1').value;
        const newTaskSeverity = document.querySelector('.Severity1').value;
        if (taskDescription === '' || taskTitle === '') {
            alert('Cant be Empty')
        } else {
            createnewtaskfunc(taskTitle, taskDescription, newTaskStatus, newTaskAssignee, newTaskSeverity)
        }


    })

    // popup close button 
     closepopupFunc()
    

})








// get task from backend 

document.addEventListener('DOMContentLoaded', async function () {
    const response = await gettasksassigned();
    console.log(response, 'response get tasks')
    // console.log(">>>>>>>>>>>>>>>>>>>>>>im response.result = ",response.result[0].task_severity)
    // console.log(response.result[0].task_title)
     createTaskCardHtml(response.total_record, response.result, response)

    // view task in modal 



})



