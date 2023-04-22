const taskInput=document.getElementById("new-task")
const addButton=document.getElementsByTagName("button")[0]
const incompleteTaskHolder=document.getElementById("incomplete")
const completedTasksHolder=document.getElementById("completed")

const createNewTaskElement=function(taskString){
    let listItem=document.createElement("li")
    let checkBox=document.createElement("input");
    let label=document.createElement("label");
    let editButton=document.createElement("button");
    let deleteButton=document.createElement("button");
    let deleteButtonImg=document.createElement("img");
    label.innerText=taskString;
    label.className='task';
    checkBox.type="checkbox";
    editInput.type="text";
    editInput.className="task";
    editButton.innerText="Edit";
    editButton.className="edit";
    deleteButton.className="delete";
    deleteButtonImg.src='./remove.svg';
    deleteButton.appendChild(deleteButtonImg);
    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    return listItem;
}

const addTask=function(){
    if (!taskInput.value) return;
    let listItem=createNewTaskElement(taskInput.value);
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
    taskInput.value="";
}

const editTask=function(){
    let listItem=this.parentNode;
    let editInput=listItem.querySelector('input[type=text]');
    let label=listItem.querySelector("label");
    let editBtn=listItem.querySelector(".edit");
    let containsClass=listItem.classList.contains("editMode");
    if(containsClass){
        label.innerText=editInput.value;
        editBtn.innerText="Edit";
    } else{
        editInput.value=label.innerText;
        editBtn.innerText="Save";
    }
    listItem.classList.toggle("editMode");
};

const deleteTask=function(){
    let listItem=this.parentNode;
    let ul=listItem.parentNode;
    ul.removeChild(listItem);

}

const taskCompleted=function(){
    let listItem=this.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
}

const taskIncomplete=function(){
    let listItem=this.parentNode;
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem,taskCompleted);
}

addButton.onclick=addTask;
addButton.addEventListener("click",addTask);
addButton.addEventListener("click",ajaxRequest);

function ajaxRequest() {}

const bindTaskEvents=function(taskListItem,checkBoxEventHandler){
    let checkBox=taskListItem.querySelector("input[type=checkbox]");
    let editButton=taskListItem.querySelector("button.edit");
    let deleteButton=taskListItem.querySelector("button.delete");
    editButton.onclick=editTask;
    deleteButton.onclick=deleteTask;
    checkBox.onchange=checkBoxEventHandler;
}

for (let i=0; i<incompleteTaskHolder.children.length;i++){
  bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
}

for (let i=0; i<completedTasksHolder.children.length;i++){
  bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}
