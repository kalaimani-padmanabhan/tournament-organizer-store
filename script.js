const STORAGE_KEY = "bracketbase-state-v1";
const SUPABASE_URL = "https://baddrupmhmagkfebcobk.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_t_YBZha2t0oPhM1Fxlr6Zg_eT3P8qc-";
const SUPABASE_WORKSPACE_ID = "primary";
const SUPABASE_STATE_TABLE = "app_state";
const SUPABASE_STATE_ROW_ID = "primary";
const SUPABASE_RUNTIME_TABLE = "app_runtime_state";
const SUPABASE_TOURNAMENTS_TABLE = "tournaments";
const SUPABASE_TOURNAMENT_PLAYERS_TABLE = "tournament_players";
const SUPABASE_TOURNAMENT_MATCHES_TABLE = "tournament_matches";
const SUPABASE_TOURNAMENT_ANNOUNCEMENTS_TABLE = "tournament_announcements";

const defaultState = {
    tournament: {
        name: "",
        format: "League",
        matchRule: "single_25",
        category: "",
        notes: "",
    },
    tournaments: [],
    importMeta: {
        categories: [],
        duplicateEntries: [],
        invalidEntries: [],
        duplicateKeys: [],
    },
    teams: [],
    matches: [],
    announcements: [],
    meta: {
        lastSavedAt: "",
    },
};

const SCORE_SHEET_TEMPLATE = {
    rowCount: 111,
    columns: ["A", "B", "E", "F", "G", "H", "I", "J"],
    columnWidths: [9.140625, 32, 13, 9.140625, 9.140625, 9.140625, 9.140625, 9.140625],
    seedRows: [6, 8, 9, 11, 12, 14, 15, 18, 19, 21, 22, 24, 25, 27, 28, 32, 34, 35, 37, 38, 40, 41, 43, 44, 46, 47, 49, 50, 52, 53, 64, 66, 67, 69, 70, 72, 73, 75, 76, 78, 79, 81, 82, 84, 85, 89, 90, 92, 93, 95, 96, 98, 99, 101, 102, 104, 105, 108, 109, 111],
    seedRowToSeed: {
        "6": "1",
        "8": "2",
        "9": "3",
        "11": "4",
        "12": "5",
        "14": "6",
        "15": "7",
        "18": "8",
        "19": "9",
        "21": "10",
        "22": "11",
        "24": "12",
        "25": "13",
        "27": "14",
        "28": "15",
        "32": "16",
        "34": "17",
        "35": "18",
        "37": "19",
        "38": "20",
        "40": "21",
        "41": "22",
        "43": "23",
        "44": "24",
        "46": "25",
        "47": "26",
        "49": "27",
        "50": "28",
        "52": "29",
        "53": "30",
        "64": "31",
        "66": "32",
        "67": "33",
        "69": "34",
        "70": "35",
        "72": "36",
        "73": "37",
        "75": "38",
        "76": "39",
        "78": "40",
        "79": "41",
        "81": "42",
        "82": "43",
        "84": "44",
        "85": "45",
        "89": "46",
        "90": "47",
        "92": "48",
        "93": "49",
        "95": "50",
        "96": "51",
        "98": "52",
        "99": "53",
        "101": "54",
        "102": "55",
        "104": "56",
        "105": "57",
        "108": "58",
        "109": "59",
        "111": "60"
    },
    matchMap: {
        "F8": "1",
        "F11": "2",
        "F14": "3",
        "F18": "4",
        "F21": "5",
        "F24": "6",
        "F27": "7",
        "F34": "8",
        "F37": "9",
        "F40": "10",
        "F43": "11",
        "F46": "12",
        "F49": "13",
        "F52": "14",
        "F66": "15",
        "F69": "16",
        "F72": "17",
        "F75": "18",
        "F78": "19",
        "F81": "20",
        "F84": "21",
        "F89": "22",
        "F92": "23",
        "F95": "24",
        "F98": "25",
        "F101": "26",
        "F104": "27",
        "F108": "28",
        "G7": "29",
        "G13": "30",
        "G19": "31",
        "G26": "32",
        "G33": "33",
        "G39": "34",
        "G44": "35",
        "G51": "36",
        "G65": "37",
        "G71": "38",
        "G76": "39",
        "G83": "40",
        "G90": "41",
        "G97": "42",
        "G102": "43",
        "G110": "44",
        "H9": "45",
        "H24": "46",
        "H36": "47",
        "H49": "48",
        "H68": "49",
        "H81": "50",
        "H93": "51",
        "H106": "52",
        "I16": "54",
        "I42": "55",
        "I74": "56",
        "I99": "57",
        "J30": "57",
        "J87": "58"
    },
    borderMap: {
        "E10": "tb",
        "E100": "tb",
        "E102": "rb",
        "E103": "tb",
        "E105": "rb",
        "E107": "b",
        "E109": "rb",
        "E12": "rb",
        "E13": "tb",
        "E15": "rb",
        "E17": "b",
        "E19": "rb",
        "E20": "tb",
        "E22": "rb",
        "E23": "tb",
        "E25": "rb",
        "E26": "tb",
        "E28": "rb",
        "E33": "b",
        "E35": "rb",
        "E36": "tb",
        "E38": "rb",
        "E39": "tb",
        "E41": "rb",
        "E42": "tb",
        "E44": "rb",
        "E45": "tb",
        "E47": "rb",
        "E48": "tb",
        "E50": "rb",
        "E51": "tb",
        "E53": "rb",
        "E65": "b",
        "E67": "rb",
        "E68": "tb",
        "E7": "b",
        "E70": "rb",
        "E71": "b",
        "E73": "rb",
        "E74": "tb",
        "E76": "rb",
        "E77": "tb",
        "E79": "rb",
        "E80": "tb",
        "E82": "rb",
        "E83": "tb",
        "E85": "rb",
        "E88": "b",
        "E9": "rb",
        "E90": "rb",
        "E91": "tb",
        "E93": "rb",
        "E94": "tb",
        "E96": "rb",
        "E97": "tb",
        "E99": "rb",
        "F102": "l",
        "F104": "lrb",
        "F108": "lb",
        "F11": "lb",
        "F12": "l",
        "F14": "lrb",
        "F15": "l",
        "F18": "lb",
        "F19": "l",
        "F21": "lrb",
        "F22": "l",
        "F24": "lb",
        "F25": "l",
        "F27": "lrb",
        "F28": "l",
        "F32": "b",
        "F34": "lrb",
        "F35": "l",
        "F37": "lb",
        "F38": "l",
        "F40": "lrb",
        "F41": "l",
        "F43": "lb",
        "F44": "l",
        "F46": "lrb",
        "F47": "l",
        "F49": "lb",
        "F50": "l",
        "F52": "lrb",
        "F53": "l",
        "F64": "b",
        "F66": "lrb",
        "F67": "l",
        "F69": "lb",
        "F70": "l",
        "F72": "lrb",
        "F73": "l",
        "F75": "lb",
        "F76": "l",
        "F78": "lrb",
        "F79": "l",
        "F8": "lrb",
        "F81": "lb",
        "F82": "l",
        "F84": "lrb",
        "F85": "l",
        "F89": "lb",
        "F90": "l",
        "F92": "lrb",
        "F93": "l",
        "F95": "lb",
        "F96": "l",
        "F98": "lrb",
        "F99": "l",
        "G102": "lb",
        "G103": "l",
        "G104": "l",
        "G109": "l",
        "G110": "lrb",
        "G12": "l",
        "G13": "lrb",
        "G14": "l",
        "G19": "lb",
        "G20": "l",
        "G21": "l",
        "G25": "l",
        "G26": "lrb",
        "G27": "l",
        "G33": "lb",
        "G34": "l",
        "G38": "l",
        "G39": "lrb",
        "G40": "l",
        "G44": "lb",
        "G45": "l",
        "G46": "l",
        "G50": "l",
        "G51": "lrb",
        "G52": "l",
        "G65": "lb",
        "G66": "l",
        "G70": "l",
        "G71": "lrb",
        "G72": "l",
        "G76": "lb",
        "G77": "l",
        "G78": "l",
        "G8": "l",
        "G82": "l",
        "G83": "lrb",
        "G84": "l",
        "G90": "lb",
        "G91": "l",
        "G92": "l",
        "G96": "l",
        "G97": "lrb",
        "G98": "l",
        "G7": "lb",
        "H10": "l",
        "H104": "l",
        "H105": "l",
        "H106": "lrb",
        "H107": "l",
        "H108": "l",
        "H109": "l",
        "H11": "l",
        "H12": "l",
        "H13": "l",
        "H20": "l",
        "H21": "l",
        "H22": "l",
        "H23": "l",
        "H24": "lrb",
        "H25": "l",
        "H26": "l",
        "H34": "l",
        "H35": "l",
        "H36": "lb",
        "H37": "l",
        "H38": "l",
        "H39": "l",
        "H45": "l",
        "H46": "l",
        "H47": "l",
        "H48": "l",
        "H49": "lrb",
        "H50": "l",
        "H51": "l",
        "H66": "l",
        "H67": "l",
        "H68": "lb",
        "H69": "l",
        "H70": "l",
        "H71": "l",
        "H77": "l",
        "H78": "l",
        "H79": "l",
        "H8": "l",
        "H80": "l",
        "H81": "lrb",
        "H82": "l",
        "H83": "l",
        "H91": "l",
        "H92": "l",
        "H93": "lb",
        "H94": "l",
        "H95": "l",
        "H96": "l",
        "H97": "l",
        "H9": "lb",
        "I10": "l",
        "I101": "l",
        "I102": "l",
        "I103": "l",
        "I104": "l",
        "I105": "l",
        "I106": "l",
        "I11": "l",
        "I12": "l",
        "I13": "l",
        "I14": "l",
        "I15": "l",
        "I16": "lb",
        "I17": "l",
        "I18": "l",
        "I19": "l",
        "I20": "l",
        "I21": "l",
        "I22": "l",
        "I23": "l",
        "I24": "l",
        "I37": "l",
        "I38": "l",
        "I39": "l",
        "I40": "l",
        "I41": "l",
        "I42": "lrb",
        "I43": "l",
        "I44": "l",
        "I45": "l",
        "I46": "l",
        "I47": "l",
        "I48": "l",
        "I49": "l",
        "I69": "l",
        "I70": "l",
        "I71": "l",
        "I72": "l",
        "I73": "l",
        "I74": "lb",
        "I75": "l",
        "I76": "l",
        "I77": "l",
        "I78": "l",
        "I79": "l",
        "I80": "l",
        "I81": "l",
        "I94": "l",
        "I95": "l",
        "I96": "l",
        "I97": "l",
        "I98": "l",
        "I99": "lrb",
        "J17": "l",
        "J18": "l",
        "J19": "l",
        "J20": "l",
        "J21": "l",
        "J22": "l",
        "J23": "l",
        "J24": "l",
        "J25": "l",
        "J26": "l",
        "J27": "l",
        "J28": "l",
        "J29": "l",
        "J30": "l",
        "J31": "l",
        "J32": "l",
        "J33": "l",
        "J34": "l",
        "J35": "l",
        "J36": "l",
        "J37": "l",
        "J38": "l",
        "J39": "l",
        "J40": "l",
        "J41": "l",
        "J42": "l",
        "J75": "l",
        "J76": "l",
        "J77": "l",
        "J78": "l",
        "J79": "l",
        "J80": "l",
        "J81": "l",
        "J82": "l",
        "J83": "l",
        "J84": "l",
        "J85": "l",
        "J86": "l",
        "J87": "l",
        "J88": "l",
        "J89": "l",
        "J90": "l",
        "J91": "l",
        "J92": "l",
        "J93": "l",
        "J94": "l",
        "J95": "l",
        "J96": "l",
        "J97": "l",
        "J98": "l",
        "J99": "l"
    }
};

let state = cloneState(defaultState);
let tournamentMode = "";
let activeTournamentId = "";
let ballotTournamentId = "";
let bracketTournamentId = "";
let bracketZoom = 1;
let sidebarCollapsed = false;
let supabaseClient = null;
let remoteSyncTimer = null;
let remoteSyncInFlight = null;
let remoteStateReady = false;
let currentSession = null;
let currentUserRole = "";
let activeSection = "overview";
let bracketEditMode = false;
let bracketDirty = false;
let bracketDraft = null;
let selectedBracketSwapSlot = null;
let bracketPopupRef = null;
let bracketStatusMessage = "";
let progressTournamentId = "";

const elements = {
    pageShell: document.querySelector(".page-shell"),
    navItems: document.querySelectorAll(".nav-item"),
    panels: document.querySelectorAll(".section-panel"),
    sidebar: document.getElementById("sidebar"),
    sidebarToggleButton: document.getElementById("sidebarToggleButton"),
    summaryTournament: document.getElementById("summaryTournament"),
    summaryTeams: document.getElementById("summaryTeams"),
    summaryMatches: document.getElementById("summaryMatches"),
    overviewTournamentCount: document.getElementById("overviewTournamentCount"),
    overviewRoundCard: document.getElementById("overviewRoundCard"),
    overviewPlayersCard: document.getElementById("overviewPlayersCard"),
    overviewCompletedCard: document.getElementById("overviewCompletedCard"),
    overviewStage: document.getElementById("overviewStage"),
    overviewTeams: document.getElementById("overviewTeams"),
    overviewCompleted: document.getElementById("overviewCompleted"),
    overviewTournamentList: document.getElementById("overviewTournamentList"),
    createTournamentButton: document.getElementById("createTournamentButton"),
    editTournamentButton: document.getElementById("editTournamentButton"),
    tournamentModeStatus: document.getElementById("tournamentModeStatus"),
    tournamentWorkflow: document.getElementById("tournamentWorkflow"),
    editTournamentPicker: document.getElementById("editTournamentPicker"),
    editTournamentSelect: document.getElementById("editTournamentSelect"),
    editTournamentOptions: document.getElementById("editTournamentOptions"),
    duplicateEntriesSection: document.getElementById("duplicateEntriesSection"),
    invalidEntriesSection: document.getElementById("invalidEntriesSection"),
    tournamentForm: document.getElementById("tournamentForm"),
    tournamentName: document.getElementById("tournamentName"),
    tournamentFormat: document.getElementById("tournamentFormat"),
    tournamentMatchRule: document.getElementById("tournamentMatchRule"),
    tournamentCategory: document.getElementById("tournamentCategory"),
    tournamentNotes: document.getElementById("tournamentNotes"),
    tournamentSaveStatus: document.getElementById("tournamentSaveStatus"),
    manualPlayerForm: document.getElementById("manualPlayerForm"),
    manualPlayerName: document.getElementById("manualPlayerName"),
    manualRegistrationNumber: document.getElementById("manualRegistrationNumber"),
    manualAadhar: document.getElementById("manualAadhar"),
    manualOrganization: document.getElementById("manualOrganization"),
    manualCategory: document.getElementById("manualCategory"),
    manualContact: document.getElementById("manualContact"),
    manualPlayerStatus: document.getElementById("manualPlayerStatus"),
    importFile: document.getElementById("importFile"),
    importFileButton: document.getElementById("importFileButton"),
    detectedCategories: document.getElementById("detectedCategories"),
    importStatus: document.getElementById("importStatus"),
    duplicateEntriesList: document.getElementById("duplicateEntriesList"),
    invalidEntriesList: document.getElementById("invalidEntriesList"),
    teamsList: document.getElementById("teamsList"),
    downloadModeSelect: document.getElementById("downloadModeSelect"),
    downloadButton: document.getElementById("downloadButton"),
    filterCategorySelect: document.getElementById("filterCategorySelect"),
    filterOrganizationSelect: document.getElementById("filterOrganizationSelect"),
    playersRegistrationCount: document.getElementById("playersRegistrationCount"),
    playersAadharCount: document.getElementById("playersAadharCount"),
    playersCategoryCount: document.getElementById("playersCategoryCount"),
    playersOrganizationCount: document.getElementById("playersOrganizationCount"),
    ballotTournamentSelect: document.getElementById("ballotTournamentSelect"),
    ballotExportButton: document.getElementById("ballotExportButton"),
    ballotPlayerCount: document.getElementById("ballotPlayerCount"),
    ballotOrganizationCount: document.getElementById("ballotOrganizationCount"),
    ballotCategoryLabel: document.getElementById("ballotCategoryLabel"),
    ballotTournamentLabel: document.getElementById("ballotTournamentLabel"),
    ballotList: document.getElementById("ballotList"),
    bracketTournamentSelect: document.getElementById("bracketTournamentSelect"),
    generateBracketButton: document.getElementById("generateBracketButton"),
    showBracketButton: document.getElementById("showBracketButton"),
    progressTournamentSelect: document.getElementById("progressTournamentSelect"),
    progressMatchRuleDisplay: document.getElementById("progressMatchRuleDisplay"),
    progressStatus: document.getElementById("progressStatus"),
    progressTableBody: document.getElementById("progressTableBody"),
    bracketEditButton: document.getElementById("bracketEditButton"),
    bracketSaveButton: document.getElementById("bracketSaveButton"),
    exportBracketCsvButton: document.getElementById("exportBracketCsvButton"),
    exportBracketExcelButton: document.getElementById("exportBracketExcelButton"),
    exportBracketPdfButton: document.getElementById("exportBracketPdfButton"),
    bracketZoomOutButton: document.getElementById("bracketZoomOutButton"),
    bracketZoomInButton: document.getElementById("bracketZoomInButton"),
    bracketZoomResetButton: document.getElementById("bracketZoomResetButton"),
    bracketZoomLabel: document.getElementById("bracketZoomLabel"),
    bracketStatus: document.getElementById("bracketStatus"),
    bracketPlayerCount: document.getElementById("bracketPlayerCount"),
    bracketSizeCount: document.getElementById("bracketSizeCount"),
    bracketByeCount: document.getElementById("bracketByeCount"),
    bracketRoundCount: document.getElementById("bracketRoundCount"),
    bracketRounds: document.getElementById("bracketRounds"),
    standingsTable: document.getElementById("standingsTable"),
    standingsContext: document.getElementById("standingsContext"),
    standingsCategory: document.getElementById("standingsCategory"),
    announcementForm: document.getElementById("announcementForm"),
    announcementText: document.getElementById("announcementText"),
    announcementsList: document.getElementById("announcementsList"),
    resetAppButton: document.getElementById("resetAppButton"),
    backupExportButton: document.getElementById("backupExportButton"),
    backupImportButton: document.getElementById("backupImportButton"),
    backupImportInput: document.getElementById("backupImportInput"),
    authShell: document.getElementById("authShell"),
    authForm: document.getElementById("authForm"),
    authEmail: document.getElementById("authEmail"),
    authPassword: document.getElementById("authPassword"),
    authStatus: document.getElementById("authStatus"),
    authSessionLabel: document.getElementById("authSessionLabel"),
    signOutButton: document.getElementById("signOutButton"),
    teamCardTemplate: document.getElementById("teamCardTemplate"),
    announcementTemplate: document.getElementById("announcementTemplate"),
};

bindEvents();
renderAll();
initializeAuth();

