// Settings management script
function getSettings() {
  const savedSettings = localStorage.getItem("classSettings");
  if (savedSettings) {
    return JSON.parse(savedSettings);
  }
  return {
    darkMode: false,
    animations: true,
    fontSize: "medium",
    notifications: true,
    emailNotifications: false,
    language: "vi",
  };
}

function saveSettings(settings) {
  localStorage.setItem("classSettings", JSON.stringify(settings));
}

function applySettings() {
  const settings = getSettings();

  // Apply dark mode
  if (settings.darkMode) {
    document.body.classList.add("dark-mode");
  } else {
    document.body.classList.remove("dark-mode");
  }

  // Apply font size
  document.body.classList.remove("font-small", "font-medium", "font-large");
  document.body.classList.add("font-" + settings.fontSize);

  // Apply animations
  if (settings.animations) {
    document.body.classList.remove("no-animations");
  } else {
    document.body.classList.add("no-animations");
  }
}

function loadSettings() {
  const settings = getSettings();

  // Load settings into form if on settings page
  if (document.getElementById("darkMode")) {
    document.getElementById("darkMode").checked = settings.darkMode || false;
    document.getElementById("animations").checked =
      settings.animations !== false;
    document.getElementById("fontSize").value = settings.fontSize || "medium";
    document.getElementById("notifications").checked =
      settings.notifications !== false;
    document.getElementById("emailNotifications").checked =
      settings.emailNotifications || false;
    document.getElementById("language").value = settings.language || "vi";
  }
}

// Apply settings on page load
document.addEventListener("DOMContentLoaded", function () {
  loadSettings();
  applySettings();
});

// Function to update settings from form
function updateSettingsFromForm() {
  if (!document.getElementById("darkMode")) return;

  const settings = {
    darkMode: document.getElementById("darkMode").checked,
    animations: document.getElementById("animations").checked,
    fontSize: document.getElementById("fontSize").value,
    notifications: document.getElementById("notifications").checked,
    emailNotifications: document.getElementById("emailNotifications").checked,
    language: document.getElementById("language").value,
  };

  saveSettings(settings);
  applySettings();
}
