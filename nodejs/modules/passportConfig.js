import passport from "passport";
import passportLocal from "passport-local";
import USER from "../models/user.js";

export const exportPassport = (app) => {
  /** 이 app.use는 app.js에서 router 위에 있어야한다.. */
  app.use(passport.initialize()); // passprot start
  app.use(passport.session()); // passport와 session을 연결

  /** 이 아래는 router 아래여도 상관없다 */
  /**
   * Serialize
   * 로그인에 성공했을 때 호출
   */
  // user값은 뒤에서 추가 할 각 전략의 결과 값을 done 으로 보낸 값이다.
  // 보통 로그인에 성공한 사용자의 프로필 정보
  passport.serializeUser((user, done) => {
    // done 을 호출하게되면 session에 사용자 정보가 저장되고
    // 두번째 인자로 전달한 user가 deserializeUser로 전달된다
    console.log("passport serializeUser 완료");
    done(null, user);
  });

  /** Deserialize
   * client에서 서버로 세션이 유효한지 요청이 있을 때마다 호출
   */
  passport.deserializeUser((user, done) => {
    // done의 두번째 인자로 user를 전달하게되면
    // req.usre로 user의 값을 접글할 수 있게된다.
    console.log("user info : ", user);
    done(null, user);
  });

  // local login 정책을 수행하는 모듈
  const LocalStratege = passportLocal.Strategy;

  /** use
   * 로그인을 실제 수행하는 함수
   */
  passport.use(
    new LocalStratege(
      {
        usernameField: "userId",
        passwordField: "password",
        session: true, // 세션 저장여부
      },
      async (userId, password, done) => {
        // DB 연동
        // @가 붙었는지 확인하라
        // console.log("userID값: ", userId);
        const firstChar = userId.charAt(0);
        if (firstChar !== "@") {
          userId = "@" + userId;
        }

        // const user = await USER.findOne({ userId });
        // console.log("user값: ", user);
        // if (!user) {
        //   console.log("존재하지 않는 아이디 입니다");
        //   return done(null, false, { message: "Incorrect userId" });
        // }
        // if (user.password != password) {
        //   console.log("비밀번호가 일치하지 않습니다");
        //   return done(null, false, { message: "Incorrect password" });
        // }

        const user = await USER.findByUserId(userId);
        if (!user) {
          console.log("존재하지 않는 아이디 입니다");
          return done(null, false, { message: "Incorrect userId" });
        }
        const valid = await user.checkedPassword(password);
        if (!valid) {
          console.log("비밀번호가 일치하지 않습니다");
          return done(null, false, { message: "Incorrect password" });
        }

        console.log("userId, password 일치");
        return done(null, user);
        /**
         * login이 성공했을 경우
         * done() 함수의 2번째 매개변수에
         * 로그인 정보를 담아주면
         * router 에서 req.user 객체가 생성되고
         * 로그인한 정보를 추출할 수 있다.
         */
      }
    )
  );
};

export default exportPassport;
