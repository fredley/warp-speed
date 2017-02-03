var save = {

  save : function(){
    save_data = {
      'version' : 0.1,
      'konami_claimed'          : main.konamiClaimed,
      'time'                    : time.currTime,
      'time_warps'              : time.warps,
      'time_multiplier'         : time.multiplier,
      'coin_times'              : time.coinTimes,
      'coins'                   : coins.owned,
      'coin_multiplyer'         : coins.multiplier,
      'coin_found'              : vending.coinFound,
      'products'          : vending.products,
      'items'                   : inventory.items,
      'potions'                 : inventory.potions,
      'armour'          : inventory.armour,
      'codex_pages'             : codex.ownedPages,
      'codex_has_new_page'      : codex.hasNewPage,
      'locations' : {'crafting' : locations.crafting.owned,
               'lab'      : locations.lab.owned },
      'game1_start_time'        : game1.startTime,
      'game1_start_lives'       : game1.startLives,
      'game1_bullet_every'      : game1.bulletEvery,
      'game1_probability'       : game1.probability,
      'game2_start_time'        : game2.startTime,
      'game2_start_lives'       : game2.startLives,
      'game2_paddle_width'      : game2.paddleWidth,
      'game3_start_time'        : game3.startTime,
      'game3_start_hp'          : game3.startHP,
      'game3_weapon'            : game3.weapon,
      'game4_start_hp'          : game4.startHP,
      'game4_attack'            : game4.attack,
      'game4_level'             : game4.level
    };
    localStorage['save_game'] = JSON.stringify(save_data);
  },

  load : function(){
    var data = JSON.parse(localStorage['save_game']);
    main.konamiClaimed       = data['konami_claimed'];
    time.currTime            = data['time'];
    time.setWarps(data['time_warps']);
    time.multiplier          = data['time_multiplier'];
    time.coinTimes           = data['coin_times'];
    coins.owned              = data['coins'];
    coins.multiplier         = data['coin_multiplyer'];
    vending.coinFound        = data['coin_found'];
    for(var product in data['products']){
      vending.products[product].bought = data['products'][product].bought;
    }
    for(var item in data['items']){
      inventory.items[item].quantity = data['items'][item].quantity;
      inventory.items[item].hasOwned = data['items'][item].hasOwned;
    }
    for(var potion in data['potions']){
      inventory.potions[potion].quantity = data['potions'][potion].quantity;
      inventory.potions[potion].hasOwned = data['potions'][potion].hasOwned;
    }
    inventory.armour.helmet  = data['armour']['helmet'];
    inventory.armour.chest   = data['armour']['chest'];
    inventory.armour.legs    = data['armour']['legs'];
    inventory.armour.boots   = data['armour']['boots'];
    codex.ownedPages         = data['codex_pages'];
    codex.hasNewPage         = data['codex_has_new_page'];
    locations.crafting.owned = data['locations']['crafting'];
    locations.lab.owned      = data['locations']['lab'];
    game1.startTime          = data['game1_start_time'];
    game1.startLives         = data['game1_start_lives'];
    game1.bulletEvery        = data['game1_bullet_every'];
    game1.probability        = data['game1_probability'];
    game2.startTime          = data['game2_start_time'];
    game2.startLives         = data['game2_start_lives'];
    game2.paddleWidth        = data['game2_paddle_width'];
    game3.weapon             = data['game3_weapon'];
    game3.startTime          = data['game3_start_time'];
    game3.startHP            = data['game3_start_hp'];
    game4.startHP            = data['game4_start_hp'];
    game4.attack             = data['game4_attack'];
    game4.level              = data['game4_level'];
    inventory.refreshButtons();
    vending.updateButtons();
    htmlInteraction.setElementVisibility('save-button',true);
    htmlInteraction.setElementVisibility('warp-button',true);
    if(locations.crafting.owned){
      htmlInteraction.setElementVisibility('nav-buttons',true);
      htmlInteraction.setElementVisibility('crafting-button',true);
    }
    if(locations.lab.owned){
      htmlInteraction.setElementVisibility('lab-button',true);
    }
    coins.initDisplay = true;
    htmlInteraction.setElementVisibility("coin-display",true);
    htmlInteraction.setInnerHtml("coin-display","Coins: " + coins.owned);
    htmlInteraction.setElementVisibility("vending-machine",true);
    main.secInterval();
    main.bindIntervals();
  }

};
