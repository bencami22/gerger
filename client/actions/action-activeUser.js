export const setActiveUser = (user) => {
    console.log("activeUser: " + user);
    return {
        type: "USER_LOGGED_IN",
        payload: user
    }
};
