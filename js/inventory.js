var inventory = {

    items : {
        "coin" :          { quantity : 0, code: 'C', hasOwned : true,  name: 'Coin'},
        "dust" :          { quantity : 0, code: 'd', hasOwned : false, name: 'Dust' },
        "ingot":          { quantity : 0, code: 'i', hasOwned : false, name: 'Ingot'},
        "brick":          { quantity : 0, code: 'b', hasOwned : false, name: 'Brick'},
        "block":          { quantity : 0, code: 'B', hasOwned : false, name: 'Block'},
        "candy":          { quantity : 0, code: 'c', hasOwned : false, name: 'Candy'},
        "lollipop":       { quantity : 0, code: 'l', hasOwned : false, name: 'Lollipop'},
        "gobstopper":     { quantity : 0, code: 'G', hasOwned : false, name: 'Gobstopper'},
        "plate":          { quantity : 0, code: 'P', hasOwned : false, name: 'Plating'},
        "hard-plate":     { quantity : 0, code: 'H', hasOwned : false, name: 'Hard Plating'},
        "health-tonic":   { quantity : 0, code: '!', hasOwned : false, name: 'Health Tonic'},
        "strength-tonic": { quantity : 0, code: '!', hasOwned : false, name: 'Strength Tonic'},
        "regen-tonic":    { quantity : 0, code: '!', hasOwned : false, name: 'Regen Tonic'},
        "fire-tonic":     { quantity : 0, code: '!', hasOwned : false, name: 'Fire Tonic'}
    },

    potions : {
        "health":   { quantity : 0, hasOwned : false, name: "Health", code : 'h',
            drink : function(){
                game4.hp = Math.max(game4.hp + 50,game4.startHP);
                game3.hp = Math.max(game3.hp + 50,game3.startHP);
            }},
        "health2":  { quantity : 0, hasOwned : false, name: "Health II",
            drink : function(){
                game4.hp = Math.max(game4.hp + 100,game4.startHP);
                game3.hp = Math.max(game3.hp + 100,game3.startHP);
            }},
        "strength": { quantity : 0, hasOwned : false, name: "Strength", code : 's',
            drink : function(){
                var prevAttack4 = game4.attack;
                var prevAttack3 = game3.attack;
                game4.attack = game4.attack * 2;
                game3.attack = game3.attack * 2;
                setTimeout(function () {
                    game4.attack = prevAttack4;
                    game3.attack = prevAttack3;
                }, 5000);
            }},
        "strength2": { quantity : 0, hasOwned : false, name: "Strength II",
            drink : function(){
                var prevAttack4 = game4.attack;
                var prevAttack3 = game3.attack;
                game4.attack = game4.attack * 4;
                game3.attack = game3.attack * 4;
                setTimeout(function () {
                    game4.attack = prevAttack4;
                    game3.attack = prevAttack3;
                }, 5000);
            }},
        "regen":    { quantity : 0, hasOwned : false, name: "Regeneration", code : 'r',
            drink : function(){
                (function regen (i) {
                   setTimeout(function () {
                        game4.hp = Math.min(game4.hp + 5,game4.startHP);
                        game3.hp = Math.min(game3.hp + 5,game3.startHP);
                        if (--i) {
                            regen(i);
                        }
                       }, 500)
                })(20);
            }},
        "regen2":    { quantity : 0, hasOwned : false, name: "Regeneration II",
            drink : function(){
                (function regen (i) {
                   setTimeout(function () {
                        game4.hp = Math.min(game4.hp + 10,game4.startHP);
                        game3.hp = Math.min(game3.hp + 10,game3.startHP);
                        if (--i) {
                            regen(i);
                        }
                       }, 500)
                })(20);
            }},
        "fire":     { quantity : 0, hasOwned : false, name: "Fire Breath", code : 'f',
            drink : function(){
                (function burn (i) {
                   setTimeout(function () {
                        game4.bullets.push({
                            display : "~",
                            dx : 1,
                            x : game4.x + 1,
                            damage : 10,
                            y : 8
                        });
                        if (--i) {
                            burn(i);
                        }
                       }, 400)
                })(8);
            }},
        "fire2":     { quantity : 0, hasOwned : false, name: "Fire Breath II",
            drink : function(){
                (function burn (i) {
                   setTimeout(function () {
                        game4.bullets.push({
                            display : "~",
                            dx : 1,
                            x : game4.x + 1,
                            damage : 20,
                            y : 8
                        });
                        if (--i) {
                            burn(i);
                        }
                       }, 400)
                })(10);
            }}
    },

    armour : {

        helmet : 0,
        chest  : 0,
        legs   : 0,
        boots  : 0,

        reduceDamageTotal : function(damage){
            return damage - Math.round(damage*(this.helmet + this.chest + this.legs + this.boots)*0.05);
        },

        reduceDamage : function(damage,is_high){
            if(is_high){
                return damage - Math.round(damage*(this.helmet + this.chest)*0.05);
            }else{
                return damage - Math.round(damage*(this.legs + this.boots)*0.05);
            }
        }
    },

    drink : function(potion){
        if(this.potions[potion].quantity < 1){
            return;
        }
        this.potions[potion].quantity--;
        this.potions[potion].drink();
        this.refreshPotionButton(potion);
        for(var potion in this.potions){
            htmlInteraction.disableButton('drink-'+potion);
        }
        setTimeout(function () {
            inventory.refreshButtons();
        }, 10000);
    },

    refreshButton : function(item){
        if(inventory.items[item].hasOwned){
            if(item == "coin"){
                inventory.items[item].quantity = coins.owned;
            }
            htmlInteraction.setElementVisibility('inv-'+item,true);
            htmlInteraction.setElementVisibility('lab-'+item,true);
            htmlInteraction.setElementVisibility('lab-'+item+'-10',true);
            htmlInteraction.setElementVisibility('lab-'+item+'-100',true);
            htmlInteraction.setInnerHtml('inv-'+item,'Add ' + inventory.items[item].name + ' (' + inventory.items[item].quantity + ') ');
            htmlInteraction.setInnerHtml('lab-'+item,'Add ' + inventory.items[item].name + ' (' + inventory.items[item].quantity + ') ');
            if(inventory.items[item].quantity > 0){
                htmlInteraction.enableButton('inv-'+item);
                htmlInteraction.enableButton('lab-'+item);
            }else{
                htmlInteraction.disableButton('inv-'+item);
                htmlInteraction.disableButton('lab-'+item);
            }
            if(inventory.items[item].quantity >= 10){
                htmlInteraction.enableButton('lab-'+item+'-10');
            }else{
                htmlInteraction.disableButton('lab-'+item+'-10');
            }
            if(inventory.items[item].quantity >= 100){
                htmlInteraction.enableButton('lab-'+item+'-100');
            }else{
                htmlInteraction.disableButton('lab-'+item+'-100');
            }
            if(crafting.readyToCraft){
                htmlInteraction.disableButton('inv-'+item);
            }
        }else{
            htmlInteraction.setElementVisibility('inv-'+item,false);
            htmlInteraction.setElementVisibility('lab-'+item,false);
            htmlInteraction.setElementVisibility('lab-'+item+'-10',false);
            htmlInteraction.setElementVisibility('lab-'+item+'-100',false);
        }
    },

    refreshPotionButton : function(potion){
        if(this.potions[potion].hasOwned){
            htmlInteraction.setElementVisibility('drink-'+potion,true);
            htmlInteraction.setElementVisibility('inv-'+potion,true);
            htmlInteraction.setInnerHtml('drink-'+potion,'Drink ' + this.potions[potion].name + ' Potion (' + this.potions[potion].quantity + ') ');
            htmlInteraction.setInnerHtml('inv-'+potion,'Add ' + this.potions[potion].name + ' Potion (' + this.potions[potion].quantity + ') ');
            if(this.potions[potion].quantity > 0){
                htmlInteraction.enableButton('drink-'+potion);
                htmlInteraction.enableButton('inv-'+potion);
            }else{
                htmlInteraction.disableButton('drink-'+potion);
                htmlInteraction.disableButton('inv-'+potion);
            }
            if(crafting.readyToCraft){
                htmlInteraction.disableButton('inv-'+potion);
            }
        }else{
            htmlInteraction.setElementVisibility('drink-'+potion,false);
            htmlInteraction.setElementVisibility('inv-'+potion,false);
        }
    },

    refreshButtons : function(){
        // For all buttons, set display and values
        for(var item in this.items){
            this.refreshButton(item);
        }
        for(var potion in this.potions){
            this.refreshPotionButton(potion);
        }
        if(crafting.readyToCraft){
            htmlInteraction.disableButton('skip-square');
        }else{
            htmlInteraction.enableButton('skip-square');
        }
        if(crafting.itemCode == ""){
            htmlInteraction.disableButton('craft-clear-btn');
        }else{
            htmlInteraction.enableButton('craft-clear-btn');
        }
    }

};
