import classNames from 'classnames'

import style from './style/input-radio.module.scss'

const InputRadio = props => {
  return (
    <label htmlFor={props.id} className={classNames(style._radio_label, props.className)}>
      <input
        className={style._radio_input}
        type='radio'
        name='position'
        id={props.id}
        value={props.position}
        onChange={props.onChange}
      />
      <span className={style._custom_radio} />
      <span className={style._text}>{props.position}</span>
    </label>
  )
}

export default InputRadio
