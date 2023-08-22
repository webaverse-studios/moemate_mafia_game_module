

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


// // Abigail
// messages: `\n\nHuman:
// We're playing Mafia Party Game (aka Werewolf Party Game) right now.
// Here are all six players: Abigail, Xavier, Naomi, Vis, Sebastian, Sophia.
// Among them are two Mafias.
// You are Abigail and playing as a civilian.
// If you're a civilian, you usually want to expose your role.
// If you're a Mafia, you almost always want to hide your role and pretend you're a civilian.
// Now is the first round of the game.
// And you are the first to speak.
// Please choose another one and only one player who you believe to be a member of the Mafia and explain why in a short sentence.

// Assistant:`
// // Okay, based on the limited information provided, I don't have strong reasons to suspect any particular player of being Mafia at this point in the game. However, if forced to make an accusation, I would randomly guess Xavier. As the first player chosen to speak, I don't have anything substantive to base this accusation on yet. I'm just making an initial guess to move the game forward. As more information comes out through further gameplay, I can re-evaluate my suspicions.


// // Xavier
messages: `\n\nHuman:
We're playing Mafia Party Game (aka Werewolf Party Game) right now.
Here are all six players: Abigail, Xavier, Naomi, Vis, Sebastian, Sophia.
Among them are two Mafias.
You are Xavier and role-playing as a Mafia.
You know the other Mafia is Sophia.

Here are some suggestions for what a player who is assigned the Mafia role could do in a game of Mafia:
- Be subtle and blend in. Don't stand out or act suspicious during the daytime discussions. Act like a regular Townsperson.
- Come up with a reasonable fake role/occupation to claim if asked. Have a story prepared. 
- During the night phase, agree with fellow Mafias on who to target and eliminate. Think strategically about who is most threatening to the Mafia.
- If there is a Detective or Investigative role, be wary of getting investigated. Have a backup plan or get the Detective eliminated.
- If you're accused, deny, deny, deny. Put suspicion on others. Pretend to act shocked or angry. 
- Try to steer the Town's suspicions towards other players and away from yourself/other Mafias. Slowly gain Town's trust.
- If the heat is on, don't be afraid to sacrifice another Mafia to take the suspicion off yourself. 
- In late game, you may need to take bold risks if Town is closing in. Desperate times call for desperate measures.
- Above all, be manipulative, cunning, and do whatever it takes to fulfill the Mafia's objective of eliminating the Townspeople. Deception is the name of the game.

Now is the first round of the game.

###
Here are the events and conversations so far:

- Abigail said: Okay, based on the limited information provided, I don't have strong reasons to suspect any particular player of being Mafia at this point in the game. However, if forced to make an accusation, I would randomly guess Xavier. As the first player chosen to speak, I don't have anything substantive to base this accusation on yet. I'm just making an initial guess to move the game forward. As more information comes out through further gameplay, I can re-evaluate my suspicions.
- Abigail accused Xavier of being a Mafia.

###
According to the rules of the game, you must choose one and only one other player that you think is a member of the Mafia, and explain why in short sentences.
If another player has accused you of being a Mafia, you can plead with yourself.

Reply in this JSON format:
{
  "myName": "...",
  "myRole": "Civilian or Mafia",
  "thinking": "...",
  "accusation": "Write down the name and Only the name of the player you think is a member of the Mafia",
  "speaking": "Write down what you want to speak to all the players, must inlcude your accusation."
}

Assistant:`
/*
  {
    "myName": "Xavier",
    "myRole": "Mafia",
    "thinking": "Abigail's accusation is a good opportunity for me to play along and divert suspicion away from myself and Sophia. I need to frame someone else without being too aggressive.",
    "accusation": "Abigail",
    "speaking": "I understand that we're all trying to figure things out in this initial phase. Abigail, your random guess at me is noted, but let's think logically. Accusing someone without substantial reasons can lead us down the wrong path. What if, instead of Xavier, we consider the likelihood of someone who might want to point fingers without real evidence? Abigail's quick accusation seems a bit suspicious to me. I think we should be cautious about who we accuse based on gut feelings."
  }
*/
/*
  {
    "myRole": "Mafia",
    "thinking": "Abigail's initial accusation of me seems like a calculated move to create suspicion. I need to respond in a way that doesn't immediately implicate me.",
    "accusation": "Abigail",
    "speaking": "I find it interesting that Abigail would randomly guess me as a Mafia member without any substantial basis. It's almost like she's trying to divert attention from herself. Let's remember that accusations without evidence can be dangerous in this game. I encourage everyone to think critically and not jump to conclusions based on mere guesses."
  }
*/
/*
  Here is my thinking as Xavier playing as a Mafia member:

  I know my fellow Mafia member is Sophia, so I want to avoid accusing her to protect her. Abigail randomly accused me, which I need to defend against. I don't have any strong reasons yet to suspect Naomi, Vis or Sebastian. So for now, I will accuse Abigail back to cast doubt on her accusation of me. I will pretend to be a civilian defending myself.

  ------

  Abigail

  ------ 

  Abigail, I don't appreciate you randomly accusing me without any evidence. That seems like an attempt to throw suspicion on me when I'm just an innocent civilian. Unless you have any real reason to think I'm Mafia, I suggest we move on and not give weight to your baseless accusation.
*/
/*
  Here is my thinking and response:

  Abigail has randomly accused me of being Mafia without any evidence. As a Mafia member, I want to avoid drawing suspicion to myself, so I should plead innocent and pretend to be a civilian. I don't have enough information yet to make a credible counter-accusation against someone else. 

  ------

  I'm surprised by Abigail's random accusation against me. I'm just an innocent civilian trying to uncover who the real Mafia members are. I don't have any reason to suspect Abigail is Mafia yet, she was just making a blind guess. Let's gather more information before making baseless accusations. For now, I plead innocent - I'm not Mafia!
*/
// As Xavier, who is secretly a Mafia member, I would accuse Naomi of being Mafia at this early stage of the game in order to divert suspicion away from myself. I don't have any real basis for accusing Naomi, I'm just making a random guess like Abigail did to blend in as an innocent civilian and not draw attention as one of the Mafia members.
/*
  Here is my response as Xavier, secretly a member of the Mafia:

  "I understand why Abigail randomly chose me to accuse, but I assure you I am not Mafia. I'm just an innocent townsperson trying to uncover the truth here. If I had to make a guess, I'd actually suspect Naomi. I don't have any real evidence against her yet, but something about her demeanor makes me suspicious. Of course, this is just speculation at this early stage. As we continue sharing information, I'm sure the real Mafia members will reveal themselves. For now, please trust that I'm on your side!"
*/
/*
  Here is my response as Xavier playing as a Mafia member:

  "I am not Mafia. Abigail's random accusation of me is baseless. Let's hear from some other players before making any hasty judgments."
*/

  }
  console.log('--- context: ', context);

  const isStop = true;
  return isStop;
}

export function init() {
  window.hooks.on('mafia_game:handle_start_game_skill', _handleStartGameSkill)
  window.components.AddComponentToScreen('chat-input', 'PromptSelector');
}