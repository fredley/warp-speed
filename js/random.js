var random = {

    coinFlip : function(){
        if(Math.random() < 0.5) return true;
        return false;
    },
    
    oneChanceOutOf : function(n){
        if(this.getRandomIntUpTo(n - 1) == 0) return true;
        else return false;
    },
    
    getFloat : function(){
        return Math.random();
    },
    
    pick : function(array){
        return array[Math.floor(Math.random()*array.length)];
    },
    
    getRandomIntUpTo : function(n){
        return Math.floor(Math.random()*(n+1));
    },

    removeRandom : function(list){
        return list.splice(Math.floor(Math.random()*list.length),1);
    },
    
    pure : function(){
        return Math.floor(Math.pow(10, random.getRandomIntUpTo(100)) * random.getRandomFloat());
    },
    
    pure2 : function(){
        switch(random.getRandomIntUpTo(2)){
            case 0: return Math.floor(Math.pow(10, random.getRandomIntUpTo(100)) * random.getRandomFloat()); break;
            case 1: return -Math.floor(Math.pow(10, random.getRandomIntUpTo(100)) * random.getRandomFloat()); break;
            case 2: return "bug"; break;
        }
    }
    
};