function bindEvents() {
    if (elements.sidebarToggleButton) {
        elements.sidebarToggleButton.addEventListener("click", () => {
            sidebarCollapsed = !sidebarCollapsed;
            renderSidebarState();
        });
    }

    elements.navItems.forEach((item) => {
        item.addEventListener("click", () => {
            const section = item.dataset.section;
            if (!canAccessSection(section)) {
                return;
            }
            setActiveSection(section);
        });
    });

    elements.tournamentForm.addEventListener("submit", (event) => {
        event.preventDefault();
        if (!elements.tournamentCategory.value) {
            window.alert("Please choose a category before saving the tournament.");
            return;
        }
        state.tournament = {
            name: formatTournamentName(elements.tournamentName.value.trim(), elements.tournamentCategory.value),
            format: elements.tournamentFormat.value,
            matchRule: elements.tournamentMatchRule?.value || "single_25",
            category: elements.tournamentCategory.value,
            notes: elements.tournamentNotes.value.trim(),
        };
        saveTournamentEntry();
        const savedLabel = state.tournament.name;
        tournamentMode = "";
        activeTournamentId = "";
        resetWorkingTournament();
        persist();
        renderAll();
        setTournamentModeStatus(`Saved tournament ${savedLabel}. Choose Create or Edit to continue.`);
    });

    if (elements.createTournamentButton) {
        elements.createTournamentButton.addEventListener("click", () => {
            tournamentMode = "create";
            activeTournamentId = "";
            resetWorkingTournament();
            setTournamentModeStatus("");
            renderAll();
        });
    }

    if (elements.editTournamentButton) {
        elements.editTournamentButton.addEventListener("click", () => {
            tournamentMode = "edit";
            activeTournamentId = "";
            state.tournament = {
                name: "",
                format: "League",
                matchRule: "single_25",
                category: "",
                notes: "",
            };
            state.importMeta = cloneState(defaultState.importMeta);
            state.teams = [];
            state.matches = [];
            state.announcements = [];
            renderEditTournamentOptions();
            setTournamentModeStatus("");
            renderAll();
        });
    }

    if (elements.editTournamentSelect) {
        elements.editTournamentSelect.addEventListener("change", () => {
            const selectedId = elements.editTournamentSelect.value;
            const selected = state.tournaments.find((item) => item.id === selectedId);
            if (!selected) {
                activeTournamentId = "";
                return;
            }
            loadTournamentEntry(selectedId);
            setTournamentModeStatus("");
            renderAll();
        });
    }

    if (elements.manualPlayerForm) {
        elements.manualPlayerForm.addEventListener("submit", (event) => {
            event.preventDefault();
            addManualPlayer();
        });
    }

    elements.importFileButton.addEventListener("click", async () => {
        const file = elements.importFile.files?.[0];
        if (!file) {
            setImportStatus("Choose a CSV file first.");
            return;
        }

        const text = await file.text();
        importPlayersFromCsv(text, "CSV file");
    });

    if (elements.standingsCategory) {
        elements.standingsCategory.addEventListener("change", () => {
            renderStandings();
        });
    }

    if (elements.downloadButton) {
        elements.downloadButton.addEventListener("click", () => {
            const mode = elements.downloadModeSelect?.value || "all_players";
            const category = elements.filterCategorySelect?.value || "";
            const organization = elements.filterOrganizationSelect?.value || "";

            if (mode === "all_players") {
                exportPlayersCsv(state.teams, "players-list.csv");
                return;
            }

            if (mode === "duplicate_entries") {
                exportSkippedCsv(state.importMeta.duplicateEntries || [], "duplicate-entries.csv");
                return;
            }

            if (mode === "invalid_entries") {
                exportSkippedCsv(state.importMeta.invalidEntries || [], "invalid-entries.csv");
                return;
            }

            if (mode === "by_category") {
                const filtered = category
                    ? state.teams.filter((team) => String(team.category || "").trim() === category)
                    : [...state.teams].sort((a, b) =>
                        String(a.category || "").localeCompare(String(b.category || "")) ||
                        String(a.name || "").localeCompare(String(b.name || ""))
                    );
                exportPlayersCsv(filtered, `players-category-${slugify(category || "all")}.csv`);
                return;
            }

            if (mode === "by_organization") {
                const filtered = organization
                    ? state.teams.filter((team) => String(team.organization || "").trim() === organization)
                    : [...state.teams].sort((a, b) =>
                        String(a.organization || "").localeCompare(String(b.organization || "")) ||
                        String(a.name || "").localeCompare(String(b.name || ""))
                    );
                exportPlayersCsv(filtered, `players-organization-${slugify(organization || "all")}.csv`);
            }
        });
    }

    if (elements.filterCategorySelect) {
        elements.filterCategorySelect.addEventListener("change", () => {
            renderTeams();
        });
    }

    if (elements.filterOrganizationSelect) {
        elements.filterOrganizationSelect.addEventListener("change", () => {
            renderTeams();
        });
    }

    if (elements.ballotTournamentSelect) {
        elements.ballotTournamentSelect.addEventListener("change", () => {
            ballotTournamentId = elements.ballotTournamentSelect.value || "";
            renderBallot();
        });
    }

    if (elements.ballotExportButton) {
        elements.ballotExportButton.addEventListener("click", () => {
            const ballotPlayers = getBallotPlayers();
            if (ballotPlayers.length === 0) {
                return;
            }

            const currentTournament = state.tournaments.find((item) => item.id === ballotTournamentId);
            const label = currentTournament
                ? `${currentTournament.name}-${currentTournament.category}`
                : "ballot";
            exportBallotCsv(ballotPlayers, `ballot-${slugify(label)}.csv`);
        });
    }

    if (elements.bracketTournamentSelect) {
        elements.bracketTournamentSelect.addEventListener("change", () => {
            if (bracketEditMode && bracketDirty && !window.confirm("Discard the current unsaved bracket changes and switch tournaments?")) {
                elements.bracketTournamentSelect.value = bracketTournamentId || "";
                return;
            }

            bracketEditMode = false;
            bracketDirty = false;
            bracketDraft = null;
            selectedBracketSwapSlot = null;
            bracketTournamentId = elements.bracketTournamentSelect.value || "";
            renderBracket();
        });
    }

      if (elements.generateBracketButton) {
          elements.generateBracketButton.addEventListener("click", () => {
              if (!bracketTournamentId) {
                  setBracketStatus("Choose a saved tournament before generating a bracket.");
                  return;
            }

            const generated = generateBracketForTournament(bracketTournamentId);
              if (!generated) {
                  return;
              }

              bracketEditMode = false;
              bracketDirty = false;
              bracketDraft = null;
              selectedBracketSwapSlot = null;
              persist();
              renderAll();
              setBracketStatus("Bracket generated for the selected tournament.");
              const updatedTournament = state.tournaments.find((item) => item.id === bracketTournamentId);
              const updatedBracket = getActiveBracketPreview(updatedTournament);
              if (updatedTournament && updatedBracket) {
                  openBracketWindow(updatedTournament, updatedBracket);
              }
          });
      }

      if (elements.showBracketButton) {
          elements.showBracketButton.addEventListener("click", () => {
              if (!bracketTournamentId) {
                  setBracketStatus("Choose a saved tournament before opening the bracket.");
                  return;
              }

              const currentTournament = state.tournaments.find((item) => item.id === bracketTournamentId);
              const currentBracket = getActiveBracketPreview(currentTournament);
              if (!currentTournament || !currentBracket) {
                  setBracketStatus("No saved bracket is available for the selected tournament yet.");
                  return;
              }

              openBracketWindow(currentTournament, currentBracket);
          });
      }

      if (elements.bracketEditButton) {
          elements.bracketEditButton.addEventListener("click", () => {
              const currentTournament = state.tournaments.find((item) => item.id === bracketTournamentId);
              if (!currentTournament?.bracket) {
                  setBracketStatus("Generate a bracket for the selected tournament before editing it.");
                  return;
              }

              if (bracketEditMode) {
                  if (bracketDirty && !window.confirm("Discard the current unsaved bracket changes?")) {
                      return;
                  }

                  bracketEditMode = false;
                  bracketDirty = false;
                  bracketDraft = null;
                  selectedBracketSwapSlot = null;
                  renderBracket();
                  setBracketStatus("Bracket edit mode closed.");
                  return;
              }

              bracketEditMode = true;
              bracketDirty = false;
              bracketDraft = cloneState(currentTournament.bracket);
              selectedBracketSwapSlot = null;
              renderBracket();
              setBracketStatus("Edit mode is on. Click one slot, then another slot to swap players. Save when you're done.");
          });
      }

    if (elements.bracketSaveButton) {
        elements.bracketSaveButton.addEventListener("click", () => {
            const tournamentIndex = state.tournaments.findIndex((item) => item.id === bracketTournamentId);
            if (tournamentIndex === -1 || !bracketEditMode || !bracketDraft) {
                setBracketStatus("Nothing to save yet.");
                return;
            }

              if (!bracketDirty) {
                  setBracketStatus("No bracket changes to save.");
                  return;
              }

              if (!window.confirm("Save the current bracket changes?")) {
                  return;
              }

            const savedBracket = cloneState(bracketDraft);
            recomputeSingleEliminationProgress(savedBracket);
            applyByeAdvancements(savedBracket);
            syncByeAdvancementSlots(savedBracket);
            state.tournaments[tournamentIndex].bracket = savedBracket;
            bracketEditMode = false;
            bracketDirty = false;
            bracketDraft = null;
            selectedBracketSwapSlot = null;
            persist();
            renderAll();
              setBracketStatus("Bracket changes saved.");
          });
      }

      if (elements.exportBracketPdfButton) {
          elements.exportBracketPdfButton.addEventListener("click", () => {
              const currentTournament = state.tournaments.find((item) => item.id === bracketTournamentId);
              if (!currentTournament) {
                setBracketStatus("Choose a saved tournament before exporting the bracket.");
                return;
            }
              if (!currentTournament.bracket) {
                  setBracketStatus("Generate the bracket before exporting it.");
                  return;
              }
              exportBracketPdf(currentTournament);
          });
      }

      if (elements.exportBracketCsvButton) {
          elements.exportBracketCsvButton.addEventListener("click", () => {
              const currentTournament = state.tournaments.find((item) => item.id === bracketTournamentId);
              if (!currentTournament) {
                  setBracketStatus("Choose a saved tournament before exporting the bracket.");
                  return;
              }
              if (!currentTournament.bracket) {
                  setBracketStatus("Generate the bracket before exporting it.");
                  return;
              }
              exportBracketCsv(currentTournament);
          });
      }

      if (elements.exportBracketExcelButton) {
          elements.exportBracketExcelButton.addEventListener("click", () => {
              const currentTournament = state.tournaments.find((item) => item.id === bracketTournamentId);
              if (!currentTournament) {
                  setBracketStatus("Choose a saved tournament before exporting the bracket.");
                  return;
              }
              if (!currentTournament.bracket) {
                  setBracketStatus("Generate the bracket before exporting it.");
                  return;
              }
              exportBracketExcel(currentTournament);
          });
      }

      if (elements.bracketZoomOutButton) {
        elements.bracketZoomOutButton.addEventListener("click", () => {
            bracketZoom = Math.max(0.6, Number((bracketZoom - 0.1).toFixed(2)));
            renderBracket();
        });
    }

    if (elements.bracketZoomInButton) {
        elements.bracketZoomInButton.addEventListener("click", () => {
            bracketZoom = Math.min(1.8, Number((bracketZoom + 0.1).toFixed(2)));
            renderBracket();
        });
    }

    if (elements.bracketZoomResetButton) {
        elements.bracketZoomResetButton.addEventListener("click", () => {
            bracketZoom = 1;
            renderBracket();
        });
    }

    if (elements.progressTournamentSelect) {
        elements.progressTournamentSelect.addEventListener("change", () => {
            progressTournamentId = elements.progressTournamentSelect.value || "";
            renderBracketProgress();
        });
    }

    if (elements.progressMatchRuleDisplay) {
        elements.progressMatchRuleDisplay.addEventListener("change", () => {
            const tournamentIndex = state.tournaments.findIndex((item) => item.id === progressTournamentId);
            if (tournamentIndex === -1) {
                return;
            }

            state.tournaments[tournamentIndex].matchRule = elements.progressMatchRuleDisplay.value || "single_25";
            if (activeTournamentId === progressTournamentId) {
                state.tournament.matchRule = state.tournaments[tournamentIndex].matchRule;
                if (elements.tournamentMatchRule) {
                    elements.tournamentMatchRule.value = state.tournament.matchRule;
                }
            }
            persistWithMode("progress", { tournamentId: progressTournamentId });
            renderAll();
            setProgressStatus(`Match rule updated to ${getMatchRuleLabel(state.tournaments[tournamentIndex].matchRule)}.`);
        });
    }

    if (elements.progressTableBody) {
    elements.progressTableBody.addEventListener("click", (event) => {
            const sheetButton = event.target.closest("[data-progress-sheet]");
            if (sheetButton) {
                openProgressScoreSheet(sheetButton.dataset.progressSheet || "");
                return;
            }
            const button = event.target.closest("[data-progress-save]");
            if (!button) {
                const unlockButton = event.target.closest("[data-progress-unlock]");
                if (!unlockButton) {
                    return;
                }
                unlockBracketProgressResult(unlockButton.dataset.progressUnlock || "");
                return;
            }
            saveBracketProgressResult(button.dataset.progressSave || "");
        });
    }

    if (elements.overviewTournamentList) {
        elements.overviewTournamentList.addEventListener("click", (event) => {
            const deleteButton = event.target.closest("[data-overview-delete]");
            if (!deleteButton) {
                return;
            }

            removeTournamentEntry(deleteButton.dataset.overviewDelete || "");
        });
    }

    if (elements.announcementForm) {
        elements.announcementForm.addEventListener("submit", (event) => {
            event.preventDefault();
            const message = elements.announcementText.value.trim();
            if (!message) {
                return;
            }

            state.announcements.unshift({
                id: createId(),
                message,
            });

            elements.announcementForm.reset();
            persist();
            renderAll();
        });
    }

    elements.resetAppButton.addEventListener("click", () => {
        resetWorkingTournament();
        tournamentMode = "";
        ballotTournamentId = "";
        bracketTournamentId = "";
        progressTournamentId = "";
        setTournamentModeStatus("");
        persist();
        renderAll();
    });

    const bindBackupControls = (exportButton, importButton, importInput) => {
        if (exportButton) {
            exportButton.addEventListener("click", () => {
                exportLocalBackup();
            });
        }

        if (importButton && importInput) {
            importButton.addEventListener("click", () => {
                importInput.value = "";
                importInput.click();
            });

            importInput.addEventListener("change", async () => {
                const file = importInput.files?.[0];
                if (!file) {
                    return;
                }
                try {
                    const text = await file.text();
                    importLocalBackup(text);
                    renderAll();
                } catch (error) {
                    console.error(error);
                    window.alert("Backup import failed. Please check the JSON file.");
                }
            });
        }
    };

    bindBackupControls(elements.backupExportButton, elements.backupImportButton, elements.backupImportInput);

    if (elements.authForm) {
        elements.authForm.addEventListener("submit", async (event) => {
            event.preventDefault();
            const email = elements.authEmail?.value.trim() || "";
            const password = elements.authPassword?.value || "";
            if (!email || !password) {
                setAuthStatus("Enter both email and password.");
                return;
            }

            const client = initializeSupabaseClient();
            if (!client) {
                setAuthStatus("Supabase is not ready yet.");
                return;
            }

            setAuthStatus("Signing in...");
            const { error } = await client.auth.signInWithPassword({ email, password });
            if (error) {
                setAuthStatus(error.message || "Sign-in failed.");
                return;
            }

            if (elements.authPassword) {
                elements.authPassword.value = "";
            }
            setAuthStatus("Signed in.");
        });
    }

    if (elements.signOutButton) {
        elements.signOutButton.addEventListener("click", async () => {
            const client = initializeSupabaseClient();
            if (!client) {
                return;
            }
            const { error } = await client.auth.signOut();
            if (error) {
                setAuthStatus(error.message || "Sign-out failed.");
            }
        });
    }
}

function renderAll() {
    setActiveSection(activeSection);
    renderSidebarState();
    renderTournamentForm();
    renderSummary();
    renderOverviewFixed();
    renderTeams();
    renderBallotTournamentOptions();
    renderBallot();
    renderBracketTournamentOptions();
    renderBracket();
    renderBracketProgressTournamentOptions();
    renderBracketProgress();
    renderStandings();
    renderAnnouncements();
    renderDetectedCategories();
    renderSkippedEntries();
    renderStandingsCategoryOptions();
    renderManualCategoryOptions();
    renderPlayersSummary();
    renderFilterCategoryOptions();
    renderFilterOrganizationOptions();
    renderEditTournamentOptions();
    renderTournamentMode();
    refreshBracketPopup();
}

function setAuthStatus(message) {
    if (elements.authStatus) {
        elements.authStatus.textContent = message || "";
    }
}

function isSuperAdmin() {
    return currentUserRole === "super_admin";
}

function isProgressUser() {
    return currentUserRole === "progress_user";
}

function getAccessibleSections() {
    if (isSuperAdmin()) {
        return ["overview", "tournament", "ballot", "bracket", "progress", "standings"];
    }
    if (isProgressUser()) {
        return ["progress"];
    }
    return [];
}

function canAccessSection(section) {
    return getAccessibleSections().includes(String(section || "").trim());
}

function setActiveSection(section) {
    const nextSection = canAccessSection(section) ? section : (getAccessibleSections()[0] || "overview");
    activeSection = nextSection;
    elements.navItems.forEach((nav) => {
        const allowed = canAccessSection(nav.dataset.section);
        nav.style.display = allowed ? "" : "none";
        nav.classList.toggle("active", allowed && nav.dataset.section === activeSection);
    });
    elements.panels.forEach((panel) => {
        const allowed = canAccessSection(panel.dataset.section);
        panel.classList.toggle("active", allowed && panel.dataset.section === activeSection);
        panel.style.display = allowed ? "" : "none";
    });
}

function renderAuthState() {
    const authenticated = Boolean(currentSession?.user);
    const authorized = authenticated && Boolean(currentUserRole);
    document.body.classList.toggle("auth-locked", !authorized);
    if (elements.authSessionLabel) {
        elements.authSessionLabel.textContent = authorized
            ? `${currentSession.user.email || "Signed-in user"} (${currentUserRole})`
            : "Not signed in";
    }
    if (elements.signOutButton) {
        elements.signOutButton.style.display = authenticated ? "" : "none";
    }
    if (!authenticated) {
        setAuthStatus("Sign in to access tournaments, brackets, and progress data.");
    } else if (!authorized) {
        setAuthStatus("This account does not have an app role yet.");
    }
}

function clearClientStateForSignOut() {
    state = cloneState(defaultState);
    tournamentMode = "";
    activeTournamentId = "";
    ballotTournamentId = "";
    bracketTournamentId = "";
    progressTournamentId = "";
    sidebarCollapsed = false;
    bracketZoom = 1;
    bracketEditMode = false;
    bracketDirty = false;
    bracketDraft = null;
    selectedBracketSwapSlot = null;
    remoteStateReady = false;
    currentUserRole = currentSession?.user ? currentUserRole : "";
    renderAll();
}

async function applyAuthSession(session) {
    currentSession = session || null;
    if (!currentSession?.user) {
        currentUserRole = "";
        renderAuthState();
        clearClientStateForSignOut();
        return;
    }

    const client = initializeSupabaseClient();
    try {
        currentUserRole = await fetchCurrentUserRole(client, currentSession.user.id);
    } catch (error) {
        console.error(error);
        currentUserRole = "";
        setAuthStatus("Signed in, but the app role could not be loaded.");
    }

    renderAuthState();
    if (!currentUserRole) {
        clearClientStateForSignOut();
        return;
    }

    activeSection = canAccessSection(activeSection) ? activeSection : getAccessibleSections()[0];
    renderAll();
    remoteStateReady = false;
    await initializeRemotePersistence();
}

async function initializeAuth() {
    const client = initializeSupabaseClient();
    renderAuthState();
    if (!client) {
        setAuthStatus("Supabase client could not be initialized.");
        return;
    }

    const {
        data: { session },
        error,
    } = await client.auth.getSession();
    if (error) {
        setAuthStatus(error.message || "Unable to check session.");
        return;
    }

    await applyAuthSession(session);
    client.auth.onAuthStateChange(async (_event, nextSession) => {
        await applyAuthSession(nextSession);
    });
}

async function fetchCurrentUserRole(client, userId) {
    const { data, error } = await client
        .from("user_roles")
        .select("role")
        .eq("user_id", userId)
        .maybeSingle();
    if (error) {
        throw error;
    }
    return String(data?.role || "").trim();
}

function renderSidebarState() {
    if (!elements.sidebar || !elements.sidebarToggleButton || !elements.pageShell) {
        return;
    }

    elements.sidebar.classList.toggle("collapsed", sidebarCollapsed);
    elements.pageShell.classList.toggle("sidebar-collapsed", sidebarCollapsed);
    elements.sidebarToggleButton.textContent = sidebarCollapsed ? ">" : "<";
    elements.sidebarToggleButton.setAttribute("aria-label", sidebarCollapsed ? "Expand menu" : "Collapse menu");
}

function addManualPlayer() {
    const rawName = elements.manualPlayerName?.value.trim() || "";
    const name = rawName ? rawName.toUpperCase() : "";
    const registrationNumber = elements.manualRegistrationNumber?.value.trim() || "";
    const aadhar = elements.manualAadhar?.value.trim() || "";
    const organization = elements.manualOrganization?.value.trim() || "";
    const category = elements.manualCategory?.value.trim() || "";
    const contact = elements.manualContact?.value.trim() || "";

    if (!name) {
        setManualPlayerStatus("Player name is required.");
        return;
    }

    const identityKey = buildPlayerIdentityKey({
        registrationNumber,
        aadhar,
        organization,
        category,
    });

    if (!identityKey) {
        setManualPlayerStatus("Manual entry needs registration number or Aadhar, plus organization and category.");
        return;
    }

    const exists = state.teams.some((team) => buildPlayerIdentityKey(team) === identityKey);
    if (exists) {
        setManualPlayerStatus("That player already exists for the same identity combination.");
        return;
    }

    state.teams.push({
        id: createId(),
        name,
        contact,
        registrationNumber,
        aadhar,
        organization,
        category,
        source: "Manual entry",
    });

    state.importMeta.categories = Array.from(
        new Set([...(state.importMeta.categories || []), category].filter(Boolean))
    ).sort((a, b) => a.localeCompare(b));

    elements.manualPlayerForm.reset();
    persist();
    renderAll();
    setManualPlayerStatus(`Added player ${name}.`);
}

function resetWorkingTournament() {
    state.tournament = {
        name: "",
        format: "League",
        matchRule: "single_25",
        category: "",
        notes: "",
    };
    state.importMeta = cloneState(defaultState.importMeta);
    state.teams = [];
    state.matches = [];
    state.announcements = [];
    activeTournamentId = "";
    if (elements.importFile) {
        elements.importFile.value = "";
    }
    setImportStatus("No spreadsheet imported yet.");
    setManualPlayerStatus("No manual player added yet.");
    setTournamentSaveStatus("No tournament saved yet.");
}

function loadTournamentEntry(tournamentId) {
    const selectedIndex = state.tournaments.findIndex((item) => item.id === tournamentId);
    if (selectedIndex === -1) {
        return false;
    }

    const selected = state.tournaments[selectedIndex];
    const selectedCategory = String(selected.category || "").trim();
    const sanitizedTeams = normalizeTeams(selected.teams).filter(
        (team) => String(team.category || "").trim() === selectedCategory
    );
    const sanitizedMatches = Array.isArray(selected.matches)
        ? cloneState(selected.matches).filter((match) => {
            const allowedIds = new Set(sanitizedTeams.map((team) => team.id));
            return allowedIds.has(match.teamA) && allowedIds.has(match.teamB);
        })
        : [];

    activeTournamentId = selected.id;
    state.tournament = {
        name: selected.name || "",
        format: selected.format || "League",
        matchRule: selected.matchRule || "single_25",
        category: selected.category || "",
        notes: selected.notes || "",
    };
    state.importMeta = {
        ...normalizeImportMeta(selected.importMeta),
        categories: selectedCategory ? [selectedCategory] : [],
        duplicateEntries: [],
        invalidEntries: [],
        duplicateKeys: [],
    };
    state.teams = sanitizedTeams;
    state.matches = sanitizedMatches;
    state.announcements = Array.isArray(selected.announcements) ? cloneState(selected.announcements) : [];
    state.tournaments[selectedIndex] = {
        ...selected,
        teams: cloneState(sanitizedTeams),
        playerCount: sanitizedTeams.length,
        importMeta: {
            ...normalizeImportMeta(selected.importMeta),
            categories: selectedCategory ? [selectedCategory] : [],
        },
        matches: cloneState(sanitizedMatches),
    };
    if (elements.filterCategorySelect) {
        elements.filterCategorySelect.value = "";
    }
    if (elements.filterOrganizationSelect) {
        elements.filterOrganizationSelect.value = "";
    }
    setImportStatus(
        state.teams.length > 0
            ? `Loaded ${state.teams.length} player(s) from ${selected.name} - ${selected.category}.`
            : "No spreadsheet imported yet."
    );
    setManualPlayerStatus("No manual player added yet.");
    setTournamentSaveStatus(`Loaded tournament ${selected.name} - ${selected.category}.`);
    persist();
    return true;
}

function saveTournamentEntry() {
    const tournamentCategory = String(state.tournament.category || "").trim();
    state.tournament.name = formatTournamentName(state.tournament.name, tournamentCategory);
    const tournamentTeams = normalizeTeams(state.teams).filter(
        (team) => String(team.category || "").trim() === tournamentCategory
    );
    const allowedIds = new Set(tournamentTeams.map((team) => team.id));
    const playerCount = getTournamentPlayers().length;
    const existingIndex = state.tournaments.findIndex(
        (item) => (tournamentMode === "edit" && item.id === activeTournamentId)
            || (item.name === state.tournament.name && item.category === state.tournament.category)
    );

    const entry = {
        id: existingIndex === -1 ? createId() : state.tournaments[existingIndex].id,
        name: formatTournamentName(state.tournament.name, state.tournament.category),
        format: state.tournament.format,
        matchRule: state.tournament.matchRule || "single_25",
        category: state.tournament.category,
        notes: state.tournament.notes,
        playerCount: tournamentTeams.length,
        teams: cloneState(tournamentTeams),
        importMeta: {
            categories: tournamentCategory ? [tournamentCategory] : [],
            duplicateEntries: cloneState(state.importMeta.duplicateEntries || []),
            invalidEntries: cloneState(state.importMeta.invalidEntries || []),
            duplicateKeys: cloneState(state.importMeta.duplicateKeys || []),
        },
        matches: cloneState(
            state.matches.filter((match) => allowedIds.has(match.teamA) && allowedIds.has(match.teamB))
        ),
        announcements: cloneState(state.announcements),
        bracket: existingIndex === -1 ? null : cloneState(state.tournaments[existingIndex].bracket || null),
    };

    if (existingIndex === -1) {
        state.tournaments.push(entry);
    } else {
        state.tournaments[existingIndex] = entry;
    }

    activeTournamentId = entry.id;
}

function removeTournamentEntry(tournamentId) {
    const normalizedId = String(tournamentId || "").trim();
    if (!normalizedId) {
        return;
    }

    const tournament = state.tournaments.find((item) => item.id === normalizedId);
    if (!tournament) {
        return;
    }

    const confirmed = window.confirm(`Delete tournament "${tournament.name}" and all its related data?`);
    if (!confirmed) {
        return;
    }

    state.tournaments = state.tournaments.filter((item) => item.id !== normalizedId);

    if (activeTournamentId === normalizedId) {
        resetWorkingTournament();
        tournamentMode = "";
    }
    if (ballotTournamentId === normalizedId) {
        ballotTournamentId = "";
    }
    if (bracketTournamentId === normalizedId) {
        bracketTournamentId = "";
        bracketEditMode = false;
        bracketDirty = false;
        bracketDraft = null;
        selectedBracketSwapSlot = null;
    }
    if (progressTournamentId === normalizedId) {
        progressTournamentId = "";
    }

    persist();
    renderAll();
    setTournamentModeStatus(`Deleted tournament ${tournament.name}.`);
}

function importPlayersFromCsv(csvText, sourceLabel) {
    const rows = parseCsv(csvText);
    if (rows.length < 2) {
        setImportStatus(`${sourceLabel}: no data rows found.`);
        return;
    }

    const headers = rows[0].map(normalizeHeader);
    const nameIndex = findHeaderIndex(headers, [
        "player",
        "name",
        "player name",
        "name of the player",
        "name of the player in capitals",
    ]);
    const contactIndex = findHeaderIndex(headers, [
        "contact",
        "phone",
        "mobile",
        "phone number",
    ]);
    const registrationIndex = findHeaderIndex(headers, [
        "player registration number",
        "registration number",
        "registration no",
        "registration no",
    ]);
    const aadharIndex = findHeaderIndex(headers, [
        "aadhar",
        "aadhar number",
        "aadhaar",
        "aadhaar number",
    ]);
    const organizationIndex = findHeaderIndex(headers, [
        "name of the organization institution",
        "organization",
        "organization institution",
        "institution",
        "club",
    ]);
    const categoryIndex = findHeaderIndex(headers, [
        "category",
    ]);

    if (nameIndex === -1) {
        setImportStatus(`${sourceLabel}: missing a player/name column. Detected headers: ${headers.join(" | ")}`);
        return;
    }

    let added = 0;
    let skipped = 0;
    let duplicateCount = 0;
    let missingNameCount = 0;
    let missingIdentityCount = 0;
    const detectedCategories = new Set();
    const addedCategories = new Set();
    const duplicateEntries = [];
    const invalidEntries = [];
    const duplicateKeys = new Set();
    const existingKeys = new Set(
        state.teams.map((team) => buildPlayerIdentityKey(team)).filter(Boolean)
    );

    rows.slice(1).forEach((row) => {
        const rawName = (row[nameIndex] || "").trim();
        const name = rawName ? rawName.toUpperCase() : "";
        const contact = contactIndex === -1 ? "" : (row[contactIndex] || "").trim();
        const registrationNumber = registrationIndex === -1 ? "" : (row[registrationIndex] || "").trim();
        const aadhar = aadharIndex === -1 ? "" : (row[aadharIndex] || "").trim();
        const organization = organizationIndex === -1 ? "" : (row[organizationIndex] || "").trim();
        const category = categoryIndex === -1 ? "" : (row[categoryIndex] || "").trim();
        const identityKey = buildPlayerIdentityKey({
            registrationNumber,
            aadhar,
            organization,
            category,
        });

        if (category) {
            detectedCategories.add(category);
        }

        if (!name) {
            skipped += 1;
            missingNameCount += 1;
            invalidEntries.push({
                name: "",
                registrationNumber,
                aadhar,
                organization,
                category,
                reason: "Missing name",
            });
            return;
        }

        if (!identityKey) {
            skipped += 1;
            missingIdentityCount += 1;
            invalidEntries.push({
                name,
                registrationNumber,
                aadhar,
                organization,
                category,
                reason: "Missing registration/Aadhar, organization, or category",
            });
            return;
        }

        if (existingKeys.has(identityKey)) {
            skipped += 1;
            duplicateCount += 1;
            duplicateKeys.add(identityKey);
            duplicateEntries.push({
                name,
                registrationNumber,
                aadhar,
                organization,
                category,
                reason: "Duplicate entry",
            });
            return;
        }

        state.teams.push({
            id: createId(),
            name,
            contact,
            registrationNumber,
            aadhar,
            organization,
            category,
            source: sourceLabel,
        });
        existingKeys.add(identityKey);
        if (category) {
            addedCategories.add(category);
        }
        added += 1;
    });

    state.importMeta.categories = Array.from(
        new Set([...(state.importMeta.categories || []), ...detectedCategories])
    ).sort((a, b) => a.localeCompare(b));
    state.importMeta.duplicateEntries = duplicateEntries;
    state.importMeta.invalidEntries = invalidEntries;
    state.importMeta.duplicateKeys = Array.from(duplicateKeys);

    if (!state.tournament.category) {
        const availableCategories = getAvailableCategories();
        if (availableCategories.length > 0) {
            state.tournament.category = availableCategories[0];
        }
    }

    persist();
    renderAll();
    setImportStatus(
        `${sourceLabel}: imported ${added} player(s), skipped ${skipped}. ` +
        `Duplicates: ${duplicateCount}, missing name: ${missingNameCount}, missing identity fields: ${missingIdentityCount}. ` +
        `Detected categories: ${formatCategoryList(detectedCategories)}. ` +
        `Added categories: ${formatCategoryList(addedCategories)}. ` +
        `Identity uses registration number or Aadhar with organization and category.`
    );
}

function renderTournamentForm() {
    const categories = getAvailableCategories();
    const currentCategory = state.tournament.category;
    const options = categories
        .map((category) => {
            const selected = category === currentCategory ? ' selected' : "";
            return `<option value="${escapeHtml(category)}"${selected}>${escapeHtml(category)}</option>`;
        })
        .join("");

    elements.tournamentCategory.innerHTML = categories.length > 0
        ? options
        : '<option value="">Import players to load categories</option>';

    if (categories.length > 0 && !currentCategory) {
        elements.tournamentCategory.selectedIndex = 0;
    }
    elements.tournamentName.value = state.tournament.name;
    elements.tournamentFormat.value = state.tournament.format;
    if (elements.tournamentMatchRule) {
        elements.tournamentMatchRule.value = state.tournament.matchRule || "single_25";
    }
    elements.tournamentNotes.value = state.tournament.notes;
}

function renderTournamentMode() {
    const showWorkflow = tournamentMode === "create" || (tournamentMode === "edit" && Boolean(activeTournamentId));

    if (elements.tournamentWorkflow) {
        elements.tournamentWorkflow.style.display = showWorkflow ? "" : "none";
    }
    if (elements.tournamentForm) {
        elements.tournamentForm.style.display = showWorkflow ? "" : "none";
    }
    if (elements.tournamentSaveStatus) {
        elements.tournamentSaveStatus.style.display = showWorkflow && elements.tournamentSaveStatus.textContent ? "" : "none";
    }
    if (elements.editTournamentPicker) {
        elements.editTournamentPicker.style.display = tournamentMode === "edit" ? "" : "none";
    }
}

