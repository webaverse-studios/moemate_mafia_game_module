

let players = [
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

### Your Goal:
In the Mafia party game, there are two factions: Mafia and Civilian. Players in each faction need to help each other, eliminate players from the other faction, and maintain the number advantage of your own faction.

${player.role === 'Civilian' ? `In the Mafia party game, the goal of the Civilians is to identify and eliminate all the Mafia members while preserving the innocence of their fellow Civilians. 

The Civilians do not know the identities of the Mafia members or other roles at the beginning of the game. Their main objective is to work together and use deduction, discussion to figure out who among them might be part of the Mafia.

During the daytime phases, Civilians participate in discussions, share their suspicions, and attempt to collectively decide who they believe is a member of the Mafia. This is done through a democratic voting process, where players can vote to eliminate a player they suspect of being Mafia. The player with the most votes is removed from the game and their role is revealed. The goal is to eliminate Mafia members while minimizing the chance of accidentally eliminating innocent Civilians.

At nighttime, when the Mafia members take their actions, the Civilians do not have any active role to play. Instead, they must rely on the information gained from the nighttime actions and the discussions during the daytime to make informed decisions about who to vote for.

The game continues with alternating phases of discussion and nighttime actions until either the Civilians successfully identify and eliminate all the Mafia members and evil roles, or the Mafia gains a numerical advantage and controls the voting process, making it impossible for the Civilians to win.

In summary, the goal of the Civilians in the Mafia party game is to collaborate, discuss, and use deduction to uncover and eliminate the Mafia members from the group, in order to ensure the survival of the innocent and achieve victory for the Civilians.
` : ''}
${player.role === 'Mafia' ? `In the Mafia party game, the primary goal of the Mafia players is to eliminate all the non-Mafia players (usually referred to as the "Civilian") or to achieve a numerical advantage where they can control the vote and decisions of the remaining players.

The game is typically played with a group of players, each assigned a specific role secretly at the beginning of the game. Among the players, a few are chosen to be part of the Mafia, while the others to be Civilian. The Mafia members know each other's identities, while the Civilians only know their own role.

During the game, players engage in discussions and attempt to identify the Mafia members among them. The Mafia members, posing as regular Civilian, participate in these discussions to divert suspicion away from themselves and manipulate the group's decisions. At night, the Mafia secretly chooses a player to kill.

The game continues with alternating phases of daytime discussion and nighttime actions until either the Mafia successfully eliminates all non-Mafia players, or the Civilian manage to identify and eliminate all the Mafia members through a democratic voting process during the day phases.

So, the ultimate goal of the Mafia players is to manipulate the group dynamics, deceive the other players, and eliminate non-Mafia players without revealing their true identities. The central theme are deception and deduction.
` : ''}

###
Now is the first day of the game.
And is the speak phase, which you can say what's on your mind, and who you suspect, but won't really decide who's out.

###
Here are the events and conversations that have occurred so far: (No other events or conversations have occurred yet. If some players are not in the events list, just means that it is not their turn to speak or act, does not mean that they are quiet or silent!)
${events.join('\n')}

###
According to the rules of the game, you must choose one and only one other player that you think is a member of the Mafia, and explain why in short sentences.
If another player has accused you of being a Mafia, you can plead with yourself.

Reply in this JSON format:
{
  "myName": "...",
  "myRole": "Civilian or Mafia",
  "thinking": "...",
  "accuse": "Name", // Put ONLY the player's name in the "accuse" field, don't write down anything else!
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

### Your Goal:
In the Mafia party game, there are two factions: Mafia and Civilian. Players in each faction need to help each other, eliminate players from the other faction, and maintain the number advantage of your own faction.

${player.role === 'Civilian' ? `In the Mafia party game, the goal of the Civilians is to identify and eliminate all the Mafia members while preserving the innocence of their fellow Civilians. 

The Civilians do not know the identities of the Mafia members or other roles at the beginning of the game. Their main objective is to work together and use deduction, discussion to figure out who among them might be part of the Mafia.

During the daytime phases, Civilians participate in discussions, share their suspicions, and attempt to collectively decide who they believe is a member of the Mafia. This is done through a democratic voting process, where players can vote to eliminate a player they suspect of being Mafia. The player with the most votes is removed from the game and their role is revealed. The goal is to eliminate Mafia members while minimizing the chance of accidentally eliminating innocent Civilians.

At nighttime, when the Mafia members take their actions, the Civilians do not have any active role to play. Instead, they must rely on the information gained from the nighttime actions and the discussions during the daytime to make informed decisions about who to vote for.

The game continues with alternating phases of discussion and nighttime actions until either the Civilians successfully identify and eliminate all the Mafia members and evil roles, or the Mafia gains a numerical advantage and controls the voting process, making it impossible for the Civilians to win.

In summary, the goal of the Civilians in the Mafia party game is to collaborate, discuss, and use deduction to uncover and eliminate the Mafia members from the group, in order to ensure the survival of the innocent and achieve victory for the Civilians.
` : ''}
${player.role === 'Mafia' ? `In the Mafia party game, the primary goal of the Mafia players is to eliminate all the non-Mafia players (usually referred to as the "Civilian") or to achieve a numerical advantage where they can control the vote and decisions of the remaining players.

The game is typically played with a group of players, each assigned a specific role secretly at the beginning of the game. Among the players, a few are chosen to be part of the Mafia, while the others to be Civilian. The Mafia members know each other's identities, while the Civilians only know their own role.

During the game, players engage in discussions and attempt to identify the Mafia members among them. The Mafia members, posing as regular Civilian, participate in these discussions to divert suspicion away from themselves and manipulate the group's decisions. At night, the Mafia secretly chooses a player to kill.

The game continues with alternating phases of daytime discussion and nighttime actions until either the Mafia successfully eliminates all non-Mafia players, or the Civilian manage to identify and eliminate all the Mafia members through a democratic voting process during the day phases.

So, the ultimate goal of the Mafia players is to manipulate the group dynamics, deceive the other players, and eliminate non-Mafia players without revealing their true identities. The central theme are deception and deduction.
` : ''}

###
Now is the first day of the game.
And is the vote phase, will really decide who goes out.

###
Here are the events and conversations that have occurred so far: (No other events or conversations have occurred yet. If some players are not in the events list, just means that it is not their turn to speak or act, does not mean that they are quiet or silent!)
${events.join('\n')}

###
According to the rules of the game, you must vote one and only one other player that you think is a member of the Mafia.
The player with the most votes will be out.
You won't speak anything else now, just vote.

Reply in this JSON format:
{
  "myName": "...",
  "myRole": "Civilian or Mafia",
  "thinking": "...",
  "vote": "Name",
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

async function voteKill(player) {

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

### Your Goal:
In the Mafia party game, there are two factions: Mafia and Civilian. Players in each faction need to help each other, eliminate players from the other faction, and maintain the number advantage of your own faction.

${player.role === 'Civilian' ? `In the Mafia party game, the goal of the Civilians is to identify and eliminate all the Mafia members while preserving the innocence of their fellow Civilians. 

The Civilians do not know the identities of the Mafia members or other roles at the beginning of the game. Their main objective is to work together and use deduction, discussion to figure out who among them might be part of the Mafia.

During the daytime phases, Civilians participate in discussions, share their suspicions, and attempt to collectively decide who they believe is a member of the Mafia. This is done through a democratic voting process, where players can vote to eliminate a player they suspect of being Mafia. The player with the most votes is removed from the game and their role is revealed. The goal is to eliminate Mafia members while minimizing the chance of accidentally eliminating innocent Civilians.

At nighttime, when the Mafia members take their actions, the Civilians do not have any active role to play. Instead, they must rely on the information gained from the nighttime actions and the discussions during the daytime to make informed decisions about who to vote for.

The game continues with alternating phases of discussion and nighttime actions until either the Civilians successfully identify and eliminate all the Mafia members and evil roles, or the Mafia gains a numerical advantage and controls the voting process, making it impossible for the Civilians to win.

In summary, the goal of the Civilians in the Mafia party game is to collaborate, discuss, and use deduction to uncover and eliminate the Mafia members from the group, in order to ensure the survival of the innocent and achieve victory for the Civilians.
` : ''}
${player.role === 'Mafia' ? `In the Mafia party game, the primary goal of the Mafia players is to eliminate all the non-Mafia players (usually referred to as the "Civilian") or to achieve a numerical advantage where they can control the vote and decisions of the remaining players.

The game is typically played with a group of players, each assigned a specific role secretly at the beginning of the game. Among the players, a few are chosen to be part of the Mafia, while the others to be Civilian. The Mafia members know each other's identities, while the Civilians only know their own role.

During the game, players engage in discussions and attempt to identify the Mafia members among them. The Mafia members, posing as regular Civilian, participate in these discussions to divert suspicion away from themselves and manipulate the group's decisions. At night, the Mafia secretly chooses a player to kill.

The game continues with alternating phases of daytime discussion and nighttime actions until either the Mafia successfully eliminates all non-Mafia players, or the Civilian manage to identify and eliminate all the Mafia members through a democratic voting process during the day phases.

So, the ultimate goal of the Mafia players is to manipulate the group dynamics, deceive the other players, and eliminate non-Mafia players without revealing their true identities. The central theme are deception and deduction.
` : ''}

###
Now is the first night of the game.
And is the kill phase, Mafias will kill a player.

###
Here are the events and conversations that have occurred so far: (No other events or conversations have occurred yet. If some players are not in the events list, just means that it is not their turn to speak or act, does not mean that they are quiet or silent!)
${events.join('\n')}

###
According to the rules of the game, as a Mafia, you must decide one and only one other player that you want to kill.

Reply in this JSON format:
{
  "myName": "...",
  "myRole": "Civilian or Mafia",
  "thinking": "...",
  "kill": "Name",
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

/**
 * Finds the player with the highest number of votes.
 * If there are multiple players with the highest number of identical times, one of them is randomly selected.
 *
 * @param {Array} votes - An array of player names representing the votes.
 * @return {string} The name of the player with the highest number of votes.
 */
function findMostVotedPlayer(votes) {
  // Create an object to store the vote counts for each player
  const voteCounts = {};

  // Count the occurrences of each player's name
  for (const player of votes) {
      if (voteCounts[player]) {
          voteCounts[player]++;
      } else {
          voteCounts[player] = 1;
      }
  }

  // Find the player(s) with the highest vote count
  let mostVotedPlayers = [];
  let highestCount = 0;

  for (const player in voteCounts) {
      if (voteCounts[player] > highestCount) {
          mostVotedPlayers = [player];
          highestCount = voteCounts[player];
      } else if (voteCounts[player] === highestCount) {
          mostVotedPlayers.push(player);
      }
  }

  // Randomly select one of the most voted players
  const randomIndex = Math.floor(Math.random() * mostVotedPlayers.length);
  return mostVotedPlayers[randomIndex];
}


async function _handleStartGameSkill(event) {

  // todo: add a biography for each player.
  // todo: add an action phase at the start of the game to reveal more information about each player.

  // reset
  players = [
    {name: 'Abigail'},
    {name: 'Xavier'},
    {name: 'Naomi'},
    {name: 'Sebastian'},
    {name: 'Sophia'},
    {name: 'Vis'},
  ]
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

  
  const votes = [];
  window.votes = votes;
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

  const mostVotedPlayerName = findMostVotedPlayer(votes);
  const mostVotedPlayer = players.find((player) => (player.name === mostVotedPlayerName));
  console.log("Most voted player:", mostVotedPlayer);

  // mark most voted player as isOut: true
  players.forEach((player) => {
    if (player === mostVotedPlayer) {
      player.isOut = true;
      player.outReason = 'voted';
    }
  })
  console.log('------ players: ', players);

  events.push(`- ${mostVotedPlayer.name} was voted out, and ${mostVotedPlayer.name} was a ${mostVotedPlayer.role}.`);

  const voteKills = [];
  window.voteKills = voteKills;
  for (let i = 0; i < players.length; i++) {
    const player = players[i];
    if (player.role === 'Mafia' && !player.isOut) {
      const responseObj = await voteKill(player);
      voteKills.push(responseObj.kill);
    }
  }

  const mostVotedKilledPlayerName = findMostVotedPlayer(voteKills);
  const mostVotedKilledPlayer = players.find((player) => (player.name === mostVotedKilledPlayerName));
  console.log("Most voted killed player:", mostVotedKilledPlayer);

  // mark most voted killed player as isOut: true
  players.forEach((player) => {
    if (player === mostVotedKilledPlayer) {
      player.isOut = true;
      player.outReason = 'killed';
    }
  })
  console.log('------ players: ', players);

  events.push(`- ${mostVotedKilledPlayer.name} was killed by Mafia, and ${mostVotedKilledPlayer.name} was a ${mostVotedKilledPlayer.role}.`);

  console.log('------ kill ended')
  console.log('------ players: ', players);
  console.log('------ voteKills: ', voteKills);
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