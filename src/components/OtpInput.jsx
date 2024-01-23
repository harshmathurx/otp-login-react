import { useEffect, useRef, useState } from "react"

const OtpInput = ({ length = 4, onOtpSubmit = () => {} }) => {

    const [otp, setOtp] = useState(new Array(length).fill(""))

    const inputRefs = useRef([])

    useEffect(() => {
        if (inputRefs.current[0]) {
            inputRefs.current[0].focus()
        }
    }, [])

    const handleInputChange = (index, event) => {
        const value = event.target.value;
        if (isNaN(value)) return;

        const newOtp = [...otp];

        newOtp[index] = value.substring(value.length - 1)
        setOtp(newOtp)

        const combinedOtp = newOtp.join("")
        if (combinedOtp.length === length) {
            onOtpSubmit(combinedOtp)
        }

        if (value && index < length - 1 && inputRefs.current[index + 1]) {
            inputRefs.current[index + 1].focus()
        }
    }

    const handleInputClick = (index) => {
        inputRefs.current[index].setSelectionRange(1, 1)

        // optional 
        if (index > 0 && !otp[index - 1]) {
            inputRefs.current[otp.indexOf("")].focus()
        }
    }

    const handleInputKeyDown = (index, e) => {
        if (e.key === "Backspace" && !otp[index] && index > 0 && inputRefs.current[index - 1]) {
            inputRefs.current[index - 1].focus()
        }
    }

    return (
        <div>
            {otp.map((singleInput, index) => (
                <input key={index} type="text" value={singleInput} onChange={(e) => handleInputChange(index, e)}
                    ref={(input) => inputRefs.current[index] = input}
                    onClick={() => handleInputClick(index)}
                    onKeyDown={(event) => handleInputKeyDown(index, event)}
                    className="otpInput"
                />
            ))}
        </div>
    )
}
export default OtpInput