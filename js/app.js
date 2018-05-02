var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var mas = [];
var count = 0;
var timer;
var clickHandler = 0;
// вешаем событие для отрисовки бактерий 
canvas.onclick = function (event) {
    var x = event.offsetX;
    var y = event.offsetY;
    // Разбиваем поле на сектора по 10px
    x = Math.floor(x / 10);
    y = Math.floor(y / 10);
    //заполняем игровое поле
    mas[y][x] = 1;
    drawField();
}
//создаем игровое поле
function gameField() {
    var n = 80, m = 80;
    for (var i=0; i<m; i++) {
        mas[i]=[];
        for (var j=0; j<n; j++){
            mas[i][j]=0;
        }
    }
}
gameField();


// рисуем прямоугольник
function drawField() {
    ctx.clearRect(0, 0, 800 , 800);
     for(var i=0; i<80; i++) {
        for (var j=0; j<80; j++){
            if (mas[i][j]==1) {
                ctx.fillStyle = "grey";
                ctx.fillRect(j*10, i*10, 10, 10);
            }
        }
     }
}


function createLife() {
    // моделирование жизни
    var mas2 = [];
    for(var i=0; i<80; i++) {
        mas2[i]=[];
        for (var j=0; j<80; j++){
            var neighbors = 0;
            // подсчет количества соседей
            if (mas[minus(i)-1][j]==1) neighbors++; // верх
            if (mas[i][plus(j)+1]==1) neighbors++;// право
            if (mas[plus(i)+1][j]==1) neighbors++;// низ
            if (mas[i][minus(j)-1]==1) neighbors++; // лево
            if (mas[minus(i)-1][plus(j)+1]==1) neighbors++; // правый верх
            if (mas[plus(i)+1][plus(j)+1]==1) neighbors++; // правый низ 
            if (mas[plus(i)+1][minus(j)-1]==1) neighbors++; // левый низ
            if (mas[minus(i)-1][minus(j)-1]==1) neighbors++; // левый верх
            // условия жизни
            else if (neighbors==2 || neighbors==3) {
                mas2[i][j]=1;
            } else if (neighbors > 3 || neighbors < 2) {
                    mas2[i][j]==0;
                }
            }
        }
    mas = mas2;
    drawField();
    count++;
    document.getElementById('count').innerHTML = count;
    timer = setTimeout(createLife, 150);
}
// при выходе за пределы поля данные функции переносят бактерии на противоположный край имитируя безграничность
function minus(i) {
    if(i==0) return 80;
    else return i;
}
        
function plus(i) {
    if(i==79) return -1;
    else return i;
}


// Кнопки

document.getElementById("start").onclick = function() {
        createLife();
}

document.getElementById("pause").onclick = function() {

        clearTimeout(timer);

}

document.getElementById("clear").onclick = function() {
    document.getElementById('count').innerHTML = 0;
    clearTimeout(timer);
    ctx.clearRect(0, 0, 800 , 800);
    mas = [];
    gameField();
}
