const fetch_option = (user) => {
  return {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  };
};

export const LoginFetch = async (user) => {
  const option = fetch_option(user);
  const res = await fetch(`/users/login`, option);
  return res;
};

// 여기 오타있어요 jogin -> join
export const JoginFetch = async (user) => {
  const option = fetch_option(user);
  await fetch(`/users/join`, option);
};

export const UserCheck = async () => {
  const res = await fetch(`/users/check`);
  const user = await res.json();
  return user;
};
