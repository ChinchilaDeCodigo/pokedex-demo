const pokemonName = document.querySelector('.pokemon_name');

const pokemonNumber = document.querySelector('.pokemon_number');

const pokemonImage = document.querySelector('.pokemon_image');

const pokemonType = document.querySelector('.pokemon_type');

const form = document.querySelector('.form');

const txtAbility = document.querySelector('.txtAbility');

const inputForm = document.querySelector('.input_search');

const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');


let searchPokemon = 1;

let txtAbilityName = "Habilidade: ";
let txtAbilityEffect = "Efeito: ";


const fetchPokemon = async (pokemon) => {
    
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if(APIResponse.status === 200){
        const data = await APIResponse.json();
        return data;
    }
    
}

const fetchAbility = async(url) => {
    const APIResponse = await fetch(`${url}`);

    if(APIResponse.status === 200){
        const ability = await APIResponse.json();
        return ability;
    }
}

const renderPokemon = async (pokemon) => {

    pokemonNumber.innerHTML = '';
    pokemonName.innerHTML = 'Carregando...';

    const data = await fetchPokemon(pokemon);

    if(data){
        const ability = await fetchAbility(data['abilities']['0']['ability']['url']);
        pokemonImage.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        inputForm.value = '';
        txtAbilityName = "Habilidade: ";
        txtAbilityEffect = "Efeito: ";
        txtAbility.value = '';
        searchPokemon = data.id; 

        //Áudio do pokémon
        var audioName = `./ogg/cries/${searchPokemon}.ogg`;
        let audio = new Audio(audioName);
        audio.volume = 0.2;
        audio.play();


        //Passiva do pokémon
        let abilityName = data['abilities']['0']['ability']['name'];
        let abilityNameCap = abilityName.charAt(0).toUpperCase() + abilityName.slice(1);
        txtAbilityName = txtAbilityName + abilityNameCap;
        txtAbilityEffect = txtAbilityEffect + ability['effect_entries']['1']['short_effect'];
        txtAbility.value = txtAbilityName + '\n' + txtAbilityEffect;

        txtAbility.style.height = 'auto';
        var newHeight = (txtAbility.scrollHeight > 32 ? txtAbility.scrollHeight : 32);
        txtAbility.style.height = newHeight.toString() + 'px';


        //Tipo do pokémon
        let type = data['types']['0']['type']['name'];
        switch(type){
            case 'electric':
                pokemonType.innerHTML = "Elétrico";
                pokemonType.style.backgroundColor = "#F8D030";
                break;
            case 'normal':
                pokemonType.innerHTML = "Normal";
                pokemonType.style.backgroundColor = "#A8A878";
                break;
            case 'fighting':
                pokemonType.innerHTML = "Lutador";
                pokemonType.style.backgroundColor = "#C03028";
                break;
            case 'flying':
                pokemonType.innerHTML = "Voador";
                pokemonType.style.backgroundColor = "#A890F0";
                break;
            case 'poison':
                pokemonType.innerHTML = "Veneno";
                pokemonType.style.backgroundColor = "#A040A0";
                break;
            case 'ground':
                pokemonType.innerHTML = "Terrestre";
                pokemonType.style.backgroundColor = "#E0C068";
                break;
            case 'electric':
                pokemonType.innerHTML = "Elétrico";
                pokemonType.style.backgroundColor = "#F8D030";
                break;
            case 'rock':
                pokemonType.innerHTML = "Pedra";
                pokemonType.style.backgroundColor = "#B8A038";
                break;
            case 'bug':
                pokemonType.innerHTML = "Inseto";
                pokemonType.style.backgroundColor = "#A8B820";
                break;
            case 'ghost':
                pokemonType.innerHTML = "Fantasma";
                pokemonType.style.backgroundColor = "#705898";
                break;
            case 'steel':
                pokemonType.innerHTML = "Aço";
                pokemonType.style.backgroundColor = "#B8B8D0";
                break;
            case 'fire':
                pokemonType.innerHTML = "Fogo";
                pokemonType.style.backgroundColor = "#F08030";
                break;
            case 'electric':
                pokemonType.innerHTML = "Elétrico";
                pokemonType.style.backgroundColor = "#F8D030";
                break;
            case 'water':
                pokemonType.innerHTML = "Água";
                pokemonType.style.backgroundColor = "#6890F0";
                break;
            case 'grass':
                pokemonType.innerHTML = "Planta";
                pokemonType.style.backgroundColor = "#78C850";
                break;
            case 'psychic':
                pokemonType.innerHTML = "Psíquico";
                pokemonType.style.backgroundColor = "#F85888";
                break;
            case 'ice':
                pokemonType.innerHTML = "Gelo";
                pokemonType.style.backgroundColor = "#98D8D8";
                break;
            case 'dragon':
                pokemonType.innerHTML = "Dragão";
                pokemonType.style.backgroundColor = "#7038F8";
                break;
            case 'dark':
                pokemonType.innerHTML = "Sombrio";
                pokemonType.style.backgroundColor = "#705848";
                break;
            case 'fairy':
                pokemonType.innerHTML = "Fada";
                pokemonType.style.backgroundColor = "#EE99AC";
                break;
            default:
                pokemonType.innerHTML = "???";
                pokemonType.style.backgroundColor = "#68A090";
                break;    
        }
    }else{
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'Não encontrado';
        pokemonNumber.innerHTML = '';
    }

    
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(inputForm.value.toLowerCase());

});

buttonPrev.addEventListener('click', () => {
    if(searchPokemon > 1){
        searchPokemon--;
        renderPokemon(searchPokemon);
    }
});

buttonNext.addEventListener('click', () => {
    searchPokemon++;
    renderPokemon(searchPokemon);
});

const generateRandomInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/* txtAbility.addEventListener('change', function(e){
    e.target.style.height = 'auto';
    var newHeight = (e.target.scrollHeight > 32 ? e.target.scrollHeight : 32);
    e.target.style.height = newHeight.toString() + 'px';
}); */

const randomId = generateRandomInteger(1, 649);
renderPokemon(randomId);