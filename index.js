import inquirer from "inquirer";
let todo = [];
let nextId = 1;
async function main() {
    while (true) {
        const action = await inquirer.prompt([
            {
                type: "list",
                name: "action",
                message: "Choose an action:",
                choices: ["Add task", "View tasks", "Update task", "Delete task", "Exit"],
            },
        ]);
        switch (action) {
            case "Add task":
                await addTodo();
                break;
            case "View tasks":
                viewTodos();
                break;
            case "Update task":
                await updateOrDeleteTodo("update");
                break;
            case "Delete task":
                await updateOrDeleteTodo("delete");
                break;
            case "Exit":
                console.log("Goodbye!");
                return;
        }
    }
}
async function addTodo() {
    const task = await inquirer.prompt([
        {
            type: "input",
            name: "task",
            message: "Enter a new task:",
        },
    ]);
    todo.push({ id: nextId++, task });
    console.log(`Added task: ${task}`);
}
function viewTodos() {
    if (todo.length === 0) {
        console.log("No todo found.");
    }
    else {
        console.log("Your Todo List:");
        todo.forEach(({ id, task }) => {
            console.log(`${id}. ${task}`);
        });
    }
}
async function updateOrDeleteTodo(action) {
    if (todo.length === 0) {
        console.log(`No todo to ${action}.`);
        return;
    }
    const { taskId } = await inquirer.prompt([
        {
            type: "number",
            name: "taskId",
            message: `Enter the ID of the task you want to ${action}:`,
        },
    ]);
    const todoIndex = todo.findIndex(({ id }) => id === taskId);
    if (todoIndex === -1) {
        console.log(`Task ${taskId} not found.`);
    }
    else {
        if (action === "update") {
            const { newTask } = await inquirer.prompt([
                {
                    type: "input",
                    name: "newTask",
                    message: "Enter the new task description:",
                },
            ]);
            todo[todoIndex].task = newTask;
            console.log(`Updated task ${taskId}: ${newTask}`);
        }
        else {
            const deletedTask = todo.splice(todoIndex, 1)[0];
            console.log(`Deleted task ${taskId}: ${deletedTask.task}`);
        }
    }
}
main();
