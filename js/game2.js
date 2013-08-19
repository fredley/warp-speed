var game2 = {

    // Variables
    startLives : 1,
    lives : 1,
    time : 300,
    startTime : 300,
    x : 50,
    isInProgress : false,
    score : 0,
    rows : [],
    paddleWidth : 2,
    coveredChar : ' ',
    moveEvery : 2,
    bonusMessage : "",
    bonusMessageTimer : 20,
    width : 80,

    ball : {x: 50, y: 9, dx: 1, dy: -1},

    initRows : function(){
        this.rows = [
        "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
        "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
        "oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo",
        "oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo",
        "                                                                                ",
        "                                                                                ",
        "                                                                                ",
        "                                                                                ",
        "                                                                                ",
        "                                                                                "
    ];
    },

    bullets : [],

    // Functions
    onload : function(){
        this.initRows();
        this.score = 0;
        this.time = this.startTime;
        this.coveredChar = ' ';
        this.ball = {x: 40, y: 9, dx: 1, dy: -1};
        this.x = 40;
        this.lives = this.startLives;
        this.message = "";
        this.generateBonuses();
    },

    generateBonuses : function(){
        for(var i=0;i<4;i++){
            for(var j=0;j<this.width;j++){
                if(random.getFloat() > 0.9)
                    this.rows[i] = setCharAt(this.rows[i],j,' ');
                if(random.getFloat() < 0.03)
                    this.rows[i] = setCharAt(this.rows[i],j,bonus.getBonus());
            }
        }
    },

    goLeft : function(){
        if (this.x > this.paddleWidth) this.x--;
    },

    goRight : function(){
        if (this.x < (this.width - this.paddleWidth)) this.x++;
    },

    // Frame is this.width x 10
    renderFrame : function(){
        if(!this.isInProgress) return;

        // paddle
        this.rows[9] = str_repeat(' ',this.x - this.paddleWidth) + str_repeat('_',2*this.paddleWidth + 1) + str_repeat(' ',this.width - 2*this.paddleWidth - 1 - this.x);

        //ball
        //replace covered char
        if(this.time % this.moveEvery == 0){
            this.rows[this.ball.y] = setCharAt(this.rows[this.ball.y],this.ball.x,this.coveredChar);
            this.ball.x += Math.round(this.ball.dx);
            this.ball.y += Math.round(this.ball.dy);
            if(this.ball.x > this.width - 1) this.ball.x = this.width - 1;
            if(this.ball.x < 0)  this.ball.x = 0;
            if(this.ball.y < 0)  this.ball.y = 0;
            var char1 = this.rows[this.ball.y].charAt(this.ball.x);
            if(char1 == ' '){
                // air
                this.coveredChar = ' ';
                if(this.ball.y == 9){
                    //missed paddle
                    if(this.lives == 0){
                        this.end();
                        return;
                    }
                    this.ball.x = this.x;
                    this.ball.y = 9;
                    this.ball.dx = 1.2 * (random.getFloat() - 0.5);
                    this.ball.dy = -1;
                    this.lives--;
                }
                // nothing else to do
            }else if(char1 == '_'){
                //paddle - bounce
                this.ball.dy = 0-this.ball.dy;
                if(this.ball.x < this.x){
                    //left
                    this.ball.dx = Math.max(-3,this.ball.dx - 0.6 - 0.6 * random.getFloat());
                }else if(this.ball.x > this.x){
                    //right
                    this.ball.dx = Math.min(3,this.ball.dx + 0.6 + 0.6 * random.getFloat());
                }else{
                    //center
                    this.ball.dx = Math.max(-3,(Math.min(3,this.ball.dx + 1.2 * (random.getFloat() - 0.5))));
                }
            }else if(char1 == 'o'){
                //hit!
                this.score++;
                this.coveredChar = ' ';
                this.ball.dy =- this.ball.dy;
                this.ball.dx = Math.max(-3,(Math.min(3,this.ball.dx + 1.2 * (random.getFloat() - 0.5))));
            }else if(char1 == 'X'){
                this.score++;
                this.coveredChar = 'o';
                this.ball.dy =- this.ball.dy;
                this.ball.dx = Math.max(-3,(Math.min(3,this.ball.dx + 1.2 * (random.getFloat() - 0.5))));
                if(random.getFloat() > 0.7){
                    inventory.items.brick.quantity++;
                    inventory.items.brick.hasOwned = true;
                }
            }else{
                // bonus
                this.bonusMessage = bonus.redeemBonus(char1);
                this.coveredChar = ' ';
                this.ball.dy =- this.ball.dy;
                this.ball.dx += 1.2 * (random.getFloat() - 0.5);
            }
            //check edges
            if(this.ball.x == 0 || this.ball.x == this.width - 1){
                this.ball.dx =- this.ball.dx;
            }
            if(this.ball.y == 0){
                // give crafting table
                if(!locations.crafting.owned){
                    this.bonusMessage = "You got a reward!";
                    locations.crafting.obtain();
                }
                this.ball.dy = Math.abs(this.ball.dy);
            }
            //render ball
            this.rows[this.ball.y] = setCharAt(this.rows[this.ball.y],this.ball.x,'O');
        }
        this.time--;
        if(this.time == 0){
            this.end();
            return;
        }
        htmlInteraction.setInnerHtml('game-area',
            this.rows[0] + '\n' +
            this.rows[1] + '\n' +
            this.rows[2] + '\n' +
            this.rows[3] + '\n' +
            this.rows[4] + '\n' +
            this.rows[5] + '\n' +
            this.rows[6] + '\n' +
            this.rows[7] + '\n' +
            this.rows[8] + '\n' +
            this.rows[9] + '\n' +
            this.displayRow());
    },

    displayRow : function(){
        var result = "";
        for (var i = 0; i < this.lives; i++) {
            result += "_ ";
        }
        result = pad(result,10);
        result = result + "Time remaining: " + Math.floor(this.time / 10);
        result = pad(result, 36);
        result = result + "Score: " + this.score;
        result = pad(result,56);
        if(this.bonusMessage != ""){
            result += this.bonusMessage;
            this.bonusMessageTimer--;
            if(this.bonusMessageTimer == 0){
                this.bonusMessage = "";
                this.bonusMessageTimer = 20;
            }
        }

        return result;
    },

    play : function(){
        this.onload();
        htmlInteraction.setGameMode(true);
        this.isInProgress = true;
    },

    end : function(){
        htmlInteraction.setGameMode(false);
        this.isInProgress = false;
        if(this.message != ""){
            vending.setMessage('You won ' + Math.ceil(this.score / 10) + " coins,","and found a key to","the crafting bay!")
        }else{
            vending.setMessage('You won',"" + Math.ceil(this.score / 10),"coins");
        }
        coins.setCoins(coins.owned + Math.ceil(this.score / 10));
    }
};
