

const players = [
    {name: 'Abigail'},
    {name: 'Xavier'},
    {name: 'Naomi'},
    {name: 'Sebastian'},
    {name: 'Sophia'},
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
messages: `\n\nHuman:
We're playing Mafia Party Game (aka Werewolf Party Game) right now.
Here are all six players: Abigail, Xavier, Naomi, Vis, Sebastian, Sophia.
Among them are two mafias.
You are Sophia and playing as a mafia.
Now is the first round of the game.
And you are the first to speak.
According to the rules of the game, you must introduce yourself.
If you're a civilian, you usually want to expose your role.
If you're a mafia, you almost always want to hide your role and pretend you're a civilian.
Now please introduce yourself in short sentences.

Assistant:`
    }
    console.log('--- context: ', context);

    const isStop = true;
    return isStop;
}

export function init() {
    window.hooks.on('mafia_game:handle_start_game_skill', _handleStartGameSkill)
    window.components.AddComponentToScreen('chat-input', 'PromptSelector');
}