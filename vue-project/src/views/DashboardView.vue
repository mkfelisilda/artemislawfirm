<template>
    <div class="dashboard-layout">
        <!-- TOP NAVIGATION BAR -->
        <header class="top-nav">
            <div class="nav-left">
                <img src="../assets/logo.svg" alt="Logo" class="nav-logo" />
                <span v-if="!sidebarOpen" class="nav-title"
                    >ARTEMIS <span class="divider">|</span> CM</span
                >
                <span v-else class="nav-title">CASE MANAGEMENT</span>
            </div>

            <div class="nav-right">
                <div class="user-profile" @click="toggleDropdown">
                    <div class="avatar-placeholder"></div>
                    <span class="user-name">{{ currentUser }}</span>
                    <span class="dropdown-arrow">▼</span>
                </div>
                <div class="icon-envelope">✉</div>

                <div v-if="isDropdownOpen" class="profile-dropdown">
                    <a
                        href="#"
                        class="dropdown-item"
                        @click.prevent="alert('Profile page coming soon!')"
                        >User Profile</a
                    >
                    <a
                        href="#"
                        class="dropdown-item logout-text"
                        @click.prevent="handleLogout"
                        >Logout</a
                    >
                </div>
            </div>
        </header>

        <div class="main-body">
            <div class="sidebar-slot">
                <aside
                    class="sidebar"
                    :class="{ expanded: sidebarOpen }"
                    @mouseenter="sidebarOpen = true"
                    @mouseleave="sidebarOpen = false"
                >
                    <nav class="sidebar-group">
                        <a
                            v-for="item in menuItems"
                            :key="item.key"
                            href="#"
                            class="sidebar-item"
                            :class="{ active: $route.path === item.path }"
                            @click.prevent="$router.push(item.path)"
                        >
                            <span class="sidebar-icon">{{ item.icon }}</span>
                            <span class="sidebar-label">{{ item.label }}</span>
                        </a>
                    </nav>

                    <nav class="sidebar-group campaigns">
                        <div v-for="c in campaigns" :key="c.key">
                            <a
                                href="#"
                                class="sidebar-item"
                                :class="{ active: activeCampaign === c.key }"
                                @click.prevent="toggleCampaign(c.key)"
                            >
                                <span class="sidebar-icon"
                                    ><span
                                        class="campaign-dot"
                                        :style="{ backgroundColor: c.color }"
                                    ></span
                                ></span>
                                <span class="sidebar-label">{{ c.label }}</span>
                            </a>

                            <transition name="slide-fade">
                                <div
                                    v-if="
                                        activeCampaign === c.key && sidebarOpen
                                    "
                                    class="sub-menu"
                                >
                                    <router-link
                                        :to="{
                                            path: '/data',
                                            query: { campaign: c.key },
                                        }"
                                        class="sub-item"
                                        >Go to Data</router-link
                                    >
                                    <router-link
                                        :to="{
                                            path: '/cases',
                                            query: { campaign: c.key },
                                        }"
                                        class="sub-item"
                                        >Go to Cases Page</router-link
                                    >
                                </div>
                            </transition>
                        </div>
                    </nav>
                </aside>
            </div>

            <main class="content-area">
                <div class="page-header">
                    <div>
                        <h1 class="page-title">Case Management Dashboard</h1>
                        <div class="date-range">
                            May 2026 - October 2026
                            <a href="#" class="change-date">Change Date</a>
                        </div>
                    </div>
                    <div class="header-dropdown">
                        <select>
                            <option>Fetching Campaigns</option>
                        </select>
                    </div>
                </div>

                <div class="dashboard-grid">
                    <div class="left-column">
                        <div class="card">
                            <h2 class="card-title">Top Infringing Platforms</h2>
                            <div class="platform-list">
                                <div class="platform-item">
                                    <span class="platform-logo">W</span> WISH
                                    <span class="dots">....</span>
                                </div>
                                <div class="platform-item">
                                    <span class="platform-logo">A</span> ALIBABA
                                    <span class="dots">....</span>
                                </div>
                                <div class="platform-item">
                                    <span class="platform-logo">a</span> AMAZON
                                    <span class="dots">....</span>
                                </div>
                            </div>
                            <div class="chart-placeholder donut-chart"></div>
                        </div>
                        <div class="card">
                            <h2 class="card-title">Infringement Progress</h2>
                            <table class="data-table">
                                <thead>
                                    <tr>
                                        <th>Entity Name</th>
                                        <th>Found</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="i in 4" :key="i">
                                        <td><input type="checkbox" /></td>
                                        <td>---</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="right-column">
                        <div class="card report-card">
                            <h2 class="card-title">Case Reports</h2>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </div>
