let boxes = document.querySelectorAll(".e");
let rstBut = document.querySelector(".reset");
let paragraph = document.querySelector(".pg");
let img = document.querySelector(".text");
let player1 = document.querySelector("#one");
let player2 = document.querySelector("#two");

let turn0 = false;
let gameoff = false;
let win = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
let butcount = 0;

let play1 = true;
let play2 = false;

player1.style.backgroundColor = "#fdca40";

player1.addEventListener('click',()=>{
    play2 = false;
    play1 = true;
    player1.style.backgroundColor = "#fdca40";
    player2.style.backgroundColor = "#ffffff";
    enabledBut();
})

player2.addEventListener('click',()=>{
    play1 = false;
    play2 = true;
    player2.style.backgroundColor = "#fdca40";
    player1.style.backgroundColor = "#ffffff";
    enabledBut();
})

let disabledBut = () =>{
    for(let box of boxes){
        box.disabled = true;
    }
    rstBut.style.backgroundColor = "#33a1fd";
};

let enabledBut = () =>{
    for(let box of boxes){
        box.disabled = false;
        box.innerText = ''
    }
    turn0 = false;
    rstBut.innerText = "Reset";
    paragraph.innerText = ''
    butcount = 0;
    rstBut.style.backgroundColor = "#fdca40";
};

let check_multiPlayer = ()=>{
    for(let pattern of win){
        let but0 = boxes[pattern[0]].innerText;
        let but1 = boxes[pattern[1]].innerText;
        let but2 = boxes[pattern[2]].innerText;

        if(but0 === but1  && but2 === but1 && but0 !== ''){
            paragraph.innerText = `${but0} Is The winner`;
            rstBut.innerText = "Continue";
            disabledBut();
            return true;
        }
    }
    if(butcount === 9){
        rstBut.innerText = "Continue";
        paragraph.innerText = "Match Draw";
    }
};

rstBut.addEventListener("click" , enabledBut);

let multiplayer = (box)=>{
    let char = turn0 ? 'O' : 'X';
    box.innerText = char;
    turn0 = !turn0;
    char = turn0 ? 'O' : 'X';
    paragraph.innerText = `${char} Turn`;
    box.disabled = true;
    check_multiPlayer();
}

let computerTurn = () => {
    if (butcount === 1) {
        let but = Math.floor(Math.random() * 9);
        while (boxes[but].innerText !== '') {
            but = Math.floor(Math.random() * 9);
        }
        boxes[but].innerText = 'O';
        boxes[but].disabled = true;
    } else {
        let arr1OfX = [];
        let arr1OfO = [];
        let arr2OfX = [];
        let arr2OfO = [];
        let arrOf0 = [];
        let arrOX = [];

        for (let pattern of win) {
            let but0 = boxes[pattern[0]].innerText;
            let but1 = boxes[pattern[1]].innerText;
            let but2 = boxes[pattern[2]].innerText;

            let countO = 0;
            let countX = 0;

            if (but0 === 'X') countX++;
            else if (but0 === 'O') countO++;
            if (but1 === 'X') countX++;
            else if (but1 === 'O') countO++;
            if (but2 === 'X') countX++;
            else if (but2 === 'O') countO++;
            if(countO+countX === 3) continue;
            else if (countO + countX === 0) {
                arrOf0.push(pattern);
            } else if (countO + countX === 1) {
                if (countO === 1) arr1OfO.push(pattern);
                else arr1OfX.push(pattern);
            } else {
                if (countO === 2) arr2OfO.push(pattern);
                else if (countX === 2) arr2OfX.push(pattern);
                else arrOX.push(pattern);
            }
        }

        const makeMove = (pattern) => {
            if (boxes[pattern[0]].innerText === '') {
                boxes[pattern[0]].innerText = 'O';
                boxes[pattern[0]].disabled = true;
            } else if (boxes[pattern[1]].innerText === '') {
                boxes[pattern[1]].innerText = 'O';
                boxes[pattern[1]].disabled = true;
            } else {
                boxes[pattern[2]].innerText = 'O';
                boxes[pattern[2]].disabled = true;
            }
        };

        if (arr2OfO.length !== 0) {
            makeMove(arr2OfO[0]);
        } else if (arr2OfX.length !== 0) {
            makeMove(arr2OfX[0]);
        } else if (arrOX.length !== 0) {
            makeMove(arrOX[0]);
        } else if (arr1OfO.length !== 0) {
            makeMove(arr1OfO[0]);
        } else if (arr1OfX.length !== 0) {
            makeMove(arr1OfX[0]);
        } else if (arrOf0.length !== 0) {
            makeMove(arrOf0[0]);
        }
    }
    butcount++;
    check_singlePlayer();
};


let check_singlePlayer = ()=>{
    for(let pattern of win){
        let but0 = boxes[pattern[0]].innerText;
        let but1 = boxes[pattern[1]].innerText;
        let but2 = boxes[pattern[2]].innerText;

        if(but0 === but1  && but2 === but1 && but0 !== ''){
            if(but0 === 'X'){
                paragraph.innerText = `You Win`;
                rstBut.innerText = "Continue";
            }
            else if(but0 === 'O'){
                paragraph.innerText = `Computer Win`;
            }
            rstBut.innerText = "Continue";
            disabledBut();
            return true;
        }
    }
    if(butcount === 9){
        rstBut.innerText = "Continue";
        rstBut.style.backgroundColor = "#33a1fd";
        paragraph.innerText = "Match Draw";
        return true;
    }
    return false;
}

let computer = (box)=>{
    let char = 'X';
    box.innerText = char;
    box.disabled = true;
    paragraph.innerText = `Your Turn`;
    if(check_singlePlayer() == false){
        computerTurn(box);
    }
}

boxes.forEach((box)=>{
    box.addEventListener("click" , ()=>{
        butcount++;
        console.log("Button Was Clicked");
        if(play2){
            multiplayer(box);
        }
        else{
            computer(box)
        }
    });
});