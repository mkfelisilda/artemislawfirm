<template>
    <div class="dashboard-layout">
        <!-- TOP NAVIGATION BAR -->
        <header class="top-nav">
            <div class="nav-left">
                <img src="../assets/logo.svg" alt="Logo" class="nav-logo" />
                <span v-if="sidebarOpen" class="nav-title"
                    >CASE MANAGEMENT</span
                >
                <span v-else class="nav-title"
                    >ARTEMIS <span class="divider">|</span> CM</span
                >
            </div>
            <div class="nav-right">
                <div class="user-profile">
                    <div class="avatar-placeholder"></div>
                    <span class="user-name">{{ currentUser }}</span>
                    <span class="dropdown-arrow">▼</span>
                </div>
                <div class="icon-envelope">✉</div>
            </div>
        </header>

        <div class="main-body">
            <!-- LEFT SIDEBAR -->
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
                                :class="{
                                    active: $route.query.campaign === c.key,
                                }"
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
                            <div
                                v-if="$route.query.campaign === c.key"
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
                        </div>
                    </nav>
                </aside>
            </div>

            <!-- MAIN CONTENT -->
            <main class="content-area">
                <div class="page-wrapper">
                    <div class="main-list">
                        <!-- DYNAMIC HEADER -->
                        <div class="list-header">
                            <div class="header-left">
                                <div class="title-with-logo">
                                    <!-- Dynamic Logo Color -->
                                    <div
                                        class="campaign-logo-circle"
                                        :style="{
                                            backgroundColor:
                                                activeCampaignColor,
                                        }"
                                    >
                                        A
                                    </div>
                                    <h2 class="campaign-title">
                                        {{ currentCampaignName }}
                                    </h2>
                                </div>
                                <span class="sub-text"
                                    >Showing 1-{{ campaignDataCount }} out of
                                    {{ campaignDataCount }} Data</span
                                >
                            </div>
                            <div class="header-right">
                                <select class="seller-select">
                                    <option>Search by Seller Name</option>
                                </select>
                                <div class="search-input-wrap">
                                    <input
                                        type="text"
                                        placeholder="Search here"
                                    />
                                    <span class="search-icon">🔍</span>
                                </div>
                            </div>
                        </div>

                        <!-- TOOLBAR -->
                        <div class="toolbar">
                            <div class="toolbar-left">
                                <span class="tool-btn active-blue"
                                    >☰ Date Added</span
                                >
                                <span class="tool-btn">⇅ Ascending</span>
                                <span class="tool-btn active-blue"
                                    >No Custom Prioritization</span
                                >
                                <span class="tool-btn">👥 Manage Groups</span>
                            </div>
                        </div>

                        <!-- DATA ITEMS -->
                        <div class="data-list">
                            <!-- Item 1 -->
                            <div class="data-item">
                                <div class="checkbox">
                                    <input type="checkbox" />
                                </div>
                                <div class="item-image">
                                    <div
                                        class="fake-bag"
                                        :style="{
                                            backgroundColor:
                                                activeCampaignColor,
                                        }"
                                    >
                                        <img
                                            src="../assets/logo.svg"
                                            class="bag-logo"
                                        />
                                    </div>
                                </div>
                                <div class="item-details">
                                    <div class="item-top">
                                        <h3>
                                            Hangzhou Chengmai Import & Export
                                            Co., Ltd.
                                            <span
                                                class="status-badge active-badge"
                                                >ACTIVE</span
                                            >
                                        </h3>
                                        <div class="item-actions">
                                            <button class="outline-btn">
                                                ☆ For Review
                                            </button>
                                            <span class="id-number"
                                                >12380458925</span
                                            >
                                        </div>
                                    </div>
                                    <p class="item-desc">
                                        2025 New Arrival High Quality Non-woven
                                        Laminated Xmas Gift Shopping Bag for
                                        Christmas Presents Gifts Wrapping
                                    </p>
                                    <div class="item-footer">
                                        <div class="item-links">
                                            <a href="#"
                                                >📄 GO TO PRODUCT PAGE</a
                                            >
                                            <span>|</span>
                                            <a href="#">🏷️ GO TO STORE PAGE</a>
                                            <span>|</span>
                                            <a href="#">🖼️ VIEW EVIDENCE</a>
                                        </div>
                                        <div class="researcher-info">
                                            RESEARCHED BY
                                            <span class="researcher-name"
                                                >👤 BEN ANGOT</span
                                            >
                                        </div>
                                    </div>
                                    <div class="expand-link">
                                        Show Purchasing Details ▼
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- RIGHT SIDEBAR (FILTERS) -->
                    <div class="filter-sidebar">
                        <div class="filter-section">
                            <div class="filter-header">
                                <h4>🍎 Data Status</h4>
                                <span>...</span>
                            </div>
                            <div class="filter-list">
                                <div class="filter-item">
                                    <input type="checkbox" /> Not Covered
                                    <span>[9]</span>
                                </div>
                                <div class="filter-item active-filter">
                                    <input type="checkbox" checked /> For Review
                                    <span>[14]</span>
                                    <span class="arrow">▲</span>
                                </div>
                                <div class="sub-filter">
                                    <input type="radio" name="review" checked />
                                    Default [13]
                                </div>
                            </div>
                        </div>
                        <button class="apply-filter-btn">Apply Filter</button>
                    </div>
                </div>
            </main>
        </div>
    </div>
