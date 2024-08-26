function setupGalleryModal() {
    // Get the modal
    let modal = document.getElementById("modal");

    // Get the image and insert it inside the modal - use its "alt" text as a caption
    let modalImg = document.getElementById("modalImg");
    // var captionText = document.getElementById("caption");

    let imgs = document.getElementsByClassName("gallery");

    for (let img of imgs) {
        img.onclick = function () {
            modal.style.display = "flex";
            modalImg.src = this.src;

            document.body.className += " blur"
        }
    }

    // Get the <span> element that closes the modal
    let span = document.getElementsByClassName("modal-close")[0];

    // When the user clicks on <span> (x), close the modal
    span.onclick = function (event) {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();

        modal.style.display = "none";
        document.body.className -= " blur"   
    }

    modalImg.onclick = function (event) {
        event.stopPropagation();
    }

    modal.onclick = function (event) {
        event.stopPropagation();

        modal.style.display = "none";
        document.body.className -= " blur";
    }
}