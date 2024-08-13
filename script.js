// Função para carregar HTML e CSS de uma section
function carregarSection(urlHtml, urlCss, elementoDestino, callback) {
    fetch(urlHtml)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            document.getElementById(elementoDestino).innerHTML = data;
            console.log(`${elementoDestino} carregado.`);
            if (callback) callback(); // Executa o callback após carregar o HTML
        })
        .catch(error => {
            console.error('Erro ao carregar o HTML da section:', error);
        });

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = urlCss;
    document.head.appendChild(link);
    console.log(`${urlCss} carregado.`);
}

// Função para configurar as animações na seção "doe_simples"
function configurarDoeSimplesObserver() {
    const doeSimplesSection = document.querySelector('#doe_simples');
    if (doeSimplesSection) {
        const primeiraMensagem = doeSimplesSection.querySelector('.primeira-mensagem');
        const segundaMensagem = doeSimplesSection.querySelector('.segunda-mensagem');
        const terceiraMensagem = doeSimplesSection.querySelector('.terceira-mensagem');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    primeiraMensagem.classList.add('aparecer');
                    segundaMensagem.classList.add('aparecer');
                    terceiraMensagem.classList.add('aparecer');
                    observer.disconnect();
                }
            });
        }, { threshold: 0.5 });

        observer.observe(doeSimplesSection);
    }
}

// Função para configurar as animações na seção "ong_semente"
function configurarOngSementeObserver() {
    const ongSementeSection = document.querySelector('#ong_semente');
    if (ongSementeSection) {
        const primeiraMensagem = ongSementeSection.querySelector('.primeira-mensagem');
        const segundaMensagem = ongSementeSection.querySelector('.segunda-mensagem');
        const terceiraMensagem = ongSementeSection.querySelector('.terceira-mensagem');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    primeiraMensagem.classList.add('aparecer');
                    segundaMensagem.classList.add('aparecer');
                    terceiraMensagem.classList.add('aparecer');
                    observer.disconnect(); // Desconecta o observer após iniciar as animações
                }
            });
        }, { threshold: 0.5 });

        observer.observe(ongSementeSection);
    }
}

// Função para o slide de atividades
function configurarSlidesAtividades() {
    let slideIndex = 0;
    const slides = document.getElementsByClassName("slides");

    function showSlides() {
        for (let i = 0; i < slides.length; i++) {
            slides[i].classList.remove("active");
        }
        slideIndex++;
        if (slideIndex > slides.length) {
            slideIndex = 1;
        }
        slides[slideIndex - 1].classList.add("active");
        setTimeout(showSlides, 3000);
    }

    function plusSlides(n) {
        slideIndex += n;
        if (slideIndex > slides.length) {slideIndex = 1}
        if (slideIndex < 1) {slideIndex = slides.length}
        for (let i = 0; i < slides.length; i++) {
            slides[i].classList.remove("active");
        }
        slides[slideIndex - 1].classList.add("active");
    }

    document.querySelector('.prev').addEventListener('click', function() {
        plusSlides(-1);
    });

    document.querySelector('.next').addEventListener('click', function() {
        plusSlides(1);
    });

    showSlides(); // Inicia o slideshow
}

// Função para configurar a animação da seção de doações
function configurarAnimacaoDoacoes() {
    const frase = "É simples, doe alimentos ricos em nutrientes: arroz (2kgs) e feijão (1kg) *com validade acima de 6 meses*";
    const fraseElemento = document.querySelector('.frase-animada');
    const imagemArroz = document.querySelector('.imagem-arroz');
    const imagemFeijao = document.querySelector('.imagem-feijao');
    let index = 0;

    function escreverFrase() {
        if (index < frase.length) {
            fraseElemento.innerHTML += frase.charAt(index);
            index++;
            setTimeout(escreverFrase, 50); // 50ms entre cada letra para uma escrita mais fluida
        } else {
            // Exibe as imagens em sequência com pequenos intervalos
            setTimeout(() => imagemArroz.classList.add('mostrar'), 500);
            setTimeout(() => imagemFeijao.classList.add('mostrar'), 1000);
        }
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                escreverFrase();
                observer.disconnect(); // Para a observação após a animação começar
            }
        });
    }, { threshold: 0.5 });

    observer.observe(document.querySelector('.doacoes'));
}

// Função para animar seção ponto_coleta
function configurarAnimacaoPontoColeta() {
    const frase = "No pátio principal em frente à área de alimentação da Universidade Salesiana de São Paulo em Campinas, obrigado por ajudar a cultivar a solidariedade em nossa sociedade.";
    const fraseElemento = document.querySelector('.ponto_coleta .frase-animada');
    
    if (!fraseElemento) {
        console.error('Elemento .frase-animada não encontrado.');
        return;
    }

    let index = 0;

    function escreverFrasePontoColeta() {
        console.log('Função escreverFrasePontoColeta chamada');  // Adicionado para debug
        if (index < frase.length) {
            fraseElemento.innerHTML += frase.charAt(index);
            index++;
            setTimeout(escreverFrasePontoColeta, 50);
        } else {
            // Exibir a frase completamente
            fraseElemento.classList.add('mostrar');
        }
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                console.log('Elemento visível, iniciando animação');  // Adicionado para debug
                escreverFrasePontoColeta();
                document.querySelector('.ponto_coleta iframe').classList.add('mostrar');
                observer.disconnect(); // Para a observação após a animação começar
            }
        });
    }, { threshold: 0.5 });

    observer.observe(document.querySelector('.ponto_coleta'));
}

