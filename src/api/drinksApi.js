const drinksApi = async (type, value) => {
  let url;
  switch (type) {
  case 'Ingredient':
    url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${value}`;
    break;
  case 'Name':
    url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${value}`;
    break;
  case 'FirstLetter':
    url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${value}`;
    break;
  default:
    url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  }
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(`Algo deu errado ao fazer o fetch da API :( \n${error}`);
  }
};

export default drinksApi;
