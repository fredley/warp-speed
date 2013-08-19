    var crafting = {

    blinkState : false,
    currentSquare : 1,
    itemCode : "",
    readyToCraft : false,
    craftQuantity : 1,

    onload : function(){
        this.itemCode = '';
        this.readyToCraft = false;
        this.currentSquare = 1;
        inventory.refreshButtons();
        this.resetGrid();
    },

    blink : function(){
        if(!this.readyToCraft){
            if(this.blinkState){
                htmlInteraction.setInnerHtml('craft-'+this.currentSquare,'.');
            }else{
                htmlInteraction.setInnerHtml('craft-'+this.currentSquare,' ');
            }
            this.blinkState = !this.blinkState;
        }
    },

    incrementSquare : function(){
        if(this.currentSquare == 9){
            this.readyToCraft = true;
            inventory.refreshButtons();
        }
        this.currentSquare++;
        this.updateMultiplier(this.craftQuantity);
    },

    resetGrid : function(){
        for(var i=1;i<10;i++){
            htmlInteraction.setInnerHtml('craft-'+i,' ');
        }
    },

    skipSquare : function(){
        htmlInteraction.setInnerHtml('craft-'+this.currentSquare,' ');
        this.itemCode += ' ';
        this.incrementSquare();
    },

    addItem : function(item){
        htmlInteraction.setInnerHtml('craft-'+this.currentSquare,inventory.items[item].code);
        this.itemCode += inventory.items[item].code;
        if(item == "coin"){
            coins.setCoins(coins.owned - 1);
        }else{
            inventory.items[item].quantity--;
        }
        this.incrementSquare();
        inventory.refreshButton(item);
        htmlInteraction.enableButton('craft-clear-btn');
        this.updateMultiplier(this.craftQuantity);
    },

    addPotion : function(item){
        htmlInteraction.setInnerHtml('craft-'+this.currentSquare,inventory.potions[item].code);
        this.itemCode += inventory.potions[item].code;
        inventory.potions[item].quantity--;
        this.incrementSquare();
        inventory.refreshPotionButton(item);
        htmlInteraction.enableButton('craft-clear-btn');
    },

    setRoboText : function(line1,line2){
        htmlInteraction.setInnerHtml('crafting-instructions-1',line1);
        htmlInteraction.setInnerHtml('crafting-instructions-2',line2);
    },

    make : function(item){
        inventory.items[item].quantity += this.craftQuantity;
        inventory.items[item].hasOwned = true;
        inventory.refreshButton(item);
    },

    craft : function(){
        var success = true;
        this.readyToCraft = true;
        inventory.refreshButtons();
        this.currentSquare = 9;
        while(this.itemCode.length < 9){
            this.itemCode += " ";
        }
        if(!this.canCraft(this.craftQuantity)){
            return;
        }
        var ss = (this.craftQuantity > 1) ? 's' : '';
        var an = (this.craftQuantity > 1) ? this.craftQuantity : 'an';
        var aa = (this.craftQuantity > 1) ? this.craftQuantity : 'a';
        switch(this.itemCode){
            case "ddddddddd":
                this.setRoboText("Beep Boop Bing!","You made "+an+" ingot"+ss+"!");
                this.make("ingot");
                if(inventory.items['block'].hasOwned){
                    codex.newPage(5);
                }
                break;
            case "bbbbbbbbb":
                this.setRoboText("Beep Boop Bang!","You made "+aa+" block"+ss+"!");
                this.make("block");
                if(inventory.items['ingot'].hasOwned){
                    codex.newPage(5);
                }
                if(inventory.items['plate'].hasOwned){
                    codex.newPage(21);
                }
                break;
            case "BBBiiiiii":
                this.setRoboText("Beep Boop Kaching!","You made "+aa+" coin"+ss+"!");
                coins.setCoins(coins.owned + 1);
                inventory.refreshButton("coin");
                break;
            case "iiiiBiiii":
                this.setRoboText("Beep Boop Chink!","You made "+aa+" coinifyer"+ss+" - you'll get coins more often now!");
                for(var i=0;i<this.craftQuantity;i++){
                    time.coinTimes.push(random.getRandomIntUpTo(99));
                }
                break;
            case " c  c  c ":
                this.setRoboText("Beep Boop Gloop!","You made "+aa+" lollipop"+ss+"!");
                this.make("lollipop");
                codex.newPage(8);
                codex.newPage(15);
                break;
            case " l  c    ":
                this.setRoboText("Beep Boop Ting!","You made "+aa+" dagger"+ss+"!");
                game3.upgradeWeapon("dagger");
                codex.newPage(9);
                codex.newPage(16);
                break;
            case " l  l  c ":
                this.setRoboText("Beep Boop Ting!","You made "+aa+" sword"+ss+"!");
                game3.upgradeWeapon("sword");
                codex.newPage(10);
                break;
            case "ll  l  c ":
                this.setRoboText("Beep Boop Ting!","You made "+an+" axe"+ss+"!");
                game3.upgradeWeapon("axe");
                codex.newPage(11);
                break;
            case "llllll c ":
                this.setRoboText("Beep Boop Ting!","You made "+aa+" flail"+ss+"!");
                game3.upgradeWeapon("flail");
                codex.newPage(12);
                break;
            case "llllBllll":
                this.setRoboText("Beep Boop Crunch!","You made "+aa+" gobstopper"+ss+"!");
                this.make('gobstopper');
                codex.newPage(13);
                codex.newPage(14);
                break;
            case "lGllGl c ":
                this.setRoboText("Beep Boop Ting!","You made "+aa+" mace"+ss+"!");
                game3.upgradeWeapon("mace");
                break;
            case "CCCCGCCCC":
                this.setRoboText("Beep Boop Whizz!","You made "+aa+" time warp"+ss+"!");
                time.setWarps(time.warps + this.craftQuantity);
                htmlInteraction.enableButton('warp-button');
                break;
            case "lll  c   ":
                this.setRoboText("Beep Boop Clink!","You made a key!");
                locations.lab.obtain();
                break;
            case "CCCCCCCCC":
                this.setRoboText("Beep Boop Clang!","You made some plating!");
                this.make('plate');
                codex.newPage(17);
                codex.newPage(18);
                codex.newPage(19);
                codex.newPage(20);
                if(inventory.items['block'].hasOwned){
                    codex.newPage(21);
                }
                break;
            case "PPPPBPPPP":
                this.setRoboText("Beep Boop Clang!","You made some hard plating!");
                this.make('hard-plate');
                codex.newPage(22);
                codex.newPage(23);
                codex.newPage(24);
                codex.newPage(25);
                break;
            case "hhhhhhhhh":
                this.setRoboText("Beep Boop Gurgle!","You made "+aa+" health tonic"+ss+"!");
                this.make('health-tonic');
                break;
            case "sssssssss":
                this.setRoboText("Beep Boop Gurgle!","You made "+aa+" strength tonic"+ss+"!");
                this.make('strength-tonic');
                break;
            case "rrrrrrrrr":
                this.setRoboText("Beep Boop Gurgle!","You made "+aa+" regeneration tonic"+ss+"!");
                this.make('regen-tonic');
                break;
            case "fffffffff":
                this.setRoboText("Beep Boop Gurgle!","You made "+aa+" fire tonic"+ss+"!");
                this.make('fire-tonic');
                break;
            case "HHHH H   ":
                inventory.armour.helmet = Math.max(2,inventory.armour.helmet);
            case "PPPP P   ":
                inventory.armour.helmet = Math.max(1,inventory.armour.helmet);
                this.setRoboText("Beep Boop Bonk!","You made a helmet!");
                break;
            case "H HHHHHHH":
                inventory.armour.chest = Math.max(2,inventory.armour.chest);
            case "P PPPPPPP":
                inventory.armour.chest = Math.max(1,inventory.armour.chest);
                this.setRoboText("Beep Boop Bonk!","You made a chestplate!");
                break;
            case "HHHH HH H":
                inventory.armour.legs = Math.max(2,inventory.armour.legs);
            case "PPPP PP P":
                inventory.armour.legs = Math.max(1,inventory.armour.legs);
                this.setRoboText("Beep Boop Bonk!","You made some leggings!");
                break;
            case "   H HH H":
                inventory.armour.boots = Math.max(2,inventory.armour.boots);
            case "   P PP P":
                inventory.armour.boots = Math.max(1,inventory.armour.boots);
                this.setRoboText("Beep Boop Bonk!","You made some boots!");
                break;

            default:
                // fail
                success = false;
                this.setRoboText("Beep Boop CHKCHKCHKCHKCKKKK...","You failed to make anything useful");
        }
        if(!success){
            this.itemCode = ""; // Consume one set of items
            this.clear();
            inventory.refreshButtons();
            this.updateMultiplier(this.craftQuantity);
            return;
        }
        //consume items
        for(var item in inventory.items){
            inventory.items[item].quantity -= countStr(inventory.items[item].code,this.itemCode) * (this.craftQuantity - 1);
        }
        for(var item in inventory.potions){
            inventory.potions[item].quantity -= countStr(inventory.potions[item].code,this.itemCode) * (this.craftQuantity - 1);
        }
        coins.setCoins(coins.owned - countStr('C',this.itemCode) * (this.craftQuantity - 1));

        if(!this.canCraft(this.craftQuantity + 1)){
            //Consume all the items, then clear
            this.itemCode = "";
            this.clear();
        }else{
            coins.setCoins(coins.owned - countStr('C',this.itemCode));
            for(var item in inventory.items){
                inventory.items[item].quantity -= countStr(inventory.items[item].code,this.itemCode);
            }
            for(var item in inventory.potions){
                inventory.potions[item].quantity -= countStr(inventory.potions[item].code,this.itemCode);
            }
        }
        inventory.refreshButtons();
        this.updateMultiplier(this.craftQuantity);
    },

    canCraft : function(n){
        for(var item in inventory.items){
            if(countStr(inventory.items[item].code,this.itemCode) * (n - 1) > inventory.items[item].quantity){
                return false;
            }
        }
        for(var item in inventory.potions){
            if(countStr(inventory.potions[item].code,this.itemCode) * (n - 1) > inventory.potions[item].quantity){
                return false;
            }
        }
        if(countStr('C',this.itemCode) * (n - 1) > coins.owned){
            return false;
        }
        return true;

    },

    clear : function(){
        for(var item in inventory.items){
            inventory.items[item].quantity += countStr(inventory.items[item].code,this.itemCode);
        }
        for(var item in inventory.potions){
            inventory.potions[item].quantity += countStr(inventory.potions[item].code,this.itemCode);
        }
        coins.setCoins(coins.owned + countStr('C',this.itemCode));
        this.readyToCraft = false;
        this.currentSquare = 1;
        this.itemCode = "";
        this.resetGrid();
        inventory.refreshButtons();
    },

    updateMultiplier : function(m){
        this.craftQuantity = Math.floor(m);
        if(this.canCraft(m) && this.itemCode != "" && m > 0){
            htmlInteraction.enableButton('craft-btn');
        }else{
            htmlInteraction.disableButton('craft-btn');
        }
    }
};
