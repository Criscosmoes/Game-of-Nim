
const dataController = (function(){
 
    const data = {
        Players: {
            playerOne: '',
            playerTwo: '', 
        },
    
        objectArray: [], 
    }
    
        return {
            getData: function(){
                return data; 
            }
        }
        
    })(); 
    
    
    const UIController = (function(){
    
            const DOMStrings = {
            app:'.app', 
            first:'.first', 
            gameRulesRectangle: '.game-rules-rectangle', 
            gameTitle:'.game-title', 
            gameRules: '.game-rules', 
            gameBtnID: 'game-btn', 
            hideClass:'.hide-class', 
            second:'.second', 
        }
    
        const randomNum = Math.floor(Math.random() * 21) + 1;
        
    
        const showRandomNum = () => {
            document.getElementById('random-number-number').innerHTML = randomNum;
        } 
    
    
        return {
            showGame: function() { // show rules button 
                document.getElementById(DOMStrings.gameBtnID).addEventListener('click', function(){
                    //hide main rectangle
                    document.querySelector(DOMStrings.gameRulesRectangle).style.display = 'none'; 
                    //display the 'back button'
                    document.querySelector(DOMStrings.hideClass).style.display = 'block'; 
                    //change inner html to 'resume playing'
                    document.getElementById(DOMStrings.gameBtnID).innerHTML = 'Resume Playing!'
    
                    document.querySelector('.second').style.display = 'block'; 
                    showRandomNum(); 
     
    
                })
            },
            showRules: function(){ //back to rules button
                document.querySelector(DOMStrings.hideClass).addEventListener('click',function(){
                    document.querySelector(DOMStrings.hideClass).style.display = 'none'; 
                    document.querySelector(DOMStrings.gameRulesRectangle).style.display = 'block';
                    document.querySelector('.second').style.display = 'none'; 
                })
            },
            displayObjects: function(){
                for(let i = 0; i < randomNum; i++){
                    let a = document.getElementById('rocks'); 
                    let newIMG = document.createElement('img'); 
                    a.appendChild(newIMG); 
                    newIMG.src = "./Pictures/rock.png"; 
                    newIMG.style = "width:130px; height:130px"; 
    
                }
            },
            hideNames: function(){
                document.getElementById('submit-btn').addEventListener('click',function(){
                    document.querySelector('.user-input').style.display = 'none'; 
                    //show class of user names; 
                })
            }, 
    
            getDOMStrings: function(){
                return DOMStrings; 
            }
           
            
        
        }
    
    
    })(); 
    
    const controller = (function(dataCtrl, UICtrl){
    
        // data from data controller
        const data = dataCtrl.getData(); 
    
    
    
    
        const setupEventListeners = () => {
            //hide elements that need to be hidden
            document.querySelector('.hide-class').style.display = 'none';
    
            //get input fron name fields
            document.getElementById('submit-btn').addEventListener('click',function(){
                data.Players.playerOne = document.getElementById('name-input1').value; 
                data.Players.playerTwo = document.getElementById('name-input2').value;  
            }); 
    
            
    
            UICtrl.showGame();
            UICtrl.showRules(); 
            UICtrl.displayObjects(); 
            UICtrl.hideNames(); 
    
        }
    
    
        return {
            init: function(){
                setupEventListeners(); 
                 
            }
        }
    
    })(dataController, UIController); 
    
    
    controller.init(); 
    