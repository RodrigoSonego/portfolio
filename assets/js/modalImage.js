function setupGalleryModal() {
    // Get the modal
    let modal = document.getElementById("modal");

    // Get the image and insert it inside the modal - use its "alt" text as a caption
    let modalImg = document.getElementById("modalImg");
    // var captionText = document.getElementById("caption");

    let imgs = document.getElementsByClassName("gallery");

    let modalContent = document.getElementById("modalContent");

    generateModalCarousel(modalContent, imgs)

    const splide = new Splide('#modalSplide', {
        type: 'fade',
        rewind: true
    });
    
    splide.mount();

    for (let index = 0; index < imgs.length; index++) {
        imgs[index].onclick = function () {
            modal.style.display = "flex";

            document.body.className += " blur";

            splide.go(index);
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

        splide.destroy = true;
    }

    // modal.onclick = function (event) {
    //     event.stopPropagation();

    //     modal.style.display = "none";
    //     document.body.className -= " blur";

    //     splide.destroy = true;
    // }
}

/**
 * @param {HTMLElement} modalContent 
 * @param {HTMLCollectionOf<Element>} imgs 
 */
function generateModalCarousel(modalContent, imgs){
    const section = document.createElement('section');
    section.className = 'splide';
    section.id = "modalSplide"

    const splideTrack = document.createElement('div');
    splideTrack.className = 'splide__track';

    const list = document.createElement('ul');
    list.className = 'splide__list';

    for (let img of imgs) {
        const slide = document.createElement('li');
        slide.className = 'splide__slide';

        const slideImg = img.cloneNode(true);
        slideImg.removeAttribute("class");

        // slideImg.onclick = function (event) {
        //     event.stopPropagation();
        // }

        slide.append(slideImg);
        list.append(slide);
    }

    splideTrack.append(list);
    section.append(splideTrack);
    modalContent.append(section);
}