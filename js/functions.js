const checkStringLength = (string, maxLength) => string.length <= maxLength;

const checkPalindrome = (string) =>{
  string = string.replaceAll(' ', '').toLowerCase();
  let reversedString = '';
  for(let i = string.length; i >= 0; i--){
    reversedString += string[i];
  }
  return string === reversedString;
}

const makePositiveInteger = (string) =>{
  string = string.toString();
  let positiveInteger = '';
  for(let i = 0; i < string.length; i++){
    if(!isNaN(parseInt(string[i], 10))){
      positiveInteger += string[i];
    }
  }
  return positiveInteger === '' ? NaN : Math.abs(parseInt(positiveInteger, 10));
}
