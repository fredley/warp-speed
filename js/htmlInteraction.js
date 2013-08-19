var htmlInteraction = {

    setGameMode : function(bool){
        this.setElementVisibility('game-area',bool);
        this.setElementVisibility('vending-machine',!bool);
        this.setElementVisibility('game-buttons',!bool);
        if(bool){
            this.disableButton('crafting-button');
            this.disableButton('lab-button');
            this.disableButton('vending-button');
            this.disableButton('save-button');
        }else{
            this.enableButton('crafting-button');
            this.enableButton('lab-button');
            this.enableButton('vending-button');
            this.enableButton('save-button');
        }
    },

    setTab : function(tab){
        switch(tab){
        case "vending":
            this.setElementVisibility('lab',false);
            this.setElementVisibility('vending-machine',true);
            this.setElementVisibility('crafting-bay',false);
            break;
        case "crafting":
            this.setElementVisibility('lab',false);
            this.setElementVisibility('crafting-bay',true);
            this.setElementVisibility('vending-machine',false);
            inventory.refreshButtons();
            break;
        case "lab":
            this.setElementVisibility('lab',true);
            this.setElementVisibility('crafting-bay',false);
            this.setElementVisibility('vending-machine',false);
            inventory.refreshButtons();
            break;
        }
    },

    setElementDisplay : function(id, display){
        document.getElementById(id).style.display = display;
    },

    getElement : function(id){
        return document.getElementById(id);
    },

    setElementVisibility : function(id, bool){
        if(document.getElementById(id)==null) return;
        if(bool) document.getElementById(id).style.display = "block";
        else document.getElementById(id).style.display = "none";
    },

    isElementVisible : function(id){
        if(document.getElementById(id).style.display == "none") return false;
        return true;
    },

    setInnerHtml : function(id, value){
        if(document.getElementById(id)==null) return;
        document.getElementById(id).innerHTML = value;
    },

    disableButton : function(id){
        if(document.getElementById(id)==null) return;
        this.getElement(id).disabled = "disabled";
    },

    disableButtonClass : function(id){
        var arr = document.getElementsByClassName(id);
        for(var i = 0; i < arr.length; i++){
            arr[i].disabled = "disabled";
        }
    },

    enableButton : function(id){
        if(document.getElementById(id)==null) return;
        this.getElement(id).disabled = "";
    },

    enableButtonClass : function(id){
        var arr = document.getElementsByClassName(id);
        for(var i = 0; i < arr.length; i++){
            arr[i].disabled = "";
        }
    },

    showButton : function(id){
        htmlInteraction.setElementVisibility(id, true);
    },

    showButtonClass : function(id){
        var arr = document.getElementsByClassName(id);
        for(var i = 0; i < arr.length; i++){
            arr[i].style.display = "block";
        }
    },

    hideButton : function(id){
        htmlInteraction.setElementVisibility(id, false);
    },

    hideButtonClass : function(id){
        var arr = document.getElementsByClassName(id);
        for(var i = 0; i < arr.length; i++){
            arr[i].style.display = "none";
        }
    },

    setButtonOnclick : function(id, value){
        this.getElement(id).onclick = value;
    },

    focusElement : function(id){
        this.getElement(id).focus();
    }
};
