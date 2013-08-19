var codex = {
    currPage : 0,
    hasNewPage : false,
    blinkState : false,

    ownedPages : [0,1,2,3,4],

    pages : {
        0 : {
            recipe:"         ",
            title:"Dust",
            desc1:"Dust is a common     ",
            desc2:"crafting material. It",
            desc3:"is obtained from     ",
            desc4:"asteroids, and 9 dust",
            desc5:"can be crafted into  ",
            desc6:"ingots.              ",
            desc7:"                     "
        },
        1 : {
            recipe:"ddddddddd",
            title:"Ingots",
            desc1:"Ingots are crafted   ",
            desc2:"from 9 dust. They are",
            desc3:"a crucial component  ",
            desc4:"in many larger       ",
            desc5:"machines.            ",
            desc6:"                     ",
            desc7:"                     "
        },
        2 : {
            recipe:"         ",
            title:"Coins",
            desc1:"What are coins? Why  ",
            desc2:"do we want them? Who ",
            desc3:"knows? Maybe they can",
            desc4:"be crafted? This will",
            desc5:"require more         ",
            desc6:"research...          ",
            desc7:"                     "
        },
        3 : {
            recipe:"         ",
            title:"Bricks",
            desc1:"Bricks can be found  ",
            desc2:"in the brick breaker ",
            desc3:"game, but you already",
            desc4:"knew that. 9 bricks  ",
            desc5:"make a dense block,  ",
            desc6:"which could be       ",
            desc7:"useful.              "
        },
        4 : {
            recipe:"bbbbbbbbb",
            title:"Block",
            desc1:"Blocks are made from ",
            desc2:"9 bricks. They are   ",
            desc3:"extremely heavy, so  ",
            desc4:"placing three blocks ",
            desc5:"above six ingots can ",
            desc6:"craft a coin.        ",
            desc7:"                     "
        },
        5 : {
            recipe:"iiiiBiiii",
            title:"Coinifyer",
            desc1:"This simple device   ",
            desc2:"will increase how    ",
            desc3:"often you earn a     ",
            desc4:"coin. Most of the    ",
            desc5:"time...              ",
            desc6:"                     ",
            desc7:"                     "
        },
        6 : {
            recipe:"         ",
            title:"Candy",
            desc1:"Delicious Candy! Get ",
            desc2:"this delicious treat ",
            desc3:"in the Candy Crusade.",
            desc4:"Candy can be used to ",
            desc5:"craft a variety of   ",
            desc6:"game-enhancing       ",
            desc7:"objects.             "
        },
        7 : {
            recipe:" c  c  c ",
            title:"Lollipop",
            desc1:"Lollipops are a core ",
            desc2:"ingredient in        ",
            desc3:"advanced weaponry.   ",
            desc4:"                     ",
            desc5:"                     ",
            desc6:"                     ",
            desc7:"                     "
        },
        8 : {
            recipe:" l  c    ",
            title:"Dagger",
            desc1:"This will give you   ",
            desc2:"the edge you need in ",
            desc3:"Candy Crusade.       ",
            desc4:"                     ",
            desc5:"                     ",
            desc6:"                     ",
            desc7:"                     "
        },
        9 : {
            recipe:" l  l  c ",
            title:"Sword",
            desc1:"This will give you   ",
            desc2:"some extra power in  ",
            desc3:"Candy Crusade.       ",
            desc4:"                     ",
            desc5:"                     ",
            desc6:"                     ",
            desc7:"                     "
        },
        10 : {
            recipe:"ll  l  c ",
            title:"Axe",
            desc1:"Swords are for wimps.",
            desc2:"Real Candy Crusaders ",
            desc3:"weild mighty axes.   ",
            desc4:"                     ",
            desc5:"                     ",
            desc6:"                     ",
            desc7:"                     "
        },
        11 : {
            recipe:"llllll c ",
            title:"Flail",
            desc1:"Want to really bring ",
            desc2:"those candy monsters ",
            desc3:"to justice? It's     ",
            desc4:"flail time.          ",
            desc5:"                     ",
            desc6:"                     ",
            desc7:"                     "
        },
        12 : {
            recipe:"llllBllll",
            title:"Gobstopper",
            desc1:"Recent advances from ",
            desc2:"the world's premier  ",
            desc3:"candy laboratories   ",
            desc4:"has yielded this     ",
            desc5:"hard, durable        ",
            desc6:"material.            ",
            desc7:"                     "
        },
        13 : {
            recipe:"lGllGl c ",
            title:"Mace",
            desc1:"The last(?) word in  ",
            desc2:"candy-based armaments",
            desc3:"                     ",
            desc4:"                     ",
            desc5:"                     ",
            desc6:"                     ",
            desc7:"                     "
        },
        14 : {
            recipe:"CCCCGCCCC",
            title:"Time Warp",
            desc1:"Not for the faint of ",
            desc2:"heart, this will     ",
            desc3:"accelerate your quest",
            desc4:"for whatever it is   ",
            desc5:"you think you're     ",
            desc6:"questing for...      ",
            desc7:"                     "
        },
        15 : {
            recipe:"lll  c   ",
            title:"Key",
            desc1:"This lollipop key    ",
            desc2:"looks handy, I wonder",
            desc3:"what it opens?       ",
            desc4:"                     ",
            desc5:"                     ",
            desc6:"                     ",
            desc7:"                     "
        },
        16 : {
            recipe:"CCCCCCCCC",
            title:"Plating",
            desc1:"Compressed coins form",
            desc2:"a nice shiny plate,  ",
            desc3:"perfect for forming  ",
            desc4:"armour.              ",
            desc5:"                     ",
            desc6:"                     ",
            desc7:"                     "
        },
        17 : {
            recipe:"PPPP P   ",
            title:"Helmet",
            desc1:"A nice shiny helmet, ",
            desc2:"made from nice shiny ",
            desc3:"armour plating.      ",
            desc4:"Shiny.               ",
            desc5:"                     ",
            desc6:"                     ",
            desc7:"                     "
        },
        18 : {
            recipe:"P PPPPPPP",
            title:"Breastplate",
            desc1:"The perfect centre-  ",
            desc2:"piece to your growing",
            desc3:"armour collection.   ",
            desc4:"                     ",
            desc5:"                     ",
            desc6:"                     ",
            desc7:"                     "
        },
        19 : {
            recipe:"PPPP PP P",
            title:"Leggings",
            desc1:"Not those type of    ",
            desc2:"leggings, these will ",
            desc3:"protect you from all ",
            desc4:"manner of lower-body ",
            desc5:"based attacks.       ",
            desc6:"                     ",
            desc7:"                     "
        },
        20 : {
            recipe:"   P PP P",
            title:"Boots",
            desc1:"Think protecting your",
            desc2:"feet is unimportant? ",
            desc3:"Tell it to Marcus the",
            desc4:"Boast, who died of a ",
            desc5:"stubbed toe in       ",
            desc6:"battle.              ",
            desc7:"                     "
        },
        21 : {
            recipe: "PPPPBPPPP",
            title:"Hard-Plate",
            desc1:"Harder armour        ",
            desc2:"plating, for the     ",
            desc3:"harder adventurer.   ",
            desc4:"                     ",
            desc5:"                     ",
            desc6:"                     ",
            desc7:"                     "

        },
        22 : {
            recipe:"HHHH H   ",
            title:"Helmet",
            desc1:"A shinier, harder    ",
            desc2:"helmet. Everything's ",
            desc3:"better with more     ",
            desc4:"shine.               ",
            desc5:"                     ",
            desc6:"                     ",
            desc7:"                     "
        },
        23 : {
            recipe:"H HHHHHHH",
            title:"Breastplate",
            desc1:"Your vital organs    ",
            desc2:"deserve the luxury   ",
            desc3:"and comfort of a     ",
            desc4:"hardened, aged and   ",
            desc5:"individually numbered",
            desc6:"limited edition hard ",
            desc7:"breastplate.         "
        },
        24 : {
            recipe:"HHHH HH H",
            title:"Leggings",
            desc1:"With carefully       ",
            desc2:"engineered joints    ",
            desc3:"for smoother         ",
            desc4:"movement.            ",
            desc5:"                     ",
            desc6:"                     ",
            desc7:"                     "
        },
        25 : {
            recipe:"   H HH H",
            title:"Boots",
            desc1:"Feel that? That's    ",
            desc2:"the feeling of       ",
            desc3:"specially reinforced ",
            desc4:"toe-caps.            ",
            desc5:"                     ",
            desc6:"                     ",
            desc7:"                     "
        },
        26 : {
            recipe:"ppppppppp",
            title:"Tonics",
            desc1:"Normal strength      ",
            desc2:"potions not enough   ",
            desc3:"for you? Upgrade your",
            desc4:"potency with tonics, ",
            desc5:"just add nine of any ",
            desc6:"potion. Requires     ",
            desc7:"boiling.             "
        }
    },

    onload : function(){
        this.currPage = 0;
        this.ownedPages = [0,1,2,3,4];
        this.setPage(0);
        this.hasNewPage = false;
    },

    blink : function(){
        if(!this.hasNewPage) return;
        if(this.blinkState){
            htmlInteraction.setInnerHtml('codex-banner','CRAFTING CODEX');
        }else{
            htmlInteraction.setInnerHtml('codex-banner','   NEW PAGE   ');
        }
        this.blinkState = !this.blinkState;
    },

    newPage : function(n){
        if(this.ownedPages.indexOf(n) >= 0) return;
        this.ownedPages.push(n);
        this.hasNewPage = true;
    },

    hasPage : function(n){
        return (this.ownedPages.indexOf(n) >= 0);
    },

    setPage : function(increment){
        this.hasNewPage = false;
        htmlInteraction.setInnerHtml('codex-banner','CRAFTING CODEX');
        if(increment == 1 && this.ownedPages.indexOf(this.currPage) == this.ownedPages.length -1){
            this.currPage = 0;
        }else if (increment == -1 && this.ownedPages.indexOf(this.currPage) == 0){
            this.currPage = this.ownedPages[this.ownedPages.length - 1];
        }else{
            this.currPage = this.ownedPages[this.ownedPages.indexOf(this.currPage) + increment];
        }
        var page = this.pages[this.currPage];
        htmlInteraction.setInnerHtml('codex-title',pad_both(page.title,10));
        htmlInteraction.setInnerHtml('codex-desc-1',page.desc1);
        htmlInteraction.setInnerHtml('codex-desc-2',page.desc2);
        htmlInteraction.setInnerHtml('codex-desc-3',page.desc3);
        htmlInteraction.setInnerHtml('codex-desc-4',page.desc4);
        htmlInteraction.setInnerHtml('codex-desc-5',page.desc5);
        htmlInteraction.setInnerHtml('codex-desc-6',page.desc6);
        htmlInteraction.setInnerHtml('codex-desc-7',page.desc7);
        for(var i=1;i<10;i++){
            htmlInteraction.setInnerHtml('codex-craft-' + i,page.recipe.charAt(i - 1));
        }
    },

    prevPage : function(){
        this.setPage(-1);
    },

    nextPage : function(){
        this.setPage(+1);
    }
};
