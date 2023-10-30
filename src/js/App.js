import GLightbox from 'glightbox'

export function initSoundCloudFrame() {
    const title = document.querySelector('.soundcloud .title')
    const frame = title.parentNode

    title.addEventListener('click', function () {
        frame.classList.toggle('active')
    })
}

export function initLightbox() {
    const masonry = document.querySelector('.masonry')
    const images = masonry.querySelectorAll('.masonry-image')
    const lightBoxElements = []

    for (const image of images) {
        lightBoxElements.push({
            'type': 'image',
            'href': image.dataset.fullSrc
        })

        image.addEventListener('click', function (event) {
            lightBox.openAt(parseInt(event.target.dataset.index))
        })
    }

    const lightBox = new GLightbox({elements: lightBoxElements})
}
