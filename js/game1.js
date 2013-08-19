var game1 = {

    // Variables
    startLives : 1,
    lives : 1,
    startTime : 300,
    time : 300,
    y : 5,
    probability : 0.01,
    isInProgress : false,
    bulletEvery : 20,
    score : 0,
    rows : [],
    message : "",
    bonusMessage : "",
    bonusMessageTimer : 20,
    bigAsteroidFrame : 0,
    bigAsteroidY : 0,
    bigAsteroidSize : 3,

    initRows : function(){
        this.rows = [
        "                                                                                                    ",
        "                                                                                                    ",
        "                                                                                                    ",
        "                                                                                                    ",
        "                                                                                                    ",
        "                                                                                                    ",
        "                                                                                                    ",
        "                                                                                                    ",
        "                                                                                                    ",
        "                                                                                                    "
    ];
    },

    bullets : [],

    // Functions
    onload : function(){
        this.initRows();
        this.score = 0;
        bigAsteroidFrame = 0;
        this.time = this.startTime;
        this.lives = this.startLives;
        bonusMessage = "";
        this.bullets=[];
        bonusMessageTimer = 20;
    },

    goUp : function(){
        if (this.y > 0) this.y--;
    },

    goDown : function(){
        if (this.y < 9) this.y++;
    },

    generateLine : function(){
        var result = new Array();
        for(var i = 0; i < 10; i++){
            if(random.getFloat() < this.probability){
                if(random.getFloat() < 0.1){
                    result[i] = bonus.getBonus();
                }else{
                    result[i] = "O";
                }
            }else{
                result[i] = " ";
            }
        }
        if(random.getFloat() < 0.01 && this.bigAsteroidFrame == 0){
            this.bigAsteroidFrame = 1;
            this.bigAsteroidSize = random.pick([2,3,4]);
            this.bigAsteroidY = random.getRandomIntUpTo(10 - this.bigAsteroidSize);
            for(var i=0;i<this.bigAsteroidSize;i++){
                result[this.bigAsteroidY + i] = '@';
            }
            result[this.bigAsteroidY] = '/';
            result[this.bigAsteroidY + this.bigAsteroidSize - 1] = '\\';
        }else if(this.bigAsteroidFrame >= 1){
            this.bigAsteroidFrame++;
            for(var i=0;i<this.bigAsteroidSize;i++){
                result[this.bigAsteroidY + i] = '@';
            }
            if(this.bigAsteroidFrame == 2*this.bigAsteroidSize - 1){
                result[this.bigAsteroidY] = '\\';
                result[this.bigAsteroidY + this.bigAsteroidSize - 1] = '/';
                this.bigAsteroidFrame = 0;
            }
        }
        return result;
    },

    // Frame is 100 x 10
    renderFrame : function(){
        if(!this.isInProgress) return;

        var newLine = this.generateLine();
        // Asteroid field
        for(var i = 0; i < this.rows.length; i++){
            this.rows[i] = this.rows[i].substring(1).replace('x',' ').replace('X','x') + newLine[i];
            if(i == this.y && this.rows[i].charAt(0) != ' ' && this.rows[i].charAt(0) != 'X' && this.rows[i].charAt(0) != 'x'){
                this.lives--;
                if(this.lives == 0){
                    this.end();
                }
            }
        }
        // bullets
        // if need be create a new one
        if(this.time % this.bulletEvery == 0){
            var bullet = {x : 2, y : this.y};
            this.bullets.push(bullet);
        }
        // render all bullets
        for(var i = this.bullets.length - 1;i>=0;i--){
            if(this.bullets[i].x > 98){
                this.rows[this.bullets[i].y] = setCharAt(this.rows[this.bullets[i].y],this.bullets[i].x - 1," ");
                this.rows[this.bullets[i].y] = setCharAt(this.rows[this.bullets[i].y],this.bullets[i].x - 2," ");
                this.bullets.splice(i,1);
                continue;
            }
            this.rows[this.bullets[i].y] = setCharAt(this.rows[this.bullets[i].y],this.bullets[i].x - 1," ");
            this.rows[this.bullets[i].y] = setCharAt(this.rows[this.bullets[i].y],this.bullets[i].x - 2," ");
            // Need to check both locations
            var hit = false;
            for(var j=0;j<2;j++){
                var char1 = this.rows[this.bullets[i].y].charAt(this.bullets[i].x + j);
                if(char1 != ' ' && char1 != '*'){
                    hit = true;
                    if(char1 == 'O'){
                        this.explodeBullet(i,j);
                    }else if(char1 == 'x'){
                        //ignore
                    }else if(char1 == '\\' || char1 == '/' || char1 == '@'){
                        this.bullets.splice(i,1);
                    }else{
                        // redeem bonus
                        this.bonusMessage = bonus.redeemBonus(char1);
                        this.rows[this.bullets[i].y] = setCharAt(this.rows[this.bullets[i].y],this.bullets[i].x + j,"X");
                        this.bullets.splice(i,1);
                    }
                    break;
                }
            }
            if(!hit){
                this.rows[this.bullets[i].y] = setCharAt(this.rows[this.bullets[i].y],this.bullets[i].x,"*");
                this.bullets[i].x++;
            }
        }

        // ship
        this.rows[this.y] = '>' + this.rows[this.y].slice(1);

        this.time--;
        if(this.time == 0){
            this.end();
        }
        htmlInteraction.setInnerHtml('game-area',
            this.rows[0] + ' \n' +
            this.rows[1] + ' \n' +
            this.rows[2] + ' \n' +
            this.rows[3] + ' \n' +
            this.rows[4] + ' \n' +
            this.rows[5] + ' \n' +
            this.rows[6] + ' \n' +
            this.rows[7] + ' \n' +
            this.rows[8] + ' \n' +
            this.rows[9] + ' \n' +
            this.displayRow());
    },

    explodeBullet : function(i,offset){
        this.rows[this.bullets[i].y] = setCharAt(this.rows[this.bullets[i].y],this.bullets[i].x + offset,"X");
        this.score++;
        this.bullets.splice(i,1);
        if(random.getFloat() > 0.7){
            console.log('dust get');
            inventory.items.dust.quantity++;
            inventory.items.dust.hasOwned = true;
        }
    },

    displayRow : function(){
        var result = "";
        for (var i = 0; i < this.lives; i++) {
            result += "> ";
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
        vending.setMessage('You won',"" + Math.ceil(this.score / 10),"coins");
        coins.setCoins(coins.owned + Math.ceil(this.score / 10));
    }
};
