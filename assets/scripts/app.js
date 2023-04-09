// Constant Values
const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 20;
const MONSTER_ATTACK_VALUE = 15;
const HEAL_VALUE = 20;
let maxLife = 100;
let hasBonusLife = true;

let forStrongCounter = 0;
let forHealCounter = 0;
// Disable Strong Attack and Heal Buttons Initially
strongAttackBtn.disabled = true;
healBtn.disabled = true;

// Adjusting initial health
let currentMonsterHealth = maxLife;
let currentPlayerHealth = maxLife;

adjustHealthBars(maxLife);

// Bonus Life Functionality
function bonusLife() {
    if (currentPlayerHealth <= 0 && hasBonusLife) {
        hasBonusLife = false;
        removeBonusLife();
        currentPlayerHealth = maxLife / 2;
        setPlayerHealth(currentPlayerHealth);
        alert("You were saved for now !!");
    }
}

// Battle Result
function battleResult() {
    bonusLife();

    if (currentMonsterHealth >= 0 && currentPlayerHealth <= 0) {
        alert("You lost !");
        reset();
    } else if (currentMonsterHealth <= 0 && currentPlayerHealth >= 0) {
        alert("You won !");
        reset();
    } else if (currentMonsterHealth <= 0 && currentPlayerHealth <= 0) {
        alert("You have a draw");
        reset();
    }
}

// Attack Monster method
function attackMonster(mode) {
    let maxDamage;
    if (mode === "ATTACK") {
        maxDamage = ATTACK_VALUE;
    } else {
        maxDamage = STRONG_ATTACK_VALUE;
    }

    const damage = dealMonsterDamage(maxDamage);
    currentMonsterHealth -= damage;
}

// Attack player method
function attackPlayer() {
    const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
    currentPlayerHealth -= playerDamage;
}

// Attack Functionality
function attackHandler() {
    // Updating counter to enable strong attack on monster
    forStrongCounter++;

    // Updating counter to enable heal functionality
    forHealCounter++;

    // Enable Strong Attack Button once player has made atleast 3 attacks
    if (forStrongCounter === 3) {
        strongAttackBtn.disabled = false;
    }

    // Enable Heal Button once player has made atleast 5 attacks
    if (forHealCounter === 5) {
        healBtn.disabled = false;
    }

    attackMonster("ATTACK");
    attackPlayer();
    battleResult();
}

// Strong Attack Functionality
function strongAttackHandler() {
    // Reseting counter to disable strong attack and disable Strong Attack button
    forStrongCounter = 0;
    strongAttackBtn.disabled = true;

    // Updating counter to enable heal functionality
    forHealCounter++;

    attackMonster("STRONG_ATTACK");
    attackPlayer();
    battleResult();
}

// Heal Player Functionality
function healPlayerHandler() {
    forHealCounter = 0;
    healBtn.disabled = true;
    let healValue;

    if (currentPlayerHealth >= maxLife - HEAL_VALUE) {
        healValue = maxLife - currentPlayerHealth;
    } else {
        healValue = HEAL_VALUE;
    }

    increasePlayerHealth(healValue);
    currentPlayerHealth += healValue;
}

// Reset Functionality
function reset() {
    currentMonsterHealth = maxLife;
    currentPlayerHealth = maxLife;
    resetGame(maxLife);
}

// Event Listenters on Button
attackBtn.addEventListener("click", attackHandler);
strongAttackBtn.addEventListener("click", strongAttackHandler);
healBtn.addEventListener("click", healPlayerHandler);
