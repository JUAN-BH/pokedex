/* eslint linebreak-style: ["off", "unix"] */
/* eslint quotes: ["off", "double"] */
const colors = [
  { type: 'normal', typeColor: '#a8a878', backColor: '#F5F5F5' },
  { type: 'fire', typeColor: '#f08030', backColor: '#FDDFDF' },
  { type: 'water', typeColor: '#6890ef', backColor: '#DEF3FD' },
  { type: 'grass', typeColor: '#78c850', backColor: '#DEFDE0' },
  { type: 'electric', typeColor: '#f8d030', backColor: '#FCF7DE' },
  { type: 'ice', typeColor: '#98d8d8', backColor: '#cce4e4' },
  { type: 'fighting', typeColor: '#bf3129', backColor: '#E6E0D4' },
  { type: 'poison', typeColor: '#a0409f', backColor: '#98D7A5' },
  { type: 'ground', typeColor: '#dfbe68', backColor: '#F4E7DA' },
  { type: 'flying', typeColor: '#a890f0', backColor: '#F5F5F5' },
  { type: 'psychic', typeColor: '#f85888', backColor: '#EAEDA1' },
  { type: 'bug', typeColor: '#a8b820', backColor: '#F8D5A3' },
  { type: 'rock', typeColor: '#b8a038', backColor: '#D5D5D4' },
  { type: 'ghost', typeColor: '#705898', backColor: '#9790a3' },
  { type: 'dark', typeColor: '#705848', backColor: '#807873' },
  { type: 'dragon', typeColor: '#7038f8', backColor: '#97B3E6' },
  { type: 'steel', typeColor: '#b8b8d0', backColor: '#cbcbd4' },
  { type: 'fairy', typeColor: '#f0b6bc', backColor: '#FCEAFF' },
];

function getPokeColors(pokemonType) {
  const pokeColors = colors.find((color) => color.type === pokemonType);
  return pokeColors;
}

export default getPokeColors;
