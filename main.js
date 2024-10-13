let taskIdCounter = 1;

async function addTask() {
    const input = document.getElementById("user_input").value;

    if (input === "") {
        return;
    }

    const newTask = {
        id: taskIdCounter++,
        title: input,
        completed: false,
    };
    try {
        await axios.post("https://jsonplaceholder.typicode.com/todos", newTask);
        console.log("Added new Task");

    } catch (error) {
        console.log("Error adding task", error);

    }


    const task_div = document.createElement("div");
    task_div.className = "task_div";
    task_div.setAttribute("data-task-id", newTask.id);

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "custom-checkbox"

    const text = document.createElement("span");
    text.textContent = newTask.title;

    const icon = document.createElement("i");
    icon.className = "fa-solid fa-x";

    icon.onclick = async function () {
        task_div.remove();
        try {
            await axios.delete(`https://jsonplaceholder.typicode.com/todos/${newTask.id}`)
            console.log(`Deteled Successfully ${newTask.id} Task`);
        } catch (error) {
            console.log("Error deleting task", error);

        }


    };

    checkbox.onchange = async function () {
        const completed = checkbox.checked;

        text.classList.toggle("completed", completed)

        try {
            await axios.put(`https://jsonplaceholder.typicode.com/todos/${newTask.id}`, {
                title: newTask.title,
                completed: completed,
            });

            console.log(`Updated task ID: ${newTask.id}, completed: ${completed}`);

        } catch (error) {
            console.log("Error updating task", error);

        }
    };

    const customCheckbox = document.createElement("span");
    customCheckbox.className = "custom-checkbox";

    task_div.appendChild(checkbox);
    task_div.appendChild(text);
    task_div.appendChild(icon);

    const container = document.getElementById("user");
    container.appendChild(task_div);

    document.getElementById("user_input").value = "";
}
