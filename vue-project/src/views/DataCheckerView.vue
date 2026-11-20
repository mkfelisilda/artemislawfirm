<template>
    <div class="dashboard-layout">
        <header class="top-nav">
            <div class="nav-left">
                <img src="../assets/logo.svg" alt="Logo" class="nav-logo" />
                <span v-if="activeCampaign || sidebarOpen" class="nav-title"
                    >CASE MANAGEMENT</span
                >
                <span v-else class="nav-title"
                    >ARTEMIS <span class="divider">|</span> CM</span
                >
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

            <main class="content-area checker-layout">
                <div class="checker-main">
                    <div class="page-header">
                        <div>
                            <h1 class="page-title">
                                Data Checker
                                <span class="light-text"
                                    >Choose a Campaign to add/view data</span
                                >
                            </h1>
                            <div class="date-range">
                                Showing 1-2 out of 2 Affiliated Campaign(s)
                            </div>
                        </div>
                        <div class="search-bar">
                            <input
                                type="text"
                                placeholder="Search Campaigns here"
                            />
                            <span class="search-icon">🔍</span>
                        </div>
                    </div>

                    <div class="campaign-grid">
                        <div
                            class="campaign-card"
                            :class="{
                                'selected-card': activeCampaign === 'nestle',
                            }"
                            @click="toggleCampaign('nestle')"
                        >
                            <div class="card-top">
                                <span class="company-name">WIZENGAMOT LLC</span>
                                <span
                                    class="brand-tag"
                                    style="background: #0d2b5e"
                                    >Nestle</span
                                >
                            </div>
                            <h3 class="campaign-title">
                                Nestle (Test Campai...
                            </h3>
                            <p class="campaign-data">34 Total Number of Data</p>
                        </div>

                        <div
                            class="campaign-card"
                            :class="{
                                'selected-card': activeCampaign === 'romoss',
                            }"
                            @click="toggleCampaign('romoss')"
                        >
                            <div class="card-top">
                                <span class="company-name">WIZENGAMOT LLC</span>
                                <span
                                    class="brand-tag"
                                    style="background: #12a5a5"
                                    >ROMOSS</span
                                >
                            </div>
                            <h3 class="campaign-title">Romoss (Test Camp...</h3>
                            <p class="campaign-data">5 Total Number of Data</p>
                        </div>
                    </div>
                </div>

                <div class="checker-sidebar">
                    <div class="filter-section">
                        <div class="filter-header">
                            <h4>Active Data</h4>
                            <span>...</span>
                        </div>
                        <label class="radio-label"
                            ><input type="radio" name="data" checked />
                            All</label
                        >
                        <label class="radio-label"
                            ><input type="radio" name="data" /> With</label
                        >
                        <label class="radio-label"
                            ><input type="radio" name="data" /> Without</label
                        >
                    </div>
                    <div class="filter-section">
                        <div class="filter-header">
                            <h4>Active Statuses</h4>
                            <span>...</span>
                        </div>
                        <label class="check-label"
                            ><input type="checkbox" /> For Quality
                            Checking</label
                        >
                        <label class="check-label"
                            ><input type="checkbox" /> For Review</label
                        >
                        <label class="check-label"
                            ><input type="checkbox" /> Work in Progress</label
                        >
                    </div>
                </div>
            </main>
        </div>
    </div>
</template>

<script>
export default {
    name: "DataCheckerView",
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
            localStorage.removeItem("loggedInUser");
            this.$router.push("/");
        },
    },
};
</script>

<style scoped>
/* (Your existing DataCheckerView CSS remains exactly the same) */
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
    overflow-y: auto;
    display: flex;
}
.checker-layout {
    display: flex;
}
.checker-main {
    flex: 1;
    padding: 20px 30px;
}
.checker-sidebar {
    width: 250px;
    background: white;
    border-left: 1px solid #e0e6ed;
    padding: 20px;
    overflow-y: auto;
}
.page-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 30px;
}
.page-title {
    font-size: 20px;
    color: #1a2a3a;
    margin: 0;
}
.light-text {
    font-size: 13px;
    font-weight: 400;
    color: #8c9db5;
    margin-left: 10px;
}
.date-range {
    font-size: 12px;
    color: #5a6a7a;
    margin-top: 5px;
}
.search-bar {
    position: relative;
}
.search-bar input {
    padding: 10px 35px 10px 15px;
    border: 1px solid #dce4ec;
    border-radius: 4px;
    font-family: "Montserrat", sans-serif;
    width: 250px;
    outline: none;
}
.search-icon {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    color: #8c9db5;
    font-size: 14px;
}
.campaign-grid {
    display: flex;
    gap: 20px;
}
.campaign-card {
    background: white;
    border: 1px solid #e0e6ed;
    border-radius: 6px;
    padding: 15px;
    width: 280px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.02);
    cursor: pointer;
    transition: border 0.2s;
}
.campaign-card:hover {
    border-color: #2b579a;
}
.campaign-card.selected-card {
    border: 2px solid #2b579a;
}
.card-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
}
.company-name {
    font-size: 10px;
    font-weight: 700;
    color: #8c9db5;
    letter-spacing: 1px;
}
.brand-tag {
    font-size: 10px;
    color: white;
    padding: 2px 6px;
    border-radius: 3px;
    font-weight: bold;
}
.campaign-title {
    font-size: 16px;
    color: #1a2a3a;
    margin: 0 0 10px 0;
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.campaign-data {
    font-size: 12px;
    color: #5a6a7a;
    margin: 0;
}
.filter-section {
    margin-bottom: 25px;
    border-bottom: 1px solid #f4f7f9;
    padding-bottom: 15px;
}
.filter-section:last-child {
    border-bottom: none;
}
.filter-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
}
.filter-header h4 {
    margin: 0;
    font-size: 13px;
    color: #1a2a3a;
    font-weight: 700;
}
.filter-header span {
    color: #8c9db5;
    cursor: pointer;
}
.radio-label,
.check-label {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 12px;
    color: #5a6a7a;
    margin-bottom: 12px;
    cursor: pointer;
}
.radio-label input,
.check-label input {
    accent-color: #2b579a;
    width: 16px;
    height: 16px;
}
</style>
