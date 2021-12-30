import session from "express-session";

const sessionConfig = (app) => {
  // 세션 만료 기간 : 1일
  // 1시간 = 60 * 60 * 1000
  const oneDay = 1000 * 60 * 60 * 24;

  // secret은 .env 에서 가져온다
  app.use(
    session({
      secret: process.env["SESSION_SECRET"],
      cookie: { secure: false, httpOnly: false, maxAge: oneDay },
      // 세션을 (변경되지 않아도) 언제나 저장할 것인가? false 권장
      resave: false,
      saveUninitialized: true,
    })
  );
};

export default sessionConfig;