function renderEditTournamentOptions() {
    if (!elements.editTournamentSelect) {
        return;
    }

    if (!Array.isArray(state.tournaments) || state.tournaments.length === 0) {
        elements.editTournamentSelect.innerHTML = '<option value="">No saved tournaments</option>';
        if (elements.editTournamentOptions) {
            elements.editTournamentOptions.innerHTML = "";
        }
        activeTournamentId = "";
        return;
    }

    elements.editTournamentSelect.innerHTML = ['<option value="">Select a tournament</option>']
        .concat(
            state.tournaments.map((item) => {
                const selected = tournamentMode === "edit" && item.id === activeTournamentId ? ' selected' : "";
                return `<option value="${item.id}"${selected}>${escapeHtml(item.name)}</option>`;
            })
        )
        .join("");

    if (elements.editTournamentOptions) {
        elements.editTournamentOptions.innerHTML = "";
        state.tournaments.forEach((item) => {
            const button = document.createElement("button");
            button.type = "button";
            button.className = item.id === activeTournamentId ? "button" : "button secondary";
            button.textContent = item.name;
            button.addEventListener("click", () => {
                activeTournamentId = item.id;
                if (elements.editTournamentSelect) {
                    elements.editTournamentSelect.value = item.id;
                }
                loadTournamentEntry(item.id);
                setTournamentModeStatus("");
                renderAll();
            });
            button.addEventListener("dblclick", () => {
                const currentBaseName = getTournamentBaseName(item.name, item.category);
                const nextBaseName = window.prompt("Edit tournament name", currentBaseName);
                if (nextBaseName === null) {
                    return;
                }

                const trimmedName = nextBaseName.trim();
                if (!trimmedName) {
                    window.alert("Tournament name cannot be empty.");
                    return;
                }

                renameTournamentEntry(item.id, trimmedName);
            });
            elements.editTournamentOptions.appendChild(button);
        });
    }
}

function renderManualCategoryOptions() {
    if (!elements.manualCategory) {
        return;
    }

    const categories = getAvailableCategories();
    const selected = elements.manualCategory.value;
    elements.manualCategory.innerHTML = categories.length > 0
        ? ['<option value="">Select category</option>']
            .concat(
                categories.map((category) => {
                    const isSelected = category === selected ? ' selected' : "";
                    return `<option value="${escapeHtml(category)}"${isSelected}>${escapeHtml(category)}</option>`;
                })
            )
            .join("")
        : '<option value="">Import players to load categories</option>';
}

function generateBracketForTournament(tournamentId) {
    const tournamentIndex = state.tournaments.findIndex((item) => item.id === tournamentId);
    if (tournamentIndex === -1) {
        setBracketStatus("Saved tournament not found.");
        return false;
    }

    const tournament = state.tournaments[tournamentIndex];
    const players = getBracketPlayers(tournament);
    if (players.length < 2) {
        setBracketStatus("At least 2 entries are needed to create a bracket.");
        return false;
    }

    let bracket = null;
    if (String(tournament.format || "").trim() === "Double Elimination") {
        bracket = buildDoubleEliminationBracketData(players);
    } else {
        bracket = buildSingleEliminationBracketData(players);
    }

    state.tournaments[tournamentIndex] = {
        ...tournament,
        bracket,
    };

    return true;
}

function buildSingleEliminationBracketData(players, startSequence = 1) {
    const size = getBracketSize(players.length);
    const byes = size - players.length;
    const seedPositions = getSeedPositions(size);
    const arrangedPlayers = arrangePlayersForBracket(players, seedPositions, size);
    const seededSlots = Array.from({ length: size }, () => null);

    arrangedPlayers.forEach((player, index) => {
        const bracketPosition = seedPositions[index];
        if (!bracketPosition) {
            return;
        }
        seededSlots[bracketPosition - 1] = {
            id: player.id,
            name: player.name,
            registrationNumber: player.registrationNumber,
            aadhar: player.aadhar,
            organization: player.organization,
            category: player.category,
            contact: player.contact,
            seed: index + 1,
        };
    });

    const rounds = [];
    let currentEntries = seededSlots.map((player) => (
        player
            ? {
                type: "player",
                label: formatBracketPlayerLabel(player),
                seed: player.seed,
                bye: false,
                sourceMatchLabel: "",
            }
            : { type: "bye", label: "BYE", sourceMatchLabel: "" }
    ));
    let matchSequence = startSequence;
    const roundCount = Math.log2(size);

    for (let roundIndex = 0; roundIndex < roundCount; roundIndex += 1) {
        const matches = [];
        const nextEntries = [];

        for (let matchIndex = 0; matchIndex < currentEntries.length; matchIndex += 2) {
            const slotA = currentEntries[matchIndex];
            const slotB = currentEntries[matchIndex + 1];
            const autoAdvance = getAutoAdvanceEntry(slotA, slotB);
            const label = autoAdvance ? "Auto advance" : `Match ${matchSequence}`;
            const roundLabel = getBracketRoundLabel(roundIndex, roundCount);
            matches.push({
                label,
                displayLabel: autoAdvance ? roundLabel : `${roundLabel} - ${label}`,
                slotA: slotA?.label || "TBD",
                slotB: slotB?.label || "TBD",
                sourceA: slotA?.sourceMatchLabel || "",
                sourceB: slotB?.sourceMatchLabel || "",
                seedA: slotA?.seed || "",
                seedB: slotB?.seed || "",
                byeA: Boolean(slotA?.bye),
                byeB: Boolean(slotB?.bye),
                isPlayable: !autoAdvance,
                scoreA: "",
                scoreB: "",
                winnerSide: "",
            });

            if (autoAdvance) {
                nextEntries.push(autoAdvance);
            } else {
                nextEntries.push({
                    type: "winner_ref",
                    label: `Winner of ${label}`,
                    sourceMatchLabel: label,
                    bye: false,
                });
            }

            if (!autoAdvance) {
                matchSequence += 1;
            }
        }

        rounds.push({ matches });
        currentEntries = nextEntries;
    }

    return {
        type: "single",
        size,
        byes,
        rounds,
        nextMatchSequence: matchSequence,
    };
}

function buildDoubleEliminationBracketData(players) {
    const winners = buildSingleEliminationBracketData(players, 1);
    const losers = buildLosersBracketData(winners.rounds, winners.nextMatchSequence);
    const finals = buildDoubleEliminationFinalsData(winners, losers, losers.nextMatchSequence);

    return {
        type: "double",
        size: winners.size,
        byes: winners.byes,
        winners: {
            size: winners.size,
            byes: winners.byes,
            rounds: winners.rounds,
        },
        losers: {
            size: Math.max(2, Math.ceil(winners.size / 2)),
            byes: 0,
            rounds: losers.rounds,
        },
        finals: {
            size: 2,
            byes: 0,
            rounds: finals.rounds,
        },
        rounds: [
            ...winners.rounds,
            ...losers.rounds,
            ...finals.rounds,
        ],
        nextMatchSequence: finals.nextMatchSequence,
    };
}

function buildLosersBracketData(winnerRounds, startSequence) {
    const rounds = [];
    let matchSequence = startSequence;
    const winnerRoundCount = winnerRounds.length;

    if (winnerRoundCount <= 1) {
        return { rounds, nextMatchSequence: matchSequence };
    }

    for (let losersRoundIndex = 0; losersRoundIndex < (winnerRoundCount - 1) * 2; losersRoundIndex += 1) {
        const roundNumber = losersRoundIndex + 1;
        const roundsRemaining = winnerRoundCount - 1 - Math.floor(losersRoundIndex / 2);
        const matchCount = 2 ** Math.max(0, roundsRemaining - 1);
        const matches = [];

        for (let matchIndex = 0; matchIndex < matchCount; matchIndex += 1) {
            const label = `Match ${matchSequence}`;
            const displayLabel = `Losers Round ${roundNumber} - ${label}`;
            const slotA = getLosersBracketSlotLabel(rounds, winnerRounds, losersRoundIndex, matchIndex, "A");
            const slotB = getLosersBracketSlotLabel(rounds, winnerRounds, losersRoundIndex, matchIndex, "B");

            matches.push({
                label,
                displayLabel,
                slotA,
                slotB,
                seedA: "",
                seedB: "",
                byeA: false,
                byeB: false,
                isPlayable: true,
            });

            matchSequence += 1;
        }

        rounds.push({ matches });
    }

    return { rounds, nextMatchSequence: matchSequence };
}

function getLosersBracketSlotLabel(loserRounds, winnerRounds, losersRoundIndex, matchIndex, side) {
    if (losersRoundIndex === 0) {
        const winnerMatchIndex = matchIndex * 2 + (side === "A" ? 0 : 1);
        const winnerMatch = winnerRounds[0]?.matches?.[winnerMatchIndex];
        return winnerMatch?.isPlayable ? `Loser of ${winnerMatch.label}` : "TBD";
    }

    const previousRound = loserRounds[losersRoundIndex - 1]?.matches || [];
    if (losersRoundIndex % 2 === 1) {
        if (side === "A") {
            const previousMatch = previousRound[matchIndex];
            return previousMatch ? `Winner of ${previousMatch.label}` : "TBD";
        }

        const winnerRound = winnerRounds[Math.floor(losersRoundIndex / 2) + 1]?.matches || [];
        const winnerMatch = winnerRound[matchIndex];
        return winnerMatch?.isPlayable ? `Loser of ${winnerMatch.label}` : "TBD";
    }

    const previousMatchIndex = matchIndex * 2 + (side === "A" ? 0 : 1);
    const previousMatch = previousRound[previousMatchIndex];
    return previousMatch ? `Winner of ${previousMatch.label}` : "TBD";
}

function buildDoubleEliminationFinalsData(winners, losers, startSequence) {
    const rounds = [];
    let matchSequence = startSequence;
    const winnersFinal = winners.rounds[winners.rounds.length - 1]?.matches?.[0];
    const losersFinal = losers.rounds[losers.rounds.length - 1]?.matches?.[0];

    if (!winnersFinal || !losersFinal) {
        return { rounds, nextMatchSequence: matchSequence };
    }

    const grandFinalLabel = `Match ${matchSequence}`;
    rounds.push({
        matches: [{
            label: grandFinalLabel,
            displayLabel: `Grand Final - ${grandFinalLabel}`,
            slotA: `Winner of ${winnersFinal.label}`,
            slotB: `Winner of ${losersFinal.label}`,
            seedA: "",
            seedB: "",
            byeA: false,
            byeB: false,
            isPlayable: true,
        }],
    });
    matchSequence += 1;

    const resetLabel = `Match ${matchSequence}`;
    rounds.push({
        matches: [{
            label: resetLabel,
            displayLabel: `Bracket Reset - ${resetLabel}`,
            slotA: `Loser of ${grandFinalLabel}`,
            slotB: `Winner of ${grandFinalLabel}`,
            seedA: "",
            seedB: "",
            byeA: false,
            byeB: false,
            isPlayable: true,
            isOptional: true,
        }],
    });
    matchSequence += 1;

    return { rounds, nextMatchSequence: matchSequence };
}

function renderPlayersSummary() {
    if (!elements.playersRegistrationCount) {
        return;
    }

    const registrationCount = state.teams.filter((team) => String(team.registrationNumber || "").trim() !== "").length;
    const aadharCount = state.teams.filter((team) => String(team.aadhar || "").trim() !== "").length;
    const categoryCount = new Set(state.teams.map((team) => String(team.category || "").trim()).filter(Boolean)).size;
    const organizationCount = new Set(state.teams.map((team) => String(team.organization || "").trim()).filter(Boolean)).size;

    elements.playersRegistrationCount.textContent = String(registrationCount);
    elements.playersAadharCount.textContent = String(aadharCount);
    elements.playersCategoryCount.textContent = String(categoryCount);
    elements.playersOrganizationCount.textContent = String(organizationCount);
}

function getAutoAdvanceEntry(slotA, slotB) {
    if (!slotA && !slotB) {
        return { type: "bye", label: "BYE" };
    }
    if (slotA?.type === "player" && slotB?.type === "bye") {
        return {
            ...slotA,
            bye: true,
        };
    }
    if (slotA?.type === "bye" && slotB?.type === "player") {
        return {
            ...slotB,
            bye: true,
        };
    }
    if (slotA?.type === "player" && !slotB) {
        return {
            ...slotA,
            bye: true,
        };
    }
    if (!slotA && slotB?.type === "player") {
        return {
            ...slotB,
            bye: true,
        };
    }
    return null;
}

function getSeedPositions(size) {
    if (size <= 1) {
        return [1];
    }

    let positions = [1, 2];
    while (positions.length < size) {
        const mirrorBase = positions.length * 2 + 1;
        positions = positions.flatMap((seed) => [seed, mirrorBase - seed]);
    }
    return positions;
}

function arrangePlayersForBracket(players, seedPositions, size) {
    const remaining = players.map((player) => ({ ...player }));
    const seededSlots = Array.from({ length: size }, () => null);
    const arranged = [];

    seedPositions.forEach((bracketPosition) => {
        const slotIndex = bracketPosition - 1;
        const opponentIndex = getFirstRoundOpponentIndex(slotIndex);
        const opponent = seededSlots[opponentIndex];
        const candidateIndex = chooseBracketCandidateIndex(remaining, opponent);

        if (candidateIndex === -1) {
            return;
        }

        const [chosen] = remaining.splice(candidateIndex, 1);
        seededSlots[slotIndex] = chosen;
        arranged.push(chosen);
    });

    return arranged;
}

function getFirstRoundOpponentIndex(slotIndex) {
    return slotIndex % 2 === 0 ? slotIndex + 1 : slotIndex - 1;
}

function chooseBracketCandidateIndex(players, opponent) {
    if (!players.length) {
        return -1;
    }
    if (!opponent) {
        return 0;
    }

    const opponentOrg = getBracketOrganizationIdentity(opponent.organization);
    if (!opponentOrg) {
        return 0;
    }

    const differentOrgIndex = players.findIndex((player) => (
        getBracketOrganizationIdentity(player.organization) !== opponentOrg
    ));

    return differentOrgIndex === -1 ? 0 : differentOrgIndex;
}

function getBracketOrganizationIdentity(value) {
    return String(getDisplayOrganization(value) || "").trim().toLowerCase();
}

function getBracketRoundLabel(roundIndex, roundCount) {
    const remainingRounds = roundCount - roundIndex;
    if (remainingRounds <= 1) {
        return "Final";
    }
    if (remainingRounds === 2) {
        return "Semifinal";
    }
    if (remainingRounds === 3) {
        return "Quarterfinal";
    }

    const fieldSize = 2 ** remainingRounds;
    return `Round of ${fieldSize}`;
}

function getBracketRoundMetrics(roundCount) {
    const cardHeight = 112;
    const baseGap = 18;
    const metrics = [];
    let previousGap = baseGap;

    for (let roundIndex = 0; roundIndex < roundCount; roundIndex += 1) {
        if (roundIndex === 0) {
            metrics.push({ gap: baseGap, offset: 0 });
            continue;
        }

        const offset = Math.round((cardHeight + previousGap) / 2);
        const gap = Math.round((cardHeight + previousGap) * 2 - cardHeight);
        metrics.push({ gap, offset });
        previousGap = gap;
    }

    return metrics;
}

function renderBracketSvg(bracket, tournament, options = {}) {
    const layout = getBracketSvgLayout(bracket.rounds);
    const finalRound = bracket.rounds[bracket.rounds.length - 1];
    const championLabel = finalRound?.matches?.[0]
        ? `Winner of ${finalRound.matches[0].label}`
        : "Champion";
    const title = options.title || `${tournament.name} - ${tournament.category}`;
    const sectionKey = options.sectionKey || "main";
    const footerText = options.footerText || "Bracket preview";

    const parts = [
        `<div class="bracket-svg-wrap" style="--bracket-scale:${bracketZoom}; width:${layout.width * bracketZoom}px; height:${layout.height * bracketZoom}px;">`,
        `<svg class="bracket-svg" width="${layout.width}" height="${layout.height}" viewBox="0 0 ${layout.width} ${layout.height}" role="img" aria-label="${escapeHtml(title)} bracket">`,
        `<rect x="0" y="0" width="${layout.width}" height="${layout.height}" rx="24" fill="#081321"></rect>`,
        `<text x="${layout.paddingX}" y="34" class="svg-title">${escapeXml(title)}</text>`,
        `<text x="${layout.paddingX}" y="${layout.height - 14}" class="svg-match-label">${escapeXml(footerText)}</text>`,
    ];

    bracket.rounds.forEach((round, roundIndex) => {
        round.matches.forEach((match, matchIndex) => {
            const matchBox = getSvgMatchBox(layout, roundIndex, matchIndex);
            const topSlotY = matchBox.y + layout.labelHeight;
            const bottomSlotY = topSlotY + layout.slotHeight + layout.slotGap;
            const slotLineStartX = matchBox.x + matchBox.width;
            const mergeX = slotLineStartX + layout.connectorReach;
            const topMidY = topSlotY + layout.slotHeight / 2;
            const bottomMidY = bottomSlotY + layout.slotHeight / 2;
            const mergeMidY = (topMidY + bottomMidY) / 2;
            const isByeMatch = Boolean(
                match.byeA
                || match.byeB
                || /^BYE$/i.test(String(match.slotA || "").trim())
                || /^BYE$/i.test(String(match.slotB || "").trim())
            );
            const matchClass = match.isPlayable
                ? `svg-match-box${isByeMatch ? " svg-match-box-bye" : ""}`
                : `svg-match-box svg-match-box-auto${isByeMatch ? " svg-match-box-bye" : ""}`;

            parts.push(
                `<rect x="${matchBox.x}" y="${matchBox.y}" width="${matchBox.width}" height="${matchBox.height}" rx="18" class="${matchClass}"></rect>`,
                `<text x="${matchBox.x + 14}" y="${matchBox.y + 18}" class="${match.isPlayable ? "svg-match-label" : "svg-match-label svg-match-label-auto"}">${escapeXml(match.displayLabel || match.label)}</text>`,
                renderSvgSlot(matchBox.x + 12, topSlotY, layout, match.seedA, match.slotA, match.byeA, roundIndex, matchIndex, "slotA", sectionKey),
                renderSvgSlot(matchBox.x + 12, bottomSlotY, layout, match.seedB, match.slotB, match.byeB, roundIndex, matchIndex, "slotB", sectionKey)
            );

            if (roundIndex < bracket.rounds.length - 1) {
                const nextMatchBox = getSvgMatchBox(layout, roundIndex + 1, Math.floor(matchIndex / 2));
                const nextCenterX = nextMatchBox.x;
                const nextCenterY = nextMatchBox.y + layout.labelHeight + layout.slotHeight + layout.slotGap / 2;

                parts.push(
                    `<path d="M ${slotLineStartX} ${topMidY} L ${mergeX} ${topMidY} L ${mergeX} ${bottomMidY} L ${slotLineStartX} ${bottomMidY}" class="svg-connector"></path>`,
                    `<path d="M ${mergeX} ${mergeMidY} L ${nextCenterX - 18} ${mergeMidY} L ${nextCenterX - 18} ${nextCenterY} L ${nextCenterX} ${nextCenterY}" class="svg-connector"></path>`
                );
            } else {
                const championX = layout.paddingX + bracket.rounds.length * layout.columnWidth;
                const championMidY = layout.championY + layout.championHeight / 2;
                parts.push(
                    `<path d="M ${slotLineStartX} ${topMidY} L ${mergeX} ${topMidY} L ${mergeX} ${bottomMidY} L ${slotLineStartX} ${bottomMidY}" class="svg-connector"></path>`,
                    `<path d="M ${mergeX} ${mergeMidY} L ${championX - 24} ${mergeMidY} L ${championX - 24} ${championMidY} L ${championX} ${championMidY}" class="svg-connector"></path>`
                );
            }
        });
    });

    parts.push(
        `<rect x="${layout.paddingX + bracket.rounds.length * layout.columnWidth}" y="${layout.championY}" width="${layout.championWidth}" height="${layout.championHeight}" rx="22" class="svg-champion-box"></rect>`,
        `<text x="${layout.paddingX + bracket.rounds.length * layout.columnWidth + 16}" y="${layout.championY + 24}" class="svg-match-label">Final winner</text>`,
        `<text x="${layout.paddingX + bracket.rounds.length * layout.columnWidth + 16}" y="${layout.championY + 56}" class="svg-champion-name">${escapeXml(championLabel)}</text>`,
        `</svg>`,
        `</div>`
    );

    return parts.join("");
}

function renderSvgSlot(x, y, layout, seed, label, bye, roundIndex, matchIndex, field, sectionKey = "main") {
    const slotLines = getBracketSlotLines(label || "TBD", bye);
    const isSelected = isSelectedBracketSwapSlot(sectionKey, roundIndex, matchIndex, field);
    const byeClass = bye ? " svg-slot-bye" : "";
    const byeTextClass = bye ? " svg-slot-text-bye" : "";
    const slotClass = isSelected
        ? `svg-slot svg-slot-editable svg-slot-selected${byeClass}`
        : `svg-slot svg-slot-editable${byeClass}`;
    const textClass = isSelected
        ? `svg-slot-text svg-slot-editable svg-slot-text-selected${byeTextClass}`
        : `svg-slot-text svg-slot-editable${byeTextClass}`;
    const textX = x + 8 + layout.seedWidth + 10;
    const singleLineY = y + layout.slotHeight / 2 + 4;
    const multiLineTopY = y + 9.5;
    return [
        `<rect x="${x}" y="${y}" width="${layout.slotWidth}" height="${layout.slotHeight}" rx="12" class="${slotClass}" data-bracket-slot="${escapeHtml(field || "")}" data-bracket-section="${escapeHtml(sectionKey)}" data-round-index="${roundIndex}" data-match-index="${matchIndex}"></rect>`,
        `<rect x="${x + 8}" y="${y + 6}" width="${layout.seedWidth}" height="${layout.slotHeight - 12}" rx="8" class="svg-seed-box"></rect>`,
        `<text x="${x + 8 + layout.seedWidth / 2}" y="${y + layout.slotHeight / 2 + 4}" text-anchor="middle" class="svg-seed-text">${escapeXml(seed || "")}</text>`,
        slotLines.secondary
            ? `<text x="${textX}" y="${multiLineTopY}" class="${textClass}" data-bracket-slot="${escapeHtml(field || "")}" data-bracket-section="${escapeHtml(sectionKey)}" data-round-index="${roundIndex}" data-match-index="${matchIndex}"><tspan x="${textX}" y="${multiLineTopY}">${escapeXml(slotLines.primary)}</tspan><tspan x="${textX}" y="${multiLineTopY + 10}">${escapeXml(slotLines.secondary)}</tspan></text>`
            : `<text x="${textX}" y="${singleLineY}" class="${textClass}" data-bracket-slot="${escapeHtml(field || "")}" data-bracket-section="${escapeHtml(sectionKey)}" data-round-index="${roundIndex}" data-match-index="${matchIndex}">${escapeXml(slotLines.primary)}</text>`,
    ].join("");
}

function isSelectedBracketSwapSlot(sectionKey, roundIndex, matchIndex, field) {
    return Boolean(
        selectedBracketSwapSlot
        && selectedBracketSwapSlot.sectionKey === sectionKey
        && selectedBracketSwapSlot.roundIndex === roundIndex
        && selectedBracketSwapSlot.matchIndex === matchIndex
        && selectedBracketSwapSlot.field === field
    );
}

function getSvgMatchBox(layout, roundIndex, matchIndex) {
    const step = layout.baseStep * (2 ** roundIndex);
    const centerY = layout.firstCenterY + ((2 ** roundIndex) - 1) * layout.baseStep / 2 + matchIndex * step;
    return {
        x: layout.paddingX + roundIndex * layout.columnWidth,
        y: centerY - layout.matchHeight / 2,
        width: layout.matchWidth,
        height: layout.matchHeight,
    };
}

function getBracketSvgLayout(rounds) {
    const paddingX = 44;
    const paddingBottom = 72;
    const headerHeight = 64;
    const titleY = 58;
    const roundTitleOffset = 24;
    const matchWidth = 166;
    const matchHeight = 84;
    const labelHeight = 20;
    const slotHeight = 22;
    const slotGap = 4;
    const slotWidth = matchWidth - 24;
    const seedWidth = 20;
    const baseGap = 4;
    const baseStep = matchHeight + baseGap;
    const firstCenterY = headerHeight + roundTitleOffset + matchHeight / 2;
    const firstRoundMatches = rounds[0]?.matches.length || 0;
    const bodyHeight = firstRoundMatches > 0
        ? firstRoundMatches * matchHeight + (firstRoundMatches - 1) * baseGap
        : matchHeight;
    const championWidth = 146;
    const championHeight = 64;
    const championY = headerHeight + roundTitleOffset + bodyHeight / 2 - championHeight / 2;
    const connectorReach = 12;
    const columnWidth = 196;
    const rightSafety = 56;
    const heightSafety = 36;
    const width = paddingX * 2 + rounds.length * columnWidth + championWidth + rightSafety;
    const height = Math.max(
        championY + championHeight + paddingBottom + heightSafety,
        headerHeight + roundTitleOffset + bodyHeight + paddingBottom + heightSafety
    );

    return {
        paddingX,
        titleY,
        matchWidth,
        matchHeight,
        labelHeight,
        slotHeight,
        slotGap,
        slotWidth,
        seedWidth,
        baseStep,
        firstCenterY,
        championWidth,
        championHeight,
        championY,
        connectorReach,
        columnWidth,
        width,
        height,
    };
}

function exportBracketPdf(tournament) {
    const bracket = tournament?.bracket;
    if (!bracket) {
        return;
    }

    const bracketMarkup = renderBracketMarkup(bracket, tournament);
    const exportHtml = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>${escapeHtml(`${tournament.name} - ${tournament.category}`)} Bracket</title>
            <style>
                body {
                    margin: 0;
                    padding: 24px;
                    font-family: "Segoe UI", Arial, sans-serif;
                    background: #ffffff;
                    color: #111111;
                }
                .bracket-export {
                    overflow: visible;
                }
                .bracket-svg-wrap {
                    transform: none !important;
                    width: 100%;
                    background: #ffffff;
                }
                .bracket-svg {
                    width: 100%;
                    height: auto;
                }
                .svg-title,
                .svg-round-title,
                .svg-match-label,
                .svg-seed-text,
                .svg-slot-text,
                .svg-champion-name {
                    fill: #111111;
                }
                .svg-match-box,
                .svg-match-box-bye,
                .svg-slot,
                .svg-slot-bye,
                .svg-seed-box,
                .svg-champion-box {
                    fill: #ffffff;
                    stroke: #bcbcbc;
                }
                .svg-match-box-bye {
                    fill: #fff1e1;
                    stroke: #d5c0a6;
                }
                .svg-slot-bye {
                    fill: #fff7ee;
                }
                .svg-slot-text-bye {
                    fill: #8b5c2e;
                }
                .svg-connector {
                    stroke: #8f8f8f;
                }
                @page {
                    size: A4 landscape;
                    margin: 12mm;
                }
            </style>
        </head>
        <body>
            <div class="bracket-export">${bracketMarkup}</div>
            <script>
                window.addEventListener("load", () => {
                    window.print();
                });
            <\/script>
        </body>
        </html>
    `;

    const exportBlob = new Blob([exportHtml], { type: "text/html" });
    const exportUrl = URL.createObjectURL(exportBlob);
    const exportLink = document.createElement("a");
    exportLink.href = exportUrl;
    exportLink.target = "_blank";
    exportLink.rel = "noopener noreferrer";
    document.body.appendChild(exportLink);
    exportLink.click();
    exportLink.remove();
    setTimeout(() => URL.revokeObjectURL(exportUrl), 30000);
    setBracketStatus("PDF view opened. Use Save as PDF in the print dialog.");
}

function exportBracketCsv(tournament) {
    const rows = getBracketExportRows(tournament);
    const headers = ["Section", "Round", "Match", "Player A", "Player B", "Seed A", "Seed B", "Player A Note", "Player B Note"];
    const csv = [headers, ...rows]
        .map((row) => row.map(csvEscape).join(","))
        .join("\r\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${slugify(`${tournament.name}-${tournament.category}`)}-bracket.csv`;
    link.click();
    URL.revokeObjectURL(url);
    setBracketStatus("Bracket exported as CSV.");
}

