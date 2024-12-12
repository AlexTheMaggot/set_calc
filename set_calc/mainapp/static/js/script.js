window.addEventListener('load', () => {
        let preloader = document.getElementById('preloader')
        setTimeout(() => {
                preloader.classList.add('preloader_transparent')
        }, 2000)
        setTimeout(() => {
                preloader.classList.add('preloader_none')
        }, 2300)
})
