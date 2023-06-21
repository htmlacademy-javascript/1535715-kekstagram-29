export const createIdNumber = () =>{
	let lastGeneratedId = 0;

	return function(){
		lastGeneratedId += 1;
		return lastGeneratedId;
	};
};

export const generateRandomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export const createUnrepeatedId = (min, max) => {
	const previousIds = [];

	return function(){
		let currentId = generateRandomInteger(min, max);
		while(previousIds.includes(currentId)){
			currentId = generateRandomInteger(min, max);
		}
		previousIds.push(currentId);
		return currentId;
	};
};