</template>

<script>
export default {
    name: "GoToDataView",
    data() {
        return {
            currentUser: "Admin",
            sidebarOpen: false,
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
    computed: {
        // 1. Get the active campaign from the URL (default to nestle)
        activeCampaign() {
            return this.$route.query.campaign || "nestle";
        },
        // 2. Dynamically change the title
        currentCampaignName() {
            return this.activeCampaign === "romoss"
                ? "Romoss (Test Campaign)"
                : "Nestle (Test Campaign)";
        },
        // 3. Dynamically change the data count
        campaignDataCount() {
            return this.activeCampaign === "romoss" ? "7" : "14";
        },
        // 4. Dynamically change the logo color
        activeCampaignColor() {
            return this.activeCampaign === "romoss" ? "#12a5a5" : "#3e88da";
        },
    },
    created() {
        if (this.$route.query.user) this.currentUser = this.$route.query.user;
    },
    methods: {
        toggleCampaign(key) {
            this.$router.push({ path: "/data", query: { campaign: key } });
        },
    },
};
</script>

<style scoped>
/* I included the full CSS here so it looks exactly like your screenshot */
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
    z-index: 20;
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
}
.user-profile {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 13px;
    font-weight: 600;
    color: #2b579a;
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
.content-area {
    flex: 1;
    overflow: hidden;
}
.page-wrapper {
    display: flex;
    height: 100%;
    overflow: hidden;
}
.main-list {
    flex: 1;
    padding: 20px;
    overflow-y: auto;
}
.filter-sidebar {
    width: 280px;
    background: white;
    border-left: 1px solid #e0e6ed;
    padding: 20px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
}

/* Dynamic Header Styles */
.list-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 20px;
}
.title-with-logo {
    display: flex;
    align-items: center;
    gap: 15px;
    margin-bottom: 5px;
}
.campaign-logo-circle {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-weight: bold;
    font-size: 16px;
    transition: background 0.3s;
}
.campaign-title {
    font-size: 18px;
    margin: 0;
    color: #1a2a3a;
}
.sub-text {
    font-size: 12px;
    color: #8c9db5;
    margin-left: 50px;
}

.header-right {
    display: flex;
    gap: 10px;
    align-items: center;
}
.seller-select {
    padding: 8px;
    border: 1px solid #dce4ec;
    border-radius: 4px;
    font-size: 12px;
    color: #5a6a7a;
    font-family: "Montserrat", sans-serif;
}
.search-input-wrap {
    position: relative;
}
.search-input-wrap input {
    padding: 8px 30px 8px 10px;
    border: 1px solid #dce4ec;
    border-radius: 4px;
    font-size: 12px;
    width: 150px;
    outline: none;
}
.search-icon {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    color: #8c9db5;
    font-size: 12px;
}
.toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: white;
    padding: 10px;
    border: 1px solid #e0e6ed;
    border-radius: 4px;
    margin-bottom: 15px;
}
.tool-btn {
    font-size: 12px;
    color: #5a6a7a;
    padding: 5px 10px;
    cursor: pointer;
    font-weight: 500;
}
.tool-btn.active-blue {
    background-color: #2b579a;
    color: white;
    border-radius: 15px;
}
.data-item {
    display: flex;
    background: white;
    border: 1px solid #e0e6ed;
    border-radius: 4px;
    padding: 15px;
    margin-bottom: 15px;
    gap: 15px;
}
.checkbox {
    display: flex;
    align-items: flex-start;
    padding-top: 5px;
}
.checkbox input {
    width: 16px;
    height: 16px;
    accent-color: #2b579a;
}
.item-image {
    width: 80px;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
}
.fake-bag {
    width: 50px;
    height: 50px;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background 0.3s;
}
.bag-logo {
    width: 30px;
}
.item-details {
    flex: 1;
}
.item-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5px;
}
.item-top h3 {
    font-size: 14px;
    margin: 0;
    color: #1a2a3a;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 10px;
}
.status-badge {
    font-size: 10px;
    padding: 2px 6px;
    border-radius: 10px;
}
.active-badge {
    background: #28a745;
    color: white;
}
.item-actions {
    display: flex;
    align-items: center;
    gap: 10px;
}
.outline-btn {
    border: 1px solid #dce4ec;
    background: white;
    padding: 4px 10px;
    border-radius: 4px;
    font-size: 11px;
    color: #5a6a7a;
    cursor: pointer;
}
.id-number {
    background: #2b579a;
    color: white;
    font-size: 11px;
    padding: 4px 8px;
    border-radius: 4px;
    font-weight: 600;
}
.item-desc {
    font-size: 12px;
    color: #5a6a7a;
    margin: 0 0 15px 0;
}
.item-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px dashed #e0e6ed;
    padding-top: 10px;
}
.item-links {
    display: flex;
    gap: 10px;
    font-size: 10px;
    font-weight: 600;
    color: #2b579a;
}
.item-links a {
    text-decoration: none;
    color: #2b579a;
}
.researcher-info {
    font-size: 10px;
    color: #8c9db5;
}
.researcher-name {
    color: #5a6a7a;
    font-weight: 600;
    margin-left: 5px;
}
.expand-link {
    text-align: right;
    font-size: 11px;
    color: #2b579a;
    font-weight: 600;
    margin-top: 10px;
    cursor: pointer;
}
.filter-section {
    border-bottom: 1px solid #f4f7f9;
    padding-bottom: 15px;
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
.filter-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
}
.filter-item {
    display: flex;
    align-items: center;
    font-size: 12px;
    color: #5a6a7a;
    gap: 10px;
    padding: 5px;
    border-radius: 4px;
    cursor: pointer;
}
.filter-item input {
    accent-color: #2b579a;
    width: 14px;
    height: 14px;
}
.filter-item span:last-child {
    margin-left: auto;
    font-size: 10px;
}
.active-filter {
    background-color: #e8edf3;
    font-weight: 600;
    color: #1a2a3a;
}
.sub-filter {
    padding-left: 30px;
    font-size: 11px;
    color: #5a6a7a;
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;
}
.apply-filter-btn {
    background-color: #2b579a;
    color: white;
    border: none;
    border-radius: 20px;
    padding: 12px;
    font-weight: 600;
    font-size: 14px;
    margin-top: auto;
    cursor: pointer;
}
</style>
