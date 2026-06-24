

// createTaskCardHtml 

function createTaskCardHtml(total_record, result, response) {

    if (total_record !== 0 && response.success !== false) {
        console.log(total_record !== 0, "total record")

        for (let i = 0; i <= result.length - 1; i++) {

            function severity() {
                if (result[i].task_severity == 1) {
                    return 'High'
                } else if (result[i].task_severity == 2) {
                    return 'Medium'

                } else if (result[i].task_severity == 3) {
                    return 'Low'
                } else {
                    return 'Undefined'
                }
            }

            const createTaskCard = document.createElement('div');
            createTaskCard.classList.add('task-card');
            createTaskCard.dataset.id = result[i].id;
            createTaskCard.dataset.task_severity = result[i].task_severity;
            createTaskCard.dataset.task_title = result[i].task_title;
            createTaskCard.dataset.task_description = result[i].task_description;
            createTaskCard.dataset.task_status = result[i].task_status;
            createTaskCard.dataset.assignee = result[i].assignee;
            const task_description = createTaskCard.dataset.task_description

            console.log(task_description, ">>>>>>>>>>>>>>>>>>>>>>>>>>>")




            const taskshtml = document.querySelector('.tasks');
            createTaskCard.innerHTML = `
    
                    <div class="first-block">
                        <div class="fff">
                            <div class="number">
                                  ${result[i].id}.
                            </div>
                            <div class="task-title">
                               ${result[i].task_title}
                            </div>
                        </div>
                        <div class="task-status">
                            <div class="to-do">
                                To Do
                            </div>
                            <div class="In-Progress">
                                In Progress
                            </div>
                            <div class="Done">
                                Done
                            </div>
                        </div>
                    </div>
                    <div class="dues">
                        <div class="Severity ${severity()}">
                            ${severity()}
                        </div>
                        <div class="due-date">
                            Due today
                        </div>
                    </div>

    
    `
            taskshtml.appendChild(createTaskCard);

        }
    } else {
        const createTaskCard = document.createElement('div');
        createTaskCard.classList.add('task-card');
        const taskshtml = document.querySelector('.tasks');
        createTaskCard.innerHTML =
            ` <div class="first-block">
            No Record Found 
        </div>`
        taskshtml.appendChild(createTaskCard);
    }


    opentask()



}


//  
let i = 0;

function createpopupfunc(task_title, task_description, tasks_assigned, task_severity, task_status, task_id) {
    i++

    console.log("total open times = ", i)
    const popup = document.querySelector('.background-popup')
    popup.style.display = 'block'
    const element = document.createElement('div');
    element.classList.add('center');
    element.innerHTML = `
     <div class="popup">
                    <div class="div">
                        <div class="new-Task-title">
                            <p>Taskly Title</p>
                            <textarea required class="textarea">${task_title || ''}</textarea>
                        </div>
                        <div class="cross"> X </div>
                    </div>
                    <div class="New-status">
                        <p>Status</p>
                        <select class="status">
                            <option value="1">
                                To Do
                            </option>
                            <option value="2">
                                In Progress
                            </option>

                        </select>
                    </div>

                    <div class="assignee">
                        <p>Assignee</p>
                        <select class="assignee1">
                           
                        </select>
                    </div>
                    

                    <div class="new-Task-dec">
                        <p>Description</p>
                        <textarea required class="textarea1">${task_description || ''}</textarea>
                    </div>
                    <div class="last-box">
                        <div class="new-Severity">
                            <p>Severity</p>
                            <select class="Severity1">
                                <option value="1">
                                    High
                                </option>
                                <option value="2">
                                    Medium
                                </option>
                                <option value="3">
                                    Low
                                </option>

                            </select>

                        </div>
                        <div>
                            <button class="save">Save</button>
                        </div>
                    </div>

                </div>
    `
    popup.appendChild(element)

    if (tasks_assigned) {
        const value = document.querySelector('.assignee1');
        value.value = tasks_assigned;
        console.log(tasks_assigned)
    }
}


// createuserdropdown
function createuserdropdown(response) {
    const select = document.querySelector('.assignee1')
    select.innerHTML = '';
    response.result.forEach(namesinArray => {
        const options = document.createElement('option');
        options.value = namesinArray.username;
        options.textContent = namesinArray.username;
        select.appendChild(options)

    });

}