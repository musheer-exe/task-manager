
//open task card modal
function opentask() {
    const openTask = document.querySelectorAll('.task-card');


    openTask.forEach(cards => {
        cards.addEventListener('click', function () {

            const task_id = cards.dataset.id
            const task_title = cards.dataset.task_title
            const task_severity = cards.dataset.task_severity
            const task_description = cards.dataset.task_description
            const task_status = cards.dataset.task_status
            const tasks_assigned = cards.dataset.assignee
            console.log(tasks_assigned, "////// task asiigned/////")


            createpopupfunc(task_title, task_description, tasks_assigned)
            closepopupFunc()


            // Patch button
            const saveNewTaskButton = document.querySelector('.save');

            saveNewTaskButton.addEventListener('click', async function () {
                const taskTitle = document.querySelector('.textarea').value;
                const taskDescription = document.querySelector('.textarea1').value;
                const newTaskStatus = document.querySelector('.status').value;
                const newTaskAssignee = document.querySelector('.assignee1').value;
                const newTaskSeverity = document.querySelector('.Severity1').value;
                console.log('new task titile = ', taskTitle)
                console.log('new task id = ', task_id)

                const patchTask = await fetch(`${getBaseUrl}/update_task`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-key': sessionKeyfromApiSavedinLocalStorage

                    },
                    body: JSON.stringify({
                        task_id: task_id,
                        task_title: taskTitle,
                        task_des: taskDescription,
                        status: newTaskStatus,
                        assignee: newTaskAssignee,
                        severity: newTaskSeverity
                    })
                })
                    const response = await patchTask.json();
                    // create toast
                    console.log('response from patch call = ',response)


            })
        })
    });


    // const taskId = document.querySelector('.number');

    // taskId.forEach(taskId=>{

    // })
    // 
}





// clear popup

function closepopupFunc() {

    const popupCloseButton = document.querySelector('.cross')
    popupCloseButton.addEventListener('click', function () {

        console.log('clicking cross')
        clearpopup()


    })
}




function clearpopup() {


    const popup = document.querySelector('.background-popup')
    popup.innerHTML = ''
    popup.style.display = 'none'


}
