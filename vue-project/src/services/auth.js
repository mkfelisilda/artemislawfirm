import api from "./api";

export default {
    async login(username, password) {
        // We are asking the server: "Find a user where username=XXX and password=YYY"
        const response = await api.get("/users", {
            params: {
                username: username,
                password: password,
            },
        });

        if (response.data.length === 0) {
            throw new Error("Invalid credentials");
        }

        const user = response.data[0];
        return {
            token: "fake-jwt-token-" + user.id,
            user: user,
        };
    },

    logout() {
        localStorage.removeItem("authToken");
        localStorage.removeItem("loggedInUser");
    },
};
