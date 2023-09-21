const sendToken = (res, time, option, token) => {
  const maxAgeInMilliseconds = time * 60 * 1000;
  res.cookie(option + "Token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development", // Use secure cookies in production
    sameSite: "strict", // Prevent CSRF attacks | telling the browser to include that cookie only in requests that originate from the same site (origin) where the cookie was set.
    maxAge: maxAgeInMilliseconds, // set time to minunts
  });

  console.log(time);
};

export default sendToken;
