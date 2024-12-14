window.addEventListener('load', () => {
        let preloader = document.getElementById('preloader')
        preloader.classList.add('preloader_transparent')
        setTimeout(() => {
                preloader.classList.add('preloader_none')
        }, 300)
})
