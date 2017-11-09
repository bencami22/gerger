export const setActiveUser = (user) => {
    return {
        type: "USER_LOGGED_IN",
        payload: user
    }
};
