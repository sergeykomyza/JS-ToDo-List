var table = document.getElementById('table');
var input = document.querySelector('input');
var saveBtn = document.querySelector(".save");
var clearBtn = document.querySelector(".clear");

function addZero(i){
  if( i < 10 ){
     i = "0" + i;
  }
  return i;
}

function loadTodo(){
  if(localStorage.getItem('todoList')){
     table.innerHTML = localStorage.getItem('todoList');
     deleteTodo();
  }
}

input.addEventListener('keydown', function(keyPressed){
  if(keyPressed.keyCode === 13){
    
    if( input.value != "" ){
    
    var newTodo = this.value;
    var rowElement =   document.createElement('tr');
    var valuesBox =    document.createElement('td');
    var removeBox =    document.createElement('td');
    var timeBeginBox = document.createElement('td');
    var timeEndBox = document.createElement('td');
    var checkedBox =   document.createElement('td');
    var removeIcon =   document.createElement('i');
    var checkedElem =  document.createElement('input');
    var d = new Date();
    var clickHours = d.getHours();
    var clickMinutes = addZero(d.getMinutes());
    
     valuesBox.append(newTodo);
     valuesBox.classList.add('zadacha');
    
     removeBox.classList.add('delete');
     removeIcon.classList.add('fas', 'fa-trash-alt');
     removeBox.append(removeIcon);
    
     timeBeginBox.classList.add('time-begin');
     timeBeginBox.append(clickHours + ':' + clickMinutes);
      
     timeEndBox.classList.add('time-end');
    
     checkedBox.classList.add('check');
     checkedElem.type = 'checkbox';
     checkedElem.classList.add('check-input');
     checkedBox.append(checkedElem);
     
     table.appendChild(rowElement);
     rowElement.append(checkedBox, timeBeginBox, timeEndBox, valuesBox, removeBox);
    
     this.value = "";
    
     deleteTodo();
    
    }
  }  
});

var deleteElem = document.getElementsByClassName('delete');
function deleteTodo(){ // функция удаления
  for(let elem of deleteElem){ // перебираем все созданные элементы span
      elem.addEventListener('click', function(){ // добавляем событие клика по этим span
      elem.parentElement.remove(); // удаляем родителя span, коим является элемент li
      event.stopPropagation(); //
    });
  }
}

var checkedElem = document.getElementsByClassName('check-input');
var todo = document.getElementsByClassName('zadacha');

table.addEventListener('click', function(e){ 
var d = new Date();
var clickHours = d.getHours();
var clickMinutes = addZero(d.getMinutes());
  if(e.target.className === 'check-input'){ 
     e.target.parentElement.parentElement.childNodes[3].classList.toggle('checked'); 
     if(e.target.checked){
        e.target.parentElement.parentElement.childNodes[2].append(clickHours + ':' + clickMinutes);
     }else{
        e.target.parentElement.parentElement.childNodes[2].innerHTML = "";
     }
  }
},false);

saveBtn.addEventListener('click', function(){
  localStorage.setItem('todoList', table.innerHTML);
});

clearBtn.addEventListener('click', function(){ // добавляем событие клика кнопке - очистить
  table.innerHTML = " "; // очищаем список во front-end
  localStorage.removeItem('todoList', table.innerHTML); // удаляем список из localStorage
});


loadTodo();