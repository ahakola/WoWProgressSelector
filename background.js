// Called when the user clicks on the browser action button.
chrome.browserAction.onClicked.addListener(function(tab) {
	chrome.tabs.sendMessage(
		tab.id,
		{message: "check_wowprogress_checkboxes"},
		function(response) {
			if (chrome.runtime.lastError) { // We made an oopsie!
				console.warn('Error: ' + chrome.runtime.lastError.message);
			} else { // Great success!
				console.log("Response: " + response);
				if (response > 0) { // Show number of checked names in Badge
					chrome.browserAction.setBadgeText({text: response.toString(), tabId: tab.id});
				} else { // Unchecking or something went wrong -> clear Badge
					chrome.browserAction.setBadgeText({text: "", tabId: tab.id});
				}
			}
		}
	);
});