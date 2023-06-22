export const checkStringLength = (string, maxLength) => string.length <= maxLength;

export const checkPalindrome = (string) => {
	string = string.replaceAll(' ', '').toLowerCase();
	let reversedString = '';
	for (let i = string.length; i >= 0; i--) {
		reversedString += string[i];
	}
	return string === reversedString;
};

export const makePositiveInteger = (string) => {
	string = string.toString();
	let positiveInteger = '';
	for (let i = 0; i < string.length; i++) {
		if (!isNaN(parseInt(string[i], 10))) {
			positiveInteger += string[i];
		}
	}
	return positiveInteger === '' ? NaN : Math.abs(parseInt(positiveInteger, 10));
};

const sliceNumbers = (numbers) => numbers.split(':').map(Number);

export const checkMeetingTime = (workStartTime, workEndTime, meetingStartTime, meetingDuration) => {
	const [workStartHour, workStartMinute] = sliceNumbers(workStartTime);
	const [workEndHour, workEndMinute] = sliceNumbers(workEndTime);
	const [meetingStartHour, meetingStartMinute] = sliceNumbers(meetingStartTime);
	const meetingToMinutes = meetingStartHour * 60 + meetingStartMinute + meetingDuration;
	const meetingEndHour = Math.floor((meetingToMinutes) / 60);
	const meetingEndMinute = (meetingToMinutes) % 60;

	const isFinishAfterWork = meetingEndHour > workEndHour || (meetingEndHour === workEndHour && meetingEndMinute > workEndMinute);
	const isStartBeforeWork = meetingStartHour < workStartHour || (meetingStartHour === workStartHour && meetingStartMinute < workStartMinute);

	return !(isFinishAfterWork || isStartBeforeWork);
};
