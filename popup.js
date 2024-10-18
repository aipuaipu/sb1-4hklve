document.addEventListener('DOMContentLoaded', () => {
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, {action: "getStatus"}, (response) => {
      const statusElement = document.getElementById('status');
      if (response && response.enabled) {
        statusElement.textContent = "Hover capture is enabled. Hover over images to copy their links.";
      } else {
        statusElement.textContent = "Hover capture is disabled. Refresh the page to enable.";
      }
    });
  });
});