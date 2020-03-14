import {
	lang
} from './lang/en.js';

function __(val) {
	if(lang[val]){
		return lang[val]
	}else{
		return val;
	}
}
export{
	__
}