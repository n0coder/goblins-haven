import { Ability } from "./Ability.mjs";

//i see a problem and i am annoyed by it.
export class SwipeAbility extends Ability {
    constructor(name, description, skillLevel, damageMultiplier, range) {
      super(name, description, skillLevel);
      this.damageMultiplier = damageMultiplier;
      this.range = range;
    }
  
    activate(player, enemies, swipeDirection) {
      for (let i = 0; i < enemies.length; i++) {
        const enemy = enemies[i];
        const distance = dist(player.x, player.y, enemy.x, enemy.y);
        if (distance <= this.range) {
          const angle = atan2(enemy.y - player.y, enemy.x - player.x);
          const angleDiff = abs(angle - swipeDirection);
          if (angleDiff < PI / 2) {
            const damage = player.equippedWeapon.damage * this.damageMultiplier;
            enemy.takeDamage(damage);
          }
        }
      }
    }
  }
  