</template>

<script>
export default {
    name: "DashboardView",
    data() {
        return {
            currentUser: "Admin",
            sidebarOpen: false,
            activeCampaign: null,
            isDropdownOpen: false,
            menuItems: [
                {
                    key: "dashboard",
                    label: "Dashboard",
                    icon: "▦",
                    path: "/dashboard",
                },
                {
                    key: "review",
                    label: "For Review Data",
                    icon: "📋",
                    path: "/review",
                },
                {
                    key: "checker",
                    label: "Data Checker",
                    icon: "✔",
                    path: "/checker",
                },
            ],
            campaigns: [
                {
                    key: "nestle",
                    label: "Nestle (Test Campaign)",
                    color: "#2b579a",
                },
                {
                    key: "romoss",
                    label: "Romoss (Test Campaign)",
                    color: "#12a5a5",
                },
            ],
        };
    },
    created() {
        // Fix: Check URL first, then fall back to localStorage
        if (this.$route.query.user) {
            this.currentUser = this.$route.query.user;
            localStorage.setItem("loggedInUser", this.currentUser);
        } else if (localStorage.getItem("loggedInUser")) {
            this.currentUser = localStorage.getItem("loggedInUser");
        }
    },
    methods: {
        toggleCampaign(campaignKey) {
            this.activeCampaign =
                this.activeCampaign === campaignKey ? null : campaignKey;
        },
        toggleDropdown() {
            this.isDropdownOpen = !this.isDropdownOpen;
        },
        handleLogout() {
            this.isDropdownOpen = false;
            localStorage.removeItem("loggedInUser"); // Clear memory
            this.$router.push("/");
        },
    },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap");
.dashboard-layout {
    display: flex;
    flex-direction: column;
    height: 100vh;
    font-family: "Montserrat", sans-serif;
    background-color: #f4f7f9;
}
.top-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    background-color: white;
    border-bottom: 1px solid #e0e6ed;
    padding: 0 20px;
    z-index: 100;
}
.nav-left {
    display: flex;
    align-items: center;
    gap: 10px;
}
.nav-logo {
    width: 30px;
}
.nav-title {
    font-size: 16px;
    font-weight: 700;
    color: #2b579a;
    letter-spacing: 2px;
}
.divider {
    color: #b0c4de;
    font-weight: 300;
}
.nav-right {
    display: flex;
    align-items: center;
    gap: 20px;
    position: relative;
}
.user-profile {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 13px;
    font-weight: 600;
    color: #2b579a;
    cursor: pointer;
    padding: 5px 10px;
    border-radius: 4px;
    transition: background-color 0.2s;
}
.user-profile:hover {
    background-color: #f4f7f9;
}
.avatar-placeholder {
    width: 30px;
    height: 30px;
    background-color: #a0c4ff;
    border-radius: 50%;
}
.icon-envelope {
    color: #8c9db5;
    font-size: 18px;
}
.profile-dropdown {
    position: absolute;
    top: 55px;
    right: 50px;
    background-color: white;
    border: 1px solid #e0e6ed;
    border-radius: 6px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    width: 180px;
    z-index: 999;
    display: flex;
    flex-direction: column;
    padding: 8px 0;
}
.dropdown-item {
    padding: 10px 20px;
    font-size: 13px;
    color: #1a2a3a;
    text-decoration: none;
    font-weight: 500;
    transition: background-color 0.2s;
}
.dropdown-item:hover {
    background-color: #f4f7f9;
    color: #2b579a;
}
.logout-text {
    color: #d9534f;
}
.logout-text:hover {
    background-color: #ffeaea;
    color: #d9534f;
}
.main-body {
    display: flex;
    flex: 1;
    overflow: hidden;
    position: relative;
}
.sidebar-slot {
    position: relative;
    width: 60px;
    flex-shrink: 0;
    z-index: 50;
}
.sidebar {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 60px;
    background-color: white;
    border-right: 1px solid #e0e6ed;
    padding-top: 10px;
    overflow-y: auto;
    overflow-x: hidden;
    transition: width 0.2s ease, box-shadow 0.2s ease;
}
.sidebar.expanded {
    width: 240px;
    box-shadow: 4px 0 16px rgba(26, 42, 58, 0.12);
}
.sidebar-group {
    display: flex;
    flex-direction: column;
    gap: 6px;
}
.sidebar-group.campaigns {
    margin-top: 24px;
}
.sidebar-item {
    display: flex;
    align-items: center;
    height: 44px;
    margin-right: 12px;
    border-radius: 0 22px 22px 0;
    border-left: 3px solid transparent;
    color: #1a2a3a;
    text-decoration: none;
    white-space: nowrap;
    cursor: pointer;
    transition: background-color 0.15s ease;
}
.sidebar-item:hover {
    background-color: #f4f7f9;
}
.sidebar-item.active {
    background-color: #e6efff;
    border-left-color: #2b579a;
    color: #2b579a;
}
.sidebar-icon {
    flex: 0 0 57px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    color: #8c9db5;
}
.sidebar-item.active .sidebar-icon {
    color: #2b579a;
}
.campaign-dot {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    display: inline-block;
}
.sidebar-label {
    font-size: 13px;
    font-weight: 600;
    opacity: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    transition: opacity 0.15s ease;
}
.sidebar.expanded .sidebar-label {
    opacity: 1;
    transition-delay: 0.08s;
}
.sub-menu {
    display: flex;
    flex-direction: column;
    padding-left: 57px;
    margin-top: 4px;
    margin-bottom: 8px;
    gap: 8px;
    overflow: hidden;
}
.sub-item {
    font-size: 12px;
    color: #8c9db5;
    text-decoration: none;
    transition: color 0.2s;
    cursor: pointer;
}
.sub-item:hover {
    color: #2b579a;
    font-weight: 600;
}
.slide-fade-enter-active {
    transition: all 0.3s ease;
}
.slide-fade-leave-active {
    transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
    transform: translateY(-10px);
    opacity: 0;
    max-height: 0;
    margin: 0;
    padding-top: 0;
    padding-bottom: 0;
}
.slide-fade-enter-to,
.slide-fade-leave {
    transform: translateY(0);
    opacity: 1;
    max-height: 100px;
}
.content-area {
    flex: 1;
    padding: 20px 30px;
    overflow-y: auto;
}
.page-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 20px;
}
.page-title {
    font-size: 20px;
    color: #1a2a3a;
    margin: 0 0 5px 0;
}
.date-range {
    font-size: 12px;
    color: #8c9db5;
}
.change-date {
    color: #2b579a;
    text-decoration: underline;
    margin-left: 5px;
}
.header-dropdown select {
    padding: 8px 12px;
    border: 1px solid #dce4ec;
    background-color: #e8edf3;
    border-radius: 4px;
    color: #4a5a6a;
    font-family: "Montserrat", sans-serif;
}
.dashboard-grid {
    display: flex;
    gap: 20px;
}
.left-column {
    flex: 2;
    display: flex;
    flex-direction: column;
    gap: 20px;
}
.right-column {
    flex: 1;
}
.card {
    background-color: white;
    border-radius: 8px;
    border: 1px solid #e0e6ed;
    padding: 20px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.02);
}
.card-title {
    font-size: 15px;
    color: #4a5a6a;
    margin: 0 0 15px 0;
    font-weight: 600;
}
.platform-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 50%;
    float: left;
}
.platform-item {
    display: flex;
    align-items: center;
    font-size: 12px;
    color: #5a6a7a;
    font-weight: 500;
    gap: 10px;
}
.platform-logo {
    width: 20px;
    height: 20px;
    background-color: #f0f4f8;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    font-weight: bold;
    color: #2b579a;
}
.dots {
    margin-left: auto;
    color: #b0c4de;
    letter-spacing: 2px;
}
.chart-placeholder {
    float: right;
    background-color: #f4f7f9;
    border-radius: 50%;
}
.donut-chart {
    width: 150px;
    height: 150px;
    margin-top: -40px;
    border: 20px solid #e8edf3;
    background: transparent;
}
.card::after {
    content: "";
    display: table;
    clear: both;
}
.data-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 12px;
    color: #5a6a7a;
    text-align: left;
}
.data-table th {
    padding: 10px 5px;
    border-bottom: 1px solid #e0e6ed;
    color: #4a5a6a;
    font-weight: 600;
}
.data-table td {
    padding: 12px 5px;
    border-bottom: 1px solid #f4f7f9;
}
</style>
