module.exports.generateOTP = () => {
    let chars = "0123456789",
      result = "";
    for (let i = 6; i > 0; --i)
      result += chars[Math.round(Math.random() * (chars.length - 1))];
    console.log("The OTP is: " + result);
    return result;
  };
  