import jwt from "jsonwebtoken";

const createTokenWithCookies = (userID, res) => {
  const token = jwt.sign({ userID }, process.env.JWT_TOKEN, {
    expiresIn: "5d",
  });

  res.cookie("jwt", token, {
    httpOnly: true, //protects from xss attack
    secure: true,
    sameSite: "strict", //protects from csrf attack
  });
};

export default createTokenWithCookies;
