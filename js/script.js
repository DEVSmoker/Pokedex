const pokemonNome = document.querySelector('.pokemon__nome');
const pokemonNumero = document.querySelector('.pokemon__numero');
const pokemonImagem = document.querySelector('.pokemon__imagem');
const form = document.querySelector('.form');
const input = document.querySelector('.input-search');
const buttonPrev = document.querySelector('.btn-prev')
const buttonNext = document.querySelector('.btn-next')

let currentPokemonId = 1; // ID do pokemon atual 
const totalPokemon = 300; // Total de pokemons 

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIResponse.status === 200) {
        const data = await APIResponse.json();
        return data;
    }
}

const renderPokemon = async (pokemon) => {

    const loadingText = 'Carregando...';
    const animatedText = loadingText
        .split('')
        .map((letter, index) => `<span class="letter" style="animation-delay: ${index * 0.1}s">${letter}</span>`)
        .join('');

    pokemonNome.innerHTML = `<div class="loading">${animatedText}</div>`;

    pokemonNumero.innerHTML = '';

    const data = await fetchPokemon(pokemon);

    if (data) {
        pokemonNome.innerHTML = data.name;
        pokemonNumero.innerHTML = data.id;
        pokemonImagem.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        input.value = '';
    } else {
        pokemonImagem.style.display = 'none';
        pokemonNome.innerHTML = 'Não localizado';
        pokemonNumero.innerHTML = '';
    }

}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());

})

buttonPrev.addEventListener('click', () => {
    if (currentPokemonId > 1) {
        currentPokemonId -= 1
        renderPokemon(currentPokemonId);
    }

});
buttonNext.addEventListener('click', () => {
    currentPokemonId += 1;
    renderPokemon(currentPokemonId);
})

renderPokemon(currentPokemonId);