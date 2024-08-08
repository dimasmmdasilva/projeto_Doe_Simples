function animarContador(id, start, end, duration) {
    let obj = document.getElementById(id);
    let current = start;
    let range = end - start;
    let increment = end > start ? 1 : -1;
    let stepTime = Math.abs(Math.floor(duration / range));
    let timer = setInterval(() => {
        current += increment; 
        obj.textContent = current;
        if (current == end) {
            clearInterval(timer);
        }
    }, stepTime);
}

window.onload = function() {
    animarContador('contadorCrianças', 0, 180, 40000);
    animarContador('contadorColaboradores', 0, 40, 40000);
};

window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    const titulo = document.querySelector('.titulo');
    const ongSection = document.querySelector('.ong_semente');
    const ongSectionTop = ongSection.offsetTop;

    if (window.scrollY >= ongSectionTop) {
        header.classList.add('reduzido');
        titulo.innerHTML = titulo.innerHTML.replace('Doe Simples', '<h3 class="titulo">Doe Simples</h3>');
    } else {
        header.classList.remove('reduzido');
        titulo.innerHTML = titulo.innerHTML.replace('<h3 class="titulo">Doe Simples</h3>', 'Doe Simples');
    }
});

