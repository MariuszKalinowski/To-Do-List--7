{
    let tasks = [];
    let hideDoneTasks = false;

    const onHideDoneTasksButtonClick = () => {
        hideDoneTasks = !hideDoneTasks;
        render();
    }

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            { content: newTaskContent },
        ];
        render();
    };

    const removeTask = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            ...tasks.slice(taskIndex + 1),
        ];
        render();
    };


    const toggleDoneTask = (taskIndex) => {

        tasks = tasks.map((task, index) =>
            index === taskIndex
                ? { ...task, done: !task.done }
                : task
        );
        render();
    };

    const toggleAllDoneTasks = () => {

        tasks = tasks.map(task => {
            return { ...task, done: true }
        });
        render();

    };

    const bindToggleAllDoneTasks = () => {
        const toggleAllDoneButton = document.querySelectorAll(".js-allTasksDoneButton")

        toggleAllDoneButton.forEach((allDoneButton) => {
            allDoneButton.addEventListener("click", () => {
                toggleAllDoneTasks();
            });
        });

    };

    const bindRemoveEvents = () => {

        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);

            });
        });
    };

    const bindOnHideDoneTasksButtonClick = () => {
        const toggleHideTasksButton = document.querySelectorAll(".js-toggleHideTasksButton");

        toggleHideTasksButton.forEach((hideTasks, index) => {
            hideTasks.addEventListener("click", () => {
                onHideDoneTasksButtonClick(index);
            });
        });
    };

    const bindToggleDoneEvents = () => {

        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((doneButton, index) => {
            doneButton.addEventListener("click", () => {
                toggleDoneTask(index);
            });
        });
    };

    const renderTasks = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <li class="tasksList__task 
            ${task.done ? "tasksList__task--done" : ""} 
            ${hideDoneTasks && task.done ? "tasksList__task--hidden" : ""}"
            >
            
            <button class="js-done tasksList__doneTaskButton">
            ${task.done ? "✔" : ""} 
            </button>
            
            <span class="tasksList__taskContent">
            ${task.content}
            </span>
            
            <button class="js-remove tasksList__removeTaskButton"> 🗑 </button>
            </li>
            `;
        }
        document.querySelector(".js-formTasksList").innerHTML = htmlString;
        const newTaskElement = document.querySelector(".js-newTask");
        newTaskElement.focus();
    };

    const renderButtons = () => {
        let toggleHideTasksButton = "";
        if (tasks.length > 0) {
            toggleHideTasksButton += `
            <button class="js-toggleHideTasksButton form__renderButton"> ${hideDoneTasks ? "Pokaż" : "Ukryj"} ukończone </button>        
            <button class="js-allTasksDoneButton form__renderButton" ${tasks.every(({ done }) => done) ? 'disabled' : ""} > Ukończ wszystkie </button>
            `;
        };

        document.querySelector(".js-renderButtons").innerHTML = toggleHideTasksButton;
    };

    const bindButtonsEvent = () => {
        bindToggleAllDoneTasks();
        bindOnHideDoneTasksButtonClick();
    };

    const render = () => {
        renderTasks();
        renderButtons();

        bindRemoveEvents();
        bindToggleDoneEvents();
        bindButtonsEvent();
    };


    const onFormSubmit = (event) => {
        event.preventDefault();
        const newTaskElement = document.querySelector(".js-newTask")
        const newTaskContent = newTaskElement.value.trim();
        newTaskElement.focus();

        if (newTaskContent !== "") {
            addNewTask(newTaskContent);
            newTaskElement.value = "";
        };
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");
        form.addEventListener("submit", onFormSubmit);

    };

    init();

};
