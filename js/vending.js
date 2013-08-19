var vending = {

    coinFound : false,

    products : {
        "game1" : {bought:false, price:1, name: "Asteroid Attack",
            button:"game-1-button", buy_button:"game-1-buy"},
        "game2" : {bought:false, price:30, name: "Brick Breaker",
            button:"game-2-button", buy_button:"game-2-buy"},
        "game3" : {bought:false, price:1000, name: "Candy Crusade",
            button:"game-3-button", buy_button:"game-3-buy"},
        "game4" : {bought:false, price:500000, name: "Death Duel",
            button:"game-4-button", buy_button:"game-4-buy"},
        "mult1" : {bought:false, price:150, name: "Coin Multiplier",
            buy_button:"mult-1-buy",
            on_buy : function(){
                coins.multiplier += 1;
            }},
        "mult2" : {bought:false, price:50000, name: "Coin Doubler",
            buy_button:"mult-2-buy",
            on_buy : function(){
                coins.setCoins(coins.owned*2);
            }},
        "mult3" : {bought:false, price:1000000, name: "Multiplier Doubler",
            buy_button:"mult-3-buy",
            on_buy : function(){
                coins.multiplier *= 2;
            }}
    },

    buy : function(object){
        coins.setCoins(coins.owned - this.products[object].price);
        this.products[object].bought = true;
        this.setMessage("Thank you for purchasing",this.products[object].name + ".","Please come again.")
        htmlInteraction.setElementVisibility(this.products[object].buy_button,false);
        if(typeof(this.products[object].button) != "undefined"){
            htmlInteraction.setElementVisibility(this.products[object].button, true);
        }
        if(typeof(this.products[object].on_buy) != "undefined"){
            this.products[object].on_buy();
        }
    },

    setMessage : function(line1,line2,line3){
        if(typeof(line1) == "undefined"){ var line1 = ""; }
        if(typeof(line2) == "undefined"){ var line2 = ""; }
        if(typeof(line3) == "undefined"){ var line3 = ""; }

        line1 = pad_both(line1,27);
        line2 = pad_both(line2,27)
        line3 = pad_both(line3,27);

        htmlInteraction.setInnerHtml('vend-line-1',line1);
        htmlInteraction.setInnerHtml('vend-line-2',line2);
        htmlInteraction.setInnerHtml('vend-line-3',line3);
    },

    rummage : function(){
        if(!this.coinFound){
            this.coinFound = true;
            coins.increment();
            this.setMessage("Kerchunk!","You found a coin!","");
        }else{
            this.setMessage(":-(","No more coins","");
        }
    },

    updateButtons : function(){
        // Set which buttons are visible
        for(var key in this.products){
            product = this.products[key];
            if(!product.bought && coins.owned >= product.price){
                htmlInteraction.setElementVisibility(product.buy_button,true);
                htmlInteraction.enableButton(product.buy_button);
            }else{
                if(htmlInteraction.isElementVisible(product.buy_button)){
                    htmlInteraction.disableButton(product.buy_button);
                }
            }
            if(product.bought){
                try{
                    htmlInteraction.setElementVisibility(product.button, true);
                }catch(e){}
            }
        }
    }
};
