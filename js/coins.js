var coins = {

    // Variables
    owned : 0,
    multiplier : 1,
    initDisplay : false,

    // Functions
    onload : function(){
        coins.setCoins(0);
    },

    setCoins : function(value){
        this.owned = value;
        if(value > 0){
            htmlInteraction.setElementVisibility("coin-display",true);
        }
        htmlInteraction.setInnerHtml("coin-display","Coins: " + value);
        inventory.refreshButton("coin");
        vending.updateButtons();
    },

    setMultiplier : function(value){
        this.multiplier = value;
    },

    increment : function(){
        this.setCoins(this.owned + this.multiplier);
        if(!this.initDisplay){
            this.initDisplay = true;
            htmlInteraction.setElementVisibility("vending-machine",true);
        }
    }
};
