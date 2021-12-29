const exportCorsConfig = () => {
  const whiteURL = ["http://localhost:3000"];
  const corsOption = {
    origin: (origin, callback) => {
      const isWhiteURL = whiteURL.indexOf(origin) !== -1;
      callback(null, isWhiteURL);
    },
    // 로그인 후 세션정보를 클라이언트에게 전달 허용
    // 인증정보를 포함하겠다
    credentials: true,
  };
  return corsOption;
};

export default exportCorsConfig;
