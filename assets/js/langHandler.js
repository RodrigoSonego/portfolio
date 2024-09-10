const languages = new Map();

import { parseToMap } from './iniParser.js'

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
	
	// const initTime0 = performance.now();
	
	// await fetch(`/assets/lang/${lang}.json`).then(response => response.json())
	// .then(json => languages.set(lang, new Map(Object.entries(json))));
	
	// const endTime0 = performance.now();
	// console.log(`time to map json: ${endTime0-initTime0}`)

	const currentLangDict = await parseToMap(`/assets/lang/${lang}.ini`);
	languages.set(lang, currentLangDict);
	
	const otherLang = lang == 'en' ? 'pt' : 'en';
	parseToMap(`/assets/lang/${otherLang}.ini`).then(map => languages.set(otherLang, map));
	// fetch(`/assets/lang/${otherLang}.json`).then(response => response.json())
	// .then(json => languages.set(otherLang, new Map(Object.entries(json))));
	
	updateWithLanguage(lang);
	// const initTime = performance.now();
	// const mappedIni = await parseToMap(`/assets/lang/${lang}.ini`);
	// languages.set(lang, mappedIni);
	// const endTime = performance.now();

	// console.log(`time to map ini: ${endTime-initTime}`)
}())
	
	
$(window).on('load', function () {
 	const lang = getLanguage();

	updateWithLanguage(lang);

 	setupLanguageSelector(lang);
})