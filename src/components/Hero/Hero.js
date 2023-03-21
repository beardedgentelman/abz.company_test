import { Button } from 'components/ui'

import style from './style/hero.module.scss'

const Hero = () => {
  return (
    <article className={style._content}>
      <div className={style._container}>
        <h1 className={style._title}>Test assignment for front-end developer</h1>
        <p className={style._paragraph}>
          What defines a good front-end developer is one that has skilled knowledge of HTML, CSS, JS with a vast
          understanding of User design thinking as they'll be building web interfaces with accessibility in mind. They
          should also be excited to learn, as the world of Front-End Development keeps evolving.
        </p>
        <a href='#signup'>
          <Button value='Sign up' />
        </a>
      </div>
    </article>
  )
}

export default Hero
