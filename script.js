const STORAGE_KEY = "bracketbase-state-v1";

const defaultState = {
    tournament: {
        name: "",
        format: "League",
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
};

let state = loadState();
let tournamentMode = "";
let activeTournamentId = "";

const elements = {
    navItems: document.querySelectorAll(".nav-item"),
    panels: document.querySelectorAll(".section-panel"),
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
    standingsTable: document.getElementById("standingsTable"),
    standingsContext: document.getElementById("standingsContext"),
    standingsCategory: document.getElementById("standingsCategory"),
    announcementForm: document.getElementById("announcementForm"),
    announcementText: document.getElementById("announcementText"),
    announcementsList: document.getElementById("announcementsList"),
    resetAppButton: document.getElementById("resetAppButton"),
    teamCardTemplate: document.getElementById("teamCardTemplate"),
    announcementTemplate: document.getElementById("announcementTemplate"),
};

bindEvents();
renderAll();

function bindEvents() {
    elements.navItems.forEach((item) => {
        item.addEventListener("click", () => {
            const section = item.dataset.section;
            elements.navItems.forEach((nav) => nav.classList.toggle("active", nav === item));
            elements.panels.forEach((panel) => {
                panel.classList.toggle("active", panel.dataset.section === section);
            });
        });
    });

    elements.tournamentForm.addEventListener("submit", (event) => {
        event.preventDefault();
        if (!elements.tournamentCategory.value) {
            window.alert("Please choose a category before saving the tournament.");
            return;
        }
        state.tournament = {
            name: elements.tournamentName.value.trim(),
            format: elements.tournamentFormat.value,
            category: elements.tournamentCategory.value,
            notes: elements.tournamentNotes.value.trim(),
        };
        saveTournamentEntry();
        const savedLabel = `${state.tournament.name} - ${state.tournament.category}`;
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

    elements.resetAppButton.addEventListener("click", () => {
        state = cloneState(defaultState);
        tournamentMode = "";
        activeTournamentId = "";
        persist();
        renderAll();
    });
}

function renderAll() {
    renderTournamentForm();
    renderSummary();
    renderOverviewFixed();
    renderTeams();
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
}

function addManualPlayer() {
    const name = elements.manualPlayerName?.value.trim() || "";
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
        name: state.tournament.name,
        format: state.tournament.format,
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
    };

    if (existingIndex === -1) {
        state.tournaments.push(entry);
    } else {
        state.tournaments[existingIndex] = entry;
    }

    activeTournamentId = entry.id;
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
        const name = (row[nameIndex] || "").trim();
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
                const label = `${item.name} - ${item.category}`;
                const selected = tournamentMode === "edit" && item.id === activeTournamentId ? ' selected' : "";
                return `<option value="${item.id}"${selected}>${escapeHtml(label)}</option>`;
            })
        )
        .join("");

    if (elements.editTournamentOptions) {
        elements.editTournamentOptions.innerHTML = "";
        state.tournaments.forEach((item) => {
            const button = document.createElement("button");
            button.type = "button";
            button.className = item.id === activeTournamentId ? "button" : "button secondary";
            button.textContent = `${item.name} - ${item.category}`;
            button.addEventListener("click", () => {
                activeTournamentId = item.id;
                if (elements.editTournamentSelect) {
                    elements.editTournamentSelect.value = item.id;
                }
                loadTournamentEntry(item.id);
                setTournamentModeStatus("");
                renderAll();
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
        fragment.querySelector(".player-org").textContent = team.organization || "-";
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

function loadState() {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
        return cloneState(defaultState);
    }

    try {
        const parsed = JSON.parse(raw);
        return {
            tournament: {
                name: parsed.tournament?.name || "",
                format: parsed.tournament?.format || "League",
                category: parsed.tournament?.category || "",
                notes: parsed.tournament?.notes || "",
            },
            tournaments: Array.isArray(parsed.tournaments)
                ? parsed.tournaments.map((item) => ({
                    id: item.id || createId(),
                    name: item.name || "",
                    format: item.format || "League",
                    category: item.category || "",
                    notes: item.notes || "",
                    playerCount: Number(item.playerCount || 0),
                    teams: normalizeTeams(item.teams),
                    importMeta: normalizeImportMeta(item.importMeta),
                    matches: Array.isArray(item.matches) ? item.matches : [],
                    announcements: Array.isArray(item.announcements) ? item.announcements : [],
                }))
                : [],
            importMeta: normalizeImportMeta(parsed.importMeta),
            teams: normalizeTeams(parsed.teams),
            matches: Array.isArray(parsed.matches) ? parsed.matches : [],
            announcements: Array.isArray(parsed.announcements) ? parsed.announcements : [],
        };
    } catch {
        return cloneState(defaultState);
    }
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
        new Set(state.teams.map((team) => String(team.organization || "").trim()).filter(Boolean))
    ).sort((a, b) => a.localeCompare(b));
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
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
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

function renderOverviewFixed() {
    if (!elements.overviewTournamentList) {
        return;
    }

    if (elements.overviewTournamentCount) {
        elements.overviewTournamentCount.textContent = String(state.tournaments.length);
    }

    elements.overviewTournamentList.innerHTML = "";

    if (!Array.isArray(state.tournaments) || state.tournaments.length === 0) {
        elements.overviewTournamentList.innerHTML = '<tr><td colspan="6">No tournaments saved yet.</td></tr>';
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
                    <td>${escapeHtml(item.notes || "-")}</td>
                </tr>
            `;
            }
        )
        .join("");
}
