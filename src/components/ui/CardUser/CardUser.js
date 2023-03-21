import { useState } from 'react'
import { Tooltip } from 'react-tooltip'
import classNames from 'classnames'

import emptyImg from '../../../assets/images/photo-cover.svg'

import style from './style/card_user.module.scss'

const CardUser = props => {
  const [showNameTooltip, setShowNameTooltip] = useState(false)
  const [showPosTooltip, setShowPosTooltip] = useState(false)
  const [showEmailTooltip, setShowEmailTooltip] = useState(false)
  const [showPhoneTooltip, setShowPhoneTooltip] = useState(false)
  const textPreloader = <div className={style._text_preloader}></div>
  const tooltipStyle = {
    opacity: '1',
    padding: '3px 16px',
    background: 'rgba(0, 0, 0, 0.87)',
    borderRadius: '4px',
    fontFamily: 'Nunito',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: '16px',
    lineHeight: '26px'
  }
  const checkOverflow = el => {
    if (el.offsetWidth < el.scrollWidth) {
      return true
    }
    return false
  }

  return (
    <div className={style._wrapper}>
      <div className={style._photo_wrapper}>
        <img
          loading='lazy'
          className={style._photo}
          src={props.cardPhoto ? props.cardPhoto : emptyImg}
          alt={props.name}
          onError={e => {
            e.target.onerror = null
            e.target.src = emptyImg
          }}
        />
      </div>
      {props.userName ? (
        <>
          <p
            data-tooltip-id={`${props.userId} + ${props.userName}`}
            data-tooltip-content={props.userName}
            data-tooltip-place='bottom'
            className={classNames(style._name, style._text)}
            onMouseEnter={e => {
              if (e.target && checkOverflow(e.target)) {
                setShowNameTooltip(true)
              }
            }}
            onMouseLeave={() => {
              setTimeout(() => {
                setShowNameTooltip(false)
              }, 3000)
            }}
          >
            {props.userName}
          </p>
          <Tooltip
            id={`${props.userId} + ${props.userName}`}
            clickable
            noArrow
            offset={21}
            style={showNameTooltip ? tooltipStyle : { display: 'none' }}
          />
        </>
      ) : (
        textPreloader
      )}
      {props.userPos ? (
        <>
          <p
            data-tooltip-id={`${props.userId} + ${props.userPos}`}
            data-tooltip-content={props.userPos}
            data-tooltip-place='bottom'
            className={classNames(style._pos, style._text)}
            onMouseEnter={e => {
              if (e.target && checkOverflow(e.target)) {
                setShowPosTooltip(true)
              }
            }}
            onMouseLeave={() => {
              setTimeout(() => {
                setShowPosTooltip(false)
              }, 3000)
            }}
          >
            {props.userPos}
          </p>
          <Tooltip
            id={`${props.userId} + ${props.userPos}`}
            clickable
            noArrow
            offset={21}
            style={showPosTooltip ? tooltipStyle : { display: 'none' }}
          />
        </>
      ) : (
        textPreloader
      )}
      {props.userEmail ? (
        <>
          <p
            data-tooltip-id={`${props.userId} + ${props.userEmail}`}
            data-tooltip-content={props.userEmail}
            data-tooltip-place='bottom'
            className={classNames(style._email, style._text)}
            onMouseEnter={e => {
              if (e.target && checkOverflow(e.target)) {
                setShowEmailTooltip(true)
              }
            }}
            onMouseLeave={() => {
              setTimeout(() => {
                setShowEmailTooltip(false)
              }, 3000)
            }}
          >
            {props.userEmail}
          </p>
          <Tooltip
            id={`${props.userId} + ${props.userEmail}`}
            clickable
            noArrow
            offset={21}
            style={showEmailTooltip ? tooltipStyle : { display: 'none' }}
          />
        </>
      ) : (
        textPreloader
      )}
      {props.userPhone ? (
        <>
          <p
            data-tooltip-id={`${props.userId} + ${props.userPhone}`}
            data-tooltip-content={props.userPhone}
            data-tooltip-place='bottom'
            className={classNames(style._phone, style._text)}
            onMouseEnter={e => {
              if (e.target && checkOverflow(e.target)) {
                setShowPhoneTooltip(true)
              }
            }}
            onMouseLeave={() => {
              setTimeout(() => {
                setShowPhoneTooltip(false)
              }, 3000)
            }}
          >
            {props.userPhone}
          </p>
          <Tooltip
            id={`${props.userId} + ${props.userPhone}`}
            clickable
            noArrow
            offset={21}
            style={showPhoneTooltip ? tooltipStyle : { display: 'none' }}
          />
        </>
      ) : (
        textPreloader
      )}
    </div>
  )
}

export default CardUser
