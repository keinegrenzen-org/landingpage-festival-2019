const videos = document.querySelectorAll('.youtube-embed')
for (const video of videos) {
    const markup = `
        <iframe
          width="560"
          height="315"
          src="${video.dataset.source}"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
     `

    video.parentElement.insertAdjacentHTML('beforeend', markup)
    video.remove()
}
