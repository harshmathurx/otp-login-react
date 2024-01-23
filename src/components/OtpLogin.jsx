import { useState } from "react"
import OtpInput from "./OtpInput"

const OtpLogin = () => {

  const [phoneNumber, setPhoneNumber] = useState("")
  const [showOtpInput, setShowOtpInput] = useState(false)

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value)
  }

  const handlePhoneNumberSubmit = (event) => {
    event.preventDefault()
    const regex = /[^0-9]/g
    if (phoneNumber.length < 10 || regex.test(phoneNumber) || phoneNumber.length > 10) {
      alert("Invalid Phone Number");
      return;
    }
    setShowOtpInput(true)
  }

  return (
    <div>
      {!showOtpInput ? (
        <form onSubmit={handlePhoneNumberSubmit}>
          <input
            type="text"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            placeholder="Enter Phone Number"
          />
          <button type="submit">Submit</button>
        </form>
      ) : (
        <div>
          <p>Enter the OTP sent to {phoneNumber}</p>
          <OtpInput length={6} onOtpSubmit={(otp) => {
            alert("otp submitted: ",otp)
          }} />
        </div>
      )}
    </div>
  )
}
export default OtpLogin