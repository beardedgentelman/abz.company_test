import classNames from 'classnames'

import style from './style/button.module.scss'

const Button = props => {
  return (
    <input
      type={props.type ? props.type : 'button'}
      name={props.name}
      value={props.value}
      className={classNames(style._btn, props.disabled && style._disable, props.className)}
      onClick={props.onClick}
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
      disabled={props.disabled}
    />
  )
}

export default Button
