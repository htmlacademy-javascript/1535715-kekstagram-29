const checkStringLength = (string, maxLength) => string.length <= maxLength;

const checkPalindrome = (string) => {
	string = string.replaceAll(' ', '').toLowerCase();
	let reversedString = '';
	for (let i = string.length; i >= 0; i--) {
		reversedString += string[i];
	}
	return string === reversedString;
};

const makePositiveInteger = (string) => {
	string = string.toString();
	let positiveInteger = '';
	for (let i = 0; i < string.length; i++) {
		if (!isNaN(parseInt(string[i], 10))) {
			positiveInteger += string[i];
		}
	}
	return positiveInteger === '' ? NaN : Math.abs(parseInt(positiveInteger, 10));
};

const checkMeetingTime = (workStartTime, workEndTime, meetingStartTime, meetingDuration) =>{
	const [workStartHour, workStartMinute] = workStartTime.split(':').map(Number);
	const [workEndHour, workEndMinute] = workEndTime.split(':').map(Number);
	const [meetingStartHour, meetingStartMinute] = meetingStartTime.split(':').map(Number);
	const meetingEndHour = Math.floor((meetingStartHour * 60 + meetingStartMinute + meetingDuration) / 60);
	const meetingEndMinute = (meetingStartHour * 60 + meetingStartMinute + meetingDuration) % 60;

	if ((meetingEndHour > workEndHour || (meetingEndHour === workEndHour && meetingEndMinute > workEndMinute)) || (meetingStartHour < workStartHour || (meetingStartHour === workStartHour && meetingStartMinute < workStartMinute))) {
		return false;
	}
	return true;
};
