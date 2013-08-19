var game3 = {

    // Variables
    startHP : 20,
    hp : 20,
    castleHP : 20,
    time : 1,
    isInProgress : false,
    isInCombat : false,
    score : 0,
    rows : [],
    message : "",
    weapon : "fist",
    level : 0,
    y : 4,
    combatMessage : "",

    initRows : function(){
        this.rows = [
        "   ",
        "                                                                                                    ",
        "____________________________________________________________________________________________________",
        "                                                                                                    ",
        "_____\\o/____________________________________________________________________________________________",
        "                                                                                                    ",
        "____________________________________________________________________________________________________"
    ];
    },

    weapons : {
        "" : {
            name : "Nothing",
            damage : 0
        },
        "fist" : {
            name : "Fist",
            damage : 1
        },
        "dagger" : {
            name : "Dagger",
            damage : 2
        },
        "sword" : {
            name : "Short Sword",
            damage : 3
        },
        "axe" : {
            name : "Axe",
            damage : 5
        },
        "flail" : {
            name : "Flail",
            damage : 10
        },
        "mace" : {
            name : "Mace",
            damage : 20
        }
    },

    generateMob : function(y){
        var newMob = {};
        var index = random.getRandomIntUpTo(Object.size(bestiary[this.level]) - 1);
        newMob.y = y;
        newMob.name = bestiary[this.level][index].name;
        newMob.display = bestiary[this.level][index].display;
        newMob.hp = bestiary[this.level][index].hp;
        newMob.attack = bestiary[this.level][index].attack;
        newMob.x = 97;
        newMob.points = bestiary[this.level][index].hp;
        this.monsters.push(newMob);
    },

    upgradeWeapon : function(weapon){
        if(this.weapons[this.weapon].damage < this.weapons[weapon]) return;
        this.weapon = weapon;
    },

    monsters : [],

    // Functions
    onload : function(){
        this.initRows();
        this.score = 0;
        this.time = 1;
        this.hp = this.startHP;
        this.castleHP = this.startHP;
        this.shouldAttack = false;
        this.monsters = [];
        this.level = 0;
        this.isInCombat = false;
    },

    // Frame is 100 x 10
    renderFrame : function(){
        if(!this.isInProgress) return;
        // update

        //move mobs
        for(var i=this.monsters.length - 1;i >= 0;i--){
            if(this.monsters[i].x == 9 && this.monsters[i].y == this.y){
                //combat
                this.isInCombat = true;
                this.hp -= inventory.armour.reduceDamageTotal(this.monsters[i].attack);
                this.monsters[i].hp -= this.weapons[this.weapon].damage;
                //check for death of either
                if(this.monsters[i].hp <= 0){
                    this.score += this.monsters[i].points;
                    if(random.getFloat() > 0.7){
                        inventory.items['candy'].quantity++;
                        inventory.items['candy'].hasOwned = true;
                        codex.newPage(7);
                        codex.newPage(6);
                    }
                    setCharAt(this.rows[this.monsters[i].y],this.monsters[i].x,'_');
                    setCharAt(this.rows[this.monsters[i].y],this.monsters[i].x + 1,'_');
                    setCharAt(this.rows[this.monsters[i].y],this.monsters[i].x + 2,'_');
                    this.monsters.splice(i,1);
                    this.isInCombat = false;
                }
                if(this.hp <= 0){
                    this.end();
                    return;
                }
            }else if(this.monsters[i].x > 5 &&
               this.rows[this.monsters[i].y].charAt(this.monsters[i].x - 1) == '_'){
                this.monsters[i].x--;
            }else{
                this.castleHP -= this.monsters[i].attack;
                if(this.castleHP <= 0){
                    this.end();
                    return;
                }
                this.monsters.splice(i,1);
            }
        }

        //generate new mobs
        for(var i=2;i<=6;i += 2){
            if(random.getFloat() > 0.98 && this.rows[i].charAt(99) == '_' &&
                   this.rows[i].charAt(98) == '_' &&
                   this.rows[i].charAt(97) == '_'){
                // spawn a monster
                this.generateMob(i);
            }
        }
        // render
        this.rows[2] = "^-^-^";
        this.rows[3] = "| + |";
        this.rows[4] = "[   ]";
        this.rows[5] = "| + |";
        this.rows[6] = "[_n_]";

        this.rows[this.y] += "\\o/";
        if(this.shouldAttack){
            this.shouldAttack = false;
            this.rows[this.y] += "*";
        }
        var cursors = {2 : 0, 4: 0, 6: 0};
        cursors[this.y] = 3;
        for(var i=0;i<this.monsters.length;i++){
            var m = this.monsters[i];
            this.rows[m.y] += str_repeat('_',m.x - 5 - cursors[m.y]);
            cursors[m.y] = m.x - 2;
            this.rows[m.y] += m.display;
        }
        this.rows[2] += str_repeat('_',95 - cursors[2]);
        this.rows[4] += str_repeat('_',95 - cursors[4]);
        this.rows[6] += str_repeat('_',95 - cursors[6]);

        this.time++;
        if(this.time % 150 == 0 && this.level != bestiary.maxLevel){
            this.level++;
        }
        htmlInteraction.setInnerHtml('game-area',
            this.rows[0] + '\n' +
            this.rows[1] + '\n' +
            this.rows[2] + '\n' +
            this.rows[3] + '\n' +
            this.rows[4] + '\n' +
            this.rows[5] + '\n' +
            this.rows[6] + '\n' +
            this.displayRow());
    },

    displayRow : function(){
        var result = "";
        var line0 = "";
        var line1 = "";
        var line2 = "";
        line0 = "Weapon: " + this.weapons[this.weapon].name;
        line0 = pad(line0,24);
        line0 += "Castle HP: " + this.castleHP;
        line1 = "HP: " + this.hp;
        line1 = pad(line1,10);
        if(this.isInCombat){
            this.combatMessage = this.monsters[0].name + " HP: " + this.monsters[0].hp;
        }
        line1 += this.combatMessage;
        line2 = line2 + "Score: " + this.score;
        line2 = pad(line2,13);
        line2 = line2 + "Level: " + (this.level + 1);
        result = line0 + "\n" + line1 + "\n" + line2;
        return result;
    },

    goUp : function(){
        if(this.y == 2) return;
        if(this.rows[this.y - 2][5] == '_' &&
           this.rows[this.y - 2][6] == '_' &&
           this.rows[this.y - 2][7] == '_'){
            this.y = this.y - 2;
        }
    },

    goDown : function(){
        if(this.y == 6) return;
        if(this.rows[this.y + 2][5] == '_' &&
           this.rows[this.y + 2][6] == '_' &&
           this.rows[this.y + 2][7] == '_'){
            this.y = this.y + 2;
        }
    },

    play : function(){
        this.onload();
        htmlInteraction.setGameMode(true);
        inventory.refreshButtons();
        htmlInteraction.setElementVisibility('potion-buttons',true);
        htmlInteraction.setElementVisibility('drink-fire',false);
        htmlInteraction.setElementVisibility('drink-fire2',false);
        this.isInProgress = true;
        this.generateMob(4);
    },

    end : function(){
        htmlInteraction.setGameMode(false);
        htmlInteraction.setElementVisibility('potion-buttons',false);
        this.isInProgress = false;
        vending.setMessage('You won',"" + Math.ceil(this.score / 10),"coins");
        coins.setCoins(coins.owned + Math.ceil(this.score / 10));
    }
};
