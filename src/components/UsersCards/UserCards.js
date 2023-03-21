import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import classNames from 'classnames'
import { addUsers, getUsers } from 'services/usersCards/usersCardsActions/usersCardsActions'

import { Button, CardUser, Preloader } from 'components/ui'

import style from './style/user_cards.module.scss'

const UserCards = () => {
  const [page, setPage] = useState(null)
  const [loading, setLoading] = useState(false)
  const sectionRef = useRef(null)
  const dispatch = useDispatch()
  const { users, nextPageLink, loading: isLoading, error } = useSelector(state => state.usersReducer)

  const compareRegistrationTimestamps = (user1, user2) => user2.registration_timestamp - user1.registration_timestamp

  const getSetNextPage = () => {
    if (nextPageLink) {
      let nextPage = nextPageLink.split('page=')[1].split('&')[0]
      setPage(Number(nextPage))
    }
  }

  const showMore = () => {
    setLoading(true)
    dispatch(addUsers(page, users))
      .then(() => {
        setLoading(false)
      })
      .then(
        sectionRef.current.scroll({
          top: sectionRef.current.scrollHeight - sectionRef.current.clientHeight,
          behavior: 'smooth'
        })
      )
  }

  const renderUsers = () => {
    return users
      .sort(compareRegistrationTimestamps)
      .map(user => (
        <CardUser
          key={user.id}
          userId={user.id}
          cardPhoto={user.photo}
          userName={user.name}
          userPos={user.position}
          userEmail={user.email}
          userPhone={user.phone}
        />
      ))
  }

  useEffect(() => {
    setLoading(true)
    dispatch(getUsers(1)).then(() => setLoading(false))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    getSetNextPage()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nextPageLink])

  return (
    <article className={style._container} id='users' ref={sectionRef}>
      <h2 className={style._title}>Working with GET request</h2>
      {loading ? (
        <Preloader />
      ) : (
        <>
          <section
            id='cards_section'
            className={style._content}
            style={loading ? { display: 'flex', alignItems: 'center', justifyContent: 'center' } : {}}
          >
            {renderUsers()}
            {error && <p className={style._error}>{error}</p>}
          </section>
        </>
      )}
      {nextPageLink && (
        <Button
          className={classNames(style._btn)}
          name='Show More'
          value='Show More'
          onClick={() => {
            showMore()
          }}
          disabled={isLoading || loading}
        />
      )}
    </article>
  )
}

export default UserCards
