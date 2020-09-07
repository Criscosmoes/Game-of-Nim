const dataController = (function(){


const data = {
    stones:1, 
    stonesRemaining: 0, 

}


return {
    getData: function(){
        return data; 
    }
}

})();




const UIController = (function(dataCtrl){


    let randomNum = Math.floor(Math.random() * 21) + 1; 


    return {
        displayStonesRemaining: function(){
            document.getElementById('stones-left').innerHTML = `    ${randomNum}`; 
        }, 
        
        displayStones: function(){

            for(let i = 1; i < randomNum; i++){
                const items = document.querySelector('.items'); 
                const icon = document.createElement('i');
                icon.setAttribute('class','fas fa-gem'); 
                items.appendChild(icon);
            } 
        },
        returnRandomNum: function(){

            return randomNum; 

        }, 
        togglePlayerName: function(){

            let playerTurn = document.querySelector('#player-name'); 

            if(playerTurn.innerHTML === "Player One's Turn!"){
                playerTurn.innerHTML = "Player Two's Turn!"; 
            }
            else {
                playerTurn.innerHTML = "Player One's Turn!"; 
            }
    
        }


    }

})(dataController);

const controller = (function(dataCtrl, UICtrl){


    let data = dataController.getData();
    let stones = data.stones;
    let final = stones;
    let stonesRem = UICtrl.returnRandomNum(); 


    const choice = () => {
        document.querySelector('.plus').addEventListener('click', function(){

            if(stones === 3){
                document.querySelector('.plus').disabled = false; 
            }
            else if (stones === stonesRem) {
                document.querySelector('.plus').disabled = false; 

            }
            else {
                stones++; 
                document.querySelector('.choice').textContent = stones; 
            }

            
        }); 
    
    
        document.querySelector('.minus').addEventListener('click', function(){

            if(stones === 1){
                document.querySelector('.minus').disabled = false; 
            }
            else {
                stones--; 
                document.querySelector('.choice').textContent = stones; 
            }
        })
    }

    const sumbitBtn = () => {

        document.getElementById('submit').addEventListener('click',function(){

            for(let i = 0; i < stones; i++){
                let items = document.querySelector('.items'); 
                items.removeChild(items.lastElementChild); 
            }

            stonesRem -= stones; 

            document.querySelector('#stones-left').textContent = stonesRem;

            stones = 1; 

            document.querySelector('.choice').textContent = stones; 
            
            // toggles player's turn
            UICtrl.togglePlayerName(); 

            // check if someone has won 
            checkWin(); 

        


        });
    }


    const checkWin = () => {
        if(stonesRem === 0){

            let winner = document.getElementById('player-name').innerHTML;

            if(winner === "Player One's Turn!"){
                winner = "Player One Wins! Congratulations!"
            }
            else if (winner === "Player Two's Turn!"){
                winner = "Player Two Wins! Congratulations!"; 
            }

            document.getElementById('winner-msg').innerHTML = winner; 

            document.querySelector('.first').style.display = 'none'; 
            document.querySelector('.remaining').style.display = 'none'; 

            document.querySelector('.winner').style.display = 'block'; 

        }
    }


    return {
        init: function(){
            //displays the stones remaining on screen
            UICtrl.displayStonesRemaining(); 

            // displays the actual stones on screen
            UICtrl.displayStones(); 

            // limits player's choices between 1-3; 
            choice(); 

            //listener for sumbit button
            sumbitBtn();



           

        }
    }
})(dataController,UIController); 


controller.init();


