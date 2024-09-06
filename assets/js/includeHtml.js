(function includeHTML() {
        let xhttp;
        const elements = document.querySelectorAll('[include-html]');
        for (const element of elements) {
            let file = element.getAttribute("include-html");
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4) {
                    if (this.status == 200) { element.innerHTML = this.responseText; }
                    if (this.status == 404) { element.innerHTML = "Page not found."; }
                    /* Remove the attribute, and call this function once more: */
                    element.removeAttribute("include-html");
                    includeHTML();
                }
            }
            xhttp.open("GET", file, true);
            xhttp.send();
            /* Exit the function: */
            return;
        }
}())