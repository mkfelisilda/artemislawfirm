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
                                    >Showing 1-{{ campaignCaseCount }} out of
                                    {{ campaignCaseCount }} Cases</span
                                >
                            </div>
                            <div class="header-right">
                                <button class="outline-btn explorer-btn">
                                    CASE FILES EXPLORER ↗
                                </button>
                            </div>
                        </div>

                        <!-- TOOLBAR -->
                        <div class="toolbar">
                            <div class="toolbar-left">
                                <span class="tool-btn active-blue"
                                    >☰ Date Added</span
                                >
                                <span class="tool-btn">⇅ Descending</span>
                                <span class="tool-btn active-blue"
                                    >No Custom Prioritization</span
                                >
                            </div>
                        </div>

                        <!-- CASES LIST -->
                        <div class="cases-list">
                            <!-- Case Item 1 -->
                            <div class="case-item">
                                <div class="timeline-header">
                                    <div class="timeline-title">
                                        CASE STATUS AND TIMELINE <span>|</span>
                                    </div>
                                    <div class="timeline-steps">
                                        <div class="step completed">📄</div>
                                        <div class="line"></div>
                                        <div class="step completed">🏢</div>
                                        <div class="line"></div>
                                        <div class="step completed active-step">
                                            🛡️
                                        </div>
                                        <div class="line red"></div>
                                        <div class="step">📄</div>
                                        <div class="line red"></div>
                                        <div class="step">📄</div>
                                        <div class="line"></div>
                                        <div class="step">🛡️</div>
                                        <div class="line"></div>
                                        <div class="step">📄</div>
                                        <div class="line"></div>
                                        <div class="step final-step">➜</div>
                                    </div>
                                    <div class="case-actions">
                                        <button class="manage-btn">
                                            MANAGE CASE ↗
                                        </button>
                                        <div class="icon-buttons">
                                            <button>📝</button
                                            ><button>⚙️</button
                                            ><button>▶️</button
                                            ><button>⬇️</button>
                                        </div>
                                    </div>
                                </div>

                                <div class="case-details-grid">
                                    <div class="case-left">
                                        <input
                                            type="checkbox"
                                            class="case-checkbox"
                                        />
                                        <div class="case-number">
                                            <span class="label"
                                                >Case Number:</span
                                            >
                                            <h3>25-cv-test_odin...</h3>
                                        </div>
                                    </div>
                                    <div class="case-center">
                                        <h4 class="case-title">
                                            This is a test case
                                        </h4>
                                        <div class="stats-grid">
                                            <div class="stat-row">
                                                <span class="label"
                                                    >👤 Total Defendants:</span
                                                >
                                                <span class="value">5</span>
                                            </div>
                                            <div class="stat-row">
                                                <span class="label"
                                                    >📅 Date Filed:</span
                                                >
                                                <span class="value"
                                                    >Dec 08, 2025</span
                                                >
                                            </div>
                                            <div class="stat-row">
                                                <span class="label"
                                                    >🏢 Lawfirm:</span
                                                >
                                                <span class="value"
                                                    >Wizengamot LLC</span
                                                >
                                            </div>
                                            <div class="stat-row">
                                                <span class="label"
                                                    >⚖️ Assigned Judge:</span
                                                >
                                                <span class="value"
                                                    >Thor Odinson</span
                                                >
                                            </div>
                                            <div class="stat-row">
                                                <span class="label"
                                                    >❄️ Total Frozen:</span
                                                >
                                                <span class="value">0.00</span>
                                            </div>
                                            <div class="stat-row">
                                                <span class="label"
                                                    >💰 Total Received:</span
                                                >
                                                <span class="value">0.00</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="case-right">
                                        <div class="stats-grid">
                                            <div class="stat-row">
                                                <span class="label"
                                                    >🤝 Total Agreed
                                                    Settlement:</span
                                                >
                                                <span class="value">0.00</span>
                                            </div>
                                            <div class="stat-row">
                                                <span class="label"
                                                    >💵 Total Settlement
                                                    Received:</span
                                                >
                                                <span class="value">0.00</span>
                                            </div>
                                            <div class="stat-row">
                                                <span class="label"
                                                    >💳 Total Default
                                                    Received:</span
                                                >
                                                <span class="value">0.00</span>
                                            </div>
                                            <div class="stat-row">
                                                <span class="label"
                                                    >📈 Total Expected
                                                    Settlement:</span
                                                >
                                                <span class="value">0.00</span>
                                            </div>
                                            <div class="stat-row">
                                                <span class="label"
                                                    >⚠️ Total Predicted
                                                    Default:</span
                                                >
                                                <span class="value">0.00</span>
                                            </div>
                                            <div class="stat-row">
                                                <span class="label"
                                                    >📊 Total CTDA Default
                                                    Received:</span
                                                >
                                                <span class="value">0.00</span>
                                            </div>
                                        </div>
                                        <div class="platforms-link">
                                            PLATFORMS
                                        </div>
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
                                    <span>[1]</span>
                                </div>
                                <div class="filter-item">
                                    <input type="checkbox" /> For Review
                                    <span>[7]</span>
                                </div>
                                <div class="filter-item">
                                    <input type="checkbox" /> Monitoring
                                    <span>[1]</span>
                                </div>
                                <div class="filter-item">
                                    <input type="checkbox" /> Cases
                                    <span>[20]</span>
                                    <span class="arrow">▲</span>
                                </div>
                                <div class="sub-filter-list">
                                    <div class="sub-filter">
                                        <input type="radio" name="case" />
                                        Complaint [5]
                                    </div>
                                    <div class="sub-filter">
                                        <input type="radio" name="case" />
                                        Schedule A [2]
                                    </div>
                                    <div class="sub-filter">
                                        <input type="radio" name="case" /> TRO
                                        [1]
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button class="create-case-btn">
                            ＋ Create a New Case
                        </button>
                    </div>
                </div>
            </main>
        </div>
    </div>
