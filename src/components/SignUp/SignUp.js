import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getToken, postUser } from 'api'
import classNames from 'classnames'
import { Form, Formik } from 'formik'
import fetchPositionsRequest from 'services/positions/positionsActions/positionsActions'
import { getUsers } from 'services/usersCards/usersCardsActions/usersCardsActions'
import * as Yup from 'yup'

import { Button, InputFile, InputRadio, InputText, Preloader } from 'components/ui'

import subSuc from '../../assets/images/success-image.svg'

import style from './style/sign-up.module.scss'

const photoWidthAndHeight = provideFile => {
  const imgDimensions = { width: null, height: null }

  return new Promise(resolve => {
    const reader = new FileReader()

    reader.readAsDataURL(provideFile)
    reader.onload = function () {
      const img = new Image()
      img.src = reader.result

      img.onload = function () {
        imgDimensions.width = img.width
        imgDimensions.height = img.height

        resolve(imgDimensions)
      }
    }
  })
}

// eslint-disable-next-line no-unused-vars
const imageDimensionCheck = Yup.addMethod(
  Yup.mixed,
  'imageDimensionCheck',
  function (message, requiredWidth, requiredHeight) {
    return this.test('image-width-height-check', message, async function (value) {
      const { path, createError } = this

      if (!value) {
        return
      }

      const imgDimensions = await photoWidthAndHeight(value)

      if (imgDimensions.width !== requiredWidth) {
        return createError({
          path,
          message: `The file width needs to be the ${requiredWidth}px`
        })
      }

      if (imgDimensions.height !== requiredHeight) {
        return createError({
          path,
          message: `The file height needs to be the ${requiredHeight}px`
        })
      }

      return true
    })
  }
)

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .required('Please type your name')
    .matches(/[a-zA-Z]/, 'Name can only contain latin letters')
    .min(2, 'Name should contain at least 2 characters')
    .max(60, 'Name should not contain more than 60 characters'),
  email: Yup.string()
    .matches(
      // eslint-disable-next-line no-control-regex
      /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/,
      'Invalid email'
    )
    .required('Please type your email')
    .min(2, 'Email should contain at least 2 characters')
    .max(100, 'Email should not contain more than 60 characters'),
  phone: Yup.string().required('Please type your phone number'),
  position: Yup.string().required('Please select position'),
  photo: Yup.mixed()
    .required('Please upload your photo')
    .test('fileSize', 'The file is too large', value => value.size <= 5000000)
    .test('fileType', 'Unsupported file Format', value => ['image/jpg', 'image/jpeg'].includes(value.type))
    .imageDimensionCheck('testWithHeight', 70, 70)
})

const SignUp = () => {
  const dispatch = useDispatch()
  const positions = useSelector(state => state.positionsReducer.positions)
  const [loading, setLoading] = useState(false)
  const [isNameFocus, setIsNameFocus] = useState(false)
  const [isEmailFocus, setIsEmailFocus] = useState(false)
  const [isPhoneFocus, setIsPhoneFocus] = useState(false)
  // eslint-disable-next-line no-unused-vars
  const [success, setSuccess] = useState(false)
  const [status, setStatus] = useState({})

  const statusLength = Object.keys(status).length

  const onChange = (e, setFieldValue) => {
    const { id } = e.target
    setFieldValue('position', id)
  }

  const checkReady = (val, err) => {
    const fullValues = Object.values(val).every(value => value !== null && value !== '')
    const emptyErrors = checkErrors()
    function checkErrors() {
      return Object.keys(err).length === 0
    }
    if (fullValues && emptyErrors) {
      return false
    }
    return true
  }

  useEffect(() => {
    setLoading(true)
    dispatch(fetchPositionsRequest()).then(() => setLoading(false))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {!success && statusLength === 0 ? (
        <article className={style._container} id='signup'>
          <h2 className={style._title}>Working with POST request</h2>
          <Formik
            initialValues={{
              name: '',
              email: '',
              phone: '',
              position: '',
              photo: null
            }}
            validationSchema={SignupSchema}
            onSubmit={async values => {
              const clearPhone = values.phone.replace(/[^\d+]/g, '')
              values.phone = clearPhone
              try {
                const { token, success } = await getToken()
                if (success) {
                  await postUser(values, token, setSuccess, setStatus)
                  console.log(values)
                  dispatch(getUsers(1))
                } else {
                  throw new Error('Failed to get token')
                }
              } catch (error) {
                setStatus(error.message)
              }
            }}
          >
            {({ values, errors, setFieldValue }) => (
              <Form className={style._form}>
                <InputText
                  className={style._input_wrapper}
                  labelClassName={isNameFocus || values.name !== '' ? true : false}
                  id='name'
                  label='Your name'
                  name='name'
                  error={errors.name}
                  errorText={errors.name}
                  onFocus={() => setIsNameFocus(true)}
                  onBlur={() => (!errors.name || values.name === '' ? setIsNameFocus(false) : setIsNameFocus(true))}
                />
                <InputText
                  className={style._input_wrapper}
                  labelClassName={isEmailFocus || values.email !== '' ? true : false}
                  id='email'
                  label='Email'
                  name='email'
                  error={errors.email}
                  errorText={errors.email}
                  onFocus={() => setIsEmailFocus(true)}
                  onBlur={() => (!errors.email || values.email === '' ? setIsEmailFocus(false) : setIsEmailFocus(true))}
                />
                <InputText
                  className={style._input_wrapper}
                  labelClassName={isPhoneFocus || values.phone !== '' ? true : false}
                  id='phone'
                  label='Phone'
                  name='phone'
                  error={errors.phone}
                  errorText={errors.phone}
                  onFocus={() => setIsPhoneFocus(true)}
                  onBlur={() => (!errors.phone || values.phone === '' ? setIsPhoneFocus(false) : setIsPhoneFocus(true))}
                  helperText='+38 (XXX) XXX - XX - XX'
                />
                <p className={classNames(style._title_pos, errors.position && style._title_pos_error)}>
                  Select your position
                </p>
                <div className={style._radio_wrapper}>
                  {loading ? (
                    <Preloader />
                  ) : (
                    positions.map(position => (
                      <InputRadio
                        className={style._radio}
                        onChange={e => onChange(e, setFieldValue)}
                        position={position.name}
                        key={position.id}
                        id={position.id}
                        name={positions.name}
                      />
                    ))
                  )}
                  <span className={classNames(style._pos_helper, errors.position && style._pos_helper_error)}>
                    {errors.position}
                  </span>
                </div>
                <InputFile
                  className={style._file}
                  label='Upload your photo'
                  error={errors.photo}
                  errorText={errors.photo}
                  setFieldValue={setFieldValue}
                />
                <Button
                  type='submit'
                  name='submit'
                  className={style._submit_btn}
                  disabled={checkReady(values, errors)}
                />
              </Form>
            )}
          </Formik>
        </article>
      ) : statusLength > 0 ? (
        <article className={style._container}>
          <h2 className={style._title}>{status.error}</h2>
        </article>
      ) : (
        <article className={style._container}>
          <h2 className={style._title}>User successfully registered</h2>
          <div className={style._success_img_wrapper}>
            <img src={subSuc} alt='Submit success' />
          </div>
        </article>
      )}
    </>
  )
}

export default SignUp
