// "Borrowed" and slightly altered from actual WoWProgress.com
var check_first_n_chars = function(n,reset)
{
	var i = 0;
	var checked = !reset;
	$(".char_chbx").each(function() {
		i++;
		if (0 == n || i <= n)
			$(this).prop("checked",checked);
		else
			return false;
	})
	return (checked && (n == 0 && i || i - 1) || 0); // Return 0 if reset is true
}

var check = true // Use this bool to determine if we should check or uncheck the checkboxes

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if(request.message === "check_wowprogress_checkboxes"){
		console.log("Checking all the checkboxes.");

		// Member limit of a guild is 1000, but if you insert 0 as parameter for the function, it will select all members
		//check_first_n_chars(0);
		var count = check && check_first_n_chars(0) || check_first_n_chars(0, true); // Check or uncheck all the checkboxes
		console.log("> Checked " + count + " checkboxes. Check is set to: " + (check).toString());
		sendResponse(count); // Return the count so we can update the Badge
		check = !check // Inverse check for the next press to do the opposite action
	};
});