// Função para copiar o texto do botão para a área de transferência
function copiarParaAreaDeTransferencia() {
    const textoParaCopiar = document.getElementById('copiarPix').innerText;
    navigator.clipboard.writeText(textoParaCopiar).then(() => {
        alert("Texto copiado para a área de transferência!");
    });
}

// Função para configurar a animação da seção "vaquinha"
function configurarAnimacaoVaquinha() {
    const frasePix = "Doe via Pix para contribuir para a aquisição de um novo forno duplo elétrico para a instituição Semente Esperança *copie a chave-pix ao clicar no botão abaixo*";
    const fraseElemento = document.querySelector('.vaquinha .frase-animada');
    let index = 0;

    function escreverFrasePix() {
        if (index < frasePix.length) {
            fraseElemento.innerHTML += frasePix.charAt(index);
            index++;
            setTimeout(escreverFrasePix, 50); 
        }
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                escreverFrasePix();
                observer.disconnect();
            }
        });
    }, { threshold: 0.5 });

    observer.observe(document.querySelector('.vaquinha'));
}

// Função para lidar com a doação e atualizar a barra de progresso
function configurarBotoesDoacao() {
    const donationButtons = document.querySelectorAll('.donation-btn');
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    let totalAmount = 0;
    const goalAmount = 4000;

    // Verificação básica para garantir que os botões foram encontrados
    if (donationButtons.length === 0) {
        console.error('Nenhum botão de doação encontrado.');
        return; // Interrompe a execução se não houver botões
    } else {
        console.log('Botões de doação encontrados:', donationButtons.length);
    }

    donationButtons.forEach(button => {
        button.addEventListener('click', function() {
            const donationValue = parseInt(this.getAttribute('data-value'));

            // Verifique se o valor da doação está sendo capturado corretamente
            console.log('Valor da doação:', donationValue);

            const userConfirmed = confirm(`Você confirma que fez a doação de R$ ${donationValue}?`);

            if (userConfirmed) {
                totalAmount += donationValue;
                const progressPercentage = (totalAmount / goalAmount) * 100;

                progressBar.style.width = progressPercentage + '%';
                progressText.textContent = `Total arrecadado: R$ ${totalAmount} de R$ 4000`;

                if (totalAmount >= goalAmount) {
                    alert('Parabéns! O valor total foi arrecadado.');
                }
            }
        });
    });
}

// Função para iniciar o cronômetro regressivo
function iniciarContagemRegressiva() {
    // Defina a data de término da campanha (31 de outubro de 2024, 23:59:59)
    const dataFimCampanha = new Date('October 31, 2024 23:59:59').getTime();

    // Atualiza o cronômetro a cada segundo
    const intervalo = setInterval(() => {
        const agora = new Date().getTime();
        const distancia = dataFimCampanha - agora;

        // Cálculo dos dias, horas, minutos e segundos restantes
        const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
        const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((distancia % (1000 * 60)) / 1000);

        // Exibe a contagem regressiva no elemento com id "countdown"
        document.getElementById('countdown').innerHTML = `<b>${dias} dias ${horas} horas ${minutos} minutos ${segundos}s restantes para o término da campanha...</b>`;

        // Se a contagem regressiva terminar, exibe uma mensagem
        if (distancia < 0) {
            clearInterval(intervalo);
            document.getElementById('countdown').innerHTML = "<b>Campanha encerrada! Obrigado por sua participação.</b>";
        }
    }, 1000);
}

// Função executada quando a página é carregada
window.onload = function() {
    carregarSection('sections/doe_simples/doe_simples.html', 'sections/doe_simples/doe_simples.css', 'doe_simples', configurarDoeSimplesObserver);
    carregarSection('sections/ong_semente/ong_semente.html', 'sections/ong_semente/ong_semente.css', 'ong_semente', configurarOngSementeObserver);
    carregarSection('sections/atividades/atividades.html', 'sections/atividades/atividades.css', 'atividades', configurarSlidesAtividades);
    carregarSection('sections/doacoes/doacoes.html', 'sections/doacoes/doacoes.css', 'doacoes', configurarAnimacaoDoacoes);
    carregarSection('sections/ponto_de_coleta/ponto_de_coleta.html', 'sections/ponto_de_coleta/ponto_de_coleta.css', 'ponto_coleta', configurarAnimacaoPontoColeta);
    carregarSection('sections/vaquinha/vaquinha.html', 'sections/vaquinha/vaquinha.css', 'vaquinha', function() {
        configurarAnimacaoVaquinha();
        configurarBotoesDoacao(); // Configurar os botões de doação após a section "vaquinha" ser carregada
    });
    carregarSection('sections/resultados/resultados.html', 'sections/resultados/resultados.css', 'resultados', iniciarContagemRegressiva);
};

// Função para alterar o tamanho do header ao rolar a página
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    const carousel = document.querySelector('#carousel');
    if (carousel) {
        const carouselMiddle = carousel.offsetTop + (carousel.offsetHeight / 2);
        if (window.scrollY >= carouselMiddle) {
            header.classList.add('reduzido');
        } else {
            header.classList.remove('reduzido');
        }
    }
});
