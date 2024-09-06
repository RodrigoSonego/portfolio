const languages = new Map();

function getLanguageDict(language) {
	let langFile;
	$.ajax({
		url: '/assets/lang/' + language + ".json",
		dataType: 'json', async: false,
		success: function (file) { langFile = file }
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

	const lang = languages.get(language);

	for (const element of translatable) {
		let tag = element.getAttribute("translate");

		element.textContent = lang.get(tag);
	}
}

function setupLanguageSelector(lang) {
	const selector = document.getElementById("languageSelect");
	selector.value = lang

	selector.onchange = () => {
		updateWithLanguage(selector.value);
		setLanguage(selector.value);

		console.log("trocou pra " + selector.value);
	}

	selector.className -= " hide";
}

(async function parseJsons() {
	const lang = getLanguage();
	
	await fetch(`/assets/lang/${lang}.json`).then(response => response.json())
	.then(json => languages.set(lang, new Map(Object.entries(json))));

	const otherLang = lang == 'en' ? 'pt' : 'en';
	fetch(`/assets/lang/${otherLang}.json`).then(response => response.json())
		.then(json => languages.set(otherLang, new Map(Object.entries(json))));
		
	updateWithLanguage(lang);
}())
	
	
$(window).on('load', function () {
 	const lang = getLanguage();

	updateWithLanguage(lang);

 	setupLanguageSelector(lang);
})