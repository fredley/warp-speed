var lab = {
	flame_frames : 5,
	flame_frame : 0,
	is_boiling : false,
	added_boiling : false,
	bubbleChance : 0.02,

	bottles : [
[" H ",
 "(_)"],
[" v ",
 "(_)"],
[" ][ ",
 "/__\\"],
[" )( ",
 "/__\\"],
[" )( ",
 "(__)"],
[" )=( ",
 "(___)"],
[" O ",
 "[_]"],
[" M ",
 "{_}"],
[" ][ ",
 "|__|"],
[" }{ ",
 "(__)"],
[" * ",
 "{_}"],
[" )v( ",
 "|___|"]
	],

    flames : [
[
"                ",
"                ",
"                ",
"                ",
"         .      ",
"     . @@       ",
"      @#@@      ",
"      }__{      "
],
[
"                ",
"                ",
"                ",
"                ",
"    .    `      ",
"      (@#       ",
"      @@@@.     ",
"      }__{      "
],
[
"                ",
"                ",
"                ",
"                ",
"    ` .         ",
"       @@ .     ",
"      #@@@      ",
"      }__{      "
],
[
"                ",
"                ",
"                ",
"                ",
"      `         ",
"       @@ `     ",
"      @@@#      ",
"      }__{      "
],
[
"                ",
"                ",
"                ",
"                ",
"                ",
"       #@.      ",
"     (@@@@      ",
"      }__{      "
]
	],

	flames_boil : [
[
"        )       ",
"      )   (     ",
"   ( . ()       ",
"  )   )#@ ).    ",
"    @)@@(@@ ) ` ",
"     @)#@(@@(   ",
"    @@)@.@(@    ",
"   `)@}__{@( `  "
],
[
"      (   )     ",
"   .   )        ",
"  .        .    ",
"    ( )@) )   . ",
"    @)@@@@@ )   ",
"     @(@#@@(    ",
"  . @@)@@@(@    ",
"    )@}__{@@    "
],
[
"   .   (        ",
" .         .    ",
"    ) . ( (   . ",
"       @        ",
"    @)@#@@@ )   ",
"  . (@@@)@@(    ",
"    @#@@@)#@    ",
"    @@}__{(@    "
],
[
" .         .    ",
"    (   ) )     ",
"       )        ",
"  (    @    (   ",
" `  #)@@(@@ ).  ",
"   (#@@#@@@@    ",
"    @@@@)@@@.   ",
"   .@#}__{@@    "
],
[
"    )   ( .     ",
"       (`       ",
"  )  .      )   ",
" .     @#   .   ",
"   ) @@@@#@     ",
"    @#@@#@@@.   ",
"   .@@)@@@#@    ",
"    @(}__{)@    "
]
	],
	bubbles : ['o','.','~','*','O'],

	flask : {
		'coin'          : 0,
		'dust'          : 0,
		'candy'         : 0,
		'lollipop'      : 0,
		'gobstopper'    : 0,
		'health-tonic'  : 0,
		'strength-tonic': 0,
		'regen-tonic'   : 0,
		'fire-tonic'    : 0
	},

	flask_boiling : {
		'coin'          : 0,
		'dust'          : 0,
		'candy'         : 0,
		'lollipop'      : 0,
		'gobstopper'    : 0,
		'health-tonic'  : 0,
		'strength-tonic': 0,
		'regen-tonic'   : 0,
		'fire-tonic'    : 0
	},

	flask_zero : function(exclude_keys,is_boiling){
		var flask = (is_boiling) ? this.flask_boiling : this.flask;
		for(item in flask){
			if (flask[item] != 0 && $.inArray(item, exclude_keys) == -1){
				return false;
			}
		}
		return true;
	},

	// Recipes
	//
	// Health: c20l10
	// Strength: c10l20
	// Regen: C20G20 + c2 + l
	// Fire: C10G10 + d10

	boil : function(){
		htmlInteraction.disableButton('boil-btn');
		this.is_boiling = true;
		setTimeout(function () {
	        lab.finishBoil();
        }, 5000);
	},

	finishBoil : function(){
		htmlInteraction.enableButton('boil-btn');
		this.is_boiling = false;
		var message = "";
		// test for recipes
		var success = true;
		if(this.flask['candy'] == 2*this.flask['lollipop'] && this.flask['lollipop'] % 10 == 0
		   && this.flask_zero(['candy','lollipop'],false)
		   && !this.added_boiling && this.flask['candy'] != 0){
			// Health
			var quantity = this.flask['lollipop'] / 10;
			inventory.potions['health'].quantity += quantity;
			inventory.potions['health'].hasOwned = true;
			var a = (quantity > 1) ? quantity : 'a';
			var s = (quantity > 1) ? 's' : '';
			message = 'Bubble Gurble Gloop! \nYou made '+a+' health potion'+s+'!';
		}else if(this.flask['lollipop'] == 2*this.flask['candy'] && this.flask['candy'] % 10 == 0
		   && this.flask_zero(['candy','lollipop'],false)
		   && !this.added_boiling && this.flask['candy'] != 0){
			// Strength
			var quantity = this.flask['candy'] / 10;
			inventory.potions['strength'].quantity += quantity;
			inventory.potions['strength'].hasOwned = true;
			var a = (quantity > 1) ? quantity : 'a';
			var s = (quantity > 1) ? 's' : '';
			message = 'Bubble Gurble Slurp! \nYou made '+a+' strength potion'+s+'!';
		}else if(this.flask['coin'] == this.flask['gobstopper'] && this.flask['coin'] % 20 == 0
		   && this.flask_zero(['coin','gobstopper'],false)
		   && this.flask_boiling['candy'] == 2*this.flask_boiling['lollipop']
		   && this.flask_zero(['candy','lollipop'],true)
		   && this.flask_boiling['candy'] == this.flask['coin'] / 10 && this.flask['coin'] != 0){
			// Regen
			var quantity = this.flask['coin'] / 20;
			inventory.potions['regen'].quantity += quantity;
			inventory.potions['regen'].hasOwned = true;
			var a = (quantity > 1) ? quantity : 'a';
			var s = (quantity > 1) ? 's' : '';
			message = 'Bubble Gurble Sloop! \nYou made '+a+' regeneration potion'+s+'!';
		}else if(this.flask['coin'] == this.flask['gobstopper'] && this.flask['coin'] % 10 == 0
		   && this.flask_zero(['coin','gobstopper'],false)
		   && this.flask_zero(['dust'],true)
		   && this.flask_boiling['dust'] == this.flask['coin']
		   && this.flask['coin'] != 0){
			// Fire
			var quantity = this.flask['coin'] / 10;
			inventory.potions['fire'].quantity += quantity;
			inventory.potions['fire'].hasOwned = true;
			var a = (quantity > 1) ? quantity : 'a';
			var s = (quantity > 1) ? 's' : '';
			message = 'Bubble Gurble Pop! \nYou made '+a+' fire breath potion'+s+'!';
		}else if(this.flask['health-tonic'] != 0 && !this.added_boiling
		   && this.flask_zero(['health-tonic'],false)){
			// Health 2
			var quantity = this.flask['health-tonic'];
			inventory.potions['health2'].quantity += this.flask['health-tonic'];
			inventory.potions['health2'].hasOwned = true;
			var a = (quantity > 1) ? quantity : 'a';
			var s = (quantity > 1) ? 's' : '';
			message = 'Bubble Gurble Gloop! \nYou made '+a+' health II potion'+s+'!';
		}else if(this.flask['strength-tonic'] != 0 && !this.added_boiling
		   && this.flask_zero(['strength-tonic'],false)){
			// strength 2
			var quantity = this.flask['strength-tonic'];
			inventory.potions['strength2'].quantity += this.flask['strength-tonic'];
			inventory.potions['strength2'].hasOwned = true;
			var a = (quantity > 1) ? quantity : 'a';
			var s = (quantity > 1) ? 's' : '';
			message = 'Bubble Gurble Gloop! \nYou made '+a+' strength II potion'+s+'!';
		}else if(this.flask['regen-tonic'] != 0 && !this.added_boiling
		   && this.flask_zero(['regen-tonic'],false)){
			// regen 2
			var quantity = this.flask['regen-tonic'];
			inventory.potions['regen2'].quantity += this.flask['regen-tonic'];
			inventory.potions['regen2'].hasOwned = true;
			var a = (quantity > 1) ? quantity : 'a';
			var s = (quantity > 1) ? 's' : '';
			message = 'Bubble Gurble Gloop! \nYou made '+a+' regen II potion'+s+'!';
		}else if(this.flask['fire-tonic'] != 0 && !this.added_boiling
		   && this.flask_zero(['fire-tonic'],false)){
			// fire 2
			var quantity = this.flask['fire-tonic'];
			inventory.potions['fire2'].quantity += this.flask['fire-tonic'];
			inventory.potions['fire2'].hasOwned = true;
			var a = (quantity > 1) ? quantity : 'a';
			var s = (quantity > 1) ? 's' : '';
			message = 'Bubble Gurble Gloop! \nYou made '+a+' fire II potion'+s+'!';
		}else if(   this.flask['coin'] ==       10
		         && this.flask['gobstopper'] == 10
		   		 && this.flask['dust'] ==       10
		   		 && this.flask['candy'] ==      10
		   		 && this.flask['lollipop'] ==   10
		   		 && !this.added_boiling){
				// ASPLODE!!!1
				success = false;
				message = "OH NOES!!!!!";
				setTimeout(function () {
			        $('#lab-bench').effect('explode',{pieces: 30});
				setTimeout(function () {
			        $('#center-column').effect('explode',{pieces: 30});
				setTimeout(function () {
			        $('#potion-riddles').effect('explode',{pieces: 30});
				setTimeout(function () {
			        $('#top-bar').effect('explode',{pieces: 30});
				setTimeout(function () {
			        $('#vending-machine').hide();
			        $('#crafting-bay').hide();
			        $('#second-bar').effect('explode',{pieces: 30});
		        },200);},200);},200);},200);},1000);

		}else{
			success = false;
			message = 'Bubble Gurble Fizz! \nYou made a bad smell,\n but nothing else :-(';
		}
		this.clearFlask();
		if(success){
            codex.newPage(26);
			message += "\n";
			var topline = "";
			var bottomline = "";
			for(var i = 0;i<Math.min(quantity,7);i++){
				var bottle = random.pick(this.bottles);
				topline    += bottle[0] + ' ';
				bottomline += bottle[1] + ' ';
			}
			message += topline + '\n' + bottomline;
		}
		htmlInteraction.setInnerHtml('flask-contents',message);
		this.added_boiling = false;
		inventory.refreshButtons();
	},

	clearFlask : function(){
		for(var item in this.flask){
			this.flask[item] = 0;
			this.flask_boiling[item] = 0;
		}
		htmlInteraction.setInnerHtml('flask-contents','');
	},

	listIngredients : function(){
		var text = "";
		for(var item in this.flask){
			if(this.flask[item] > 0){
				text += inventory.items[item].name + ": " + this.flask[item];
				if(this.flask_boiling[item] > 0){
					text += ' + (' + this.flask_boiling[item] + ')';
				}
				text += "\n";
			}else if(this.flask_boiling[item] > 0){
				text += inventory.items[item].name + ": (" + this.flask_boiling[item] + ")\n";
			}
		}
		if(text != ""){
			htmlInteraction.setInnerHtml('flask-contents',"Flask Contents\n--------------\n\n"+text);
		}
		inventory.refreshButtons();
	},

	addItem : function(item,quantity){
		if(this.is_boiling){
			this.added_boiling = true;
			this.flask_boiling[item] += quantity;
		}else{
			this.flask[item] += quantity;
		}
		if(item == "coin"){
            coins.setCoins(coins.owned - quantity);
        }else{
            inventory.items[item].quantity -= quantity;
        }
        this.listIngredients();
	},

	renderFlame : function(){
		if(this.is_boiling){
			this.bubbleChance += 0.015;
			var flames = this.flames_boil;
		}else{
			this.bubbleChance = Math.max(this.bubbleChance -= 0.03,0.02);
			var flames = this.flames;
		}
		for (var i = 1; i <= 8; i++) {
			htmlInteraction.setInnerHtml('flame-'+i,flames[this.flame_frame % this.flame_frames][i-1]);
		};
		this.flame_frame++;
		for (var i=1; i<=4; i++){
			if(random.getFloat() < this.bubbleChance){
				htmlInteraction.setInnerHtml('bubble-'+i,random.pick(this.bubbles));
			}else{
				htmlInteraction.setInnerHtml('bubble-'+i,' ');
			}
		}
	}
};