function exportBracketExcel(tournament) {
    const preview = ensureByeAdvancements(tournament, tournament?.bracket);
    const bracket = preview.bracket || tournament?.bracket;
    const workbook = `
        <html xmlns:o="urn:schemas-microsoft-com:office:office"
              xmlns:x="urn:schemas-microsoft-com:office:excel"
              xmlns="http://www.w3.org/TR/REC-html40">
        <head>
            <meta charset="utf-8">
            <!--[if gte mso 9]>
            <xml>
                <x:ExcelWorkbook>
                    <x:ExcelWorksheets>
                        <x:ExcelWorksheet>
                            <x:Name>Bracket</x:Name>
                            <x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions>
                        </x:ExcelWorksheet>
                    </x:ExcelWorksheets>
                </x:ExcelWorkbook>
            </xml>
            <![endif]-->
            <style>
                body { font-family: Arial, sans-serif; }
                table { border-collapse: collapse; table-layout: auto; }
                .col-F, .col-G, .col-H, .col-I, .col-J { min-width: 144px; }
                td { border: 0; padding: 0 2px; font-size: 12px; height: 15pt; line-height: 14px; vertical-align: middle; }
                tr { height: 15pt; }
                .score-cell { color: #111; }
                .col-A { text-align: center; }
                .col-B { text-align: left; }
                .col-E { text-align: left; }
                .col-F, .col-G, .col-H, .col-I, .col-J { text-align: center; font-weight: 600; }
                .gap-row td { border: 0; }
            </style>
        </head>
        <body>
            ${buildBracketScoreSheetMarkup(tournament, bracket)}
        </body>
        </html>
    `;

    const blob = new Blob(["\ufeff", workbook], { type: "application/vnd.ms-excel;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${slugify(`${tournament.name}-${tournament.category}`)}-bracket.xls`;
    link.click();
    URL.revokeObjectURL(url);
    setBracketStatus("Bracket exported as Excel.");
}

function buildBracketScoreSheetMarkup(tournament, bracket) {
    if (!bracket || !bracket.rounds?.length) {
        return "";
    }
    const template = getScoreSheetTemplate();
    const nameToOrg = buildPlayerOrganizationMap(tournament);
    const rows = [];
    const matchRowMeta = [];
    const emptyRow = () => template.columns.map(() => "");
    const pushRow = (cells, className = "score-row") => {
        rows.push({ className, cells });
        return rows.length;
    };

    pushRow(["__TITLE__", "", "", "", "", "", "", ""], "score-row");

    const firstRound = bracket.rounds[0];
    let matchCounter = 0;

    firstRound.matches.forEach((match, matchIndex) => {
        matchCounter += 1;
        const matchNumbers = (match.byeA || match.byeB)
            ? ["", "", "", "", ""]
            : buildMatchNumberPath(bracket, matchIndex, 5, tournament?.category);

        const meta = {
            slotARow: 0,
            slotBRow: 0,
            gapRow: 0,
            matchNumbers,
        };

        const addSlotRow = (seedValue, slotLabel, isByeSlot) => {
            const labelText = String(slotLabel || "").trim();
            if (!labelText || isByeSlot || /^BYE$/i.test(labelText)) {
                return;
            }
            const parsed = parseBracketPlayerLabel(labelText);
            const name = parsed.name || labelText;
            const academyRaw = nameToOrg.get(normalizeNameKey(name)) || parsed.organization || "";
            const academy = extractBracketOrganizationValue(academyRaw);
            const rowIndex = pushRow([
                String(seedValue || "").trim(),
                name,
                academy,
                "", "", "", "", "",
            ]);
            return rowIndex;
        };

        meta.slotARow = addSlotRow(match.seedA, match.slotA, match.byeA) || 0;
        meta.slotBRow = addSlotRow(match.seedB, match.slotB, match.byeB) || 0;

        meta.gapRow = pushRow(emptyRow(), "gap-row");
        if (matchCounter % 8 === 0) {
            pushRow(emptyRow(), "gap-row");
            pushRow(emptyRow(), "gap-row");
        } else if (matchCounter % 4 === 0) {
            pushRow(emptyRow(), "gap-row");
        }

        matchRowMeta[matchIndex] = meta;
    });

    const connectorData = buildScoreSheetConnectorMap(bracket, matchRowMeta, template, tournament?.category);

    return `
        <table>
            <tbody>
                ${rows.map((row, rowIndex) => {
                    const sheetRow = rowIndex + 1;
                    return `
                        <tr class="${row.className}">
                            ${row.cells.map((cell, index) => {
                                const column = template.columns[index];
                                const cellKey = `${column}${sheetRow}`;
                                const borderFlags = connectorData.borders[cellKey] || "";
                                const borderColor = getScoreSheetBorderColor(column);
                                const borderStyle = buildScoreSheetBorderStyle(borderFlags, borderColor);
                                const connectorValue = connectorData.values[cellKey] || "";
                                let outputValue = connectorValue || cell;
                                const borderAttr = borderStyle
                                    ? ` style="${borderStyle}"`
                                    : (row.className === "gap-row" ? ' style="border:0;"' : "");

                                if (outputValue === "__TITLE__" && column === "A") {
                                    const title = tournament?.name || "Tournament";
                                    return `<td class="score-cell col-${column}" colspan="${template.columns.length}" style="text-align:center;font-weight:700;">${escapeHtml(title)}</td>`;
                                }
                                if (outputValue === "__TITLE__") {
                                    return "";
                                }
                                return `<td class="score-cell col-${column}"${borderAttr}>${escapeHtml(outputValue || "")}</td>`;
                            }).join("")}
                        </tr>
                    `;
                }).join("")}
            </tbody>
        </table>
    `;
}


function buildScoreSheetBorderStyle(flags, color = "#222") {
    if (!flags) {
        return "";
    }
    const borderColor = color;
    const styles = [];
    if (flags.includes("l")) {
        styles.push(`border-left: 1px solid ${borderColor}`);
    }
    if (flags.includes("t")) {
        styles.push(`border-top: 1px solid ${borderColor}`);
    }
    if (flags.includes("r")) {
        styles.push(`border-right: 1px solid ${borderColor}`);
    }
    if (flags.includes("b")) {
        styles.push(`border-bottom: 1px solid ${borderColor}`);
    }
    return styles.join("; ");
}

function getScoreSheetTemplate() {
    return SCORE_SHEET_TEMPLATE;
}

function getScoreSheetBorderColor(column) {
    const palette = {
        E: "#2b6cb0",
        F: "#8b5a2b",
        G: "#805ad5",
        H: "#d97706",
        I: "#c026d3",
        J: "#dc2626",
    };
    return palette[column] || "#222";
}

function buildScoreSheetConnectorMap(bracket, matchRowMeta, template, category) {
    const borders = {};
    const values = {};
    const rounds = bracket.rounds || [];
    const roundColumns = ["F", "G", "H", "I", "J"];
    const matchRowByRound = [];
    const prefix = getCategoryMatchPrefix(category);

    if (!rounds.length) {
        return { borders, values };
    }

    matchRowByRound[0] = rounds[0].matches.map((match, matchIndex) => {
        const meta = matchRowMeta[matchIndex] || {};
        const slotRows = [meta.slotARow, meta.slotBRow].filter(Boolean);
        if (match.byeA || match.byeB) {
            const row = slotRows[0] || meta.gapRow || 0;
            return { anchor: row, top: row, bottom: row, number: "" };
        }
        const top = meta.slotARow || slotRows[0] || 0;
        const bottom = meta.slotBRow || top;
        const anchor = getConnectorAnchorRow(top, bottom);
        return { anchor, top, bottom, number: getMatchNumberFromLabel(match.label) };
    });

    rounds[0].matches.forEach((match, matchIndex) => {
        const meta = matchRowMeta[matchIndex] || {};
        const applyRightBorder = (rowIndex, caps = "") => {
            if (!rowIndex) {
                return;
            }
            const key = `E${rowIndex}`;
            const flags = new Set((borders[key] || "").split("").filter(Boolean));
            flags.add("r");
            if (caps.includes("t")) {
                flags.add("t");
            }
            if (caps.includes("b")) {
                flags.add("b");
            }
            borders[key] = Array.from(flags).join("");
        };
        const isBye = Boolean(match.byeA || match.byeB);
        const hasPair = Boolean(meta.slotARow && meta.slotBRow);
        if (isBye) {
            applyRightBorder(meta.slotARow, "tb");
            return;
        }
        if (hasPair) {
            applyRightBorder(meta.slotARow, "t");
            applyRightBorder(meta.slotBRow, "b");
        } else {
            applyRightBorder(meta.slotARow, "");
        }
    });

    for (let roundIndex = 1; roundIndex < rounds.length && roundIndex < roundColumns.length; roundIndex += 1) {
        const prev = matchRowByRound[roundIndex - 1];
        matchRowByRound[roundIndex] = rounds[roundIndex].matches.map((match, matchIndex) => {
            const left = prev[matchIndex * 2] || {};
            const right = prev[matchIndex * 2 + 1] || {};
            const leftAnchor = left.anchor || left.bottom || left.top || 0;
            const rightAnchor = right.anchor || right.bottom || right.top || 0;
            const anchorCandidates = [leftAnchor, rightAnchor].filter((value) => value > 0);
            const top = anchorCandidates.length ? Math.min(...anchorCandidates) : 0;
            const bottom = anchorCandidates.length ? Math.max(...anchorCandidates) : 0;
            const anchor = getConnectorAnchorRow(top, bottom);
            return { anchor, top, bottom, number: getMatchNumberFromLabel(match.label) };
        });
    }

    matchRowByRound.forEach((roundMatches, roundIndex) => {
        const column = roundColumns[roundIndex];
        if (!column) {
            return;
        }
        roundMatches.forEach((meta) => {
            if (!meta || !meta.anchor || !meta.number) {
                return;
            }
            const top = meta.top || meta.anchor;
            const bottom = meta.bottom || meta.anchor;
            for (let row = top; row <= bottom; row += 1) {
                const key = `${column}${row}`;
                const existing = borders[key] || "";
                const flags = new Set(existing.split("").filter(Boolean));
                flags.add("r");
                if (row === top) {
                    flags.add("t");
                }
                if (row === bottom) {
                    flags.add("b");
                }
                borders[key] = Array.from(flags).join("");
            }
            const anchorKey = `${column}${meta.anchor}`;
            values[anchorKey] = meta.number ? `${prefix}${meta.number}` : "";
        });
    });

    return { borders, values };
}

function getConnectorAnchorRow(top, bottom) {
    if (!top || !bottom) {
        return top || bottom || 0;
    }
    const length = bottom - top + 1;
    return top + Math.floor(length / 2);
}

function extractBracketOrganizationValue(value) {
    const text = String(value || "").trim();
    if (!text) {
        return "";
    }
    const match = text.match(/\(([^)]+)\)\s*$/);
    if (match) {
        return match[1].trim();
    }
    return "";
}

function buildMatchNumberPath(bracket, matchIndex, maxRounds, category) {
    const rounds = bracket.rounds || [];
    const path = [];
    const prefix = getCategoryMatchPrefix(category);
    for (let roundIndex = 0; roundIndex < maxRounds; roundIndex += 1) {
        if (!rounds[roundIndex]) {
            path.push("");
            continue;
        }
        const roundMatchIndex = Math.floor(matchIndex / (2 ** roundIndex));
        const label = rounds[roundIndex]?.matches?.[roundMatchIndex]?.label || "";
        const matchNumber = getMatchNumberFromLabel(label);
        path.push(matchNumber ? `${prefix}${matchNumber}` : "");
    }
    return path;
}

function getMatchNumberFromLabel(label) {
    const match = String(label || "").match(/(\d+)/);
    return match ? match[1] : "";
}

function parseBracketPlayerLabel(label) {
    const cleaned = String(label || "").replace(/\s*\(BYE\)\s*/gi, "").trim();
    const separatorIndex = cleaned.indexOf(" - ");
    if (separatorIndex === -1) {
        return { name: cleaned, organization: "" };
    }
    return {
        name: cleaned.slice(0, separatorIndex).trim(),
        organization: cleaned.slice(separatorIndex + 3).trim(),
    };
}

function getCategoryMatchPrefix(category) {
    const text = String(category || "").trim();
    if (!text) {
        return "";
    }
    const words = text.match(/[A-Za-z]+/g) || [];
    if (words.length === 0) {
        return "";
    }
    return words.map((word) => word[0].toUpperCase()).join("");
}

function buildPlayerOrganizationMap(tournament) {
    const map = new Map();
    const players = getBracketPlayers(tournament);
    players.forEach((player) => {
        const nameKey = normalizeNameKey(player?.name || "");
        const organization = getDisplayOrganization(player?.organization);
        if (nameKey && organization && !map.has(nameKey)) {
            map.set(nameKey, organization);
        }
    });
    return map;
}

function normalizeNameKey(value) {
    return String(value || "").trim().toLowerCase();
}

function getBracketExportRows(tournament) {
    const bracket = tournament?.bracket;
    if (!bracket) {
        return [];
    }

    if (bracket.type === "double") {
        return [
            ...flattenBracketSectionRows("Winners", bracket.winners?.rounds || []),
            ...flattenBracketSectionRows("Losers", bracket.losers?.rounds || []),
            ...flattenBracketSectionRows("Finals", bracket.finals?.rounds || []),
        ];
    }

    return flattenBracketSectionRows("Main", bracket.rounds || []);
}

function flattenBracketSectionRows(sectionLabel, rounds) {
    const totalRounds = rounds.length;
    const rows = [];

    rounds.forEach((round, roundIndex) => {
        round.matches.forEach((match) => {
            rows.push([
                sectionLabel,
                getBracketRoundLabel(roundIndex, totalRounds),
                String(match.label || ""),
                String(match.slotA || ""),
                String(match.slotB || ""),
                String(match.seedA || ""),
                String(match.seedB || ""),
                match.byeA ? "BYE" : "",
                match.byeB ? "BYE" : "",
            ]);
        });
    });

    return rows;
}

function renderBallotTournamentOptions() {
    if (!elements.ballotTournamentSelect) {
        return;
    }

    if (!Array.isArray(state.tournaments) || state.tournaments.length === 0) {
        elements.ballotTournamentSelect.innerHTML = '<option value="">No saved tournaments</option>';
        ballotTournamentId = "";
        return;
    }

    if (!ballotTournamentId || !state.tournaments.some((item) => item.id === ballotTournamentId)) {
        ballotTournamentId = state.tournaments[0].id;
    }

    elements.ballotTournamentSelect.innerHTML = state.tournaments
        .map((item) => {
            const selected = item.id === ballotTournamentId ? ' selected' : "";
            return `<option value="${item.id}"${selected}>${escapeHtml(item.name)}</option>`;
        })
        .join("");
}

function renderBallot() {
    if (!elements.ballotList) {
        return;
    }

    const currentTournament = state.tournaments.find((item) => item.id === ballotTournamentId);
    const ballotPlayers = getBallotPlayers();

    if (elements.ballotTournamentLabel) {
        elements.ballotTournamentLabel.textContent = currentTournament?.name || "-";
    }
    if (elements.ballotCategoryLabel) {
        elements.ballotCategoryLabel.textContent = currentTournament?.category || "-";
    }
    if (elements.ballotPlayerCount) {
        elements.ballotPlayerCount.textContent = String(ballotPlayers.length);
    }
    if (elements.ballotOrganizationCount) {
        elements.ballotOrganizationCount.textContent = String(
            new Set(ballotPlayers.map((team) => String(team.organization || "").trim()).filter(Boolean)).size
        );
    }

    if (!currentTournament) {
        elements.ballotList.innerHTML = '<tr><td colspan="6">Save a tournament first to prepare a ballot.</td></tr>';
        return;
    }

    if (ballotPlayers.length === 0) {
        elements.ballotList.innerHTML = '<tr><td colspan="6">No ballot entries available for the selected tournament.</td></tr>';
        return;
    }

    elements.ballotList.innerHTML = ballotPlayers
        .map(
            (team, index) => `
                <tr>
                    <td>${index + 1}</td>
                    <td>${escapeHtml(getDisplayOrganization(team.organization) || "")}</td>
                    <td>${escapeHtml(team.name || "-")}</td>
                    <td>${escapeHtml(team.registrationNumber || "-")}</td>
                    <td>${escapeHtml(team.aadhar || "-")}</td>
                    <td>${escapeHtml(team.contact || "-")}</td>
                </tr>
            `
        )
        .join("");
}

function openBracketWindow(tournament, bracket) {
    if (!bracket) {
        return;
    }

    const bracketWindow = bracketPopupRef && !bracketPopupRef.closed
        ? bracketPopupRef
        : window.open("", "bracket-preview-window", "width=1400,height=900,resizable=yes,scrollbars=yes");
    if (!bracketWindow) {
        setBracketStatus("The new bracket window was blocked. Please allow pop-ups for this page and try again.");
        return;
    }
    bracketPopupRef = bracketWindow;

    const preview = ensureByeAdvancements(tournament, bracket);
    const bracketMarkup = renderBracketMarkup(preview.bracket || bracket, tournament);
    const summary = getBracketSummary(tournament, preview.bracket || bracket);
    const editLabel = bracketEditMode ? "Cancel edit" : "Edit bracket";
    const saveDisabled = !bracketEditMode || !bracketDirty ? "disabled" : "";
    bracketWindow.document.open();
    bracketWindow.document.write(`
        <!doctype html>
        <html lang="en">
        <head>
            <meta charset="utf-8">
            <title>${escapeHtml(`${tournament.name} - ${tournament.category} Bracket`)}</title>
            <style>
                :root {
                    color-scheme: dark;
                    --bg: #07111e;
                    --surface: rgba(13, 25, 43, 0.96);
                    --line: rgba(171, 202, 255, 0.14);
                    --text: #f2f7ff;
                    --muted: #9bb2d1;
                    --accent: #ff914d;
                }
                * { box-sizing: border-box; }
                body {
                    margin: 0;
                    padding: 10px;
                    color: var(--text);
                    font-family: "Segoe UI", Arial, sans-serif;
                    background:
                        radial-gradient(circle at 10% 10%, rgba(34, 211, 182, 0.16), transparent 28%),
                        radial-gradient(circle at 90% 12%, rgba(255, 145, 77, 0.18), transparent 22%),
                        linear-gradient(180deg, #04101b 0%, var(--bg) 100%);
                    overflow: auto;
                }
                .shell {
                    width: 100%;
                    margin: 0 auto;
                    height: calc(100vh - 20px);
                    display: grid;
                    grid-template-rows: auto 1fr;
                    gap: 10px;
                }
                .header {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    gap: 18px;
                    padding: 12px 16px;
                    border: 1px solid var(--line);
                    border-radius: 16px;
                    background: var(--surface);
                }
                .header h1 {
                    margin: 0 0 4px;
                    font-size: 22px;
                }
                .header p {
                    margin: 0;
                    color: var(--muted);
                    font-size: 13px;
                }
                .badge {
                    display: inline-block;
                    padding: 6px 11px;
                    border-radius: 999px;
                    background: rgba(255, 145, 77, 0.14);
                    color: #ffc29a;
                    font-weight: 700;
                }
                .toolbar {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 10px;
                }
                .toolbar button {
                    border: 1px solid var(--line);
                    border-radius: 12px;
                    background: rgba(255,255,255,0.04);
                    color: var(--text);
                    padding: 10px 14px;
                    cursor: pointer;
                }
                .toolbar button[disabled] {
                    opacity: 0.5;
                    cursor: not-allowed;
                }
                .status {
                    padding: 10px 12px;
                    border: 1px solid rgba(255, 145, 77, 0.28);
                    border-radius: 12px;
                    background: rgba(255, 145, 77, 0.12);
                    color: #ffd9bf;
                    font-size: 13px;
                }
                .stats {
                    display: grid;
                    grid-template-columns: repeat(4, minmax(0, 1fr));
                    gap: 10px;
                }
                .stat {
                    padding: 12px 14px;
                    border: 1px solid var(--line);
                    border-radius: 14px;
                    background: rgba(255,255,255,0.04);
                }
                .stat span {
                    display: block;
                    color: var(--muted);
                    font-size: 11px;
                    text-transform: uppercase;
                    letter-spacing: 0.04em;
                    margin-bottom: 4px;
                }
                .stat strong {
                    font-size: 22px;
                }
                .canvas {
                    padding: 10px;
                    border: 1px solid var(--line);
                    border-radius: 16px;
                    background: var(--surface);
                    overflow: auto;
                    min-height: 0;
                }
                .double-bracket-layout {
                    display: grid;
                    gap: 18px;
                }
                .double-bracket-panel {
                    display: grid;
                    gap: 12px;
                }
                .double-bracket-heading h3,
                .double-bracket-heading p {
                    margin: 0;
                }
                .double-bracket-heading p {
                    color: var(--muted);
                    margin-top: 4px;
                }
                .bracket-svg-wrap {
                    width: 100% !important;
                    height: auto !important;
                    min-width: 0 !important;
                    display: block !important;
                    margin: 0 auto;
                    transform: none !important;
                    transform-origin: top center !important;
                }
                .bracket-svg {
                    display: block;
                    width: auto !important;
                    max-width: none !important;
                    min-width: 0 !important;
                    height: auto;
                    transform: none !important;
                    margin: 0 auto;
                }
                .svg-title {
                    font-size: 18px;
                }
                .svg-round-title {
                    font-size: 9px;
                }
                .svg-match-label {
                    font-size: 8px;
                }
                .svg-slot-text,
                .svg-seed-text,
                .svg-champion-name {
                    font-size: 8px;
                }
                .bracket-group-title,
                .bracket-round-title,
                .svg-title,
                .svg-round-title,
                .svg-match-label,
                .svg-seed-text,
                .svg-slot-text,
                .svg-champion-name {
                    fill: #f2f7ff;
                    color: #f2f7ff;
                }
                .svg-match-box,
                .svg-match-box-bye,
                .svg-slot,
                .svg-slot-bye,
                .svg-seed-box,
                .svg-champion-box {
                    fill: rgba(11, 23, 39, 0.96);
                    stroke: rgba(255, 145, 77, 0.55);
                }
                .svg-match-box-bye {
                    fill: rgba(255, 214, 167, 0.16);
                    stroke: rgba(255, 214, 167, 0.5);
                }
                .svg-slot-bye {
                    fill: rgba(255, 214, 167, 0.12);
                }
                .svg-slot-text-bye {
                    fill: #ffd6a7;
                }
                .svg-connector {
                    stroke: rgba(255, 145, 77, 0.7);
                }
                .svg-slot-editable {
                    cursor: pointer;
                }
                .svg-slot-editable:hover {
                    fill: rgba(255, 255, 255, 0.11);
                }
                .svg-slot-selected {
                    fill: rgba(255, 184, 107, 0.18);
                    stroke: rgba(255, 184, 107, 0.45);
                    stroke-width: 1.5;
                }
                .svg-slot-text-selected {
                    fill: #ffe3c0;
                }
            </style>
        </head>
        <body>
            <div class="shell">
                <div class="header">
                    <div>
                        <h1>${escapeHtml(tournament.name || "Bracket")}</h1>
                        <p><span class="badge">${escapeHtml(tournament.category || "-")}</span></p>
                    </div>
                    <p>Bracket view</p>
                </div>
                <div class="toolbar">
                    <button type="button" id="popupBracketEditButton">${editLabel}</button>
                    <button type="button" id="popupBracketSaveButton" ${saveDisabled}>Save bracket</button>
                    <button type="button" id="popupBracketExcelButton">Export Excel</button>
                </div>
                <div class="status" id="popupBracketStatus" style="${bracketStatusMessage ? "" : "display:none;"}">${escapeHtml(bracketStatusMessage || "")}</div>
                <div class="stats">
                    <div class="stat"><span>Entries</span><strong>${summary.entries}</strong></div>
                    <div class="stat"><span>Bracket size</span><strong>${summary.size}</strong></div>
                    <div class="stat"><span>Byes</span><strong>${summary.byes}</strong></div>
                    <div class="stat"><span>Rounds</span><strong>${summary.rounds}</strong></div>
                </div>
                <div class="canvas">${bracketMarkup}</div>
            </div>
            <script>
                (function () {
                    const canvas = document.querySelector(".canvas");
                    const wrap = document.querySelector(".bracket-svg-wrap");
                    const svg = document.querySelector(".bracket-svg");
                    const editButton = document.getElementById("popupBracketEditButton");
                    const saveButton = document.getElementById("popupBracketSaveButton");
                    const excelButton = document.getElementById("popupBracketExcelButton");

                    function getOpenerApi() {
                        if (window.opener && window.opener.__bracketPopupApi) {
                            return window.opener.__bracketPopupApi;
                        }
                        const popupStatus = document.getElementById("popupBracketStatus");
                        if (popupStatus) {
                            popupStatus.textContent = "The main tournament page is no longer connected to this bracket window. Please reopen the bracket.";
                            popupStatus.style.display = "";
                        }
                        return null;
                    }

                    function findBracketSlotTarget(node) {
                        let current = node;
                        while (current) {
                            if (current.dataset && current.dataset.bracketSlot) {
                                return current;
                            }
                            current = current.parentNode;
                        }
                        return null;
                    }

                    if (editButton) {
                        editButton.addEventListener("click", function () {
                            const openerApi = getOpenerApi();
                            if (!openerApi) {
                                return;
                            }
                            openerApi.toggleEdit();
                        });
                    }

                    if (saveButton) {
                        saveButton.addEventListener("click", function () {
                            const openerApi = getOpenerApi();
                            if (!openerApi) {
                                return;
                            }
                            openerApi.save();
                        });
                    }

                    if (excelButton) {
                        excelButton.addEventListener("click", function () {
                            const openerApi = getOpenerApi();
                            if (!openerApi) {
                                return;
                            }
                            openerApi.exportExcel();
                        });
                    }

                    if (!canvas || !wrap || !svg) {
                        return;
                    }

                    function fitBracketToWindow() {
                        const svgWidth = Number(svg.getAttribute("width")) || svg.viewBox.baseVal.width || svg.getBoundingClientRect().width;
                        const svgHeight = Number(svg.getAttribute("height")) || svg.viewBox.baseVal.height || svg.getBoundingClientRect().height;
                        if (!svgWidth || !svgHeight) {
                            return;
                        }

                        const canvasStyles = window.getComputedStyle(canvas);
                        const availableWidth = canvas.clientWidth - parseFloat(canvasStyles.paddingLeft) - parseFloat(canvasStyles.paddingRight);
                        const availableHeight = canvas.clientHeight;
                        const widthScale = availableWidth / svgWidth;
                        const heightScale = availableHeight / svgHeight;
                        const scale = Math.min(widthScale, heightScale, 1) * 0.9;

                        wrap.style.width = (svgWidth * scale) + "px";
                        wrap.style.height = (svgHeight * scale) + "px";
                        svg.style.width = svgWidth + "px";
                        svg.style.height = svgHeight + "px";
                        svg.style.transform = "scale(" + scale + ")";
                        svg.style.transformOrigin = "top center";
                    }

                    window.addEventListener("load", fitBracketToWindow);
                    window.addEventListener("resize", fitBracketToWindow);
                    document.addEventListener("click", function (event) {
                        const target = findBracketSlotTarget(event.target);
                        if (!target) {
                            return;
                        }
                        const openerApi = getOpenerApi();
                        if (!openerApi) {
                            return;
                        }

                        openerApi.clickSlot({
                            field: target.dataset.bracketSlot || "",
                            sectionKey: target.dataset.bracketSection || "main",
                            roundIndex: Number(target.dataset.roundIndex || 0),
                            matchIndex: Number(target.dataset.matchIndex || 0),
                        });
                    });
                    document.addEventListener("dblclick", function (event) {
                        const target = findBracketSlotTarget(event.target);
                        if (!target) {
                            return;
                        }
                        const openerApi = getOpenerApi();
                        if (!openerApi) {
                            return;
                        }

                        const currentLabel = openerApi.getSlotLabel({
                            field: target.dataset.bracketSlot || "",
                            sectionKey: target.dataset.bracketSection || "main",
                            roundIndex: Number(target.dataset.roundIndex || 0),
                            matchIndex: Number(target.dataset.matchIndex || 0),
                        });
                        if (!currentLabel) {
                            return;
                        }

                        const nextLabel = window.prompt("Edit player", currentLabel);
                        if (nextLabel === null) {
                            return;
                        }

                        openerApi.editSlot({
                            field: target.dataset.bracketSlot || "",
                            sectionKey: target.dataset.bracketSection || "main",
                            roundIndex: Number(target.dataset.roundIndex || 0),
                            matchIndex: Number(target.dataset.matchIndex || 0),
                            label: nextLabel,
                        });
                    });
                    fitBracketToWindow();
                }());
            </script>
        </body>
        </html>
    `);
    bracketWindow.document.close();
    bracketWindow.focus();
}

function getActiveBracketPreview(tournament) {
    if (!tournament) {
        return null;
    }

    if (bracketEditMode && bracketDraft && tournament.id === bracketTournamentId) {
        return bracketDraft;
    }

    return tournament.bracket || null;
}

function getBracketSummary(tournament, bracket) {
    const players = getBracketPlayers(tournament);
    return {
        entries: players.length,
        size: bracket?.size || 0,
        byes: bracket?.byes || 0,
        rounds: bracket?.rounds?.length || 0,
    };
}

function refreshBracketPopup() {
    if (!bracketPopupRef || bracketPopupRef.closed) {
        bracketPopupRef = null;
        return;
    }

    const currentTournament = state.tournaments.find((item) => item.id === bracketTournamentId);
    const currentBracket = getActiveBracketPreview(currentTournament);
    if (!currentTournament || !currentBracket) {
        return;
    }

    openBracketWindow(currentTournament, currentBracket);
}

window.__bracketPopupApi = {
    toggleEdit() {
        const currentTournament = state.tournaments.find((item) => item.id === bracketTournamentId);
        if (!currentTournament?.bracket) {
            setBracketStatus("Generate a bracket for the selected tournament before editing it.");
            return;
        }

        if (bracketEditMode) {
            if (bracketDirty && !window.confirm("Discard the current unsaved bracket changes?")) {
                return;
            }

            bracketEditMode = false;
            bracketDirty = false;
            bracketDraft = null;
            selectedBracketSwapSlot = null;
            renderBracket();
            refreshBracketPopup();
            setBracketStatus("Bracket edit mode closed.");
            return;
        }

        bracketEditMode = true;
        bracketDirty = false;
        bracketDraft = cloneState(currentTournament.bracket);
        selectedBracketSwapSlot = null;
        renderBracket();
        refreshBracketPopup();
        setBracketStatus("Edit mode is on. Click one slot, then another slot to swap players. Save when you're done.");
    },
    save() {
        const tournamentIndex = state.tournaments.findIndex((item) => item.id === bracketTournamentId);
        if (tournamentIndex === -1 || !bracketEditMode || !bracketDraft) {
            setBracketStatus("Nothing to save yet.");
            return { saved: false };
        }

        if (!bracketDirty) {
            setBracketStatus("No bracket changes to save.");
            return { saved: false };
        }

        const savedBracket = cloneState(bracketDraft);
        recomputeSingleEliminationProgress(savedBracket);
        applyByeAdvancements(savedBracket);
        syncByeAdvancementSlots(savedBracket);
        state.tournaments[tournamentIndex].bracket = savedBracket;
        bracketEditMode = false;
        bracketDirty = false;
        bracketDraft = null;
        selectedBracketSwapSlot = null;
        persist();
        renderAll();
        setBracketStatus("Bracket changes saved.");
        return { saved: true };
    },
    exportExcel() {
        const currentTournament = state.tournaments.find((item) => item.id === bracketTournamentId);
        const currentBracket = getActiveBracketPreview(currentTournament);
        if (!currentTournament || !currentBracket) {
            setBracketStatus("Generate the bracket before exporting it.");
            return;
        }

        exportBracketExcel({
            ...currentTournament,
            bracket: cloneState(currentBracket),
        });
    },
    clickSlot(slot) {
        if (!bracketEditMode || !bracketDraft) {
            setBracketStatus("Click Edit bracket in the popup before swapping players.");
            return;
        }

        const sectionBracket = getBracketEditSection(bracketDraft, slot.sectionKey);
        if (!sectionBracket) {
            return;
        }

        handleBracketSlotSwap(sectionBracket, slot.sectionKey, slot.field, slot.roundIndex, slot.matchIndex);
    },
    getSlotLabel(slot) {
        if (!bracketEditMode || !bracketDraft) {
            setBracketStatus("Click Edit bracket in the popup before editing a player.");
            return "";
        }

        const sectionBracket = getBracketEditSection(bracketDraft, slot.sectionKey);
        const match = sectionBracket?.rounds?.[slot.roundIndex]?.matches?.[slot.matchIndex];
        if (!match) {
            return "";
        }

        const seedField = slot.field === "slotA" ? "seedA" : "seedB";
        if (!String(match[seedField] || "").trim()) {
            setBracketStatus("Only seeded player slots can be edited.");
            return "";
        }

        return String(match[slot.field] || "").trim();
    },
    editSlot(slot) {
        if (!bracketEditMode || !bracketDraft) {
            setBracketStatus("Click Edit bracket in the popup before editing a player.");
            return;
        }

        const nextLabel = String(slot.label || "").trim();
        if (!nextLabel) {
            setBracketStatus("Player name cannot be empty.");
            return;
        }

        const sectionBracket = getBracketEditSection(bracketDraft, slot.sectionKey);
        const match = sectionBracket?.rounds?.[slot.roundIndex]?.matches?.[slot.matchIndex];
        if (!match) {
            return;
        }

        const seedField = slot.field === "slotA" ? "seedA" : "seedB";
        if (!String(match[seedField] || "").trim()) {
            setBracketStatus("Only seeded player slots can be edited.");
            return;
        }

        match[slot.field] = nextLabel;
        selectedBracketSwapSlot = null;
        bracketDirty = true;
        renderBracket();
        refreshBracketPopup();
        setBracketStatus("Player updated. Click Save bracket to keep the changes.");
    },
};

function renderBracketTournamentOptions() {
    if (!elements.bracketTournamentSelect) {
        return;
    }

    if (!Array.isArray(state.tournaments) || state.tournaments.length === 0) {
        elements.bracketTournamentSelect.innerHTML = '<option value="">No saved tournaments</option>';
        bracketTournamentId = "";
        return;
    }

    if (!bracketTournamentId || !state.tournaments.some((item) => item.id === bracketTournamentId)) {
        bracketTournamentId = state.tournaments[0].id;
    }

    elements.bracketTournamentSelect.innerHTML = state.tournaments
        .map((item) => {
            const selected = item.id === bracketTournamentId ? ' selected' : "";
            return `<option value="${item.id}"${selected}>${escapeHtml(item.name)}</option>`;
        })
        .join("");
}

function renderBracketProgressTournamentOptions() {
    if (!elements.progressTournamentSelect) {
        return;
    }

    const eligible = state.tournaments.filter((item) => item.bracket && String(item.bracket.type || "single") === "single");
    if (eligible.length === 0) {
        elements.progressTournamentSelect.innerHTML = '<option value="">No saved single-elimination brackets</option>';
        progressTournamentId = "";
        return;
    }

    if (!progressTournamentId || !eligible.some((item) => item.id === progressTournamentId)) {
        progressTournamentId = eligible[0].id;
    }

    elements.progressTournamentSelect.innerHTML = eligible
        .map((item) => {
            const selected = item.id === progressTournamentId ? ' selected' : "";
            return `<option value="${item.id}"${selected}>${escapeHtml(item.name)}</option>`;
        })
        .join("");
}

function renderBracketProgress() {
    if (!elements.progressTableBody) {
        return;
    }

    const tournament = state.tournaments.find((item) => item.id === progressTournamentId);
    const bracket = tournament?.bracket;
    if (!tournament) {
        elements.progressTableBody.innerHTML = '<tr><td colspan="8">Choose a saved tournament to enter results.</td></tr>';
        if (elements.progressMatchRuleDisplay) {
            elements.progressMatchRuleDisplay.value = "single_25";
        }
        setProgressStatus("Choose a saved tournament to enter bracket scores.");
        return;
    }

    if (!bracket || String(bracket.type || "single") !== "single") {
        elements.progressTableBody.innerHTML = '<tr><td colspan="8">Generate a single-elimination bracket first.</td></tr>';
        if (elements.progressMatchRuleDisplay) {
            elements.progressMatchRuleDisplay.value = tournament.matchRule || "single_25";
        }
        setProgressStatus("Generate a single-elimination bracket first.");
        return;
    }

    const tournamentIndex = state.tournaments.findIndex((item) => item.id === progressTournamentId);
    const autoAdvancedBracket = cloneState(bracket);
    const autoAdvanced = applyByeAdvancements(autoAdvancedBracket);
    if (autoAdvanced && tournamentIndex !== -1) {
        state.tournaments[tournamentIndex].bracket = autoAdvancedBracket;
        persistWithMode("progress", { tournamentId: progressTournamentId });
        renderAll();
        return;
    }

    const matchRule = tournament.matchRule || "single_25";
    if (elements.progressMatchRuleDisplay) {
        elements.progressMatchRuleDisplay.value = matchRule;
    }
    const headerColumns = getProgressScoreColumnCount(matchRule);
    const colspan = 5 + headerColumns;
    const rows = [];
    bracket.rounds.forEach((round, roundIndex) => {
        const roundSummary = getRoundCompletionSummary(round, matchRule);
        rows.push(`
            <tr class="progress-round-row">
                <td colspan="${colspan}">
                    <div class="progress-round-bar">
                        <strong>${escapeHtml(getBracketRoundLabel(roundIndex, bracket.rounds.length))}</strong>
                        <span>${escapeHtml(roundSummary)}</span>
                    </div>
                </td>
            </tr>
        `);
        round.matches.forEach((match, matchIndex) => {
            if (!match) {
                return;
            }
            const slotAText = String(match.slotA || "").trim();
            const slotBText = String(match.slotB || "").trim();
            const slotAIsBye = /^BYE$/i.test(slotAText);
            const slotBIsBye = /^BYE$/i.test(slotBText);
            const isByeMatch = Boolean(
                slotAIsBye
                || slotBIsBye
                || (!match.isPlayable && (slotAIsBye || slotBIsBye))
            );
            const canScore = match.isPlayable && isBracketMatchReady(match);
            const winnerLabel = getBracketMatchWinnerLabel(match);
            const completed = isBracketMatchCompleted(match, matchRule);
            const locked = isBracketMatchLocked(match, matchRule);
            const scoreCells = renderProgressScoreCells(matchRule, match, roundIndex, matchIndex, canScore);
            const resultSummary = isByeMatch && match.winnerSide
                ? "BYE"
                : (getBracketMatchResultSummary(match, matchRule) || "-");
            rows.push(`
                <tr class="${completed ? "progress-completed-row" : ""} ${completed && !locked ? "progress-editing-row" : ""} ${isByeMatch ? "progress-bye-row" : ""}">
                    <td>${escapeHtml(match.label || "-")}</td>
                    <td>${escapeHtml(formatProgressPlayerLabel(match.slotA, match.seedA))}</td>
                    ${scoreCells}
                    <td>${escapeHtml(formatProgressPlayerLabel(match.slotB, match.seedB))}</td>
                    <td>${escapeHtml(formatProgressPlayerLabel(winnerLabel, match.winnerSide === "A" ? match.seedA : match.winnerSide === "B" ? match.seedB : "" ) || "-")}</td>
                    <td>${escapeHtml(resultSummary)}</td>
                    <td class="progress-action-cell">
                        ${isByeMatch || completed ? "" : `<button class="button ghost" type="button" data-progress-sheet="${roundIndex}:${matchIndex}">Prep Score Sheet</button>`}
                        ${completed && locked
                            ? `<button class="button ghost" type="button" data-progress-unlock="${roundIndex}:${matchIndex}">Unlock</button>`
                            : `<button class="button ghost" type="button" data-progress-save="${roundIndex}:${matchIndex}" ${canScore ? "" : "disabled"}>${completed ? "Update" : "Save"}</button>`}
                    </td>
                </tr>
            `);
        });
    });

    const header = elements.progressTableBody.closest("table")?.querySelector("thead tr");
    if (header) {
        header.innerHTML = matchRule === "best_of_3_25"
            ? `
                <th>Match</th>
                <th>Player A</th>
                <th>S1A</th>
                <th>vs</th>
                <th>S1B</th>
                <th>S2A</th>
                <th>vs</th>
                <th>S2B</th>
                <th>S3A</th>
                <th>vs</th>
                <th>S3B</th>
                <th>Player B</th>
                <th>Winner</th>
                <th>Result</th>
                <th>Action</th>
            `
            : `
                <th>Match</th>
                <th>Player A</th>
                <th>S1A</th>
                <th>vs</th>
                <th>S1B</th>
                <th>Player B</th>
                <th>Winner</th>
                <th>Result</th>
                <th>Action</th>
            `;
    }

    elements.progressTableBody.innerHTML = rows.length > 0
        ? rows.join("")
        : `<tr><td colspan="${colspan}">No bracket matches available yet.</td></tr>`;
    setProgressStatus(matchRule === "best_of_3_25"
        ? "Match rule: Best of 3 (25). Enter game scores up to 25 points. First player to win 2 games advances."
        : "Match rule: Single game (25). Enter one score pair up to 25 points. Higher score advances.");
}

function getProgressScoreColumnCount(matchRule) {
    return matchRule === "best_of_3_25" ? 9 : 3;
}

function formatProgressPlayerLabel(label, seed) {
    const text = String(label || "").trim();
    const seedText = String(seed || "").trim();
    if (!text) {
        return "-";
    }
    return seedText ? `[${seedText}] ${text}` : text;
}

function getMatchRuleLabel(matchRule) {
    return matchRule === "best_of_3_25" ? "Best of 3 (25)" : "Single game (25)";
}

function renderProgressScoreCells(matchRule, match, roundIndex, matchIndex, canScore) {
    const completed = isBracketMatchCompleted(match, matchRule);
    const locked = isBracketMatchLocked(match, matchRule);
    const disabled = canScore && (!completed || !locked) ? "" : "disabled";
    if (!canScore) {
        if (matchRule === "best_of_3_25") {
            return [
                `<td class="progress-bye-cell">-</td>`,
                `<td class="score-divider-cell">vs</td>`,
                `<td class="progress-bye-cell">-</td>`,
                `<td class="progress-bye-cell">-</td>`,
                `<td class="score-divider-cell">vs</td>`,
                `<td class="progress-bye-cell">-</td>`,
                `<td class="progress-bye-cell">-</td>`,
                `<td class="score-divider-cell">vs</td>`,
                `<td class="progress-bye-cell">-</td>`
            ].join("");
        }
        return [
            `<td class="progress-bye-cell">-</td>`,
            `<td class="score-divider-cell">vs</td>`,
            `<td class="progress-bye-cell">-</td>`
        ].join("");
    }
    if (matchRule === "best_of_3_25") {
        const games = Array.isArray(match.games) && match.games.length === 3
            ? match.games
            : [{ a: "", b: "" }, { a: "", b: "" }, { a: "", b: "" }];
        return games.map((game, gameIndex) => `
            <td><input class="score-input" type="number" min="0" max="25" data-progress-match="${roundIndex}:${matchIndex}:G${gameIndex}:A" value="${escapeHtml(String(game.a || ""))}" ${disabled}></td>
            <td class="score-divider-cell">vs</td>
            <td><input class="score-input" type="number" min="0" max="25" data-progress-match="${roundIndex}:${matchIndex}:G${gameIndex}:B" value="${escapeHtml(String(game.b || ""))}" ${disabled}></td>
        `).join("");
    }

    return `
        <td><input class="score-input" type="number" min="0" max="25" data-progress-match="${roundIndex}:${matchIndex}:A" value="${escapeHtml(String(match.scoreA || ""))}" ${disabled}></td>
        <td class="score-divider-cell">vs</td>
        <td><input class="score-input" type="number" min="0" max="25" data-progress-match="${roundIndex}:${matchIndex}:B" value="${escapeHtml(String(match.scoreB || ""))}" ${disabled}></td>
    `;
}

function openProgressScoreSheet(key) {
    const [roundIndexText, matchIndexText] = String(key || "").split(":");
    const roundIndex = Number(roundIndexText);
    const matchIndex = Number(matchIndexText);
    const tournament = state.tournaments.find((item) => item.id === progressTournamentId);
    const bracket = tournament?.bracket;
    if (!tournament || !bracket) {
        return;
    }
    const match = bracket.rounds?.[roundIndex]?.matches?.[matchIndex];
    if (!match) {
        return;
    }
    const matchRule = tournament.matchRule || "single_25";
    const title = `${tournament.name} - ${tournament.category} - ${match.label || "Match"}`;
    const sheetWindow = window.open("", "bracket-score-sheet", "width=900,height=700,resizable=yes,scrollbars=yes");
    if (!sheetWindow) {
        setProgressStatus("The score sheet window was blocked. Please allow pop-ups for this page.");
        return;
    }
    const playerA = formatProgressPlayerLabel(match.slotA, match.seedA);
    const playerB = formatProgressPlayerLabel(match.slotB, match.seedB);
    const isBestOf3 = matchRule === "best_of_3_25";
    const scoreRows = isBestOf3
        ? [1, 2, 3]
        : [1];
    sheetWindow.document.open();
    sheetWindow.document.write(`
        <!doctype html>
        <html lang="en">
        <head>
            <meta charset="utf-8">
            <title>${escapeHtml(title)} - Score Sheet</title>
            <style>
                :root { color-scheme: light; }
                body { margin: 0; font-family: "Segoe UI", Arial, sans-serif; padding: 24px; background: #f6f7fb; color: #111827; }
                .card { background: #ffffff; border: 1px solid #d9dde7; border-radius: 16px; padding: 20px; max-width: 820px; margin: 0 auto; }
                h1 { font-size: 20px; margin: 0 0 6px; }
                .meta { color: #4b5563; font-size: 13px; margin-bottom: 16px; }
                .players { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 18px; }
                .player-box { border: 1px solid #e1e5ee; border-radius: 12px; padding: 12px 14px; }
                .player-box strong { display: block; margin-bottom: 6px; font-size: 14px; }
                table { width: 100%; border-collapse: collapse; margin-bottom: 18px; }
                th, td { border: 1px solid #e1e5ee; padding: 10px; text-align: center; font-size: 13px; }
                th { background: #f3f4f6; text-transform: uppercase; letter-spacing: 0.04em; font-size: 12px; }
                .notes { border: 1px dashed #cbd5e1; border-radius: 12px; padding: 12px; min-height: 80px; }
                .footer { margin-top: 16px; color: #6b7280; font-size: 12px; }
                @media print {
                    body { background: #ffffff; padding: 0; }
                    .card { border: 0; border-radius: 0; }
                }
            </style>
        </head>
        <body>
            <div class="card">
                <h1>${escapeHtml(title)}</h1>
                <div class="meta">${escapeHtml(getBracketRoundLabel(roundIndex, bracket.rounds.length))} • ${escapeHtml(match.label || "Match")} • ${escapeHtml(getMatchRuleLabel(matchRule))}</div>
                <div class="players">
                    <div class="player-box"><strong>Player A</strong>${escapeHtml(playerA)}</div>
                    <div class="player-box"><strong>Player B</strong>${escapeHtml(playerB)}</div>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Set</th>
                            <th>${escapeHtml(playerA)}</th>
                            <th>${escapeHtml(playerB)}</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${scoreRows.map((set) => `
                            <tr>
                                <td>${isBestOf3 ? `S${set}` : "S1"}</td>
                                <td></td>
                                <td></td>
                            </tr>
                        `).join("")}
                    </tbody>
                </table>
                <div class="notes">Notes</div>
                <div class="footer">Prepared from Bracket Progress</div>
            </div>
        </body>
        </html>
    `);
    sheetWindow.document.close();
    sheetWindow.focus();
}

function isBracketMatchCompleted(match, matchRule) {
    if (!match) {
        return false;
    }
    if (!match.isPlayable && match.winnerSide) {
        return true;
    }
    if (matchRule === "best_of_3_25") {
        return Boolean(match.winnerSide && getBracketMatchResultSummary(match, matchRule));
    }
    return Boolean(match.winnerSide && match.scoreA !== "" && match.scoreB !== "");
}

function isBracketMatchLocked(match, matchRule) {
    if (!isBracketMatchCompleted(match, matchRule)) {
        return false;
    }
    return match.locked !== false;
}

function getBracketMatchResultSummary(match, matchRule) {
    if (!match?.winnerSide) {
        return "";
    }
    if (matchRule === "best_of_3_25") {
        const games = Array.isArray(match.games) ? match.games : [];
        let winsA = 0;
        let winsB = 0;
        games.forEach((game) => {
            const a = Number(game?.a);
            const b = Number(game?.b);
            if (!Number.isFinite(a) || !Number.isFinite(b) || game?.a === "" || game?.b === "") {
                return;
            }
            if (a > b) {
                winsA += 1;
            } else if (b > a) {
                winsB += 1;
            }
        });
        return `${winsA}-${winsB}`;
    }
    return `${match.scoreA}-${match.scoreB}`;
}

function getRoundCompletionSummary(round, matchRule) {
    const playableMatches = Array.isArray(round?.matches) ? round.matches.filter((match) => match.isPlayable) : [];
    if (playableMatches.length === 0) {
        return "No playable matches";
    }
    const completed = playableMatches.filter((match) => isBracketMatchCompleted(match, matchRule)).length;
    return `${completed}/${playableMatches.length} completed`;
}

function isBracketMatchReady(match) {
    if (!match?.isPlayable) {
        return false;
    }
    if (String(match.slotA || "").startsWith("Winner of ")) {
        return false;
    }
    if (String(match.slotB || "").startsWith("Winner of ")) {
        return false;
    }
    return Boolean(String(match.slotA || "").trim() && String(match.slotB || "").trim());
}

function getBracketMatchWinnerLabel(match) {
    if (!match || !match.winnerSide) {
        return "";
    }
    return match.winnerSide === "A" ? String(match.slotA || "") : String(match.slotB || "");
}

function saveBracketProgressResult(key) {
    const [roundIndexText, matchIndexText] = String(key || "").split(":");
    const roundIndex = Number(roundIndexText);
    const matchIndex = Number(matchIndexText);
    const tournamentIndex = state.tournaments.findIndex((item) => item.id === progressTournamentId);
    if (tournamentIndex === -1) {
        return;
    }

    const tournament = state.tournaments[tournamentIndex];
    const bracket = cloneState(tournament.bracket);
    const match = bracket?.rounds?.[roundIndex]?.matches?.[matchIndex];
    const matchRule = tournament.matchRule || "single_25";
    if (!match || !isBracketMatchReady(match)) {
        setProgressStatus("That match is not ready for score entry yet.");
        return;
    }

    const scoreResult = matchRule === "best_of_3_25"
        ? getBestOfThreeResult(roundIndex, matchIndex)
        : getSingleGameResult(roundIndex, matchIndex);
    if (!scoreResult.ok) {
        setProgressStatus(scoreResult.message);
        return;
    }

    match.scoreA = scoreResult.scoreA;
    match.scoreB = scoreResult.scoreB;
    match.games = scoreResult.games;
    match.winnerSide = scoreResult.winnerSide;
    match.locked = true;
    recomputeSingleEliminationProgress(bracket);

    state.tournaments[tournamentIndex].bracket = bracket;
    persistWithMode("progress", { tournamentId: progressTournamentId });
    renderAll();
    const updatedMatch = state.tournaments[tournamentIndex].bracket.rounds?.[roundIndex]?.matches?.[matchIndex];
    setProgressStatus(`Saved ${updatedMatch?.label || "match"} and updated the next round pairing.`);
}

function unlockBracketProgressResult(key) {
    const [roundIndexText, matchIndexText] = String(key || "").split(":");
    const roundIndex = Number(roundIndexText);
    const matchIndex = Number(matchIndexText);
    const tournamentIndex = state.tournaments.findIndex((item) => item.id === progressTournamentId);
    if (tournamentIndex === -1) {
        return;
    }

    const tournament = state.tournaments[tournamentIndex];
    const bracket = cloneState(tournament.bracket);
    const match = bracket?.rounds?.[roundIndex]?.matches?.[matchIndex];
    const matchRule = tournament.matchRule || "single_25";
    if (!match || !isBracketMatchCompleted(match, matchRule)) {
        return;
    }

    match.locked = false;
    match.winnerSide = "";
    state.tournaments[tournamentIndex].bracket = bracket;
    persistWithMode("progress", { tournamentId: progressTournamentId });
    renderAll();
    setProgressStatus(`Unlocked ${match.label || "match"} for correction.`);
}

function recomputeSingleEliminationProgress(bracket) {
    if (!bracket || String(bracket.type || "single") !== "single") {
        return;
    }

    for (let roundIndex = 1; roundIndex < bracket.rounds.length; roundIndex += 1) {
        const round = bracket.rounds[roundIndex];
        round.matches.forEach((match) => {
            const sourceA = getBracketMatchSourceLabel(match.sourceA, match.slotA);
            const sourceB = getBracketMatchSourceLabel(match.sourceB, match.slotB);
            const nextA = resolveBracketSourceWinner(bracket, sourceA);
            const nextB = resolveBracketSourceWinner(bracket, sourceB);
            const previousSlots = `${match.slotA}||${match.slotB}`;

            if (sourceA) {
                match.sourceA = sourceA;
                match.slotA = nextA ? nextA.label : `Winner of ${sourceA}`;
                match.seedA = nextA ? nextA.seed : "";
            }
            if (sourceB) {
                match.sourceB = sourceB;
                match.slotB = nextB ? nextB.label : `Winner of ${sourceB}`;
                match.seedB = nextB ? nextB.seed : "";
            }

            const currentSlots = `${match.slotA}||${match.slotB}`;
            const ready = isBracketMatchReady(match);
            if (!ready || previousSlots !== currentSlots) {
                match.scoreA = "";
                match.scoreB = "";
                match.games = [{ a: "", b: "" }, { a: "", b: "" }, { a: "", b: "" }];
                match.winnerSide = "";
                match.locked = false;
            }
        });
    }
}

function applyByeAdvancements(bracket) {
    if (!bracket || String(bracket.type || "single") !== "single") {
        return false;
    }

    let updated = false;
    bracket.rounds.forEach((round) => {
        round.matches.forEach((match) => {
            if (!match || match.isPlayable || match.winnerSide) {
                return;
            }

            const hasPlayableA = String(match.slotA || "").trim() && !/^BYE$/i.test(String(match.slotA || "").trim());
            const hasPlayableB = String(match.slotB || "").trim() && !/^BYE$/i.test(String(match.slotB || "").trim());
            if (hasPlayableA && !hasPlayableB) {
                match.winnerSide = "A";
                match.locked = true;
                updated = true;
                return;
            }
            if (hasPlayableB && !hasPlayableA) {
                match.winnerSide = "B";
                match.locked = true;
                updated = true;
            }
        });
    });

    if (updated) {
        syncByeAdvancementSlots(bracket);
        recomputeSingleEliminationProgress(bracket);
    }

    return updated;
}

function syncByeAdvancementSlots(bracket) {
    if (!bracket || String(bracket.type || "single") !== "single") {
        return;
    }
    for (let roundIndex = 0; roundIndex < bracket.rounds.length - 1; roundIndex += 1) {
        const round = bracket.rounds[roundIndex];
        const nextRound = bracket.rounds[roundIndex + 1];
        if (!nextRound) {
            continue;
        }
        round.matches.forEach((match, matchIndex) => {
            if (!match || match.isPlayable || !match.winnerSide) {
                return;
            }
            const winnerLabel = getBracketMatchWinnerLabel(match);
            if (!winnerLabel) {
                return;
            }
            const targetMatchIndex = Math.floor(matchIndex / 2);
            const targetMatch = nextRound.matches?.[targetMatchIndex];
            if (!targetMatch) {
                return;
            }
            const targetSide = matchIndex % 2 === 0 ? "A" : "B";
            const slotField = targetSide === "A" ? "slotA" : "slotB";
            const seedField = targetSide === "A" ? "seedA" : "seedB";
            const sourceField = targetSide === "A" ? "sourceA" : "sourceB";
            const winnerSeed = match.winnerSide === "A" ? match.seedA : match.seedB;
            const sourceLabel = String(match.label || "").trim();
            const shouldTrackSource = /^Match\s+\d+/i.test(sourceLabel);
            targetMatch[slotField] = winnerLabel;
            targetMatch[seedField] = winnerSeed || "";
            targetMatch[sourceField] = shouldTrackSource ? sourceLabel : "";
        });
    }
}

function ensureByeAdvancements(tournament, bracket) {
    if (!tournament || !bracket || String(bracket.type || "single") !== "single") {
        return { bracket, updated: false };
    }
    const preview = cloneState(bracket);
    const updated = applyByeAdvancements(preview);
    if (updated && !bracketEditMode) {
        const tournamentIndex = state.tournaments.findIndex((item) => item.id === tournament.id);
        if (tournamentIndex !== -1) {
            state.tournaments[tournamentIndex].bracket = preview;
            persist();
        }
    }
    return { bracket: preview, updated };
}

function getBracketMatchSourceLabel(sourceLabel, slotLabel) {
    const explicit = String(sourceLabel || "").trim();
    if (explicit) {
        return explicit;
    }

    const inferred = String(slotLabel || "").trim().match(/^Winner of (Match \d+)$/i);
    return inferred ? inferred[1] : "";
}

function getSingleGameResult(roundIndex, matchIndex) {
    const scoreAInput = elements.progressTableBody.querySelector(`[data-progress-match="${roundIndex}:${matchIndex}:A"]`);
    const scoreBInput = elements.progressTableBody.querySelector(`[data-progress-match="${roundIndex}:${matchIndex}:B"]`);
    const scoreA = scoreAInput ? scoreAInput.value.trim() : "";
    const scoreB = scoreBInput ? scoreBInput.value.trim() : "";

    if (scoreA === "" || scoreB === "") {
        return { ok: false, message: "Enter both scores before saving a match." };
    }

    const numericA = Number(scoreA);
    const numericB = Number(scoreB);
    if (!Number.isFinite(numericA) || !Number.isFinite(numericB) || numericA < 0 || numericB < 0 || numericA > 25 || numericB > 25) {
        return { ok: false, message: "Scores must be between 0 and 25." };
    }
    if (numericA === numericB) {
        return { ok: false, message: "Scores cannot be tied in a knockout bracket." };
    }

    return {
        ok: true,
        scoreA: String(numericA),
        scoreB: String(numericB),
        games: [{ a: String(numericA), b: String(numericB) }, { a: "", b: "" }, { a: "", b: "" }],
        winnerSide: numericA > numericB ? "A" : "B",
    };
}

function getBestOfThreeResult(roundIndex, matchIndex) {
    const games = [];
    let winsA = 0;
    let winsB = 0;

    for (let gameIndex = 0; gameIndex < 3; gameIndex += 1) {
        const inputA = elements.progressTableBody.querySelector(`[data-progress-match="${roundIndex}:${matchIndex}:G${gameIndex}:A"]`);
        const inputB = elements.progressTableBody.querySelector(`[data-progress-match="${roundIndex}:${matchIndex}:G${gameIndex}:B"]`);
        const rawA = inputA ? inputA.value.trim() : "";
        const rawB = inputB ? inputB.value.trim() : "";

        if (!rawA && !rawB) {
            games.push({ a: "", b: "" });
            continue;
        }
        if (!rawA || !rawB) {
            return { ok: false, message: `Enter both scores for Game ${gameIndex + 1}.` };
        }

        const scoreA = Number(rawA);
        const scoreB = Number(rawB);
        if (!Number.isFinite(scoreA) || !Number.isFinite(scoreB) || scoreA < 0 || scoreB < 0 || scoreA > 25 || scoreB > 25) {
            return { ok: false, message: `Game ${gameIndex + 1} scores must be between 0 and 25.` };
        }
        if (scoreA === scoreB) {
            return { ok: false, message: `Game ${gameIndex + 1} cannot end in a tie.` };
        }

        if (scoreA > scoreB) {
            winsA += 1;
        } else {
            winsB += 1;
        }
        games.push({ a: String(scoreA), b: String(scoreB) });
    }

    if (winsA < 2 && winsB < 2) {
        return { ok: false, message: "Enter enough game scores for one player to win 2 games." };
    }

    const playedGames = games.filter((game) => game.a !== "" && game.b !== "");
    const totalA = playedGames.reduce((sum, game) => sum + Number(game.a || 0), 0);
    const totalB = playedGames.reduce((sum, game) => sum + Number(game.b || 0), 0);

    return {
        ok: true,
        scoreA: String(totalA),
        scoreB: String(totalB),
        games,
        winnerSide: winsA > winsB ? "A" : "B",
    };
}

function resolveBracketSourceWinner(bracket, sourceLabel) {
    if (!sourceLabel) {
        return null;
    }

    for (const round of bracket.rounds) {
        for (const match of round.matches) {
            if (match.label !== sourceLabel || !match.winnerSide) {
                continue;
            }
            return match.winnerSide === "A"
                ? { label: match.slotA, seed: match.seedA }
                : { label: match.slotB, seed: match.seedB };
        }
    }

    return null;
}

function renderBracket() {
    if (!elements.bracketRounds) {
        return;
    }

    if (elements.bracketZoomLabel) {
        elements.bracketZoomLabel.textContent = `${Math.round(bracketZoom * 100)}%`;
    }
    if (elements.bracketEditButton) {
        elements.bracketEditButton.classList.toggle("active", bracketEditMode);
        elements.bracketEditButton.textContent = bracketEditMode ? "Cancel edit" : "Edit bracket";
    }
    if (elements.bracketSaveButton) {
        elements.bracketSaveButton.disabled = !bracketEditMode || !bracketDirty;
    }

    const currentTournament = state.tournaments.find((item) => item.id === bracketTournamentId);
    const bracketPlayers = getBracketPlayers(currentTournament);
    let bracket = bracketEditMode && bracketDraft && currentTournament?.id === bracketTournamentId
        ? bracketDraft
        : (currentTournament?.bracket || null);

    elements.bracketPlayerCount.textContent = String(bracketPlayers.length);
    elements.bracketSizeCount.textContent = String(bracket?.size || 0);
    elements.bracketByeCount.textContent = String(bracket?.byes || 0);
    elements.bracketRoundCount.textContent = String(bracket?.rounds?.length || 0);

    if (!currentTournament) {
        elements.bracketRounds.innerHTML = "";
        setBracketStatus("Choose a saved tournament to prepare its bracket.");
        return;
    }

    if (!bracket) {
        elements.bracketRounds.innerHTML = "";
        setBracketStatus("Generate a bracket for the selected tournament.");
        return;
    }

    try {
        const preview = ensureByeAdvancements(currentTournament, bracket);
        bracket = preview.bracket || bracket;
        setBracketStatus(`Showing bracket for ${currentTournament.name} - ${currentTournament.category}.`);
        elements.bracketRounds.innerHTML = renderBracketMarkup(bracket, currentTournament);
        bindBracketSvgEditing();
    } catch (error) {
        elements.bracketRounds.innerHTML = '<div class="empty-state">Unable to render the bracket preview right now.</div>';
        setBracketStatus(`Bracket render error: ${error instanceof Error ? error.message : String(error)}`);
    }
}

function renderBracketMarkup(bracket, tournament) {
    if (bracket?.type === "double") {
        return renderDoubleEliminationBracket(bracket, tournament);
    }
    return renderBracketSvg(bracket, tournament, {
        sectionKey: "main",
    });
}

function renderDoubleEliminationBracket(bracket, tournament) {
    return [
        '<div class="double-bracket-layout">',
        '<section class="double-bracket-panel">',
        '<div class="double-bracket-heading"><h3>Winners Bracket</h3><p>Primary knockout path</p></div>',
        renderBracketSvg(bracket.winners, tournament, {
            sectionKey: "winners",
            title: `${tournament.name} - Winners Bracket`,
            footerText: "Double elimination - winners side",
        }),
        '</section>',
        '<section class="double-bracket-panel">',
        '<div class="double-bracket-heading"><h3>Losers Bracket</h3><p>Second-chance path</p></div>',
        renderBracketSvg(bracket.losers, tournament, {
            sectionKey: "losers",
            title: `${tournament.name} - Losers Bracket`,
            footerText: "Double elimination - losers side",
        }),
        '</section>',
        '<section class="double-bracket-panel finals-panel">',
        '<div class="double-bracket-heading"><h3>Grand Final</h3><p>Includes reset match if needed</p></div>',
        renderBracketSvg(bracket.finals, tournament, {
            sectionKey: "finals",
            title: `${tournament.name} - Grand Final`,
            footerText: "Double elimination - finals",
        }),
        '</section>',
        '</div>',
    ].join("");
}

function renderMirroredSingleEliminationBracket(bracket, tournament) {
    if (!bracket?.rounds?.length || bracket.rounds.length < 2) {
        return renderBracketSvg(bracket, tournament, {
            sectionKey: "main",
        });
    }

    const sideRounds = bracket.rounds.slice(0, -1);
    const finalRound = bracket.rounds[bracket.rounds.length - 1];
    const firstRoundSideMatches = Math.max(1, Math.ceil((sideRounds[0]?.matches?.length || 2) / 2));
    const layout = getMirroredBracketLayout(sideRounds.length, firstRoundSideMatches);
    const title = `${tournament.name} - ${tournament.category}`;
    const parts = [
        `<div class="bracket-svg-wrap" style="--bracket-scale:${bracketZoom}; width:${layout.width * bracketZoom}px; height:${layout.height * bracketZoom}px;">`,
        `<svg class="bracket-svg" width="${layout.width}" height="${layout.height}" viewBox="0 0 ${layout.width} ${layout.height}" role="img" aria-label="${escapeHtml(title)} bracket">`,
        `<rect x="0" y="0" width="${layout.width}" height="${layout.height}" rx="24" fill="#081321"></rect>`,
        `<text x="${layout.width / 2}" y="36" text-anchor="middle" class="svg-title">${escapeXml(title)}</text>`,
    ];

    sideRounds.forEach((round, roundIndex) => {
        const sideMatchCount = Math.ceil(round.matches.length / 2);
        const leftMatches = round.matches.slice(0, sideMatchCount);
        const rightMatches = round.matches.slice(sideMatchCount);

        leftMatches.forEach((match, matchIndex) => {
            renderMirroredBracketMatch(parts, layout, {
                match,
                roundIndex,
                matchIndex,
                side: "left",
                sectionKey: "main",
                totalSideRounds: sideRounds.length,
                isTowardFinal: roundIndex === sideRounds.length - 1,
            });
        });

        rightMatches.forEach((match, matchIndex) => {
            renderMirroredBracketMatch(parts, layout, {
                match,
                roundIndex,
                matchIndex,
                side: "right",
                sectionKey: "main",
                totalSideRounds: sideRounds.length,
                isTowardFinal: roundIndex === sideRounds.length - 1,
            });
        });
    });

    const finalMatch = finalRound?.matches?.[0];
    if (finalMatch) {
        const finalBox = getMirroredFinalMatchBox(layout);
        const topSlotY = finalBox.y + layout.labelHeight;
        const bottomSlotY = topSlotY + layout.slotHeight + layout.slotGap;
        const leftJoinX = finalBox.x;
        const rightJoinX = finalBox.x + finalBox.width;
        const topMidY = topSlotY + layout.slotHeight / 2;
        const bottomMidY = bottomSlotY + layout.slotHeight / 2;
        const mergeMidY = (topMidY + bottomMidY) / 2;

        const finalIsBye = Boolean(finalMatch.byeA || finalMatch.byeB);
        const finalMatchClass = finalMatch.isPlayable
            ? `svg-match-box${finalIsBye ? " svg-match-box-bye" : ""}`
            : `svg-match-box svg-match-box-auto${finalIsBye ? " svg-match-box-bye" : ""}`;
        parts.push(
        `<rect x="${finalBox.x}" y="${finalBox.y}" width="${finalBox.width}" height="${finalBox.height}" rx="18" class="${finalMatchClass}"></rect>`,
        `<text x="${finalBox.x + 14}" y="${finalBox.y + 18}" class="${finalMatch.isPlayable ? "svg-match-label" : "svg-match-label svg-match-label-auto"}">${escapeXml(finalMatch.displayLabel || finalMatch.label)}</text>`,
        renderSvgSlot(finalBox.x + 12, topSlotY, layout, finalMatch.seedA, getCompactBracketSlotLabel(finalMatch.slotA), finalMatch.byeA, bracket.rounds.length - 1, 0, "slotA", "main"),
        renderSvgSlot(finalBox.x + 12, bottomSlotY, layout, finalMatch.seedB, getCompactBracketSlotLabel(finalMatch.slotB), finalMatch.byeB, bracket.rounds.length - 1, 0, "slotB", "main")
        );

        const leftSemi = getMirroredMatchBox(layout, sideRounds.length - 1, 0, "left");
        const rightSemi = getMirroredMatchBox(layout, sideRounds.length - 1, 0, "right");
        const leftSourceY = leftSemi.y + layout.labelHeight + layout.slotHeight + layout.slotGap / 2;
        const rightSourceY = rightSemi.y + layout.labelHeight + layout.slotHeight + layout.slotGap / 2;

        parts.push(
            `<path d="M ${leftSemi.x + leftSemi.width} ${leftSourceY} L ${finalBox.x - 24} ${leftSourceY} L ${finalBox.x - 24} ${mergeMidY} L ${leftJoinX} ${mergeMidY}" class="svg-connector"></path>`,
            `<path d="M ${rightSemi.x} ${rightSourceY} L ${finalBox.x + finalBox.width + 24} ${rightSourceY} L ${finalBox.x + finalBox.width + 24} ${mergeMidY} L ${rightJoinX} ${mergeMidY}" class="svg-connector"></path>`
        );

        const championX = finalBox.x + (finalBox.width - layout.championWidth) / 2;
        parts.push(
            `<rect x="${championX}" y="${layout.championY}" width="${layout.championWidth}" height="${layout.championHeight}" rx="22" class="svg-champion-box"></rect>`,
            `<text x="${championX + 16}" y="${layout.championY + 24}" class="svg-match-label">Winner</text>`,
            `<text x="${championX + 16}" y="${layout.championY + 56}" class="svg-champion-name">${escapeXml(`Winner of ${finalMatch.label}`)}</text>`,
            `<path d="M ${finalBox.x + finalBox.width / 2} ${finalBox.y + finalBox.height} L ${finalBox.x + finalBox.width / 2} ${layout.championY - 16} L ${championX + layout.championWidth / 2} ${layout.championY - 16} L ${championX + layout.championWidth / 2} ${layout.championY}" class="svg-connector"></path>`
        );
    }

    parts.push(`</svg>`, `</div>`);
    return parts.join("");
}

function renderMirroredBracketMatch(parts, layout, options) {
    const {
        match,
        roundIndex,
        matchIndex,
        side,
        sectionKey,
        totalSideRounds,
        isTowardFinal,
    } = options;
    const matchBox = getMirroredMatchBox(layout, roundIndex, matchIndex, side);
    const topSlotY = matchBox.y + layout.labelHeight;
    const bottomSlotY = topSlotY + layout.slotHeight + layout.slotGap;
    const topMidY = topSlotY + layout.slotHeight / 2;
    const bottomMidY = bottomSlotY + layout.slotHeight / 2;
    const mergeMidY = (topMidY + bottomMidY) / 2;

    const isByeMatch = Boolean(match.byeA || match.byeB);
    const matchClass = match.isPlayable
        ? `svg-match-box${isByeMatch ? " svg-match-box-bye" : ""}`
        : `svg-match-box svg-match-box-auto${isByeMatch ? " svg-match-box-bye" : ""}`;
    parts.push(
        `<rect x="${matchBox.x}" y="${matchBox.y}" width="${matchBox.width}" height="${matchBox.height}" rx="18" class="${matchClass}"></rect>`,
        `<text x="${matchBox.x + 14}" y="${matchBox.y + 18}" class="${match.isPlayable ? "svg-match-label" : "svg-match-label svg-match-label-auto"}">${escapeXml(match.displayLabel || match.label)}</text>`,
        renderSvgSlot(matchBox.x + 12, topSlotY, layout, match.seedA, getCompactBracketSlotLabel(match.slotA), match.byeA, roundIndex, matchIndex, "slotA", sectionKey),
        renderSvgSlot(matchBox.x + 12, bottomSlotY, layout, match.seedB, getCompactBracketSlotLabel(match.slotB), match.byeB, roundIndex, matchIndex, "slotB", sectionKey)
    );

    if (side === "left") {
        const mergeX = matchBox.x + matchBox.width + layout.connectorReach;
        parts.push(
            `<path d="M ${matchBox.x + matchBox.width} ${topMidY} L ${mergeX} ${topMidY} L ${mergeX} ${bottomMidY} L ${matchBox.x + matchBox.width} ${bottomMidY}" class="svg-connector"></path>`
        );

        if (!isTowardFinal) {
            const nextMatchBox = getMirroredMatchBox(layout, roundIndex + 1, Math.floor(matchIndex / 2), side);
            const nextCenterY = nextMatchBox.y + layout.labelHeight + layout.slotHeight + layout.slotGap / 2;
            parts.push(
                `<path d="M ${mergeX} ${mergeMidY} L ${nextMatchBox.x - 18} ${mergeMidY} L ${nextMatchBox.x - 18} ${nextCenterY} L ${nextMatchBox.x} ${nextCenterY}" class="svg-connector"></path>`
            );
        }
    } else {
        const mergeX = matchBox.x - layout.connectorReach;
        parts.push(
            `<path d="M ${matchBox.x} ${topMidY} L ${mergeX} ${topMidY} L ${mergeX} ${bottomMidY} L ${matchBox.x} ${bottomMidY}" class="svg-connector"></path>`
        );

        if (!isTowardFinal) {
            const nextMatchBox = getMirroredMatchBox(layout, roundIndex + 1, Math.floor(matchIndex / 2), side);
            const nextCenterY = nextMatchBox.y + layout.labelHeight + layout.slotHeight + layout.slotGap / 2;
            parts.push(
                `<path d="M ${mergeX} ${mergeMidY} L ${nextMatchBox.x + nextMatchBox.width + 18} ${mergeMidY} L ${nextMatchBox.x + nextMatchBox.width + 18} ${nextCenterY} L ${nextMatchBox.x + nextMatchBox.width} ${nextCenterY}" class="svg-connector"></path>`
            );
        }
    }
}

function getMirroredBracketLayout(sideRoundCount, firstRoundSideMatches) {
    const outerPaddingX = 112;
    const headerHeight = 56;
    const footerHeight = 220;
    const matchWidth = 182;
    const matchHeight = 82;
    const labelHeight = 18;
    const slotHeight = 20;
    const slotGap = 6;
    const slotWidth = matchWidth - 24;
    const seedWidth = 20;
    const connectorReach = 10;
    const centerGap = 28;
    const columnWidth = 220;
    const baseGap = 8;
    const baseStep = matchHeight + baseGap;
    const firstCenterY = headerHeight + matchHeight / 2;
    const championWidth = 156;
    const championHeight = 58;
    const width = outerPaddingX * 2 + sideRoundCount * columnWidth * 2 + centerGap + matchWidth + connectorReach * 8;
    const finalX = (width - matchWidth) / 2;
    const sideMatchBottom = getMirroredBracketMaxBottom(
        sideRoundCount,
        firstRoundSideMatches,
        firstCenterY,
        baseStep,
        matchHeight
    );
    const sideTopY = headerHeight;
    const sideBottomY = Math.max(sideMatchBottom, sideTopY + matchHeight);
    const sideBodyHeight = sideBottomY - sideTopY;
    const finalY = sideTopY + sideBodyHeight / 2 - matchHeight / 2;
    const championY = finalY + matchHeight + 36;
    const height = championY + championHeight + footerHeight;

    return {
        paddingX: outerPaddingX,
        width,
        height,
        headerHeight,
        matchWidth,
        matchHeight,
        labelHeight,
        slotHeight,
        slotGap,
        slotWidth,
        seedWidth,
        connectorReach,
        columnWidth,
        centerGap,
        baseStep,
        firstCenterY,
        finalX,
        finalY,
        championWidth,
        championHeight,
        championY,
    };
}

function getMirroredBracketMaxBottom(sideRoundCount, firstRoundSideMatches, firstCenterY, baseStep, matchHeight) {
    let maxBottom = firstCenterY + matchHeight / 2;

    for (let roundIndex = 0; roundIndex < sideRoundCount; roundIndex += 1) {
        const matchCount = Math.max(1, Math.ceil(firstRoundSideMatches / (2 ** roundIndex)));
        const lastMatchIndex = matchCount - 1;
        const step = baseStep * (2 ** roundIndex);
        const centerY = firstCenterY
            + ((2 ** roundIndex) - 1) * baseStep / 2
            + lastMatchIndex * step;
        const bottom = centerY + matchHeight / 2;
        if (bottom > maxBottom) {
            maxBottom = bottom;
        }
    }

    return maxBottom;
}

function getCompactBracketSlotLabel(label) {
    const text = String(label || "").trim();
    if (!text) {
        return "TBD";
    }

    const maxLength = 18;
    if (text.length <= maxLength) {
        return text;
    }

    return `${text.slice(0, maxLength - 1).trim()}…`;
}

function getBracketSlotLines(label, bye) {
    const raw = String(label || "").trim() || "TBD";
    const cleaned = compactBracketReferenceLabel(raw.replace(/\s*\(BYE\)\s*$/i, "").trim());
    const separatorIndex = cleaned.indexOf(" - ");
    const primary = trimBracketSlotSegment(
        separatorIndex === -1 ? cleaned : cleaned.slice(0, separatorIndex),
        16
    );
    const secondaryBase = separatorIndex === -1 ? "" : trimBracketSlotSegment(cleaned.slice(separatorIndex + 3), 12);
    const secondary = secondaryBase;

    return {
        primary: primary || "TBD",
        secondary,
    };
}

function trimBracketSlotSegment(value, maxLength) {
    const text = String(value || "").trim();
    if (!text) {
        return "";
    }

    if (text.length <= maxLength) {
        return text;
    }

    return `${text.slice(0, maxLength - 3).trim()}...`;
}

function compactBracketReferenceLabel(value) {
    const text = String(value || "").trim();
    if (!text) {
        return "";
    }

    const winnerMatch = text.match(/^Winner of Match\s+(\d+)$/i);
    if (winnerMatch) {
        return `W-M${winnerMatch[1]}`;
    }

    const loserMatch = text.match(/^Loser of Match\s+(\d+)$/i);
    if (loserMatch) {
        return `L-M${loserMatch[1]}`;
    }

    return text
        .replace(/^Winner of\s+/i, "W-")
        .replace(/^Loser of\s+/i, "L-");
}

function getMirroredMatchBox(layout, roundIndex, matchIndex, side) {
    const step = layout.baseStep * (2 ** roundIndex);
    const centerY = layout.firstCenterY + ((2 ** roundIndex) - 1) * layout.baseStep / 2 + matchIndex * step;
    const inwardOffset = roundIndex * layout.columnWidth;
    const x = side === "left"
        ? layout.paddingX + inwardOffset
        : layout.width - layout.paddingX - layout.matchWidth - inwardOffset;

    return {
        x,
        y: centerY - layout.matchHeight / 2,
        width: layout.matchWidth,
        height: layout.matchHeight,
    };
}

function getMirroredFinalMatchBox(layout) {
    return {
        x: layout.finalX,
        y: layout.finalY,
        width: layout.matchWidth,
        height: layout.matchHeight,
    };
}

function bindBracketSvgEditing() {
    if (!elements.bracketRounds) {
        return;
    }

    elements.bracketRounds.querySelectorAll("[data-bracket-slot]").forEach((node) => {
        node.addEventListener("click", handleBracketSvgEdit);
    });
}

function handleBracketSvgEdit(event) {
    const target = event.target;
    const field = target.dataset.bracketSlot;
    const sectionKey = target.dataset.bracketSection || "main";
    const roundIndex = Number(target.dataset.roundIndex);
    const matchIndex = Number(target.dataset.matchIndex);
    const currentTournament = state.tournaments.find((item) => item.id === bracketTournamentId);

    if (!field || Number.isNaN(roundIndex) || Number.isNaN(matchIndex) || !currentTournament) {
        return;
    }

    if (!bracketEditMode || !bracketDraft) {
        setBracketStatus("Click Edit bracket to start swapping players.");
        return;
    }

    const sectionBracket = getBracketEditSection(bracketDraft, sectionKey);
    const match = sectionBracket?.rounds?.[roundIndex]?.matches?.[matchIndex];
    if (!match || !sectionBracket) {
        return;
    }

    handleBracketSlotSwap(sectionBracket, sectionKey, field, roundIndex, matchIndex);
}

function getBracketEditSection(bracket, sectionKey) {
    if (!bracket) {
        return null;
    }
    if (sectionKey === "winners") {
        return bracket.winners || null;
    }
    if (sectionKey === "losers") {
        return bracket.losers || null;
    }
    if (sectionKey === "finals") {
        return bracket.finals || null;
    }
    return bracket;
}

function handleBracketSlotSwap(bracket, sectionKey, field, roundIndex, matchIndex) {
    const currentSlot = { sectionKey, field, roundIndex, matchIndex };
    const currentMatch = bracket?.rounds?.[roundIndex]?.matches?.[matchIndex];
    if (!currentMatch) {
        return;
    }
    const currentSeedField = field === "slotA" ? "seedA" : "seedB";
    const currentSeed = String(currentMatch[currentSeedField] || "").trim();

    if (!currentSeed) {
        selectedBracketSwapSlot = null;
        renderBracket();
        refreshBracketPopup();
        setBracketStatus("Only seeded player slots can be swapped.");
        return;
    }

    if (roundIndex !== 0) {
        selectedBracketSwapSlot = null;
        renderBracket();
        refreshBracketPopup();
        setBracketStatus("Swaps are only allowed within the first round.");
        return;
    }

    if (!selectedBracketSwapSlot) {
        selectedBracketSwapSlot = currentSlot;
        renderBracket();
        refreshBracketPopup();
        setBracketStatus(`First slot selected for swap: ${currentMatch.displayLabel || currentMatch.label}. Choose the second slot.`);
        return;
    }

    if (
        selectedBracketSwapSlot.sectionKey === currentSlot.sectionKey
        && selectedBracketSwapSlot.field === currentSlot.field
        && selectedBracketSwapSlot.roundIndex === currentSlot.roundIndex
        && selectedBracketSwapSlot.matchIndex === currentSlot.matchIndex
    ) {
        selectedBracketSwapSlot = null;
        renderBracket();
        refreshBracketPopup();
        setBracketStatus("Swap selection cleared.");
        return;
    }

    if (selectedBracketSwapSlot.sectionKey !== currentSlot.sectionKey) {
        setBracketStatus("Please swap players within the same bracket section.");
        selectedBracketSwapSlot = null;
        renderBracket();
        refreshBracketPopup();
        return;
    }

    if (selectedBracketSwapSlot.roundIndex !== 0 || selectedBracketSwapSlot.roundIndex !== roundIndex) {
        setBracketStatus("Swaps must stay inside the first round.");
        selectedBracketSwapSlot = null;
        renderBracket();
        refreshBracketPopup();
        return;
    }

    const firstMatch = bracket?.rounds?.[selectedBracketSwapSlot.roundIndex]?.matches?.[selectedBracketSwapSlot.matchIndex];
    if (!firstMatch) {
        selectedBracketSwapSlot = null;
        renderBracket();
        refreshBracketPopup();
        return;
    }

    const firstField = selectedBracketSwapSlot.field;
    const firstByeField = firstField === "slotA" ? "byeA" : "byeB";
    const secondByeField = field === "slotA" ? "byeA" : "byeB";
    const firstSeedField = firstField === "slotA" ? "seedA" : "seedB";
    const secondSeedField = field === "slotA" ? "seedA" : "seedB";

    const firstValue = firstMatch[firstField];
    const firstBye = Boolean(firstMatch[firstByeField]);
    const firstSeed = firstMatch[firstSeedField];

    if (!String(firstSeed || "").trim()) {
        selectedBracketSwapSlot = null;
        renderBracket();
        refreshBracketPopup();
        setBracketStatus("Only seeded player slots can be swapped.");
        return;
    }

    firstMatch[firstField] = currentMatch[field];
    firstMatch[firstByeField] = Boolean(currentMatch[secondByeField]);
    firstMatch[firstSeedField] = currentMatch[secondSeedField];
    currentMatch[field] = firstValue;
    currentMatch[secondByeField] = firstBye;
    currentMatch[secondSeedField] = firstSeed;

    recomputeSingleEliminationProgress(bracket);
    applyByeAdvancements(bracket);
    syncByeAdvancementSlots(bracket);
    bracketDirty = true;
    selectedBracketSwapSlot = null;
    renderBracket();
    refreshBracketPopup();
    setBracketStatus("Players swapped. Review the bracket and click Save bracket to keep the changes.");
}

function renderFilterCategoryOptions() {
    if (!elements.filterCategorySelect) {
        return;
    }

    if (tournamentMode === "edit" && activeTournamentId) {
        const tournamentCategory = String(state.tournament.category || "").trim();
        elements.filterCategorySelect.innerHTML = tournamentCategory
            ? `<option value="${escapeHtml(tournamentCategory)}" selected>${escapeHtml(tournamentCategory)}</option>`
            : '<option value="">Selected tournament category</option>';
        elements.filterCategorySelect.value = tournamentCategory;
        return;
    }

    const currentValue = elements.filterCategorySelect.value;
    const categories = getAvailableCategories();
    elements.filterCategorySelect.innerHTML = ['<option value="">All Categories</option>']
        .concat(
            categories.map((category) => {
                const selected = category === currentValue ? ' selected' : "";
                return `<option value="${escapeHtml(category)}"${selected}>${escapeHtml(category)}</option>`;
            })
        )
        .join("");
}

function renderFilterOrganizationOptions() {
    if (!elements.filterOrganizationSelect) {
        return;
    }

    const organizations = tournamentMode === "edit" && activeTournamentId
        ? Array.from(
            new Set(getCurrentTournamentRecordPlayers().map((team) => String(team.organization || "").trim()).filter(Boolean))
        ).sort((a, b) => a.localeCompare(b))
        : getAvailableOrganizations();
    const currentValue = elements.filterOrganizationSelect.value;
    elements.filterOrganizationSelect.innerHTML = ['<option value="">All Organizations</option>']
        .concat(
            organizations.map((organization) => {
                const selected = organization === currentValue ? ' selected' : "";
                return `<option value="${escapeHtml(organization)}"${selected}>${escapeHtml(organization)}</option>`;
            })
        )
        .join("");
}

function renderSummary() {
    elements.summaryTournament.textContent = String(state.tournaments.length);
    elements.summaryTeams.textContent = String(state.teams.length);
    elements.summaryMatches.textContent = String(state.matches.length);
}

function renderOverview() {
    const completed = state.matches.filter(isMatchCompleted).length;
    const hasTournament = Boolean(state.tournament.name);
    const tournamentPlayers = getTournamentPlayers();
    elements.overviewTournament.textContent = state.tournament.name || "Not created yet";
    elements.overviewStage.textContent = state.tournament.category || "Not set";
    elements.overviewTeams.textContent = String(tournamentPlayers.length);
    elements.overviewCompleted.textContent = String(completed);
    elements.overviewRoundCard.style.display = hasTournament ? "" : "none";
    elements.overviewPlayersCard.style.display = hasTournament ? "" : "none";
    elements.overviewCompletedCard.style.display = hasTournament ? "" : "none";

    elements.overviewTournamentList.innerHTML = "";
    if (state.tournaments.length === 0) {
        elements.overviewTournamentList.innerHTML = '<tr><td colspan="6">No tournaments saved yet.</td></tr>';
        return;
    }

    elements.overviewUpcoming.innerHTML = upcoming
        .map((match) => {
            const title = `${escapeHtml(getTeamName(match.teamA))} vs ${escapeHtml(getTeamName(match.teamB))}`;
            const meta = [match.round, formatDateTime(match.date, match.time)].filter(Boolean).join(" • ");
            return `<div class="item-card"><div><h3 class="item-title">${title}</h3><p class="item-subtitle">${escapeHtml(meta)}</p></div></div>`;
        })
        .join("");
}

function renderOverview() {
    const completed = state.matches.filter(isMatchCompleted).length;
    const hasTournament = Boolean(state.tournament.name);
    const tournamentPlayers = getTournamentPlayers();
    elements.overviewTournamentCount.textContent = String(state.tournaments.length);
    elements.overviewStage.textContent = state.tournament.category || "Not set";
    elements.overviewTeams.textContent = String(tournamentPlayers.length);
    elements.overviewCompleted.textContent = String(completed);
    elements.overviewRoundCard.style.display = hasTournament ? "" : "none";
    elements.overviewPlayersCard.style.display = hasTournament ? "" : "none";
    elements.overviewCompletedCard.style.display = hasTournament ? "" : "none";
    elements.overviewTournamentList.innerHTML = "";

    if (state.tournaments.length === 0) {
        elements.overviewTournamentList.innerHTML = '<tr><td colspan="6">No tournaments saved yet.</td></tr>';
        return;
    }

    elements.overviewTournamentList.innerHTML = state.tournaments
        .map(
            (item, index) => `
                <tr>
                    <td>${index + 1}</td>
                    <td>${escapeHtml(item.name)}</td>
                    <td>${escapeHtml(item.category)}</td>
                    <td>${escapeHtml(item.format)}</td>
                    <td>${item.playerCount}</td>
                    <td>${escapeHtml(item.notes || "-")}</td>
                </tr>
            `
        )
        .join("");
}

function renderTeams() {
    if (tournamentMode === "edit" && !activeTournamentId) {
        elements.teamsList.innerHTML = '<tr><td colspan="8">Choose a saved tournament to view its entries.</td></tr>';
        return;
    }

    const categoryFilter = tournamentMode === "edit" && activeTournamentId
        ? String(state.tournament.category || "").trim()
        : (elements.filterCategorySelect?.value || "");
    const organizationFilter = elements.filterOrganizationSelect?.value || "";
    const basePlayers = tournamentMode === "edit" ? state.teams : state.teams;
    const allPlayers = basePlayers.filter((team) => {
        const matchesCategory = !categoryFilter || String(team.category || "").trim() === categoryFilter;
        const matchesOrganization = !organizationFilter || String(team.organization || "").trim() === organizationFilter;
        return matchesCategory && matchesOrganization;
    });

    elements.teamsList.innerHTML = "";
    if (allPlayers.length === 0) {
        elements.teamsList.innerHTML = tournamentMode === "edit"
            ? '<tr><td colspan="8">No entries are available for this tournament yet.</td></tr>'
            : '<tr><td colspan="8">No players match the current filters.</td></tr>';
        return;
    }

    allPlayers.forEach((team, index) => {
        const fragment = elements.teamCardTemplate.content.cloneNode(true);
        const row = fragment.querySelector(".player-row");
        const identityKey = buildPlayerIdentityKey(team);
        if (Array.isArray(state.importMeta.duplicateKeys) && state.importMeta.duplicateKeys.includes(identityKey)) {
            row.classList.add("highlight-duplicate");
        }
        fragment.querySelector(".player-serial").textContent = String(index + 1);
        fragment.querySelector(".item-title").textContent = team.name || "-";
        fragment.querySelector(".player-reg").textContent = team.registrationNumber || "-";
        fragment.querySelector(".player-aadhar").textContent = team.aadhar || "-";
        fragment.querySelector(".player-org").textContent = getDisplayOrganization(team.organization) || "";
        fragment.querySelector(".player-category").textContent = team.category || "-";
        fragment.querySelector(".player-contact").textContent = team.contact || "-";
        fragment.querySelector(".remove-team").addEventListener("click", () => {
            state.teams = state.teams.filter((item) => item.id !== team.id);
            state.matches = state.matches.filter((match) => match.teamA !== team.id && match.teamB !== team.id);
            persist();
            renderAll();
        });
        elements.teamsList.appendChild(fragment);
    });
}

function renderStandings() {
    const selectedCategory = elements.standingsCategory?.value || state.tournament.category || "";
    const tournamentPlayers = getPlayersByCategory(selectedCategory);
    const tournamentLabel = selectedCategory
        ? `${state.tournament.name || "Selected category"} - ${selectedCategory}`
        : "";

    if (elements.standingsContext) {
        elements.standingsContext.textContent = tournamentLabel
            ? `Showing rankings for ${tournamentLabel}`
            : "Choose a category to view rankings.";
    }

    const allowedIds = new Set(tournamentPlayers.map((team) => team.id));
    const standings = tournamentPlayers.map((team) => {
        let wins = 0;
        state.matches.forEach((match) => {
            if (
                !isMatchCompleted(match) ||
                !allowedIds.has(match.teamA) ||
                !allowedIds.has(match.teamB) ||
                (match.teamA !== team.id && match.teamB !== team.id)
            ) {
                return;
            }
            const scoreA = Number(match.scoreA);
            const scoreB = Number(match.scoreB);

            if (match.teamA === team.id) {
                if (scoreA > scoreB) wins += 1;
            } else {
                if (scoreB > scoreA) wins += 1;
            }
        });

        return {
            name: team.name,
            wins,
        };
    });

    standings.sort((a, b) => b.wins - a.wins || a.name.localeCompare(b.name));

    if (standings.length === 0) {
        elements.standingsTable.innerHTML = selectedCategory
            ? '<tr><td colspan="3">No players found for the selected rankings category.</td></tr>'
            : '<tr><td colspan="3">Choose a category to view rankings.</td></tr>';
        return;
    }

    elements.standingsTable.innerHTML = standings
        .map((row, index) => `<tr><td>${index + 1}</td><td>${escapeHtml(row.name)}</td><td>${row.wins}</td></tr>`)
        .join("");
}

function renderStandingsCategoryOptions() {
    if (!elements.standingsCategory) {
        return;
    }

    const categories = getAvailableCategories();
    const selectedCategory = elements.standingsCategory.value || state.tournament.category || "";
    elements.standingsCategory.innerHTML = categories.length > 0
        ? categories
            .map((category) => {
                const selected = category === selectedCategory ? ' selected' : "";
                return `<option value="${escapeHtml(category)}"${selected}>${escapeHtml(category)}</option>`;
            })
            .join("")
        : '<option value="">Import players to load categories</option>';

    if (categories.length > 0 && !selectedCategory) {
        elements.standingsCategory.selectedIndex = 0;
    }
}

function renderAnnouncements() {
    if (!elements.announcementsList || !elements.announcementTemplate) {
        return;
    }
    elements.announcementsList.innerHTML = "";
    if (state.announcements.length === 0) {
        elements.announcementsList.innerHTML = '<div class="empty-state">No announcements posted yet.</div>';
        return;
    }

    state.announcements.forEach((entry) => {
        const fragment = elements.announcementTemplate.content.cloneNode(true);
        fragment.querySelector(".announcement-copy").textContent = entry.message;
        fragment.querySelector(".remove-announcement").addEventListener("click", () => {
            state.announcements = state.announcements.filter((item) => item.id !== entry.id);
            persist();
            renderAll();
        });
        elements.announcementsList.appendChild(fragment);
    });
}

function setProgressStatus(message) {
    if (elements.progressStatus) {
        elements.progressStatus.textContent = message || "";
        elements.progressStatus.style.display = message ? "" : "none";
    }
}

function renderDetectedCategories() {
    const categories = getAvailableCategories();
    elements.detectedCategories.textContent = categories.length > 0
        ? `Detected categories: ${categories.join(", ")}`
        : "Detected categories: none";
}

function renderSkippedEntries() {
    const duplicateEntries = Array.isArray(state.importMeta.duplicateEntries) ? state.importMeta.duplicateEntries : [];
    const invalidEntries = Array.isArray(state.importMeta.invalidEntries) ? state.importMeta.invalidEntries : [];

    if (elements.duplicateEntriesSection) {
        elements.duplicateEntriesSection.style.display = duplicateEntries.length > 0 ? "" : "none";
    }
    if (elements.invalidEntriesSection) {
        elements.invalidEntriesSection.style.display = invalidEntries.length > 0 ? "" : "none";
    }

    elements.duplicateEntriesList.innerHTML = duplicateEntries.length === 0
        ? '<tr><td colspan="7">No duplicate entries in the latest import.</td></tr>'
        : duplicateEntries
            .map(
                (entry, index) => `
                    <tr class="highlight-duplicate">
                        <td>${index + 1}</td>
                        <td>${escapeHtml(entry.name || "-")}</td>
                        <td>${escapeHtml(entry.registrationNumber || "-")}</td>
                        <td>${escapeHtml(entry.aadhar || "-")}</td>
                        <td>${escapeHtml(entry.organization || "-")}</td>
                        <td>${escapeHtml(entry.category || "-")}</td>
                        <td>${escapeHtml(entry.reason || "-")}</td>
                    </tr>
                `
            )
            .join("");

    elements.invalidEntriesList.innerHTML = invalidEntries.length === 0
        ? '<tr><td colspan="7">No invalid or missed entries in the latest import.</td></tr>'
        : invalidEntries
            .map(
                (entry, index) => `
                    <tr class="highlight-invalid">
                        <td>${index + 1}</td>
                        <td>${escapeHtml(entry.name || "-")}</td>
                        <td>${escapeHtml(entry.registrationNumber || "-")}</td>
                        <td>${escapeHtml(entry.aadhar || "-")}</td>
                        <td>${escapeHtml(entry.organization || "-")}</td>
                        <td>${escapeHtml(entry.category || "-")}</td>
                        <td>${escapeHtml(entry.reason || "-")}</td>
                    </tr>
                `
            )
            .join("");
}

function setImportStatus(message) {
    elements.importStatus.textContent = message;
}

function setManualPlayerStatus(message) {
    if (elements.manualPlayerStatus) {
        elements.manualPlayerStatus.textContent = message;
    }
}

function setTournamentSaveStatus(message) {
    if (elements.tournamentSaveStatus) {
        elements.tournamentSaveStatus.textContent = message;
    }
}

function setTournamentModeStatus(message) {
    if (elements.tournamentModeStatus) {
        elements.tournamentModeStatus.textContent = message;
        elements.tournamentModeStatus.style.display = message ? "" : "none";
    }
}

function setBracketStatus(message) {
    bracketStatusMessage = message || "";
    if (bracketPopupRef && !bracketPopupRef.closed) {
        const popupStatus = bracketPopupRef.document.getElementById("popupBracketStatus");
        if (popupStatus) {
            popupStatus.textContent = bracketStatusMessage;
            popupStatus.style.display = bracketStatusMessage ? "" : "none";
        }
    }
}

function normalizeImportMeta(importMeta) {
    return {
        categories: Array.isArray(importMeta?.categories) ? cloneState(importMeta.categories) : [],
        duplicateEntries: Array.isArray(importMeta?.duplicateEntries) ? cloneState(importMeta.duplicateEntries) : [],
        invalidEntries: Array.isArray(importMeta?.invalidEntries) ? cloneState(importMeta.invalidEntries) : [],
        duplicateKeys: Array.isArray(importMeta?.duplicateKeys) ? cloneState(importMeta.duplicateKeys) : [],
    };
}

function normalizeTeams(teams) {
    return Array.isArray(teams)
        ? teams.map((team) => ({
            id: team.id || createId(),
            name: team.name || "",
            contact: team.contact || "",
            registrationNumber: team.registrationNumber || "",
            aadhar: team.aadhar || "",
            organization: team.organization || "",
            category: team.category || "",
            source: team.source || "",
        }))
        : [];
}

function normalizeMatches(matches) {
    return Array.isArray(matches)
        ? matches.map((match) => ({
            ...match,
        }))
        : [];
}

function normalizeAnnouncements(announcements) {
    return Array.isArray(announcements)
        ? announcements.map((announcement) => ({
            id: announcement.id || createId(),
            message: announcement.message || "",
        }))
        : [];
}

function isMatchCompleted(match) {
    return match.scoreA !== "" && match.scoreB !== "";
}

function getTeamName(teamId) {
    const team = state.teams.find((item) => item.id === teamId);
    return team ? team.name : "Unknown team";
}

function formatDateTime(date, time) {
    return [date, time].filter(Boolean).join(" ");
}

function normalizeLoadedState(parsed) {
    return {
        tournament: {
            name: formatTournamentName(parsed?.tournament?.name || "", parsed?.tournament?.category || ""),
            format: parsed?.tournament?.format || "League",
            matchRule: parsed?.tournament?.matchRule || "single_25",
            category: parsed?.tournament?.category || "",
            notes: parsed?.tournament?.notes || "",
        },
        tournaments: Array.isArray(parsed?.tournaments)
            ? parsed.tournaments.map((item) => ({
                id: item.id || createId(),
                name: formatTournamentName(item.name || "", item.category || ""),
                format: item.format || "League",
                matchRule: item.matchRule || "single_25",
                category: item.category || "",
                notes: item.notes || "",
                playerCount: Number(item.playerCount || 0),
                teams: normalizeTeams(item.teams),
                importMeta: normalizeImportMeta(item.importMeta),
                matches: normalizeMatches(item.matches),
                announcements: normalizeAnnouncements(item.announcements),
                bracket: normalizeBracketState(item.bracket),
            }))
            : [],
        importMeta: normalizeImportMeta(parsed?.importMeta),
        teams: normalizeTeams(parsed?.teams),
        matches: normalizeMatches(parsed?.matches),
        announcements: normalizeAnnouncements(parsed?.announcements),
        meta: {
            lastSavedAt: parsed?.meta?.lastSavedAt || "",
        },
    };
}

function loadState() {
    return cloneState(defaultState);
}

function loadLegacyLocalState() {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
        return cloneState(defaultState);
    }

    try {
        const parsed = JSON.parse(raw);
        return normalizeLoadedState(parsed);
    } catch {
        return cloneState(defaultState);
    }
}

