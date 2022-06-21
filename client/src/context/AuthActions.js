export const LoginStart = (userCredentials) => ({
    type: "LOGIN_START"
})

export const LoginSuccess = (user) => ({
    type: "LOGIN_SUCCESS",
    payload: user,
})

export const LoginSFailure = () => ({
    type: "LOGIN_FAILURE",
});

export const Follow = (userId) => ({
    type: "Follow",
    payload: userId,
})

export const Unfollow = (userId) => ({
    type: "Unfollow",
    payload: userId,
})

export const Logout=()=>({
    type:"LOGOUT",
})