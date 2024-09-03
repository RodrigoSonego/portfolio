function getLanguageDict(language) {
	let langFile;
	$.ajax({
		url: '/assets/lang/' + language + ".json",
		dataType: 'json', async: false,
		success: function(file) {langFile = file}
	})

	return langFile;
}

function getLanguage() {
	const language = localStorage.getItem("language");

	if (language == null) {
		setLanguage('en');
		return 'en';
	}

	return language;
}

function setLanguage(language) {
	localStorage.setItem('language', language)
}

function updateWithLanguage(language) {
	const translatable = document.querySelectorAll('[translate]')

	const lang = getLanguageDict(language);

	for (const element of translatable) {
		let tag = element.getAttribute("translate");

		element.textContent = lang[tag];
	}
}

function setupLanguageSelector(lang) {
	const selector = document.getElementById("languageSelect");
	selector.value = lang

	selector.onchange = () => {
		updateWithLanguage(selector.value);
		setLanguage(selector.value);
	}

	selector.className -= " hide";
}

$(document).ready(function() {
	const lang = getLanguage();
	setupLanguageSelector(lang);
})