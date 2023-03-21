import { Link } from 'react-router-dom'

import { Button } from 'components/ui'

import logo from '../../assets/images/Logo.svg'

import style from './style/header.module.scss'

const Header = () => {
  return (
    <header className={style._header}>
      <div className={style._container}>
        <Link className={style._logo}>
          <img src={logo} alt='Logo' />
        </Link>
        <div className={style._btn_container}>
          <a href='#users'>
            <Button value='Users' />
          </a>
          <a href='#signup'>
            <Button value='Sign up' />
          </a>
        </div>
      </div>
    </header>
  )
}

export default Header