function clearLegacyLocalState() {
    try {
        window.localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
        console.warn("Legacy local tournament data could not be cleared.", error);
    }
}

function normalizeBracketState(bracket) {
    if (!bracket) {
        return null;
    }

    if (bracket.type === "double") {
        return {
            type: "double",
            size: Number(bracket.size || 0),
            byes: Number(bracket.byes || 0),
            winners: {
                size: Number(bracket.winners?.size || 0),
                byes: Number(bracket.winners?.byes || 0),
                rounds: normalizeBracketRounds(bracket.winners?.rounds),
            },
            losers: {
                size: Number(bracket.losers?.size || 0),
                byes: Number(bracket.losers?.byes || 0),
                rounds: normalizeBracketRounds(bracket.losers?.rounds),
            },
            finals: {
                size: Number(bracket.finals?.size || 0),
                byes: Number(bracket.finals?.byes || 0),
                rounds: normalizeBracketRounds(bracket.finals?.rounds),
            },
            rounds: normalizeBracketRounds(bracket.rounds),
            nextMatchSequence: Number(bracket.nextMatchSequence || 1),
        };
    }

    return {
        type: "single",
        size: Number(bracket.size || 0),
        byes: Number(bracket.byes || 0),
        rounds: normalizeBracketRounds(bracket.rounds),
        nextMatchSequence: Number(bracket.nextMatchSequence || 1),
    };
}

