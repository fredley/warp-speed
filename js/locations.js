var locations = {

    crafting : {
        owned : false, 
        obtain : function(){
            this.owned = true;
            htmlInteraction.setElementVisibility('nav-buttons',true);
            htmlInteraction.setElementVisibility('crafting-button',true);
        }
    },

    lab : {
    	owned : false,
    	obtain : function(){
    		this.owned = true;
            htmlInteraction.setElementVisibility('lab-button',true);
    	}

    }

};
