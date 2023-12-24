import React from 'react'

export default function Input({id,lable, ...props}) {
  return (
    <div>
<p className='control'>
<label htmlFor={id}>{lable}</label>
<input id={id} name={id} required {...props} />
</p>

    </div>
  )
}
