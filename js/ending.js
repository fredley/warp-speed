var ending = {
	fireworks : [
[[
"     x     ",
"           ",
"           ",
"           "],
[
"   --x--   ",
"    /|\\    ",
"           ",
"           "],
[
"  .  .  .  ",
"           ",
"   . . .   ",
"           "],
[
"  x  +  x  ",
"           ",
"   + x +   ",
"           "],
[
"    .+.    ",
"   . . .   ",
"  .+. .+.  ",
"   .   .   "],
[
"    . .    ",
"   . . .   ",
"  . . . .  ",
"   .   .   "]],
[[
"     +     ",
"           ",
"           ",
"           "],
[
"   --+--   ",
"     |     ",
"           ",
"           "],
[
" --  +  -- ",
"           ",
"     |     ",
"           "],
[
" X       X ",
"           ",
"     X     ",
"           "],
[
" +       + ",
"           ",
"     +     ",
"           "],
[
" .       . ",
"           ",
"     .     ",
"           "]],
[[
"     O     ",
"           ",
"           ",
"           "],
[
"    oOo    ",
"     o     ",
"           ",
"           "],
[
"   Oo+oO   ",
"    ooo    ",
"     O     ",
"           "],
[
"  Oo   oO  ",
"   .o o.   ",
"    .O.    ",
"           "],
[
"O o     o O",
"  .o   o.  ",
"    . .    ",
"     o     "],
[
".         .",
"  .     .  ",
"    . .    ",
"     .     "]]
	],

    isRunning : false,
    activeFireworks : [],
	
	getRows : function(){
		var rows = [];
		for(var i = 0;i<10;i++){
			rows.push(str_repeat(' ',100));
		}
		return rows;
	},

	play : function(){
		this.isRunning = true;
		htmlInteraction.setGameMode(false);
		htmlInteraction.setTab('vending');
		htmlInteraction.setElementVisibility('vending-machine',false);
		htmlInteraction.setElementVisibility('top-bar',false);
		htmlInteraction.setElementVisibility('second-bar',false);
		htmlInteraction.setElementVisibility('ending',true);
		setTimeout(function () {
	        ending.finish();
        }, 10000);
	},

	finish : function(){
		this.isRunning = false;
		htmlInteraction.setElementVisibility('vending-machine',true);
		htmlInteraction.setElementVisibility('top-bar',true);
		htmlInteraction.setElementVisibility('second-bar',true);
		htmlInteraction.setElementVisibility('ending',false);
	},

    renderFrame : function(){
    	if(this.isRunning){
	    	var rows = this.getRows();
	    	for (var i = this.activeFireworks.length - 1; i >= 0; i--) {
	    		if(this.activeFireworks[i].y == 3){
	    			this.activeFireworks[i].frame++;
	    			if(this.activeFireworks[i].frame == 6){
	    				this.activeFireworks.splice(i,1);
	    			}
	    		}else{
	    			this.activeFireworks[i].y--;
	    			this.activeFireworks[i].x += this.activeFireworks[i].dx;
	    		}
	    	}
	    	if(random.getFloat() < 0.3){
	    		this.activeFireworks.push({
	    			bang : random.pick([0,1,2]),
	    			dx : random.pick([-1,0,1]),
	    			x : random.getRandomIntUpTo(100),
	    			y : 9,
	    			frame : 0
	    		});
	    	}

	    	//render
	    	for (var i = this.activeFireworks.length - 1; i >= 0; i--) {
	    		var f = this.activeFireworks[i];
	    		if(f.y > 3){
	    			rows[f.y] = setCharAt(rows[9 - f.y],f.x,"'");
	    		}else{
	    			//draw bang, centered at x,y
	    			rows[f.y - 3] = setCharsAt(rows[f.y - 3],f.x-5,this.fireworks[f.bang][f.frame][3]);
	    			rows[f.y - 2] = setCharsAt(rows[f.y - 2],f.x-5,this.fireworks[f.bang][f.frame][2]);
	    			rows[f.y - 1] = setCharsAt(rows[f.y - 1],f.x-5,this.fireworks[f.bang][f.frame][1]);
	    			rows[f.y]     = setCharsAt(rows[f.y]    ,f.x-5,this.fireworks[f.bang][f.frame][0]);
	    			rows[f.y + 1] = setCharsAt(rows[f.y + 1],f.x-5,this.fireworks[f.bang][f.frame][1]);
	    			rows[f.y + 2] = setCharsAt(rows[f.y + 2],f.x-5,this.fireworks[f.bang][f.frame][2]);
	    			rows[f.y + 3] = setCharsAt(rows[f.y + 3],f.x-5,this.fireworks[f.bang][f.frame][3]);
	    		}
	    	}

	    	htmlInteraction.setInnerHtml('ending',
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
	            "  ______                                                  _               _                      _ \n" +
				" / _____)                                    _           | |        _    (_)                    | |\n" +
				"| /        ___   ____    ____   ____   ____ | |_   _   _ | |  ____ | |_   _   ___   ____    ___ | |\n" +
				"| |       / _ \\ |  _ \\  / _  | / ___) / _  ||  _) | | | || | / _  ||  _) | | / _ \\ |  _ \\  /___)|_|\n" +
				"| \\_____ | |_| || | | |( ( | || |    ( ( | || |__ | |_| || |( ( | || |__ | || |_| || | | ||___ | _ \n" +
				" \\______) \\___/ |_| |_| \\_|| ||_|     \\_||_| \\___) \\____||_| \\_||_| \\___)|_| \\___/ |_| |_|(___/ |_|\n" +
				"                       (_____|                                                                     ");
			}
    }
};

