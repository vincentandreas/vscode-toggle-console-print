import { PATTERN } from "./constant";

export function uncommentMatch(currText : string, lang : string){
	let commentRgx = PATTERN[lang].with_comment;
	let matches = currText.match(commentRgx);
	let newText = null;
	if (matches && matches.length > 1) {
		newText = `${matches[1]}${matches[3]}`;				
	}
	return newText;
}