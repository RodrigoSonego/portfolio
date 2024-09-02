function getLanguageDict() {
	(localStorage.getItem('language') == null) ? setLanguage('en') : false;

	let langFile;
	$.ajax({
		url: '/assets/lang/' + localStorage.getItem('language') + ".json",
		dataType: 'json', async: false,
		success: function(file) {langFile = file}
	})

	return langFile;
}

/**
 * @param {string} language 
 */
function setLanguage(language) {
	localStorage.setItem('language', language)
}

function updateWithLanguage() {
	const translatable = document.querySelectorAll('[translate]')

	const lang = getLanguageDict();

	for (const element of translatable) {
		let tag = element.getAttribute("translate");

		element.textContent = lang[tag];
	}
}

$(document).ready(function(){
	updateWithLanguage();

	document.onkeydown = function(event){
		if(event.key == "p") { setLanguage('pt'); updateWithLanguage(); }
		if(event.key == "o") { setLanguage('en'); updateWithLanguage(); }
	}
})