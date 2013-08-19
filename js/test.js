function test(){
	coins.initDisplay = true;
	locations.crafting.obtain();
	locations.lab.obtain();

    inventory.items['dust'].quantity = 99;
    inventory.items['dust'].hasOwned = true;
    inventory.items['ingot'].quantity = 99;
    inventory.items['ingot'].hasOwned = true;
    inventory.items['candy'].quantity = 99;
    inventory.items['candy'].hasOwned = true;
    inventory.items['lollipop'].quantity = 99;
    inventory.items['lollipop'].hasOwned = true;
    inventory.items['gobstopper'].quantity = 99;
    inventory.items['gobstopper'].hasOwned = true;
    inventory.potions['health'].quantity = 99;
    inventory.potions['health'].hasOwned = true;
	coins.setCoins(9999999);
    inventory.potions['health'].quantity = 20;
    inventory.potions['health'].hasOwned = true;
    game4.starthp = 300;
    inventory.refreshButtons();
}

function kalina(){
    coins.setCoins(1000000);
    inventory.items['dust'].quantity = 1000000;
    inventory.items['dust'].hasOwned = true;
    inventory.items['ingot'].quantity = 1000000;
    inventory.items['ingot'].hasOwned = true;
    inventory.items['brick'].quantity = 1000000;
    inventory.items['brick'].hasOwned = true;
    inventory.items['candy'].quantity = 1000000;
    inventory.items['candy'].hasOwned = true;
    inventory.items['lollipop'].quantity = 1000000;
    inventory.items['lollipop'].hasOwned = true;
    inventory.items['gobstopper'].quantity = 1000000;
    inventory.items['gobstopper'].hasOwned = true;
    locations.crafting.obtain();
    game1.bulletEvery = 3;
    coins.initDisplay = true;
}
