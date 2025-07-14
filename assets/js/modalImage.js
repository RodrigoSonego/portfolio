function setupGalleryModal() {
    // Get the modal
    const modal = document.getElementById("modal");

    // var captionText = document.getElementById("caption");

    const imgs = document.getElementsByClassName("gallery");

    const modalContent = document.getElementById("modalContent");

    generateModalCarousel(modalContent, imgs)

    const splide = new Splide('#modalSplide', {
        type: 'fade',
        rewind: true,
        video : {
            loop    : true,
            autoplay: true
        }
    });
    
    splide.mount( window.splide.Extensions );

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

    modal.onclick = function (event) {
        event.stopPropagation();

        modal.style.display = "none";
        document.body.className -= " blur";

        splide.destroy = true;
    }
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

        const imgParent = img.parentElement;
        if (imgParent.hasAttribute("data-splide-youtube")){
            slide.setAttribute('data-splide-youtube', imgParent.getAttribute("data-splide-youtube"));
        }

        const slideImg = img.cloneNode(true);
        slideImg.removeAttribute("class");

        slide.append(slideImg);
        list.append(slide);
    }

    modalContent.onclick = function (event) {
        event.stopPropagation();
    }

    splideTrack.append(list);
    section.append(splideTrack);
    modalContent.append(section);
}