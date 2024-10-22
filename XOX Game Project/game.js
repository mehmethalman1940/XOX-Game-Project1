const X_CLASS = "croos";
const O_CLASS = "circle";
const COMBINATIONS = [
    [0,1,2]
    [3,4,5]
    [6,7,8]
    [0,3,6]
    [1,4,7]
    [2,5,8]
    [0,4,8]
    [2,4,6]
]

const board = document.querySelector(".board");
const cells = document.querySelector(".cell");
const result = document.querySelector(".result");
const resultText = document.querySelector(".result-text");
const restartButton = document.querySelector("#restartButton");

let turn  //false:x true:o

const swapTurn = ()=>{ //  SIRAMIZI TERSİNE ÇEVİRECEK FONK. 
    turn = !turn;
}
const placeMark = (cell,currenClass)=>{ // TIKLANDIĞINDA GELMESİ GEREKEN İŞARETİ KOYDUĞUMUZ FONK.
    cell.classList.add(currenClass);
}    
const placeHover = () =>{
    board.classList.remove(X_CLASS);
    board.classList.remove(O_CLASS);
    if(turn) board.classList.remove(O_CLASS);
    else board.classList.remove(X_CLASS);
}
 
const endGame = (draw)=>{
    if (draw) resultText.innerText = "Beraberlik";
    else resultText.innerText = ` ${turn ? "0" : "X" } Kazandi!!`
    result.classList.add("show"); 
}

const isdraw = ()=>{
      return[...cells].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS)
      })
}

const checkWin = (currenClass) =>{
    return COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cells[index].classList.contains(currenClass)
        })
    })
}

const handleClick = (e) => {
     const cell = e.target
     const currentClass = turn ? O_CLASS : X_CLASS
     placeMark(cell,currentClass)
     if (checkWin(currentClass)){
        endGame(false)
     }else if(isdraw()){
        endGame(true)
     }
      else{
        swapTurn()
        placeHover()
     }
} 
const resetGame = () => {
    cells.forEach(cell  => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(O_CLASS)
        cell.removeEventListener("click",handleClick, {once: true})
    });
}
const startGame = () => {
    turn = false
    resetGame()
    placeHover()
    result.classList.remove("show")
}
startGame()
restartButton.addEventListener("click". startGame)