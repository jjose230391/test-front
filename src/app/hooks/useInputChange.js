import { useState } from 'react'

export const useInputChange = () => {
    const [inputs, setInput] = useState({})

    const handleInputChange = (e) => setInput({
        ...inputs,
        [e.currentTarget.name]: e.currentTarget.value
    })

    return [inputs, handleInputChange]
}