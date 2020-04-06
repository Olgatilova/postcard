
let cursor = document.createElement("img");
$(cursor).attr("src", "img/rasp.png")
          .css({
            "height": "3rem", //высота
            "position" : "absolute",
          })
          .appendTo($("body"));
$(document).mousemove(moveCursor);

function moveCursor(e) { //к курсору прикручиваем картинку
  e.preventDefault();// снимаем стандартные настройки
  $(cursor).css({  //передаем позиции курсору
    "top": (e.clientY+5) + "px",
    "left": (e.clientX+5) + "px",
  })
}


let windowBorder = document.querySelector(".windowBorder"); //определяем размер экрана для запуска вирусов
$(windowBorder).css({
                  "position": "fixed",
                  "height": document.documentElement.clientHeight,
                  "width": document.documentElement.clientWidth,
                  "top" : "0",
                  "left": "0",
                  "overflow" : "hidden",
                })
let virusInterval = setInterval(createVirus, 1000); // интервал появления вирусов на экране
let virusKilled = 0;

function createVirus() {
  if($(windowBorder).children().length >= 15){
      return;
  }    
  let virus = document.createElement("img"); //создаем элемент вирус
  $(virus).attr("src", "img/virus1.png")
            .css({
              "position": "absolute",
                  "height": "100px",
                  "width": "100px",
                  "top" : "-150px",
                  "left": Math.floor(Math.random() * ($(windowBorder).width() - 100)),
            }) 
            .appendTo($(windowBorder));
  let maxHeight = document.documentElement.clientHeight + 150;
  let virusDropInterval = setInterval(() => {
    let virusTop = parseInt($(virus).css("top"));
    if(virusTop < maxHeight) {
      $(virus).css("top", virusTop + 1 + "px");
    } else {
      virus.remove();
      clearInterval(virusDropInterval); //удаление интервалов
    }
  }, 3 + Math.floor(Math.random() * 8)); //падают с разной скоростью
  virus.onclick = () => {
    let virusCoords = virus.getBoundingClientRect();
    let virusTop = virusCoords.y;
    let virusLeft = virusCoords.x;
    virus.remove(); //по клику на вирус, вирус исчезает
   // console.log([virusTop, virusLeft]); // координаты вирусов
    let pop = document.createElement("img");
    $(pop).attr("src", "img/pop.gif")
            .css({
              "height": "100px",
              "width": "100px",
              "position": "absolute",
              "top" : virusTop + "px",
              "left" : virusLeft + "px",
            })
            .appendTo($(windowBorder));
    let popTimeout = setTimeout(() => {pop.remove()}, 600) //отмена гива на экране после отработки пол секунды
    killVirus();
  }
}

function killVirus() {
  virusKilled++;
  $(".virusKilled").html(virusKilled);// находим span, считает убитые вирусы и заносит данные в счет
  if (virusKilled > 20) {
    alert("Вы победили вирус!");
    virusKilled = 0;
  }
  
}








