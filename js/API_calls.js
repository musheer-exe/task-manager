// Create new task api call 

async function createnewtaskfunc(taskTitle, taskDescription, newTaskStatus, newTaskAssignee, newTaskSeverity) {

    const createNewTaskAPICall = await fetch(`${getBaseUrl}/create/task`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'auth-key': sessionKeyfromApiSavedinLocalStorage

        },
        body: JSON.stringify({
            task_title: taskTitle,
            task_des: taskDescription,
            status: newTaskStatus,
            assignee: newTaskAssignee,
            severity: newTaskSeverity

        })
    })
    const response = await createNewTaskAPICall.json();
    if (response.success === true) {
        clearpopup()
    }
    console.log(response)
}

// auth call 
async function checkauthfunc() {
    console.log('clikc')
    const authcall = await fetch(`${getBaseUrl}/session`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'auth-key': sessionKeyfromApiSavedinLocalStorage

        },

    })
}


// get users
async function getusers() {
    console.log('clickkkkkk>>>>')
    const getusersnames = await fetch(`${getBaseUrl}/get_user_names`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'auth-key': sessionKeyfromApiSavedinLocalStorage
        }
    })
    const response = await getusersnames.json();
    console.log(response)
    return response
}


// get tasks assigned 

async function gettasksassigned() {

    const getAssignedTasks = await fetch(`${getBaseUrl}/tasks_assigned`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'auth-key': sessionKeyfromApiSavedinLocalStorage
        },
    })
    const response = await getAssignedTasks.json();
    return response
    
}