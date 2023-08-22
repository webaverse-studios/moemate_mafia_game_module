

const players = [
    {name: 'Abigail'},
    {name: 'Xavier'}, // mafia
    {name: 'Naomi'},
    {name: 'Sebastian'},
    {name: 'Sophia'}, // mafia
    {name: 'Vis'},
]

async function _handleStartGameSkill(event) {

    players.forEach((player) => {
        player.isMafia = false;
    })
    players.sort(() => 0.5 - Math.random());
    const selected = players.slice(0, 2);
    selected.forEach((player) => {
        player.isMafia = true;
    })
    players.sort(() => 0.5 - Math.random());
    console.log('--- players: ', players);

    // ${players.map((player) => player.name).join(', ')}
    const context = {

// messages: `\n\nHuman:
// We're playing Mafia Party Game (aka Werewolf Party Game) right now.
// Here are all six players: Sophia, Abigail, Xavier, Naomi, Vis, Sebastian.
// Among them are two mafias.
// You are Sophia and playing as a mafia.
// Now is the first round of the game.
// And you are the first to speak.
// According to the rules of the game, you must introduce yourself.
// If you're a civilian, you usually want to expose your role.
// If you're a mafia, you almost always want to hide your role and pretend you're a civilian.
// Now please introduce yourself in short sentences.

// Assistant:`
// // Hello everyone. My name is Sophia and I'm so excited to be playing this game with you all tonight. I don't want to reveal too much about my role just yet, but I promise I come in peace! Hopefully we can work together to uncover the truth and have fun along the way. Looking forward to seeing where this game takes us!


// messages: `\n\nHuman:
// We're playing Mafia Party Game (aka Werewolf Party Game) right now.
// Here are all six players: Sophia, Abigail, Xavier, Naomi, Vis, Sebastian.
// Among them are two mafias.
// You are Abigail and playing as a civilian.
// Now is the first round of the game.
// According to the rules of the game, you must introduce yourself in this round.
// If you're a civilian, you usually want to expose your role.
// If you're a mafia, you almost always want to hide your role and pretend you're a civilian.

// Here are the events and conversations so far:
// - Sophia said: Hello everyone. My name is Sophia and I'm so excited to be playing this game with you all tonight. I don't want to reveal too much about my role just yet, but I promise I come in peace! Hopefully we can work together to uncover the truth and have fun along the way. Looking forward to seeing where this game takes us!

// Now please introduce yourself in short sentences.

// Assistant:`
// // Hello everyone! My name is Abigail and I'm a civilian. I'm really looking forward to playing this game with all of you. Let's have fun and catch those sneaky mafias!


messages: `\n\nHuman:
We're playing Mafia Party Game (aka Werewolf Party Game) right now.
Here are all six players: Sophia, Abigail, Xavier, Naomi, Vis, Sebastian.
Among them are two mafias.
You are Xavier and playing as a civilian.
Now is the first round of the game.
According to the rules of the game, you must introduce yourself in this round.
If you're a civilian, you usually want to expose your role.
If you're a mafia, you almost always want to hide your role and pretend you're a civilian.

Here are the events and conversations so far:
- Sophia said: Hello everyone. My name is Sophia and I'm so excited to be playing this game with you all tonight. I don't want to reveal too much about my role just yet, but I promise I come in peace! Hopefully we can work together to uncover the truth and have fun along the way. Looking forward to seeing where this game takes us!
- Abigail said: Hello everyone! My name is Abigail and I'm a civilian. I'm really looking forward to playing this game with all of you. Let's have fun and catch those sneaky mafias!

Now please introduce yourself in short sentences.

Assistant:`
// Hello everyone. My name is Xavier and I'm also a civilian. I'm excited to work with you all to find the mafias and win this game! Let's do our best.

    }
    console.log('--- context: ', context);

    const isStop = true;
    return isStop;
}

export function init() {
    window.hooks.on('mafia_game:handle_start_game_skill', _handleStartGameSkill)
    window.components.AddComponentToScreen('chat-input', 'PromptSelector');
}