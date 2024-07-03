function submitForm() {
  const form = document.getElementById("meetingForm");
  const responseDiv = document.getElementById("response");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const payload = {
      meeting_url: document.getElementById("meetingURL").value,
      bot_name: document.getElementById("botName").value || undefined,
      bot_image: document.getElementById("botImage").value || undefined,
      entry_message: document.getElementById("entryMessage").value || undefined,
      api_key: document.getElementById("apiKey").value || undefined,
    };
    console.log("PAYLOAD!!", payload);

    try {
      const response = await window.__TAURI__.invoke("submit_meeting", {
        payload,
      });
      console.log("RESPONSE", response);
      responseDiv.textContent = JSON.stringify(response, null, 2);
    } catch (error) {
      responseDiv.textContent = `🔴 🔴 Error: ${error}`;
      if (!window.__TAURI__.invoke) {
        console.log("CAN'T INVOKE");
      }
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  if (window.__TAURI__) {
    submitForm();
  } else {
    document.getElementById("response").textContent =
      "Error: Tauri API not available. Make sure you're running this in a Tauri app.";
  }
});

function openTab(evt, tabName) {
  const tabContents = document.getElementsByClassName("tab-content");
  for (let i = 0; i < tabContents.length; i++) {
    tabContents[i].style.display = "none";
  }

  const tabButtons = document.getElementsByClassName("tab-button");
  for (let i = 0; i < tabButtons.length; i++) {
    tabButtons[i].className = tabButtons[i].className.replace(" active", "");
  }

  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}
