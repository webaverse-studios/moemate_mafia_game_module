const React = window.react;
const ReactDOM = window.ReactDOM;
const Icon = window.Icon;
const classnames = window.classnames;
const styles = window.styles.ChatInput;

const { useState, useEffect } = React;
const { createPortal } = ReactDOM;

export const PromptSelector = ({onChat, value, setValue}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [level, setLevel] = useState('intermediate');
  const [type, setType] = useState('single-choice');
  const [point, setPoint] = useState('tenses');

  const domActions = document.querySelector('.'+styles.actions)

  const togglePopup = () => {
    setIsOpen(!isOpen);
  }

  const startGame = async () => {
    window.hooks.emitSync("character:reset");
    window.hooks.emitSync("character:processing");
    const name = window.companion.GetCharacterAttribute('name');
    await window.hooks.emit('mafia_game:handle_start_game_skill', {name, level, point});
    window.hooks.emitSync("character:standby"); // todo: not correct timing
  }

  return (
    <>
      {isOpen &&
        <div className={styles.emojiPickerWrap} style={{color:'white'}}>

          <button onClick={startGame}>Start Game</button>

        </div>
      }
      {domActions && createPortal(
        <button onClick={togglePopup} className={classnames(styles.chatButton, isOpen && styles.active)}>
          <Icon icon={"ai"} iconClass={classnames(styles.icon)} />
        </button>,
        domActions
      )}
    </>

  )
}