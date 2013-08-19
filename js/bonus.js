var bonus = {

    bonuses : {
        0 : {
            // more meteors
            redeem : function(){
                game1.probability += 0.01;
                return "More Asteroids!";
            },
            display : "A"
        },
        1 : {
            // more bullets
            redeem : function(){
                game1.bulletEvery = Math.max(--game1.bulletEvery,3);
                return "Faster bullets!";
            },
            display : "B"
        },
        2 : {
            // more lives/hp
            redeem : function(){
                game1.startLives = Math.min(game1.startLives + 1,5);
                game2.startLives = Math.min(game2.startLives + 1,5);
                game3.startHP = Math.min(Math.ceil(game3.startHP + (500 - game3.startHP)/20 + 1),500);
                game4.startHP = Math.min(Math.ceil(game4.startHP + (500 - game4.startHP)/20 + 1),500);
                return "More Lives and Health!";
            },
            display : "H"
        },
        3 : {
            // wider paddle
            redeem : function(){
                game2.paddleWidth = Math.min(game2.paddleWidth + 1,10);
                if(game2.paddleWidth == 10){
                    return "Paddle width maxed!"
                }
                return "Wider Paddle!";
            },
            display : "P"
        },
        4 : {
            // more time
            redeem : function(){
                game1.startTime = Math.min(Math.ceil(game1.startTime + (2400 - game1.startTime)/50 + 10),2400);
                game2.startTime = Math.min(Math.ceil(game2.startTime + (2400 - game2.startTime)/50 + 10),2400);
                return "More Game Time!";
            },
            display : "T"
        },
        5 : {
            // Coins!
            redeem : function(){
                coins.setCoins(coins.owned + random.getRandomIntUpTo(coins.owned/4 + 1));
                return "More Coins!";
            },
            display : "C"
        },
        6 : {
            // Coin Multiplyer
            redeem : function(){
                coins.multiplier++;
                return "Coin Multiplyer Increased!";
            },
            display : "M"
        },
        7 : {
            // Candy++
            redeem : function(){
                inventory.items.candy.quantity += random.getRandomIntUpTo(inventory.items.candy.quantity/4 + 10);
                inventory.items.candy.hasOwned = true;
                codex.newPage(7);
                codex.newPage(8);
                return "More Candy!";
            },
            display : "c"
        },
        8 : {
            // Dust++
            redeem : function(){
                inventory.items.dust.quantity += random.getRandomIntUpTo(inventory.items.dust.quantity/4 + 10);
                inventory.items.dust.hasOwned = true;
                return "More Dust!";
            },
            display : "d"
        },
        9 : {
            // Bricks++
            redeem : function(){
                inventory.items.brick.quantity += random.getRandomIntUpTo(inventory.items.brick.quantity/4 + 10);
                inventory.items.brick.hasOwned = true;
                return "More Bricks!";
            },
            display : "b"
        },
        10 : {
            // Coinifyer
            redeem : function(){
                time.coinTimes.push(random.getRandomIntUpTo(99));
                return "More frequent coins!";
            },
            display : "f"
        },
        11 : {
            // Warp
            redeem : function(){
                time.setWarps(time.warps + 1);
                return "An extra warp!";
            },
            display : "w"
        },
        12 : {
            // Time multiplier
            redeem : function(){
                time.multiplier++;
                return "Time is moving faster!";
            },
            display : "t"
        },
        13 : {
            // Time multiplier
            redeem : function(){
                time.multiplier++;
                return "Time is moving faster!";
            },
            display : "t"
        }
    },

    getBonus : function(){
        var i = random.getRandomIntUpTo(Object.size(this.bonuses) - 1);
        var bonus = this.bonuses[i];
        return bonus.display;
    },

    redeemBonus : function(c){
        for(var i=0;i<Object.size(this.bonuses);i++){
            if(this.bonuses[i].display == c){
                return this.bonuses[i].redeem();
            }
        }
    }
};