function normalizeBracketRounds(rounds) {
    return Array.isArray(rounds)
        ? rounds.map((round) => ({
            ...round,
            matches: Array.isArray(round?.matches)
                ? round.matches.map((match) => ({
                    ...match,
                    sourceA: match?.sourceA || "",
                    sourceB: match?.sourceB || "",
                    scoreA: match?.scoreA || "",
                    scoreB: match?.scoreB || "",
                    games: Array.isArray(match?.games) && match.games.length === 3
                        ? match.games.map((game) => ({ a: game?.a || "", b: game?.b || "" }))
                        : [{ a: "", b: "" }, { a: "", b: "" }, { a: "", b: "" }],
                    winnerSide: match?.winnerSide || "",
                    locked: typeof match?.locked === "boolean" ? match.locked : Boolean(match?.winnerSide),
                }))
                : [],
        }))
        : [];
}

function parseCsv(text) {
    const rows = [];
    let row = [];
    let value = "";
    let inQuotes = false;

    for (let index = 0; index < text.length; index += 1) {
        const char = text[index];
        const next = text[index + 1];

        if (char === '"') {
            if (inQuotes && next === '"') {
                value += '"';
                index += 1;
            } else {
                inQuotes = !inQuotes;
            }
            continue;
        }

        if (char === "," && !inQuotes) {
            row.push(value);
            value = "";
            continue;
        }

        if ((char === "\n" || char === "\r") && !inQuotes) {
            if (char === "\r" && next === "\n") {
                index += 1;
            }
            row.push(value);
            if (row.some((cell) => cell.trim() !== "")) {
                rows.push(row);
            }
            row = [];
            value = "";
            continue;
        }

        value += char;
    }

    if (value !== "" || row.length > 0) {
        row.push(value);
        if (row.some((cell) => cell.trim() !== "")) {
            rows.push(row);
        }
    }

    return rows;
}

