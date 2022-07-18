const foodsApi = async (type, value) => {
  let url;
  switch (type) {
  case 'Ingredient':
    url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${value}`;
    break;
  case 'Name':
    url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`;
    break;
  case 'FirstLetter':
    url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${value}`;
    break;
  default:
    return;
  }
  try {
    const response = await fetch(url);
    const data = await response.json();
    // console.log(data);
    return data;
  } catch (error) {
    console.log(`Algo deu errado ao fazer o fetch da API :( \n${error}`);
  }
};

export default foodsApi;
