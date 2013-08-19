var time = {

    // Variables
    currTime : 0,
    multiplier : 1,
    coinTimes : [0],
    warps : 3,
    warpCounter : 50,

    // Functions
    onload : function(){
        time.setTime(0);
    },

    setTime : function(value){
        this.currTime = value;
        htmlInteraction.setInnerHtml("time-display","Time: " + value);
    },

    setMultiplier : function(value){
        this.multiplier = value;
    },

    increment : function(){
        if(this.multiplier > 1){
            var newTimes = [];
            for(var i = this.currTime + 1; i<= this.currTime + this.multiplier; i++){
                if(this.coinTimes.indexOf(i % 100) >= 0){
                    coins.increment();
                }
            }
        }else{
            if(this.coinTimes.indexOf((this.currTime + 1) % 100) >= 0 && this.currTime != 0){
                coins.increment();
            }
        }
        this.setTime(this.currTime + this.multiplier);
        if(this.currTime == 20){
            htmlInteraction.setElementVisibility('warp-button',true);
        }
        if(this.currTime == 100){
            htmlInteraction.setElementVisibility('save-button',true);
        }
    },

    setWarps : function(n){
        this.warps = n;
        if(this.warps > 0){
            htmlInteraction.enableButton('warp-button');
        }else{
            htmlInteraction.disableButton('warp-button');
        }
        htmlInteraction.setInnerHtml('warp-button','Warp Speed! (' + this.warps + ')');
    },

    warp : function(){
        if (this.warps > 0){
            this.warps--;
            this.warpLoop = 50;
            htmlInteraction.setInnerHtml('warp-button','Warp Speed! (' + this.warps + ')');
            htmlInteraction.disableButton('warp-button');
            var me = this;
            (function warpLoop (i) {
               setTimeout(function () {
                    main.tenthInterval();
                    if(i % 10 == 0){
                        main.secInterval();
                    }
                    if (--i) {
                        warpLoop(i);
                    }else{
                        if(time.warps > 0)
                            htmlInteraction.enableButton('warp-button');
                    }
                   }, 10)
            })(500);
        }
    }
};
