
const getUserAccessToken = () => {
  return localStorage.getItem("user_access_token");
};


const setUserAccessToken = (token) => {
  localStorage.setItem("user_access_token", token);
};

const initiateAuth = (setIsLogin) =>{
  if (getUserAccessToken()){
    setIsLogin(true);
  }
}

const logout = (setIsLogin) =>{
 localStorage.clear();
 setIsLogin(false);
}

export {
  getUserAccessToken,
  setUserAccessToken,
  initiateAuth,
  logout,
};


