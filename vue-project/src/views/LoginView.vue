<template>
    <div class="login-page">
        <!-- People Image -->
        <img
            src="../assets/people-working.svg"
            alt="People working"
            class="people-img"
        />

        <!-- RIGHT SIDE: Login Form Area -->
        <div class="right-panel">
            <div class="login-form-container">
                <!-- Logo Area -->
                <div class="logo-area">
                    <img
                        src="../assets/logo.svg"
                        alt="Artemis Logo"
                        class="logo-img"
                    />
                    <h5>
                        ARTEMIS <span class="light-text">CASE MANAGEMENT</span>
                    </h5>
                </div>

                <p class="subtitle">
                    Welcome back! Please sign in to start your session.
                </p>

                <!-- Error Message Display -->
                <p v-if="errorMessage" class="error-text">{{ errorMessage }}</p>

                <!-- Form -->
                <form @submit.prevent="handleLogin" class="login-form">
                    <div class="input-group">
                        <input
                            type="text"
                            placeholder="Username"
                            v-model="username"
                            required
                            :disabled="loading"
                        />
                    </div>

                    <div class="input-group">
                        <input
                            type="password"
                            placeholder="Password"
                            v-model="password"
                            required
                            :disabled="loading"
                        />
                    </div>

                    <!-- Updated Button with Loading State -->
                    <button type="submit" class="login-btn" :disabled="loading">
                        {{ loading ? "Signing in..." : "Login" }}
                    </button>
                </form>
            </div>
        </div>

        <!-- Footer -->
        <footer class="footer-text">
            Accelerated Research, Trademark Enforcement and Management
            Information System © 2019
        </footer>
    </div>
</template>

<script>
import auth from "../services/auth";

export default {
    name: "LoginView",
    data() {
        return {
            username: "",
            password: "",
            errorMessage: "",
            loading: false,
        };
    },
    methods: {
        async handleLogin() {
            this.errorMessage = ""; // Clear previous errors
            this.loading = true; // Show loading state

            try {
                // 1. Send credentials to the API
                const data = await auth.login(this.username, this.password);

                // 2. Save the token to localStorage
                // (Note: If your fake API doesn't return a token, this might be undefined.
                // We will fix that in the next step if needed).
                localStorage.setItem(
                    "authToken",
                    data.token || "fake-token-123",
                );

                // 3. Format the name for the dashboard (e.g., "mark" -> "Mark")
                const formattedName =
                    this.username.charAt(0).toUpperCase() +
                    this.username.slice(1).toLowerCase();
                localStorage.setItem("loggedInUser", formattedName);

                // 4. Redirect to dashboard
                this.$router.push("/dashboard");
            } catch (error) {
                console.error("Login Error:", error);
                this.errorMessage = "Invalid username or password. Try again!";
            } finally {
                this.loading = false; // Stop loading
            }
        },
    },
};
</script>

<!-- GLOBAL CSS -->
<style>
html,
body {
    margin: 0;
    padding: 0;
    overflow: hidden;
}
</style>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap");

/* --- BASE PAGE & BACKGROUND --- */
.login-page {
    display: flex;
    width: 100%;
    height: 100vh;
    box-sizing: border-box;
    font-family: "Roboto", Arial, Helvetica, sans-serif;
    background-color: #ffffff;

    background-image: url("../assets/login-bg.svg");
    background-size: 57% auto;
    background-position: right top;
    background-repeat: no-repeat;

    position: relative;
    overflow: hidden;
}

/* --- PEOPLE ILLUSTRATION --- */
.people-img {
    position: absolute;
    left: 0.5%;
    top: 44.3%;
    transform: translateY(-50%);
    width: 45%;
    height: auto;
    z-index: 1;
}

/* --- RIGHT PANEL --- */
.right-panel {
    width: 50%;
    height: 100%;
    margin-left: auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding-top: calc(38.2vh - 198px);
    box-sizing: border-box;
    position: relative;
    z-index: 2;
}

/* --- FORM --- */
.login-form-container {
    width: 400px;
    max-width: 100%;
    text-align: center;
}

/* Logo Area */
.logo-area {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.logo-img {
    width: 120px;
    height: auto;
    margin: 0 0 20px;
}

.logo-area h5 {
    width: 100%;
    color: #3e88da;
    margin: 0 0 12px;
    font-size: 36px;
    font-weight: 500;
    line-height: 38.4px;
    letter-spacing: 4px;
}

.light-text {
    color: #141517;
    font-weight: 700;
    font-size: 13px;
    letter-spacing: 1.5px;
}

.subtitle {
    color: #a1a2aa;
    font-size: 16px;
    line-height: 1.4;
    margin: 0 0 20px;
    font-weight: 400;
}

/* Error Message */
.error-text {
    color: #d9534f;
    font-size: 13px;
    margin-bottom: 15px;
    font-weight: 500;
}

/* Inputs */
.input-group {
    margin-bottom: 24px;
}

.input-group:last-of-type {
    margin-bottom: 20px;
}

.input-group input {
    display: block;
    width: 326px;
    max-width: 100%;
    height: 38px;
    margin: 0 auto;
    padding: 6px 12px;
    border: 1px solid #ced4da;
    background-color: #ffffff;
    border-radius: 4px;
    font-size: 14px;
    font-family: "Roboto", Arial, Helvetica, sans-serif;
    color: #000;
    box-sizing: border-box;
    outline: none;
    transition: all 0.3s ease;
}

.input-group input:focus {
    border-color: #2b579a;
    box-shadow: 0 0 5px rgba(43, 87, 154, 0.25);
}

/* Button */
.login-btn {
    width: 150px;
    height: 33px;
    padding: 0;
    background-color: #2b579a;
    color: white;
    border: none;
    border-radius: 25px;
    font-size: 14px;
    font-family: "Roboto", Arial, Helvetica, sans-serif;
    font-weight: 700;
    letter-spacing: 1px;
    cursor: pointer;
    transition: background-color 0.3s;
    margin: 0;
}

.login-btn:hover {
    background-color: #1e3f70;
}

.login-btn:disabled {
    background-color: #8c9db5;
    cursor: not-allowed;
}

/* Footer */
.footer-text {
    position: absolute;
    right: 0;
    bottom: 50px;
    width: 57%;
    padding: 0 0 0 51px;
    box-sizing: border-box;
    text-align: center;
    font-size: 12.5px;
    line-height: 1.4;
    color: #515365;
    font-weight: 400;
    z-index: 2;
}

@media (max-width: 1600px) {
    .logo-area h5 {
        font-size: 32px;
    }
    .light-text {
        font-size: 12px;
    }
    .footer-text {
        font-size: 12px;
    }
}
</style>
