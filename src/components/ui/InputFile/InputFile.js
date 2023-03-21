import { useEffect, useRef, useState } from 'react'
import classNames from 'classnames'

import style from './style/input-file.module.scss'

const InputFile = props => {
  const [file, setFile] = useState(null)
  const ref = useRef(null)
  const isError = props.error

  const handleClick = event => {
    ref.current.click()
  }

  const handleChange = e => {
    const fileUploaded = e.target.files[0]
    setFile(fileUploaded)
    props.setFieldValue('photo', fileUploaded)
  }

  return (
    <>
      <div className={classNames(style._wrapper, props.className)}>
        <button type='button' onClick={handleClick} className={classNames(style._btn, isError && style._error_btn)}>
          Upload
        </button>
        <div className={classNames(style._field_imit, isError && style._error_field_imit)} onClick={handleClick}>
          {file !== null && file !== undefined ? (
            <span>{file.name}</span>
          ) : (
            <span className={style._label}>Upload your photo</span>
          )}
        </div>
        <input type='file' ref={ref} onChange={handleChange} style={{ display: 'none' }} />
      </div>
      {isError && <p className={style._error_helper_text}>{props.errorText}</p>}
    </>
  )
}

export default InputFile
