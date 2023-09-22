const sendToken = (res, time, option, token) => {
  res.cookie(option + "Token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development", // Use secure cookies in production(https)
    sameSite: "strict", // Prevent CSRF attacks | telling the browser to include that cookie only in requests that originate from the same site (origin) where the cookie was set.
    maxAge: time,
  });
};

export default sendToken;
