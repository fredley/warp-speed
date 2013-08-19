var game4 = {

    // Variables
    startHP : 100,
    hp : 100,
    attack : 100,
    isInProgress : false,
    score : 0,
    level : 0,
    x : 0,
    y : 0,
    stance : 'rest',
    stanceTimer : 3,
    message : "",
    messageTimer : 20,
    stars : [],

    keyLeft :         37,
    keyRight :        39,
    keyBlockLow :     90,
    keyBlockHigh :    88,
    keyAttackLow :    67,
    keyAttackHigh :   86,
    keyAttackRanged : 32,

    bullets : [],

    blankRows : function(){
        return [
        " Attack High/Low : v/c                                                                              ",
        " Block  High/Low : x/z                                                                              ",
        " Ranged Attack   : space                                                                            ",
        "                                                                                                    ",
        "                                                                                                    ",
        "                                                                                                    ",
        "                                                                                                    ",
        "                                                                                                    ",
        "                                                                                                    ",
        "                                                                                                    "
    ];
    },

    bosses : {
        0 : {
            name : "The Lich King",
            width : 8,
            height : 6,
            stance : 'rest',
            actionTimer : 20,
            hypervisor : false,
            hp : 200,
            doAction : function(){
                // every 1 second, fire a ranged attack
                // that's pretty much it
                if(this.actionTimer-- == 0){
                    this.actionTimer = 20;
                    this.stance = 'ranged';
                    // create bullet
                    game4.bullets.push({
                        display : "*",
                        dx : -1,
                        x : this.x - 1,
                        damage : 150,
                        y : 8
                    });
                }else{
                    this.stance = 'rest';
                }
            },
            damageRanged : function(d){
                game4.message = "Your spell has no effect on the Lich King!";
            },
            damageMelee : function(d,high){
                this.hp -= d;
                this.checkDeath();
            },
            checkDeath : function(){
                if(this.hp < 0){
                    if(!this.hypervisor){
                        game4.end(true);
                    }
                }
            },
            x : 90,
            stance_rest : [
                " x",
                " |",
                " +. ö ",
                " | `#'\\",
                "   / \\^",
                "   d b"
            ],
            stance_ranged : [
                "",
                "",
                "    ö ",
                "   /#'\\",
                "x-+/ \\^-",
                "   d b"
            ]
        },
        1 : {
            name : "The Candy Merchant",
            width : 8,
            height : 6,
            stance : 'rest',
            actionTimer : 20,
            quoted : false,
            damage : 50,
            hypervisor : false,
            hp : 300,
            doAction : function(){
                if(!this.quoted){
                    this.quoted = true;
                    game4.message = "I LOVE CAAANDDYYYYYYYYYY!";
                }
                if(random.getFloat() < 0.4 && this.x > 4 && this.x - 4 != game4.x){
                    this.x--;
                }
                if(this.actionTimer-- == 0){
                    if(this.x - 4 == game4.x){
                        //Melee
                        this.actionTimer = 5;
                        this.stance = 'attack_high';
                        game4.damageMelee(this.damage,true);
                    }else{
                        this.actionTimer = 20;
                        this.stance = 'ranged';
                        // create bullet
                        game4.bullets.push({
                            display : "c",
                            dx : -1,
                            x : this.x - 1,
                            damage : 250,
                            y : 8
                        });
                    }
                }else{
                    this.stance = 'rest';
                }
                // block incoming missiles
                if(this.stance == 'rest'){
                    for(var i=0;i<game4.bullets.length;i++){
                        if(game4.bullets[i].dx > 0 && this.x - game4.bullets[i].x < 3){
                            this.stance = 'block_high';
                        }
                    }
                }
            },
            damageRanged : function(d){
                if(this.stance == 'block_high'){
                    this.hp -= Math.floor(d/10);
                }else{
                    this.hp -= Math.floor(d/2);
                }
                this.checkDeath();
            },
            damageMelee : function(d,high){
                this.message = "Your weapon cannot penetrate the Merchant's thick Candy Plate!";
            },
            checkDeath : function(){
                if(this.hp < 0){
                    if(!this.hypervisor){
                        game4.end(true);
                    }
                }
            },
            x : 90,
            stance_rest : [
                "     ",
                " c  <span style='text-decoration:underline;'>n</span>" ,
                " l. o ",
                "   `c'\\",
                "   / \\)",
                "   n n"
            ],
            stance_attack_high : [
                "     ",
                "    <span style='text-decoration:underline;'>n</span>" ,
                "    o ",
                "   /c'\\",
                "*-`/ \\)",
                "   n n"
            ],
            stance_ranged : [
                "",
                "    <span style='text-decoration:underline;'>n</span>",
                "    o ",
                "   /c'\\",
                "u-`/ \\)",
                "   n n"
            ],
            stance_block_high : [
                "",
                "    <span style='text-decoration:underline;'>n</span>",
                "    o  c",
                "   /c'-l",
                "  (/ \\",
                "   n n"
            ]
        },
        2 : {
            name : "The Lollipop Farmer",
            width : 8,
            height : 6,
            stance : 'rest',
            actionTimer : 20,
            lollipopTimer : 50,
            quoted : false,
            damage : 100,
            hypervisor : false,
            hp : 200,
            doAction : function(){
                if(!this.quoted){
                    this.quoted = true;
                    game4.message = "Better get me quick, I'm getting stronger!";
                }
                if(random.getFloat() < 0.4 && this.x > 4 && this.x - 4 != game4.x){
                    this.x--;
                }
                if(this.lollipopTimer-- == 0){
                    this.lollipopTimer = 50;
                    game4.message = "I just harvested some lollipops!";
                    this.hp = this.hp * 2;
                    this.damage = this.damage * 2;
                }
                if(this.actionTimer-- == 0){
                    if(this.x - 4 == game4.x){
                        //Melee
                        this.actionTimer = 5;
                        this.stance = 'attack_high';
                        game4.damageMelee(this.damage,true);
                    }else{
                        this.actionTimer = 20;
                        this.stance = 'ranged';
                        // create bullet
                        game4.bullets.push({
                            display : "l",
                            dx : -1,
                            x : this.x - 1,
                            damage : this.damage,
                            y : 8
                        });
                    }
                }else{
                    this.stance = 'rest';
                }
                // block incoming missiles
                if(this.stance == 'rest'){
                    for(var i=0;i<game4.bullets.length;i++){
                        if(game4.bullets[i].dx > 0 && this.x - game4.bullets[i].x < 3){
                            this.stance = 'block_high';
                        }
                    }
                }
            },
            damageRanged : function(d){
                if(this.stance == 'block_high'){
                    this.hp -= Math.floor(d/10);
                    this.checkDeath();
                }else{
                    this.hp -= Math.floor(d/2);
                    this.checkDeath();
                }
            },
            damageMelee : function(d,high){
                if(this.stance == 'block_high' && high){
                    this.hp -= Math.floor(d/10);
                }else{
                    this.hp -= d;
                }
                this.checkDeath();
            },
            checkDeath : function(){
                if(this.hp < 0){
                    if(!this.hypervisor){
                        game4.end(true);
                    }
                }
            },
            x : 90,
            stance_rest : [
                " u   ",
                " l  L" ,
                " l. o ",
                " l `L'\\",
                "   / \\)",
                "   l l"
            ],
            stance_attack_high : [
                "     ",
                "    L" ,
                "    o ",
                "   /L'\\",
                "*-`/ \\)",
                "   l l"
            ],
            stance_ranged : [
                "",
                "    L",
                "    o ",
                "   /L'\\",
                "c-`/ \\)",
                "   l l"
            ],
            stance_block_high : [
                "",
                "    L  u",
                "    o  l",
                "   /L'-l",
                "  (/ \\",
                "   l l"
            ]
        },
        3 : {
            name : "kalina",
            width : 8,
            height : 4,
            stance : 'rest',
            quoteTimer : 50,
            damage : 150,
            hypervisor : false,
            hp : 800,
            doAction : function(){
                if(this.quoteTimer-- == 0){
                    this.quoteTimer = 50;
                    game4.message = random.pick([
                        "I will set fire to you!",
                        "Burn burn burn burn!",
                        "Die in a fire!",
                        "I feed of spite and tears and FIRE.",
                        "Fire. Fire fire fire. Fire.",
                        "Whoever did that will be set on fire.",
                        "Fire solves everything..."
                    ]);
                }
                if(this.x > 4){
                    if(this.x - 4 == game4.x){
                        game4.x --;
                    }
                    this.x--;
                }
                if(this.x - 4 == game4.x){
                    //Melee
                    this.actionTimer = 5;
                    this.stance = 'attack_high';
                    game4.damageMelee(this.damage,true);
                }else{
                    this.stance = 'rest';
                }
                // block incoming missiles
                if(this.stance == 'rest'){
                    for(var i=0;i<game4.bullets.length;i++){
                        if(game4.bullets[i].dx > 0 && this.x - game4.bullets[i].x < 3){
                            this.stance = 'block_high';
                        }
                    }
                    if(random.getFloat() < 0.5){
                        this.stance = 'rest_2';
                    }
                }
            },
            damageRanged : function(d){
                if(this.stance == 'block_high'){
                    this.hp -= Math.floor(d/10);
                }else{
                    this.hp -= d;
                }
                this.checkDeath();
            },
            damageMelee : function(d,high){
                if(this.stance == 'block_high' && high){
                    this.hp -= Math.floor(d/10);
                }else{
                    this.hp -= d;
                }
                this.checkDeath();
            },
            checkDeath : function(){
                if(this.hp < 0){
                    if(!this.hypervisor){
                        game4.end(true);
                    }
                }
            },
            x : 90,
            stance_rest_2 : [
                "@" ,
                "|. o ",
                "| `K'\\",
                "  / \\"
            ],
            stance_rest : [
                "#" ,
                "|. o ",
                "| `K'\\",
                "  / \\"
            ],
            stance_attack_high : [
                "" ,
                "   o ",
                "#--K'\\",
                "  / \\"
            ],
            stance_block_high : [
                "",
                "   o",
                " (/K'--#",
                "  / \\"
            ]
        },
        4 : {
            name : "The Black Dragon",
            width : 16,
            height : 4,
            stance : 'rest',
            attackTimer : 50,
            meleeTimer : 5,
            damage : 1000,
            x : 80,
            hypervisor : false,
            doAction : function(){
                if(this.x - 4 == game4.x && this.meleeTimer-- == 0){
                    //Melee
                    this.meleeTimer = 5;
                    this.stance = 'attack_high';
                    game4.damageMelee(this.damage,true);
                }else{
                    this.stance = 'rest';
                }
                this.attackTimer--;
                switch(this.attackTimer){
                    case 0:
                        this.attackTimer = 50;
                        break;
                    case 1:
                    case 2:
                    case 11:
                    case 12:
                        this.attack('high');
                        break;
                    case 3:
                    case 4:
                    case 5:
                        this.stance = 'attack_high';
                        break;
                    case 6:
                    case 7:
                        this.attack('low');
                        break;
                    case 8:
                    case 9:
                    case 10:
                        this.stance = 'attack_low';
                        break;
                }
            },
            attack : function(height){
                this.stance = 'attack_'+height;
                if(height == 'high'){
                    var y = 8;
                }else{
                    var y = 9;
                }
                game4.bullets.push({
                    display : "~",
                    dx : -1,
                    x : this.x - 1,
                    damage : 100,
                    y : y
                });

            },
            damageRanged : function(d){
                if(this.stance == 'attack_high'){
                    this.hp -= d;
                    this.checkDeath();
                }else{
                    game4.message = "Your spell bounces off the dragon's thick hide."
                }
            },
            damageMelee : function(d,high){
                    game4.message = "You cannot pierce the dragon's thick hide."
            },
            checkDeath : function(){
                if(this.hp < 0){
                    if(!this.hypervisor){
                        game4.end(true);
                    }
                }
            },
            stance_rest : [
                "_a' /(   <. ",
                "-`\\ \\(  _  )",
                "   \\(,_(,)' ",
                "  ._>, _>,"
            ],
            stance_attack_high : [
                "     /(      .>",
                "_a'- \\(  _  (",
                "_} _  \\(,_(,)'",
                "  ._>, _>,"
            ],
            stance_attack_low : [
                "     /(      .>",
                "   _ \\(  _  (",
                "_a'_  \\(,_(,)'",
                "_} ._>, _>,"
            ],
            hp : 2000
        },
        5 : {
            name : "The Developper",
            // Pretty standard boss fight, but keys are munged...
            width : 4,
            height : 3,
            stance : 'rest',
            actionTimer : 10,
            quoted : false,
            damage : 100,
            hypervisor : false,
            x : 90,
            hp : 500,
            doAction : function(){
                if(!this.quoted){
                    this.quoted = true;
                    game4.message = "The developer has munged your keyboard!";
                }
                if(random.getFloat() < 0.4 && this.x > 4 && this.x - 4 != game4.x){
                    this.x--;
                }
                if(this.actionTimer-- == 0){
                    if(this.x - 4 == game4.x){
                        //Melee
                        this.actionTimer = 5;
                        this.stance = random.pick(['attack_high','attack_low']);
                        game4.damageMelee(this.damage,this.stance == 'attack_high');
                    }else{
                        this.actionTimer = 20;
                        this.stance = random.pick(['ranged_high','ranged_low']);
                        // create bullet
                        game4.bullets.push({
                            display : "#",
                            dx : -1,
                            x : this.x - 1,
                            damage : this.damage,
                            y : (this.stance == 'ranged_high') ? 8 : 9
                        });
                    }
                }else{
                    this.stance = 'rest';
                }
                // block incoming missiles
                if(this.stance == 'rest'){
                    for(var i=0;i<game4.bullets.length;i++){
                        if(game4.bullets[i].dx > 0 && this.x - game4.bullets[i].x < 3){
                            this.stance = 'block_high';
                        }
                    }
                }
            },
            damageRanged : function(d){
                if(this.stance == 'block_high'){
                    this.hp -= Math.floor(d/10);
                }else{
                    this.hp -= d;
                }
                this.checkDeath();
            },
            damageMelee : function(d,high){
                if(this.stance == 'block_high' && high){
                    this.hp -= Math.floor(d/10);
                    this.checkDeath();
                }else{
                    this.hp -= d;
                    this.checkDeath();
                }
            },
            checkDeath : function(){
                if(this.hp < 0){
                    if(!this.hypervisor){
                        game4.end(true);
                    }                }
            },
            stance_rest : [
                "  o ",
                " /D\\",
                " / \\"
            ],
            stance_attack_low : [
                "  o ",
                " /D",
                "*/ \\"
            ],
            stance_attack_high : [
                "  o ",
                "*-D",
                " / \\"
            ],
            stance_ranged_high : [
                "  o ",
                " >D",
                " / \\"
            ],
            stance_ranged_low : [
                "  o ",
                " >D",
                " / \\"
            ],
            stance_block_high : [
                "  o",
                "(-D",
                " / \\"
            ],
            stance_block_low : [
                "  o",
                " /D",
                "(/ \\"
            ]
        },
        6 : {
            name : "The Game",
            width : 9,
            height : 7,
            stance : 'rest',
            damage : 1000,
            missileTimer : 100,
            x : 90,
            hp : 1,
            doAction : function(){
                if(this.missileTimer-- == 0){
                    this.missileTimer = 3;
                    game4.bullets.push({
                        display : "<",
                        dx : -1,
                        x : this.x - 1,
                        damage : 10000000000000000,
                        y : 7
                    });
                }
            },
            damageRanged : function(d){
                game4.message = "Maybe a different combination is required?"
            },
            damageMelee : function(d,high){
                game4.message = "You cannot damage the game that way."
            },
            checkDeath : function(){
                // Kan't work
                // out how to
                // nerf this level?
                // After you see it, your
                // mind will become
                // irridescantly clear.
            },
            stance_rest : [
                "+-------+",
                "| Space |",
                "|  Race |",
                "|       |",
                "|  \\o/  |",
                "|       |",
                "+-------+"
            ]
        },
        7 : {
            // This level works a little differently...
            name : "The Universe",
            hp : "infinite?"
        },
        8 : {
            name : "Everything",
            // every creature from the bestiary, followed by every boss...
            type : 'bestiary',
            mobIndex : 4,
            submobIndex : 3,
            mob : 0,
            height : 1,
            width : 3,
            stance : 'rest',
            stance_rest : [],
            hp : 1,

            doAction : function(){
                if(this.type == 'bestiary'){
                    if(this.mob == 0){
                        //initialize first mob
                        this.getFromBestiary();
                    }
                    if(this.x - 4 != game4.x){
                        this.x--;
                    }else{
                        game4.damageMelee(this.mob.attack);
                    }
                }else{
                    if(this.mobIndex != 7){
                    this.mob.doAction();
                    this.stance = this.mob.stance;
                    this.hp = this.mob.hp;
                    this.x = this.mob.x;
                    }
                }
            },

            damageRanged : function(d){
                if(this.type == 'bestiary'){
                    this.hp -= d;
                    this.checkDeath();
                }else{
                    this.mob.damageRanged(d);
                    this.hp = this.mob.hp;
                    this.checkDeath();
                }
            },
            damageMelee : function(d,high){
                if(this.type == 'bestiary'){
                    this.hp -= d;
                    this.checkDeath();
                }else{
                    this.mob.damageMelee(d,high);
                    this.hp = this.mob.hp;
                    this.checkDeath();
                }
            },

            checkDeath : function(){
                if(this.type == 'bestiary'){
                    if(this.hp <= 0){
                        //get next
                        if (!this.getNextFromBestiary()){
                            this.type = 'boss';
                            this.mobIndex = 0;
                            this.getBoss();
                        }
                    }
                }else{
                    if(this.mob.hp <= 0){
                        this.getBoss(++this.mobIndex);
                    }
                }
            },

            getBoss : function(){
                if(this.mobIndex == 7){
                    console.log('star time');
                    game4.generateStars();
                }
                this.mob = clone(game4.bosses[this.mobIndex]);
                this.mob.hypervisor = true;
                this.x = this.mob.x;
                this.hp = this.mob.hp;
                this.width = this.mob.width;
                this.height = this.mob.height;
                var stances = ['rest','attack_high','attack_low','block_high','block_low','ranged','ranged_high','ranged_low'];
                for(var stance in stances){
                    if(typeof this.mob['stance_'+stances[stance]] != 'undefined'){
                        this['stance_'+stances[stance]] = this.mob['stance_'+stances[stance]];
                    }else{
                        this['stance_'+stance] = undefined;
                    }
                }
                if(game4.x + 4 > this.x){
                    game4.x -= game4.x + 4 - this.x;
                }
            },

            getNextFromBestiary : function(){
                this.submobIndex++;
                if(!(this.submobIndex in bestiary[this.mobIndex])){
                    this.mobIndex++;
                    this.submobIndex = 0;
                    if(this.mobIndex > bestiary.maxLevel - 1){
                        return false;
                    }
                }
                this.getFromBestiary();
                return true;
            },

            getFromBestiary : function(){
                this.mob = clone(bestiary[this.mobIndex][this.submobIndex]);
                this.x = 97;
                this.hp = this.mob.hp;
                this.stance_rest = [this.mob.display];
            }

        }
    },

    boss : {},

    generateStars : function(){
        for(var i=0;i<100;i++){
            this.stars.push({
                x : 4 + random.getRandomIntUpTo(95),
                y : random.getRandomIntUpTo(7) + 2,
                display : random.pick(['x','.','.','+','.'])
            });
        }
    },

    // Functions
    onload : function(){
        this.score = 0;
        this.hp = this.startHP;
        this.setBoss(this.level);
        this.x = 0;
        this.y=0;
        this.stance = 'rest';
        this.stanceTimer = 3;
        this.bullets = [];
        this.messageTimer = 20;
        this.message = "";
        if(this.level == 7){
            //generate stars!
            this.generateStars();
        }
        this.setCodes(this.level == 5);
        htmlInteraction.setElementVisibility('potion-buttons',true);
        inventory.refreshButtons();
    },

    setCodes : function(random){
        var codes = [37,38,39,40];
        for(var i=48;i<91;i++){
            codes.push(i);
        }
        this.keyLeft =         (random) ? random.removeRandom(codes) : 37;
        this.keyRight =        (random) ? random.removeRandom(codes) : 39;
        this.keyBlockLow =     (random) ? random.removeRandom(codes) : 90;
        this.keyBlockHigh =    (random) ? random.removeRandom(codes) : 88;
        this.keyAttackLow =    (random) ? random.removeRandom(codes) : 67;
        this.keyAttackHigh =   (random) ? random.removeRandom(codes) : 86;
        this.keyAttackRanged = (random) ? random.removeRandom(codes) : 32;
    },

    checkDeath : function(){
        if(this.hp < 0){
            this.end(false);
        }
    },

    setBoss : function(i){
        this.boss = clone(this.bosses[i]);
        this.boss.stance = 'rest';
    },

    goLeft : function(){
        if (this.x > 0) this.x--;
    },

    goRight : function(){
        if(this.level == 7 || this.level == 8 && this.boss.mobIndex == 7){
            if (this.x < 96) this.x++;
        }else{
            if (this.x + 4 < this.boss.x) this.x++;
        }
    },
    goUp : function(){
        if(this.level == 7 || this.level == 8 && this.boss.mobIndex == 7){
            if (this.y < 7) this.y++;
        }
    },

    goDown : function(){
        if(this.level == 7 || this.level == 8 && this.boss.mobIndex == 7){
            if (this.y > 0) this.y--;
        }
    },

    attackStar : function(x,y){
        for(var i=this.stars.length-1;i>=0;i--){
            if(this.stars[i].y == y && this.stars[i].x == x){
                console.log('boom');
                this.stars.splice(i,1);
                if(this.stars.length == 0){
                    if(this.level == 8){
                        this.end(true);
                        ending.play();
                    }else{
                        this.end(true);
                    }
                }
                break;
            }
        }
    },
    attackHigh : function(){
        if(this.stanceTimer == 3){
            this.stance = 'attack_high';
            if(this.level == 7 || this.level == 8 && this.boss.mobIndex == 7){
                // if there's a star in front of player, remove it
                this.attackStar(this.x + 4, 8 - this.y);
            }
            if(this.x + 4 == this.boss.x){
                this.boss.damageMelee(game3.weapons[game3.weapon].damage,true);
            }
        }
    },

    attackLow : function(){
        if(this.stanceTimer == 3){
            this.stance = 'attack_low';
            if(this.level == 7 || this.level == 8 && this.boss.mobIndex == 7){
                // if there's a star in front of player, remove it
                this.attackStar(this.x + 4, 9 - this.y);
            }
            if(this.x + 4 == this.boss.x){
                this.boss.damageMelee(game3.weapons[game3.weapon].damage,false);
            }
        }
    },

    blockHigh : function(){
        this.stance = 'block_high';
    },

    blockLow : function(){
        this.stance = 'block_low';
    },
    attackRanged : function(){
        if(this.level == 7 || this.level == 8 && this.boss.mobIndex == 7){
            this.message = "Your spell doesn't work in space, it rebounds and hits you.";
            this.damageMelee(this.attack,true);
            return;
        }
        if(this.stanceTimer == 3){
            this.stance = 'ranged';
            game4.bullets.push({
                display : "*",
                dx : 1,
                x : this.x + 1,
                damage : this.attack,
                y : 8
            });
        }
    },

    damageMelee : function(damage,high){
        if(high){
            blocked = this.stance == 'stance_block_high';
        }else{
            blocked = this.stance == 'stance_block_low';
        }
        if(blocked){
            this.hp -= inventory.armour.reduceDamage(Math.ceil(damage/10),high);
        }else{
            this.hp -= inventory.armour.reduceDamage(damage,high);
        }
        this.checkDeath();
    },

    // Frame is 100 x 10
    renderFrame : function(){
        if(!this.isInProgress) return;
        var rows = this.blankRows();

        if(this.level == 7 || this.level == 8 && this.boss.mobIndex == 7){
            rows[0] = pad(' ',100);
            rows[1] = pad(' ',100);
            rows[2] = pad(' ',100);
            rows[3] = pad(' ',100);
            for(var i=this.stars.length-1;i>=0;i--){
                rows[this.stars[i].y] = setCharAt(rows[this.stars[i].y],this.stars[i].x,this.stars[i].display);
            }

            if(this.stance != 'rest'){
                if(this.stanceTimer-- == 0){
                    this.stanceTimer = 3;
                    this.stance = 'rest';
                }
            }
        }else{
            // bullets
            for(var i=this.bullets.length - 1;i>=0;i--){
                rows[this.bullets[i].y] = setCharsAt(rows[this.bullets[i].y],this.bullets[i].x,this.bullets[i].display);
                if(this.bullets[i].dx < 0 && this.bullets[i].x < this.x+4){
                    // check y value for block
                    if((this.bullets[i].y == 8 && this.stance == 'block_high') ||
                       (this.bullets[i].y == 9 && this.stance == 'block_low')){
                        //blocked
                        this.hp -= inventory.armour.reduceDamage(Math.ceil(this.bullets[i].damage / 10),this.bullets[i].y == 8);
                    }else{
                        this.hp -= inventory.armour.reduceDamage(this.bullets[i].damage,this.bullets[i].y == 8);
                    }
                    if(this.hp <= 0){
                        this.end(false);
                        return;
                    }
                    this.bullets.splice(i,1);
                    continue;
                }
                if(this.bullets[i].dx > 0 && this.bullets[i].x > this.boss.x -1){
                    this.boss.damageRanged(this.bullets[i].damage);
                    this.bullets.splice(i,1);
                    continue;
                }
                this.bullets[i].x += this.bullets[i].dx;
            }

            this.boss.doAction();

            if(this.stance != 'rest'){
                if(this.stanceTimer-- == 0){
                    this.stanceTimer = 3;
                    this.stance = 'rest';
                }
            }

            //render boss
            for(var i=10 - this.boss.height;i<10;i++){
                rows[i] = setCharsAt(rows[i],this.boss.x,this.boss['stance_'+this.boss.stance][i - (10 - this.boss.height)]);
            }
        }

        //render player
        rows[7 - this.y] = setCharsAt(rows[7 - this.y],this.x,this['stance_'+this.stance][0]);
        rows[8 - this.y] = setCharsAt(rows[8 - this.y],this.x,this['stance_'+this.stance][1]);
        rows[9 - this.y] = setCharsAt(rows[9 - this.y],this.x,this['stance_'+this.stance][2]);

        htmlInteraction.setInnerHtml('game-area',
            rows[0] + '\n' +
            rows[1] + '\n' +
            rows[2] + '\n' +
            rows[3] + '\n' +
            rows[4] + '\n' +
            rows[5] + '\n' +
            rows[6] + '\n' +
            rows[7] + '\n' +
            rows[8] + '\n' +
            rows[9] + '\n' +
            this.displayRow());

    },

    displayRow : function(){
        var result = "";
        var line1 = "";
        var line2 = "";
        line1 += "HP: " + this.hp;
        line1 = pad(line1,50);
        line1 += this.boss.name + " HP: " + this.boss.hp;
        result = line1 + "\n" + line2 + "\n   ";
        if(this.message != ""){
            if(this.messageTimer-- > 0){
                result += this.message;
            }else{
                this.messageTimer = 20;
                this.message = "";
            }
        }
        return result;
    },

    play : function(){
        this.onload();
        htmlInteraction.setGameMode(true);
        inventory.refreshButtons();
        htmlInteraction.setElementVisibility('potion-buttons',true);
        this.isInProgress = true;
    },

    end : function(won){
        htmlInteraction.setGameMode(false);
        htmlInteraction.setElementVisibility('potion-buttons',false);
        this.isInProgress = false;
        if(won){
            vending.setMessage('You beat',this.boss.name + ' ','a new challenger awaits');
            this.level++;
        }else{
            vending.setMessage('You lost :(');
        }
        coins.setCoins(coins.owned + Math.ceil(this.score / 10));
    },
    stance_rest : [
        " o  ",
        "/|\\ ",
        "/ \\ "
    ],
    stance_ranged : [
        " o  ",
        " |< ",
        "/ \\"
    ],
    stance_attack_high : [
        " o  ",
        " |-*",
        "/ \\ "
    ],
    stance_block_high : [
        " o  ",
        " |-)",
        "/ \\ "
    ],
    stance_attack_low : [
        " o  ",
        " |\\ ",
        "/ \\*"
    ],
    stance_block_low : [
        " o  ",
        " |\\ ",
        "/ \\)"
    ],
    stance_victory : [
        " o  ",
        "\\|/ ",
        "/ \\ "
    ]
};
