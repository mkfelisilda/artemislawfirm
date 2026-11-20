<template>
    <div class="dashboard-layout">
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
                        <h1 class="page-title">For Review Data</h1>
                        <div class="date-range">
                            Ready for you to check for Acceptance.
                        </div>
                    </div>
                    <div class="header-controls">
                        <span class="showing-text"
                            >Showing all 1-16 out of 22 data</span
                        >
                        <select class="filter-select">
                            <option>Select campaign to filter</option>
                        </select>
                    </div>
                </div>

                <div class="review-grid">
                    <div class="review-card" v-for="i in 8" :key="i">
                        <div class="card-header">
                            <div class="campaign-info">
                                <span class="campaign-name"
                                    >Nestle (Test Campaign)</span
                                >
                                <span class="company-name">Wizengamot LLC</span>
                            </div>
                            <img
                                src="../assets/logo.svg"
                                alt="brand"
                                class="brand-logo"
                            />
                        </div>
                        <div class="card-image-placeholder">
                            <div class="fake-bag">
                                <img
                                    src="../assets/logo.svg"
                                    alt="logo"
                                    class="bag-logo"
                                />
                            </div>
                        </div>
                        <div class="card-footer">
                            <div class="product-info">
                                <span class="product-id"
                                    >12380515637 - For Review</span
                                >
                                <span class="product-title" v-if="i % 2 === 0"
                                    >Lovely and Luxe</span
                                >
                            </div>
                            <span class="platform-badge temu">Temu</span>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </div>
</template>

<script>
export default {
    name: "ReviewDataView",
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
/* (Your existing ReviewDataView CSS remains exactly the same) */
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
    align-items: center;
    margin-bottom: 20px;
}
.page-title {
    font-size: 20px;
    color: #1a2a3a;
    margin: 0 0 5px 0;
}
.date-range {
    font-size: 13px;
    color: #5a6a7a;
}
.header-controls {
    display: flex;
    align-items: center;
    gap: 20px;
}
.showing-text {
    font-size: 13px;
    color: #5a6a7a;
}
.filter-select {
    padding: 8px 12px;
    border: 1px solid #dce4ec;
    border-radius: 4px;
    font-family: "Montserrat", sans-serif;
    color: #4a5a6a;
}
.review-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 15px;
}
.review-card {
    background: white;
    border: 1px solid #e0e6ed;
    border-radius: 8px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
}
.card-header {
    display: flex;
    justify-content: space-between;
    padding: 10px 15px;
    border-bottom: 1px solid #f4f7f9;
}
.campaign-info {
    display: flex;
    flex-direction: column;
}
.campaign-name {
    font-size: 12px;
    font-weight: 600;
    color: #1a2a3a;
}
.company-name {
    font-size: 11px;
    color: #8c9db5;
}
.brand-logo {
    width: 40px;
    height: auto;
    object-fit: contain;
}
.card-image-placeholder {
    background-color: #e8f0fe;
    height: 180px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.fake-bag {
    width: 80px;
    height: 80px;
    background-color: #3e88da;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.bag-logo {
    width: 40px;
}
.card-footer {
    padding: 10px 15px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
}
.product-info {
    display: flex;
    flex-direction: column;
}
.product-id {
    font-size: 10px;
    color: #8c9db5;
}
.product-title {
    font-size: 12px;
    font-weight: 600;
    color: #1a2a3a;
    margin-top: 5px;
}
.platform-badge {
    font-size: 10px;
    padding: 2px 6px;
    border-radius: 3px;
    color: white;
    font-weight: bold;
}
.platform-badge.temu {
    background-color: #fb7701;
}
</style>
