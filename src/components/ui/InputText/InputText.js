import InputMask from 'react-input-mask'
import classNames from 'classnames'
import { Field } from 'formik'

import style from './style/input-text.module.scss'

const Input = props => {
  const isError = props.error

  return (
    <div className={props.className}>
      <div className={style._wrapper}>
        <label
          className={classNames(
            style._label,
            props.labelClassName === true ? style._focus_label : '',
            isError ? style._error_label : ''
          )}
          htmlFor={props.id}
        >
          {props.label}
        </label>
        {props.id === 'phone' ? (
          <Field name='phone'>
            {({ field }) => (
              <InputMask
                {...field}
                mask='+38 (099) 999-99-99'
                className={classNames(style._field, isError && style._error_field)}
                id={props.id}
                type='text'
                onFocus={props.onFocus}
                onBlur={props.onBlur}
              />
            )}
          </Field>
        ) : (
          <Field
            className={classNames(style._field, isError && style._error_field)}
            name={props.name}
            id={props.id}
            type='text'
            onFocus={props.onFocus}
            onBlur={props.onBlur}
          />
        )}
      </div>
      {props.id === 'phoneNumber' ? (
        <span className={classNames(style._helper_text, isError && style._error_helper_text)}>
          {isError ? props.errorText : props.helperText}
        </span>
      ) : (
        isError && (
          <span className={classNames(style._helper_text, isError && style._error_helper_text)}>
            {isError ? props.errorText : undefined}
          </span>
        )
      )}
      {isError && (
        <span className={classNames(style._helper_text, isError && style._error_helper_text)}>
          {isError ? props.errorText : undefined}
        </span>
      )}
    </div>
  )
}

export default Input
