import { Hero, SignUp } from 'components'
import UserCards from 'components/UsersCards/UserCards'

import style from './style/main.module.scss'

const Main = props => {
  return (
    <main className={style._content}>
      <Hero />
      <UserCards />
      <SignUp />
    </main>
  )
}

export default Main
