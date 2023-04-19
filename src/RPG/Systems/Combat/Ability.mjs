//designed by chatgpt
export class Ability {
    constructor(name, description, skillLevel, damageMultiplier, accuracyBonus, rangeBonus) {
      this.name = name;
      this.description = description;
      this.skillLevel = skillLevel;
      this.damageMultiplier = damageMultiplier;
      this.accuracyBonus = accuracyBonus;
      this.rangeBonus = rangeBonus;
    }
  
    activate(target, player) {
      const damage = player.equippedWeapon.damage * this.damageMultiplier;
      const accuracy = player.equippedWeapon.accuracy + this.accuracyBonus;
      const range = player.equippedWeapon.range + this.rangeBonus;
        return (damage, accuracy, range);
      // Implement ability use logic here
      // ... (actually no dont it's inherited)
    }
  }
  