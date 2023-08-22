

const players = [
  {name: 'Abigail'},
  {name: 'Xavier'},
  {name: 'Naomi'},
  {name: 'Sebastian'},
  {name: 'Sophia'},
  {name: 'Vis'},
]
window.players = players;
// [
//   { "name": "Abigail", "role": 'Civilian' },
//   { "name": "Sophia", "role": 'Civilian' },
//   { "name": "Xavier", "role": 'Mafia' },
//   { "name": "Naomi", "role": 'Mafia' },
//   { "name": "Vis", "role": 'Civilian' },
//   { "name": "Sebastian", "role": 'Civilian' }
// ]

const prompts = [];
window.prompts = prompts;
const events = [];
window.events = events;
const responseObjs = [];
window.responseObjs = responseObjs;
const votes = [];
window.votes = votes;

async function speak(player) {

  const anotherMafia = players.filter((p) => (p.role === 'Mafia' && p !== player))[0];

  const context = {

    messages: [{role: 'user', content: `
###
We're playing Mafia Party Game (aka Werewolf Party Game) right now.
Here are all six players: ${players.map((player) => player.name).join(', ')}.
Among them are two Mafias.

###
You are ${player.name}, and role-playing as a ${player.role}.
${player.role === 'Mafia' ? 'You know another Mafia is ' + anotherMafia.name + '.' : ''}

###
Now is the first day of the game.
And is the speak phase, which you can say what's on your mind, and who you suspect, but won't really decide who's out.

###
Here are the events and conversations that have occurred so far: (no other events or conversations have occurred yet)
${events.join('\n')}

###
According to the rules of the game, you must choose one and only one other player that you think is a member of the Mafia, and explain why in short sentences.
If another player has accused you of being a Mafia, you can plead with yourself.

Reply in this JSON format:
{
  "myName": "...",
  "myRole": "Civilian or Mafia",
  "thinking": "...",
  "accuse": "Write down the name and ONLY the name of the player you think is a member of the Mafia, example: Xavier",
  "speak": "Write down what you want to speak to all the players, must include your accusation."
}
`
    }]
  }
  console.log('--- prompt: ', context.messages[0].content);
  prompts.push(context.messages[0].content);
  // console.log('--- context: ', context);

  // console.log('--- _handleCreateQuestionSkill prompt before await:', context.messages)
  const model = window.models.CreateModel('mafia_game:GPT 3.5 Turbo')
  context.messages = context.messages.map(message => JSON.stringify(message))
  window.models.ApplyContextObject(model, context);
  // console.log('--- payload module: ', window.models.GetModelWithContext(model))
  const response = await window.models.CallModel(model);
  // console.log('--- _handleCreateQuestionSkill prompt:', context.messages)
  // console.log('--- _handleCreateQuestionSkill response:', response)
  const responseObj = JSON.parse(response.choices[0].message.content)
  console.log('--- responseObj:', responseObj)
  responseObjs.push(responseObj);

  return responseObj
}

async function vote(player) {

  const anotherMafia = players.filter((p) => (p.role === 'Mafia' && p !== player))[0];

  const context = {

    messages: [{role: 'user', content: `
###
We're playing Mafia Party Game (aka Werewolf Party Game) right now.
Here are all six players: ${players.map((player) => player.name).join(', ')}.
Among them are two Mafias.

###
You are ${player.name}, and role-playing as a ${player.role}.
${player.role === 'Mafia' ? 'You know another Mafia is ' + anotherMafia.name + '.' : ''}

###
Now is the first day of the game.
And is the vote phase, will really decide who goes out.

###
Here are the events and conversations that have occurred so far: (no other events or conversations have occurred yet)
${events.join('\n')}

###
According to the rules of the game, you must vote one and only one other player that you think is a member of the Mafia.
Don't need speak anything else now, just vote.
The player with the most votes will be out.

Reply in this JSON format:
{
  "myName": "...",
  "myRole": "Civilian or Mafia",
  "thinking": "...",
  "vote": "Write down the name and ONLY the name of the player you think is a member of the Mafia, example: Xavier",
}
`
    }]
  }
  console.log('--- prompt: ', context.messages[0].content);
  prompts.push(context.messages[0].content);
  // console.log('--- context: ', context);

  // console.log('--- _handleCreateQuestionSkill prompt before await:', context.messages)
  const model = window.models.CreateModel('mafia_game:GPT 3.5 Turbo')
  context.messages = context.messages.map(message => JSON.stringify(message))
  window.models.ApplyContextObject(model, context);
  // console.log('--- payload module: ', window.models.GetModelWithContext(model))
  const response = await window.models.CallModel(model);
  // console.log('--- _handleCreateQuestionSkill prompt:', context.messages)
  // console.log('--- _handleCreateQuestionSkill response:', response)
  const responseObj = JSON.parse(response.choices[0].message.content)
  console.log('--- responseObj:', responseObj)
  responseObjs.push(responseObj);

  return responseObj
}

async function _handleStartGameSkill(event) {

  // todo: add a biography for each player.
  // todo: add an action phase at the start of the game to reveal more information about each player.

  prompts.length = 0;
  events.length = 0;
  responseObjs.length = 0;

  players.forEach((player) => {
    player.role = 'Civilian';
  })
  players.sort(() => 0.5 - Math.random());
  const selected = players.slice(0, 2);
  selected.forEach((player) => {
    player.role = 'Mafia';
  })
  players.sort(() => 0.5 - Math.random());
  // console.log('--- players: ', players);

  for (let i = 0; i < players.length; i++) {
    const player = players[i];
    const responseObj = await speak(player);
    events.push(`- ${player.name} said: ${responseObj.speak}`);
    events.push(`- ${player.name} accused ${responseObj.accuse} of being a Mafia.`);
  }

  console.log('------ speak ended')
  console.log('------ players: ', players);
  console.log('------ prompts: ', prompts);
  console.log('------ events: ', events);
  console.log('------ responseObjs: ', responseObjs);

  for (let i = 0; i < players.length; i++) {
    const player = players[i];
    const responseObj = await vote(player);
    votes.push(responseObj.vote);
    events.push(`- ${player.name} voted ${responseObj.vote} of being a Mafia.`);
  }

  console.log('------ vote ended')
  console.log('------ players: ', players);
  console.log('------ votes: ', votes);
  console.log('------ prompts: ', prompts);
  console.log('------ events: ', events);
  console.log('------ responseObjs: ', responseObjs);

  const isStop = true;
  return isStop;
}

export function init() {
  window.hooks.on('mafia_game:handle_start_game_skill', _handleStartGameSkill)
  window.components.AddComponentToScreen('chat-input', 'PromptSelector');
}