function findHeaderIndex(headers, options) {
    return headers.findIndex((header) => options.includes(header));
}

function getAvailableCategories() {
    return Array.from(
        new Set(
            [
                ...state.teams.map((team) => String(team.category || "").trim()),
                ...state.importMeta.categories.map((category) => String(category || "").trim()),
            ].filter(Boolean)
        )
    ).sort((a, b) => a.localeCompare(b));
}

function getAvailableOrganizations() {
    return Array.from(
        new Set(state.teams.map((team) => getDisplayOrganization(team.organization)).filter(Boolean))
    ).sort((a, b) => a.localeCompare(b));
}

function getBracketPlayers(tournament) {
    if (!tournament) {
        return [];
    }

    const tournamentCategory = String(tournament.category || "").trim();
    return normalizeTeams(tournament.teams)
        .filter((team) => String(team.category || "").trim() === tournamentCategory)
        .sort((a, b) =>
            getDisplayOrganization(a.organization).localeCompare(getDisplayOrganization(b.organization))
            || String(a.name || "").localeCompare(String(b.name || ""))
        );
}

function getBallotPlayers() {
    const currentTournament = state.tournaments.find((item) => item.id === ballotTournamentId);
    if (!currentTournament) {
        return [];
    }

    const tournamentCategory = String(currentTournament.category || "").trim();
    return normalizeTeams(currentTournament.teams)
        .filter((team) => String(team.category || "").trim() === tournamentCategory)
        .sort((a, b) =>
            getDisplayOrganization(a.organization).localeCompare(getDisplayOrganization(b.organization))
            || String(a.name || "").localeCompare(String(b.name || ""))
        );
}

