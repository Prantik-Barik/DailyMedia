import React, {useId} from 'react'

const Input = React.forwardRef( function Input({
    label,
    type = "text",
    className = "",
    ...props
}, ref) {
    const id = useId()
    return (
    <div className='w-full'>
        {label && <label
        className='inline-block my-3 pl-1 text-lg font-semibold text-[#8c8a9c]' 
        htmlFor={id}
        >{label}</label>}
        <input
         type = {type}
         className={` px-3 py-2 bg-white text-black outline-none w-full ${className} focus:ring-3 ring-green-500 transition-all duration-300 space-y-5 animate__animated animate__fadeIn`}
         ref = {ref}
         {...props}
         id = {id}
        />
    </div>
  )
})

export default Input
