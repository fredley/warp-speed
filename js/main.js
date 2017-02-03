var main = {

    konami : "",
    konamiClaimed : false,
    repeatBlocker : true,

    onload : function(){
        time.onload();
        coins.onload();
        crafting.onload();
        codex.onload();

        //levels
        game1.onload();
        // Set up counters

        if(localStorage["save_game"] !== undefined){
            htmlInteraction.setInnerHtml('time-display','Loading...');
            save.load();
        }else{
            this.bindIntervals();
        }
    },

    bindIntervals : function(){
        window.setInterval(this.secInterval.bind(this), 1000);
        window.setInterval(this.halfishInterval.bind(this), 450);
        window.setInterval(this.tenthInterval.bind(this), 100);
    },

    secInterval : function(){
        // Time
        time.increment();
        codex.blink();
        save.save();
    },


    halfishInterval : function(){
        crafting.blink();
    },

    tenthInterval : function(){
        // render Game Frames
        game1.renderFrame();
        game2.renderFrame();
        game3.renderFrame();
        game4.renderFrame();
        ending.renderFrame();
        lab.renderFlame();
    }

};

$("body").keydown( function(e) {

    if(game1.isInProgress){
        if(e.which == 38){
            game1.goUp();
        }
        else if(e.which == 40){
            game1.goDown();
        }
    }

    if(game2.isInProgress){
        if(e.which == 37){
            game2.goLeft();
        }
        else if(e.which == 39){
            game2.goRight();
        }
    }

    if(game3.isInProgress){
        if(e.which == 38){
            game3.goUp();
        }
        else if(e.which == 40){
            game3.goDown();
        }
    }

    if(game4.isInProgress){
        if(e.which == 38){
            game4.goUp();
        }
        else if(e.which == 40){
            game4.goDown();
        }
        else if(e.which == game4.keyLeft){
            game4.goLeft();
        }
        else if(e.which == game4.keyRight){
            game4.goRight();
        }
        else if(e.which == game4.keyBlockLow && this.repeatBlocker){
            game4.blockLow();
            this.repeatBlocker = false;
        }
        else if(e.which == game4.keyBlockHigh && this.repeatBlocker){
            game4.blockHigh();
            this.repeatBlocker = false;
        }
        else if(e.which == game4.keyAttackLow && this.repeatBlocker){
            game4.attackLow();
            this.repeatBlocker = false;
        }
        else if(e.which == game4.keyAttackHigh && this.repeatBlocker){
            game4.attackHigh();
            this.repeatBlocker = false;
        }
        else if(e.which == game4.keyAttackRanged && this.repeatBlocker){
            game4.attackRanged();
            this.repeatBlocker = false;
        }
    }

    //konami

    if(e.which == 38){
        if(this.konami == 'u'){
            this.konami = 'uu';
        }else{
            this.konami = 'u';
        }
    }
    if(e.which == 40){
        this.konami += 'd';
    }
    if(e.which == 37){
        this.konami += 'l';
    }
    if(e.which == 39){
        this.konami += 'r';
    }
    if(e.which == 65){
        if(this.konami == 'uuddlrlrb'){
            if(!this.konamiClaimed){
                coins.setCoins(coins.owned + 100);
                this.konamiClaimed = true;
            }
            if(game4.isInProgress && game4.level == 6){
                // beat the game
                game4.end(true);
            }
            if(game4.isInProgress && game4.level == 8 && game4.boss.mobIndex == 6){
                // beat the game, again
                game4.boss.getBoss(++game4.boss.mobIndex);
            }
        }
    }
    if(e.which == 66){
        this.konami += 'b'
    }
});

$('body').keyup(function(e) {
    this.repeatBlocker = true;
});
$('body').focus(function(e) {
    this.repeatBlocker = true;
});

$('#craft-amount').bind("propertychange keyup input paste",function(){
    crafting.updateMultiplier($(this).val());
});

// Extra functions

function setCharAt(str,index,chr) {
    if(index > str.length-1) return str;
    return str.substr(0,index) + chr + str.substr(index+1);
}

function setCharsAt(str,index,chrs) {
    if(index > str.length-1) return str;
    return str.substr(0,index) + chrs + str.substr(index+chrs.length);
}

function str_repeat(str,reps) {
    if(reps > 0){
        return new Array(reps + 1).join(str);
    }
    return '';
}

function pad_both(str,len){
    if (len + 1 >= str.length) {
        var right = Math.ceil((padlen = len - str.length) / 2);
        var left = padlen - right;
        str = Array(left+1).join(' ') + str + Array(right+1).join(' ');
    }
    return str;
}

function pad(str, len) {
    if (len + 1 >= str.length) {
        str = str + Array(len + 1 - str.length).join(' ');
    }

    return str;
}

function clone(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
}

function countStr(needle,haystack){
    for(var i=count=0; i<haystack.length; count+=+(needle===haystack[i++]));
    return count;
}

Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

function getURLParameter(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
}

window.onload = main.onload.bind(main);