function getBracketSize(entryCount) {
    let size = 1;
    while (size < entryCount) {
        size *= 2;
    }
    return size;
}

function getTournamentPlayers() {
    return state.teams.filter(
        (team) => String(team.category || "").trim() === state.tournament.category
    );
}

function getCurrentTournamentRecordPlayers() {
    const currentTournament = state.tournaments.find((item) => item.id === activeTournamentId);
    const sourceTeams = currentTournament ? normalizeTeams(currentTournament.teams) : normalizeTeams(state.teams);
    const tournamentCategory = String(currentTournament?.category || state.tournament.category || "").trim();

    return sourceTeams.filter(
        (team) => String(team.category || "").trim() === tournamentCategory
    );
}

function getPlayersByCategory(category) {
    const normalizedCategory = String(category || "").trim();
    if (!normalizedCategory) {
        return [];
    }

    return state.teams.filter(
        (team) => String(team.category || "").trim() === normalizedCategory
    );
}

function getFilteredPlayers() {
    const category = elements.filterCategorySelect?.value || "";
    const organization = elements.filterOrganizationSelect?.value || "";

    return state.teams.filter((team) => {
        const matchesCategory = !category || String(team.category || "").trim() === category;
        const matchesOrganization = !organization || String(team.organization || "").trim() === organization;
        return matchesCategory && matchesOrganization;
    });
}

function exportPlayersCsv(players, fileName) {
    const headers = ["S.No", "Player", "Registration No.", "Aadhar", "Organization", "Category", "Contact"];
    const rows = players.map((team, index) => [
        String(index + 1),
        team.name || "",
        team.registrationNumber || "",
        team.aadhar || "",
        team.organization || "",
        team.category || "",
        team.contact || "",
    ]);

    const csv = [headers, ...rows]
        .map((row) => row.map(csvEscape).join(","))
        .join("\r\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(url);
}

function exportSkippedCsv(entries, fileName) {
    const headers = ["S.No", "Player", "Registration No.", "Aadhar", "Organization", "Category", "Reason"];
    const rows = entries.map((entry, index) => [
        String(index + 1),
        entry.name || "",
        entry.registrationNumber || "",
        entry.aadhar || "",
        entry.organization || "",
        entry.category || "",
        entry.reason || "",
    ]);

    const csv = [headers, ...rows]
        .map((row) => row.map(csvEscape).join(","))
        .join("\r\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(url);
}

function csvEscape(value) {
    const text = String(value ?? "");
    if (text.includes(",") || text.includes('"') || text.includes("\n")) {
        return `"${text.replaceAll('"', '""')}"`;
    }
    return text;
}

function slugify(value) {
    return String(value || "")
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "") || "all";
}

function getDisplayOrganization(value) {
    const organization = String(value || "").trim();
    if (!organization) {
        return "";
    }
    const normalized = organization.toLowerCase().replace(/\s+/g, " ");
    const otherLikeValues = [
        "others",
        "other",
    ];
    const otherLikePhrases = [
        "if not belonging to above institutions",
        "if not belonging to above institution",
        "not belonging to above institutions",
        "not belonging to above institution",
    ];

    if (otherLikeValues.includes(normalized)) {
        return "";
    }

    if (otherLikePhrases.some((phrase) => normalized.includes(phrase))) {
        return "";
    }

    return organization;
}

function formatTournamentName(name, category) {
    const rawName = String(name || "").trim();
    return rawName;
}

function getTournamentBaseName(name, category) {
    const fullName = String(name || "").trim();
    return fullName;
}

function renameTournamentEntry(tournamentId, nextBaseName) {
    const tournamentIndex = state.tournaments.findIndex((item) => item.id === tournamentId);
    if (tournamentIndex === -1) {
        return;
    }

    const tournament = state.tournaments[tournamentIndex];
    const updatedName = formatTournamentName(nextBaseName, tournament.category);
    state.tournaments[tournamentIndex].name = updatedName;

    if (activeTournamentId === tournamentId) {
        state.tournament.name = updatedName;
        if (elements.tournamentName) {
            elements.tournamentName.value = updatedName;
        }
    }

    persist();
    renderAll();
    setTournamentModeStatus(`Renamed tournament to ${updatedName}.`);
}

function formatBracketPlayerLabel(player) {
    const name = String(player?.name || "").trim() || "TBD";
    const organization = getBracketOrganizationLabel(player?.organization);
    return organization ? `${name} - ${organization}` : name;
}

function addByeNoteToLabel(label) {
    const text = String(label || "").trim();
    if (!text) {
        return "BYE";
    }
    return text.includes("(BYE)") ? text : `${text} (BYE)`;
}

function getBracketOrganizationLabel(value) {
    const organization = getDisplayOrganization(value);
    if (!organization) {
        return "";
    }

    const acronymMatch = organization.match(/\(([^)]+)\)\s*$/);
    if (acronymMatch) {
        return acronymMatch[1].trim();
    }

    const words = organization
        .replace(/[()]/g, " ")
        .split(/\s+/)
        .filter(Boolean);
    if (words.length === 0) {
        return "";
    }

    if (words.length === 1) {
        return words[0].slice(0, 10);
    }

    const acronym = words
        .filter((word) => /[A-Za-z]/.test(word))
        .map((word) => word[0].toUpperCase())
        .join("");

    return acronym || organization.slice(0, 10);
}

function formatCategoryList(values) {
    const items = Array.from(values).filter(Boolean);
    return items.length > 0 ? items.join(", ") : "none";
}

function buildPlayerIdentityKey(player) {
    const registrationNumber = normalizeIdentityValue(player.registrationNumber);
    const aadhar = normalizeIdentityValue(player.aadhar);
    const organization = normalizeIdentityValue(player.organization);
    const category = normalizeIdentityValue(player.category);

    if (!organization || !category || (!registrationNumber && !aadhar)) {
        return "";
    }

    return [registrationNumber || "none", aadhar || "none", organization, category].join("|");
}

function normalizeIdentityValue(value) {
    return String(value || "")
        .trim()
        .toLowerCase()
        .replace(/\s+/g, " ");
}

function normalizeHeader(value) {
    return value
        .trim()
        .toLowerCase()
        .replace(/[\s/]+/g, " ")
        .replace(/[():.'’,-]/g, "")
        .replace(/\s+/g, " ")
        .trim();
}

function persist() {
    persistWithMode("full");
}

function persistWithMode(syncMode, options = {}) {
    state.meta = {
        ...(state.meta || {}),
        lastSavedAt: new Date().toISOString(),
    };
    scheduleRemotePersist(false, syncMode, options);
}

function exportLocalBackup() {
    const now = new Date();
    const stamp = [
        now.getFullYear(),
        String(now.getMonth() + 1).padStart(2, "0"),
        String(now.getDate()).padStart(2, "0"),
        "-",
        String(now.getHours()).padStart(2, "0"),
        String(now.getMinutes()).padStart(2, "0"),
    ].join("");
    const fileName = `tournament-backup-${stamp}.json`;
    const payload = JSON.stringify(state, null, 2);
    const blob = new Blob([payload], { type: "application/json;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(url);
}

function importLocalBackup(jsonText) {
    if (!jsonText) {
        return;
    }
    let parsed;
    try {
        parsed = JSON.parse(jsonText);
    } catch {
        throw new Error("Invalid JSON");
    }
    if (!parsed || typeof parsed !== "object") {
        throw new Error("Invalid backup format");
    }

    state = normalizeLoadedState(parsed);
    persist();
}

function initializeSupabaseClient() {
    if (supabaseClient || !window.supabase?.createClient || !SUPABASE_URL || !SUPABASE_ANON_KEY) {
        return supabaseClient;
    }
    supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
        auth: {
            persistSession: true,
            autoRefreshToken: true,
        },
    });
    return supabaseClient;
}

function getStateTimestamp(value) {
    const timestamp = String(value?.meta?.lastSavedAt || "").trim();
    const parsed = timestamp ? Date.parse(timestamp) : NaN;
    return Number.isFinite(parsed) ? parsed : 0;
}

function serializeUiState() {
    return {
        tournamentMode,
        activeTournamentId,
        ballotTournamentId,
        bracketTournamentId,
        progressTournamentId,
        sidebarCollapsed,
        bracketZoom,
    };
}

function applyUiState(uiState) {
    tournamentMode = String(uiState?.tournamentMode || "").trim();
    activeTournamentId = String(uiState?.activeTournamentId || "").trim();
    ballotTournamentId = String(uiState?.ballotTournamentId || "").trim();
    bracketTournamentId = String(uiState?.bracketTournamentId || "").trim();
    progressTournamentId = String(uiState?.progressTournamentId || "").trim();
    sidebarCollapsed = Boolean(uiState?.sidebarCollapsed);
    bracketZoom = Number.isFinite(Number(uiState?.bracketZoom))
        ? Math.min(1.8, Math.max(0.6, Number(uiState.bracketZoom)))
        : 1;
}

function serializeTournamentRow(tournament, index) {
    return {
        workspace_id: SUPABASE_WORKSPACE_ID,
        id: tournament.id,
        name: tournament.name || "",
        format: tournament.format || "League",
        match_rule: tournament.matchRule || "single_25",
        category: tournament.category || "",
        notes: tournament.notes || "",
        player_count: Number(tournament.playerCount || 0),
        import_meta: normalizeImportMeta(tournament.importMeta),
        bracket: tournament.bracket ? cloneState(tournament.bracket) : null,
        sort_order: index,
        updated_at: new Date().toISOString(),
    };
}

function serializeTournamentPlayerRows(tournament) {
    return normalizeTeams(tournament.teams).map((team, index) => ({
        workspace_id: SUPABASE_WORKSPACE_ID,
        id: team.id,
        tournament_id: tournament.id,
        name: team.name || "",
        contact: team.contact || "",
        registration_number: team.registrationNumber || "",
        aadhar: team.aadhar || "",
        organization: team.organization || "",
        category: team.category || "",
        source: team.source || "",
        sort_order: index,
        updated_at: new Date().toISOString(),
    }));
}

function serializeTournamentMatchRows(tournament) {
    return normalizeMatches(tournament.matches).map((match, index) => ({
        workspace_id: SUPABASE_WORKSPACE_ID,
        id: match.id || `${tournament.id}-match-${index + 1}`,
        tournament_id: tournament.id,
        team_a: match.teamA || "",
        team_b: match.teamB || "",
        payload: cloneState(match),
        sort_order: index,
        updated_at: new Date().toISOString(),
    }));
}

function serializeTournamentAnnouncementRows(tournament) {
    return normalizeAnnouncements(tournament.announcements).map((announcement, index) => ({
        workspace_id: SUPABASE_WORKSPACE_ID,
        id: announcement.id,
        tournament_id: tournament.id,
        message: announcement.message || "",
        payload: cloneState(announcement),
        sort_order: index,
        updated_at: new Date().toISOString(),
    }));
}

function serializeRuntimeRow() {
    return {
        id: SUPABASE_WORKSPACE_ID,
        draft_tournament: cloneState(state.tournament),
        draft_import_meta: normalizeImportMeta(state.importMeta),
        draft_teams: normalizeTeams(state.teams),
        draft_matches: normalizeMatches(state.matches),
        draft_announcements: normalizeAnnouncements(state.announcements),
        ui_state: serializeUiState(),
        last_saved_at: String(state?.meta?.lastSavedAt || ""),
        updated_at: new Date().toISOString(),
    };
}

function buildStateFromSupabaseRows(runtimeRow, tournamentRows, playerRows, matchRows, announcementRows) {
    const playersByTournament = new Map();
    const matchesByTournament = new Map();
    const announcementsByTournament = new Map();

    playerRows.forEach((row) => {
        const list = playersByTournament.get(row.tournament_id) || [];
        list.push({
            id: row.id || createId(),
            name: row.name || "",
            contact: row.contact || "",
            registrationNumber: row.registration_number || "",
            aadhar: row.aadhar || "",
            organization: row.organization || "",
            category: row.category || "",
            source: row.source || "",
        });
        playersByTournament.set(row.tournament_id, list);
    });

    matchRows.forEach((row) => {
        const list = matchesByTournament.get(row.tournament_id) || [];
        list.push({
            ...(row.payload || {}),
            id: row.id || row.payload?.id || createId(),
            teamA: row.team_a || row.payload?.teamA || "",
            teamB: row.team_b || row.payload?.teamB || "",
        });
        matchesByTournament.set(row.tournament_id, list);
    });

    announcementRows.forEach((row) => {
        const list = announcementsByTournament.get(row.tournament_id) || [];
        list.push({
            ...(row.payload || {}),
            id: row.id || row.payload?.id || createId(),
            message: row.message || row.payload?.message || "",
        });
        announcementsByTournament.set(row.tournament_id, list);
    });

    const assembled = normalizeLoadedState({
        tournament: runtimeRow?.draft_tournament || defaultState.tournament,
        tournaments: tournamentRows.map((row) => ({
            id: row.id,
            name: row.name || "",
            format: row.format || "League",
            matchRule: row.match_rule || "single_25",
            category: row.category || "",
            notes: row.notes || "",
            playerCount: Number(row.player_count || 0),
            teams: playersByTournament.get(row.id) || [],
            importMeta: row.import_meta || {},
            matches: matchesByTournament.get(row.id) || [],
            announcements: announcementsByTournament.get(row.id) || [],
            bracket: row.bracket || null,
        })),
        importMeta: runtimeRow?.draft_import_meta || defaultState.importMeta,
        teams: runtimeRow?.draft_teams || [],
        matches: runtimeRow?.draft_matches || [],
        announcements: runtimeRow?.draft_announcements || [],
        meta: {
            lastSavedAt: runtimeRow?.last_saved_at || "",
        },
    });

    return assembled;
}

async function insertRowsInChunks(client, tableName, rows, chunkSize = 500) {
    for (let index = 0; index < rows.length; index += chunkSize) {
        const chunk = rows.slice(index, index + chunkSize);
        const { error } = await client.from(tableName).insert(chunk);
        if (error) {
            throw error;
        }
    }
}

async function fetchSplitStateFromSupabase(client) {
    const runtimeRequest = isSuperAdmin()
        ? client
            .from(SUPABASE_RUNTIME_TABLE)
            .select("*")
            .eq("id", SUPABASE_WORKSPACE_ID)
            .maybeSingle()
        : Promise.resolve({ data: null, error: null });

    const [
        runtimeResponse,
        tournamentsResponse,
        playersResponse,
        matchesResponse,
        announcementsResponse,
    ] = await Promise.all([
        runtimeRequest,
        client
            .from(SUPABASE_TOURNAMENTS_TABLE)
            .select("*")
            .eq("workspace_id", SUPABASE_WORKSPACE_ID)
            .order("sort_order", { ascending: true }),
        client
            .from(SUPABASE_TOURNAMENT_PLAYERS_TABLE)
            .select("*")
            .eq("workspace_id", SUPABASE_WORKSPACE_ID)
            .order("sort_order", { ascending: true }),
        client
            .from(SUPABASE_TOURNAMENT_MATCHES_TABLE)
            .select("*")
            .eq("workspace_id", SUPABASE_WORKSPACE_ID)
            .order("sort_order", { ascending: true }),
        client
            .from(SUPABASE_TOURNAMENT_ANNOUNCEMENTS_TABLE)
            .select("*")
            .eq("workspace_id", SUPABASE_WORKSPACE_ID)
            .order("sort_order", { ascending: true }),
    ]);

    const errors = [
        runtimeResponse.error,
        tournamentsResponse.error,
        playersResponse.error,
        matchesResponse.error,
        announcementsResponse.error,
    ].filter(Boolean);

    if (errors.length > 0) {
        throw errors[0];
    }

    const runtimeRow = runtimeResponse.data || null;
    const tournamentRows = Array.isArray(tournamentsResponse.data) ? tournamentsResponse.data : [];
    const playerRows = Array.isArray(playersResponse.data) ? playersResponse.data : [];
    const matchRows = Array.isArray(matchesResponse.data) ? matchesResponse.data : [];
    const announcementRows = Array.isArray(announcementsResponse.data) ? announcementsResponse.data : [];
    const hasSplitData = Boolean(
        runtimeRow
        || tournamentRows.length
        || playerRows.length
        || matchRows.length
        || announcementRows.length
    );

    return {
        hasSplitData,
        runtimeRow,
        tournamentRows,
        playerRows,
        matchRows,
        announcementRows,
    };
}

async function fetchLegacyRemoteState(client) {
    const { data, error } = await client
        .from(SUPABASE_STATE_TABLE)
        .select("payload, updated_at")
        .eq("id", SUPABASE_STATE_ROW_ID)
        .maybeSingle();
    if (error) {
        throw error;
    }
    return data?.payload ? normalizeLoadedState(data.payload) : null;
}

function legacyTimestampHasData(value) {
    return Boolean(
        value
        && (
            Array.isArray(value.tournaments) && value.tournaments.length > 0
            || Array.isArray(value.teams) && value.teams.length > 0
            || Array.isArray(value.announcements) && value.announcements.length > 0
        )
    );
}

async function initializeRemotePersistence() {
    const client = initializeSupabaseClient();
    if (!client || !currentSession?.user) {
        return;
    }
    try {
        const legacyState = loadLegacyLocalState();
        const splitState = await fetchSplitStateFromSupabase(client);
        if (splitState.hasSplitData) {
            state = buildStateFromSupabaseRows(
                splitState.runtimeRow,
                splitState.tournamentRows,
                splitState.playerRows,
                splitState.matchRows,
                splitState.announcementRows
            );
            applyUiState(splitState.runtimeRow?.ui_state || {});
            renderAll();
            clearLegacyLocalState();
            remoteStateReady = true;
            return;
        }

        const localTimestamp = getStateTimestamp(legacyState);
        const legacyRemoteState = await fetchLegacyRemoteState(client);
        const remoteTimestamp = getStateTimestamp(legacyRemoteState);

        if (legacyRemoteState && remoteTimestamp >= localTimestamp) {
            state = legacyRemoteState;
            applyUiState({});
            renderAll();
            clearLegacyLocalState();
            remoteStateReady = true;
            scheduleRemotePersist(true, "full");
            return;
        }

        if (legacyTimestampHasData(legacyState)) {
            state = legacyState;
            applyUiState({});
            renderAll();
            scheduleRemotePersist(true, "full");
        }

        remoteStateReady = true;
        scheduleRemotePersist(true, "full");
    } catch (error) {
        console.warn("Supabase is unavailable, so the app cannot load or save remote tournament data right now.", error);
    }
}

let pendingRemoteSync = { mode: "full", options: {} };

function scheduleRemotePersist(force = false, syncMode = "full", options = {}) {
    if (!initializeSupabaseClient() || !currentSession?.user) {
        return;
    }
    if (!force && !remoteStateReady) {
        return;
    }
    if (pendingRemoteSync.mode !== "full") {
        pendingRemoteSync = { mode: syncMode, options: cloneState(options) };
    }
    if (syncMode === "full") {
        pendingRemoteSync = { mode: "full", options: cloneState(options) };
    }
    if (remoteSyncTimer) {
        clearTimeout(remoteSyncTimer);
    }
    remoteSyncTimer = window.setTimeout(() => {
        remoteSyncTimer = null;
        const nextSync = pendingRemoteSync;
        pendingRemoteSync = { mode: "full", options: {} };
        remoteSyncInFlight = pushStateToSupabase(nextSync.mode, nextSync.options);
    }, force ? 0 : 350);
}

async function pushStateToSupabase(syncMode = "full", options = {}) {
    const client = initializeSupabaseClient();
    if (!client || !currentSession?.user) {
        return;
    }
    try {
        if (isProgressUser()) {
            if (syncMode !== "progress") {
                throw new Error("This account can only save bracket progress updates.");
            }
            await pushBracketProgressToSupabase(client, options.tournamentId);
            remoteStateReady = true;
            return;
        }

        const tournaments = Array.isArray(state.tournaments) ? state.tournaments : [];
        const tournamentRows = tournaments.map(serializeTournamentRow);
        const playerRows = tournaments.flatMap((tournament) => serializeTournamentPlayerRows(tournament));
        const matchRows = tournaments.flatMap((tournament) => serializeTournamentMatchRows(tournament));
        const announcementRows = tournaments.flatMap((tournament) => serializeTournamentAnnouncementRows(tournament));
        const runtimeRow = serializeRuntimeRow();

        const runtimeResult = await client
            .from(SUPABASE_RUNTIME_TABLE)
            .upsert(runtimeRow, { onConflict: "id" });
        if (runtimeResult.error) {
            throw runtimeResult.error;
        }

        const announcementDelete = await client
            .from(SUPABASE_TOURNAMENT_ANNOUNCEMENTS_TABLE)
            .delete()
            .eq("workspace_id", SUPABASE_WORKSPACE_ID);
        if (announcementDelete.error) {
            throw announcementDelete.error;
        }

        const matchDelete = await client
            .from(SUPABASE_TOURNAMENT_MATCHES_TABLE)
            .delete()
            .eq("workspace_id", SUPABASE_WORKSPACE_ID);
        if (matchDelete.error) {
            throw matchDelete.error;
        }

        const playerDelete = await client
            .from(SUPABASE_TOURNAMENT_PLAYERS_TABLE)
            .delete()
            .eq("workspace_id", SUPABASE_WORKSPACE_ID);
        if (playerDelete.error) {
            throw playerDelete.error;
        }

        const tournamentDelete = await client
            .from(SUPABASE_TOURNAMENTS_TABLE)
            .delete()
            .eq("workspace_id", SUPABASE_WORKSPACE_ID);
        if (tournamentDelete.error) {
            throw tournamentDelete.error;
        }

        if (tournamentRows.length > 0) {
            await insertRowsInChunks(client, SUPABASE_TOURNAMENTS_TABLE, tournamentRows);
        }
        if (playerRows.length > 0) {
            await insertRowsInChunks(client, SUPABASE_TOURNAMENT_PLAYERS_TABLE, playerRows);
        }
        if (matchRows.length > 0) {
            await insertRowsInChunks(client, SUPABASE_TOURNAMENT_MATCHES_TABLE, matchRows);
        }
        if (announcementRows.length > 0) {
            await insertRowsInChunks(client, SUPABASE_TOURNAMENT_ANNOUNCEMENTS_TABLE, announcementRows);
        }

        remoteStateReady = true;
        clearLegacyLocalState();
    } catch (error) {
        console.warn("Supabase sync failed, so the latest changes could not be stored remotely.", error);
    }
}

async function pushBracketProgressToSupabase(client, tournamentId) {
    const normalizedId = String(tournamentId || "").trim();
    if (!normalizedId) {
        throw new Error("Bracket progress sync is missing a tournament id.");
    }

    const tournamentIndex = state.tournaments.findIndex((item) => item.id === normalizedId);
    if (tournamentIndex === -1) {
        throw new Error("The selected tournament could not be found for progress sync.");
    }

    const tournament = state.tournaments[tournamentIndex];
    const row = serializeTournamentRow(tournament, tournamentIndex);
    const { error } = await client
        .from(SUPABASE_TOURNAMENTS_TABLE)
        .upsert(row, { onConflict: "workspace_id,id" });
    if (error) {
        throw error;
    }
}

function cloneState(value) {
    return JSON.parse(JSON.stringify(value));
}

function createId() {
    if (window.crypto && typeof window.crypto.randomUUID === "function") {
        return window.crypto.randomUUID();
    }
    return `id-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function escapeHtml(value) {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#39;");
}

function escapeXml(value) {
    return escapeHtml(value);
}

function renderOverviewFixed() {
    if (!elements.overviewTournamentList) {
        return;
    }

    if (elements.overviewTournamentCount) {
        elements.overviewTournamentCount.textContent = String(state.tournaments.length);
    }

    elements.overviewTournamentList.innerHTML = "";

    if (!Array.isArray(state.tournaments) || state.tournaments.length === 0) {
        elements.overviewTournamentList.innerHTML = '<tr><td colspan="7">No tournaments saved yet.</td></tr>';
        return;
    }

    elements.overviewTournamentList.innerHTML = state.tournaments
        .map(
            (item, index) => {
                const tournamentTotalPlayers = state.tournaments
                    .filter((entry) => entry.name === item.name)
                    .reduce((total, entry) => total + Number(entry.playerCount || 0), 0);

                return `
                <tr>
                    <td>${index + 1}</td>
                    <td>${escapeHtml(item.name || "-")}</td>
                    <td>${escapeHtml(item.category || "-")}</td>
                    <td>${escapeHtml(item.format || "-")}</td>
                    <td>${tournamentTotalPlayers}</td>
                    <td>${escapeHtml(getTournamentProgressStatus(item))}</td>
                    <td><button class="button secondary" type="button" data-overview-delete="${escapeHtml(item.id)}">Delete</button></td>
                </tr>
            `;
            }
        )
        .join("");
}

function getTournamentProgressStatus(tournament) {
    if (!tournament) {
        return "-";
    }
    const bracket = tournament.bracket;
    if (!bracket || !Array.isArray(bracket.rounds) || bracket.rounds.length === 0) {
        return "No bracket";
    }
    const matchRule = tournament.matchRule || "single_25";
    const roundSummaries = bracket.rounds.map((round) => {
        const playableMatches = Array.isArray(round?.matches)
            ? round.matches.filter((match) => match.isPlayable)
            : [];
        const completed = playableMatches.filter((match) => isBracketMatchCompleted(match, matchRule)).length;
        return { total: playableMatches.length, completed };
    });
    const overall = roundSummaries.reduce(
        (acc, round) => {
            acc.total += round.total;
            acc.completed += round.completed;
            return acc;
        },
        { total: 0, completed: 0 }
    );
    if (overall.total === 0) {
        return "No matches";
    }
    if (overall.completed === 0) {
        return "Not started";
    }
    if (overall.completed >= overall.total) {
        return "Completed";
    }
    const currentIndex = roundSummaries.findIndex((round) => round.total > 0 && round.completed < round.total);
    if (currentIndex === -1) {
        return "In progress";
    }
    const current = roundSummaries[currentIndex];
    const roundLabel = getBracketRoundLabel(currentIndex, bracket.rounds.length);
    return `${roundLabel}: ${current.completed}/${current.total} completed`;
}
