let enabled = false;

function enableHoverCapture() {
  document.addEventListener('mouseover', handleMouseOver);
  enabled = true;
}

function handleMouseOver(event) {
  if (event.target.tagName.toLowerCase() === 'img') {
    const imageUrl = event.target.src;
    copyToClipboard(imageUrl);
    showNotification(event.target, 'Image link copied!');
  }
}

function copyToClipboard(text) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand("copy");
  document.body.removeChild(textArea);
}

function showNotification(element, message) {
  const notification = document.createElement('div');
  notification.textContent = message;
  notification.style.position = 'fixed';
  notification.style.left = `${element.getBoundingClientRect().left}px`;
  notification.style.top = `${element.getBoundingClientRect().top - 30}px`;
  notification.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
  notification.style.color = 'white';
  notification.style.padding = '5px 10px';
  notification.style.borderRadius = '5px';
  notification.style.zIndex = '10000';
  document.body.appendChild(notification);
  setTimeout(() => {
    document.body.removeChild(notification);
  }, 2000);
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getStatus") {
    sendResponse({enabled: enabled});
  }
});

enableHoverCapture();