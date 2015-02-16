var tickInterval;
var apples = [];//[5,6];
var snakeLength = 3;
var snakeDirection = [1, 0];
var size = 40;

var snakePath = [ [2,0], [1,0], [0,0] ];

$(document).ready(function() {
  setupGrid();
  tickInterval = setInterval(tick, 30);
  for(var i = 0; i < 70; i++) {
    placeNewApple()
  }

  $(document).keydown(function(event) {
    if([37, 38, 39, 40].indexOf(event.keyCode) > -1)
      event.preventDefault()

    if(event.keyCode == 38) // up
      snakeDirection = [0, -1]
    else if(event.keyCode == 40) // down
      snakeDirection = [0, 1]
    else if(event.keyCode == 37) // left
      snakeDirection = [-1, 0]
    else if(event.keyCode == 39) // right
      snakeDirection = [1, 0]

  });
})

function tick() {
  moveSnake();
  checkForCollisions();
  checkForApple();
}

function moveSnake() {
  currentPosition = snakePath[0]
  nextPosition = [ currentPosition[0] + snakeDirection[0], currentPosition[1] + snakeDirection[1] ]
  snakePath.unshift(nextPosition)

  $("td").removeClass('snake')
  for(var i = 0; i < snakeLength; i++)
    $("tr").eq(snakePath[i][1]).find("td").eq(snakePath[i][0]).addClass('snake')
}


function checkForApple() {
  currentPosition = snakePath[0]
  for(var i = 0; i < apples.length; i++) {
    apple = apples[i]
    if(apple[0] == currentPosition[0] && apple[1] == currentPosition[1]) {
      console.log(apple)
      removeApple(apple)
      //placeNewApple()
      snakeLength++
    }
  }
}

function removeApple(apple) {
  $("tr").eq(apple[1]).find("td").eq(apple[0]).removeClass('apple')
}

function placeNewApple() {
  apple = [ parseInt(Math.random() * size), parseInt(Math.random() * size) ]
  apples.push(apple)
  $("tr").eq(apple[1]).find("td").eq(apple[0]).addClass('apple')
}


function setupGrid() {
  for(var i = 0; i < size; i++) {
    tr = $("<tr></tr>");
    $(".grid table").append(tr)
    for(var j = 0; j < size; j++) {
      td = $("<td></td>")
      tr.append(td)
    }
  }
}

function checkForCollisions() {
  currentPosition = snakePath[0]
  if(currentPosition[0] < 0 || currentPosition[0] >= size || currentPosition[1] < 0 || currentPosition[1] >= size) {
    gameOver();
  }

  for(var i = 1; i < snakeLength; i++) {
    bodyPart = snakePath[i]
    if(bodyPart[0] == currentPosition[0] && bodyPart[1] == currentPosition[1]) {
      gameOver();
    }
  }

}

function gameOver() {
  alert("GAME OVER!")
  $(".grid").remove()
  clearInterval(tickInterval)
}
