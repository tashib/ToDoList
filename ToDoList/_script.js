var Tasks = [];

//Creates a new task
var AddTask = function () {
    var input = document.getElementById("AddTaskInput").value;
    var task = new Task(input);

    document.getElementById("AddTaskInput").value = "";
    Tasks.push(task);
    PrintTasks();
}

//Defines the Task
var Task = function (taskName) {
    var d = new Date();
    this.Task = taskName;
    this.Completed = null;
    this.Started = new Date();
    this.IsCompleted = false;
    this.CompletedTime = null;
}

//Edit Functions
var StartEdit = function () {
    var doc = document.getElementById("PageInputHeader");
    doc.innerHTML = '<button type="button" class="btn btn-success" onclick="SaveChanges();">Submit</button>'
                  + '<button type="button" class="btn btn-danger" onclick="StartPage();">Cancel</button>'
    PrintEdit();
}

//Saves the Edits
var SaveChanges = function () {
    for (var i = 0; i < Tasks.length; i++) {
        var input = document.getElementById("Edit " + i).value;
        Tasks[i].Task = input;
    }
    StartPage();
}

//Places delete buttons and calls the print function
var StartDelete = function () {
    var doc = document.getElementById("PageInputHeader");
    doc.innerHTML = '<button type="button" class="btn btn-success" onclick="SaveDelete();">Save</button>'
                  + '<button type="button" class="btn btn-danger" onclick="StartPage();">Cancel</button>'
    PrintDelete();
}

//Saves the delete changes

//Onclick to complete the task
var CompleteTask = function (index) {
    Tasks[index].IsCompleted = true;
    Tasks[index].Completed = new Date();
    Tasks[index].CompletedTime = GetTime(true, index)
    PrintTasks();
}

//Onclick to move the task back up
var ReAddTask = function (index) {
    Tasks[index].IsCompleted = false;
    Tasks[index].Completed = null;
    Tasks[index].CompletedTime = null;
    PrintTasks();
}

var SaveDelete = function () {
    var x = 0, i = 0;
    while (i < Tasks.length) {
        var checked = document.getElementById('Delete ' + x).checked;
        if (checked) {
            Tasks.splice(i, 1);
            x++;
        }
        else {
            x++;
            i++;
        }
    }
    StartPage();
}
var ClearComplete = function () {
    var i = 0, x = 0;
    while (i < Tasks.length) {
        if (Tasks[i].IsCompleted == true) {
            Tasks.splice(i, 1);
        }
        else {
            i++;
        }
    }
    PrintTasks();
}

//Writes the tasks to the screen
var PrintTasks = function () {
    var taskItems = document.getElementById("TaskItems");
    var completedItems = document.getElementById("CompletedTasks");

    taskItems.innerHTML = "";
    completedItems.innerHTML = "";

    document.getElementById("ButtonPlacement").innerHTML = '<div class="btn-group-sm" style="display:inline" >'
              + '<button type="button" class="btn btn-info" onclick="StartEdit();">Edit</button>'
              + '<button type="button" class="btn btn-danger" onclick="StartDelete();">Delete</button>'
              + '<button type="button" class="btn btn-warning" onclick="ClearComplete();">Clear Complete</button>'

    for (var i in Tasks) {
        if (Tasks[i].IsCompleted == false) {
            time = GetTime(false, i);
            taskItems.innerHTML += '<li><span onclick="CompleteTask(' + i + ')">' + time + " | " + Tasks[i].Task + '</span></li>';
        }
        else {
            completedItems.innerHTML += '<li><span onclick="ReAddTask(' + i + ')" class="completed">' + Tasks[i].Task + '</span><br />'
                + '<span onclick="ReAddTask(' + i + ')">Completed in ' + Tasks[i].CompletedTime + '</span></li>';
        }
    }
}
var GetTime = function (isComplete, i) {
    if (!isComplete) {
        var day = Tasks[i].Started.getDate();
        var month = Tasks[i].Started.getMonth();
        var seconds = Tasks[i].Started.getSeconds();
        var minutes = Tasks[i].Started.getMinutes();
        var hours = Tasks[i].Started.getHours();
        var setting;
        if (hours > 12) {
            setting = "pm";
            hours -= 12;
        }
        else setting = "am";

        var time = month + "/" + day + " " + hours + ":" + minutes + ":" + seconds + ", " + setting;
        return time;
    }
    else {
        var time = Tasks[i].Completed.getTime() - Tasks[i].Started.getTime();
        var seconds, minutes, hours, days;

        x = time / 1000;
        seconds = Math.round(x % 60, 2);
        x /= 60;
        minutes = Math.floor(x % 60);
        x /= 60;
        hours = Math.floor(x % 24);
        x /= 24;
        days = Math.floor(x);

        var temp = "";
        if (days > 0) temp += days + " days, ";
        if (hours > 0) temp += hours + " hours, ";
        if (minutes > 0) temp += minutes + " minutes, ";
        if (seconds > 0) temp += seconds + " seconds";

        return temp;
    }
}
//Writes the tasks to the screen with an edit field
var PrintEdit = function () {
    var taskItems = document.getElementById("TaskItems");
    var completedItems = document.getElementById("CompletedTasks");

    taskItems.innerHTML = "";
    completedItems.innerHTML = "";
    document.getElementById("ButtonPlacement").innerHTML = "";

    for (var i in Tasks) {
        if (Tasks[i].IsCompleted == false) {
            taskItems.innerHTML += '<li><input type="text" id="Edit ' + i + '" value="' + Tasks[i].Task + '"/></li>';
        }
        else {
            completedItems.innerHTML += '<li><input type="text" id="Edit ' + i + '" value="' + Tasks[i].Task + '"/></li>';
        }
    }

}

//Writes array to screen, with checkboxes
var PrintDelete = function () {
    var taskItems = document.getElementById("TaskItems");
    var completedItems = document.getElementById("CompletedTasks");

    taskItems.innerHTML = "";
    completedItems.innerHTML = "";
    document.getElementById("ButtonPlacement").innerHTML = "";

    for (var i in Tasks) {
        if (Tasks[i].IsCompleted == false) {
            taskItems.innerHTML += '<li><input type="checkbox" id="Delete ' + i + '"/><span onclick="CompleteTask(' + i + ')">' + Tasks[i].Task + '</span></li>';
        }
        else {
            completedItems.innerHTML += '<li><input type="checkbox" id="Delete ' + i + '"/><span onclick="ReAddTask(' + i + ')" class="completed">' + Tasks[i].Task + '</span></li>';
        }
    }
}
//Initial function to load divs
var StartPage = function () {
    var doc = document.getElementById("PageInputHeader");

    doc.innerHTML = '<label class="label-info">Add a Task</label> <br />'
          + '<input type="text" class="input-lg" id="AddTaskInput" onkeypress="{ if (event.keyCode == 13) AddTask() }" />'
          + '<button class="btn btn-info btn-sm" onclick="AddTask()">Submit</button>';

    document.getElementById("ButtonPlacement").innerHTML = '<div class="btn-group-sm" style="display:inline" >'
             + '<button type="button" class="btn btn-info" onclick="StartEdit();">Edit</button>'
             + '<button type="button" class="btn btn-danger" onclick="StartDelete();">Delete</button>'
             + '<button type="button" class="btn btn-warning" onclick="ClearComplete();">Clear Complete</button>'

    PrintTasks();
}
StartPage();