</template>

<script>
export default {
    name: "GoToCasesView",
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
        activeCampaign() {
            return this.$route.query.campaign || "nestle";
        },
        currentCampaignName() {
            return this.activeCampaign === "romoss"
                ? "Romoss (Test Campaign)"
                : "Nestle (Test Campaign)";
        },
        campaignCaseCount() {
            return this.activeCampaign === "romoss" ? "20" : "16";
        },
        activeCampaignColor() {
            return this.activeCampaign === "romoss" ? "#12a5a5" : "#3e88da";
        },
    },
    created() {
        if (this.$route.query.user) this.currentUser = this.$route.query.user;
    },
    methods: {
        toggleCampaign(key) {
            this.$router.push({ path: "/cases", query: { campaign: key } });
        },
    },
};
</script>

<style scoped>
/* (Paste the exact same CSS you have for GoToCasesView here) */
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

.explorer-btn {
    border: 1px solid #2b579a;
    color: #2b579a;
    background: transparent;
    padding: 8px 15px;
    border-radius: 20px;
    font-size: 11px;
    font-weight: 600;
    cursor: pointer;
}
.toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
}
.toolbar-left {
    display: flex;
    gap: 10px;
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

/* Case Item */
.case-item {
    background: white;
    border: 1px solid #e0e6ed;
    border-radius: 6px;
    margin-bottom: 15px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
}
.timeline-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px 20px;
    border-bottom: 1px solid #f4f7f9;
}
.timeline-title {
    font-size: 11px;
    font-weight: 700;
    color: #1a2a3a;
    display: flex;
    align-items: center;
    gap: 5px;
}
.timeline-title span {
    color: #8c9db5;
    font-size: 14px;
}
.timeline-steps {
    display: flex;
    align-items: center;
}
.step {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    border: 1px solid #dce4ec;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    background: white;
    color: #8c9db5;
}
.step.completed {
    border-color: #2b579a;
    color: #2b579a;
}
.step.active-step {
    background: #2b579a;
    color: white;
}
.step.final-step {
    border-color: #28a745;
    color: #28a745;
    font-weight: bold;
}
.line {
    width: 20px;
    height: 2px;
    background: #dce4ec;
}
.line.red {
    background: #d9534f;
}
.case-actions {
    display: flex;
    align-items: center;
    gap: 10px;
}
.manage-btn {
    border: 1px solid #2b579a;
    color: #2b579a;
    background: white;
    padding: 6px 12px;
    border-radius: 4px;
    font-size: 11px;
    font-weight: 600;
    cursor: pointer;
}
.icon-buttons {
    display: flex;
    gap: 5px;
}
.icon-buttons button {
    background: #2b579a;
    border: none;
    border-radius: 4px;
    padding: 5px 8px;
    color: white;
    font-size: 12px;
    cursor: pointer;
}

/* Details Grid */
.case-details-grid {
    display: flex;
    padding: 20px;
    gap: 20px;
}
.case-left {
    display: flex;
    gap: 15px;
    width: 20%;
    align-items: flex-start;
}
.case-checkbox {
    margin-top: 5px;
    width: 16px;
    height: 16px;
    accent-color: #2b579a;
}
.case-number .label {
    font-size: 11px;
    color: #8c9db5;
    display: block;
    margin-bottom: 5px;
}
.case-number h3 {
    margin: 0;
    font-size: 14px;
    color: #1a2a3a;
    font-weight: 600;
}
.case-center {
    flex: 1;
    border-left: 1px solid #f4f7f9;
    padding-left: 20px;
}
.case-right {
    flex: 1;
    border-left: 1px solid #f4f7f9;
    padding-left: 20px;
    position: relative;
}
.case-title {
    margin: 0 0 15px 0;
    font-size: 13px;
    color: #1a2a3a;
    font-weight: 600;
}
.stats-grid {
    display: flex;
    flex-direction: column;
    gap: 10px;
}
.stat-row {
    display: flex;
    justify-content: space-between;
    font-size: 11px;
}
.stat-row .label {
    color: #5a6a7a;
}
.stat-row .value {
    font-weight: 600;
    color: #1a2a3a;
}
.platforms-link {
    position: absolute;
    bottom: 0;
    right: 0;
    font-size: 10px;
    font-weight: 700;
    color: #1a2a3a;
    text-decoration: underline;
    cursor: pointer;
}

/* Sidebar Filters */
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
.sub-filter-list {
    margin-top: 10px;
}
.sub-filter {
    padding-left: 20px;
    font-size: 11px;
    color: #5a6a7a;
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;
}
.create-case-btn {
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
