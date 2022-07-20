import KEY_NAMES from './keyNames';

function normalizeCategories(data) {
  const { name } = KEY_NAMES.category;
  return data.map(({ [name]: category }) => (category));
}

function normalizeTags(data) {
  const name = KEY_NAMES.tags;
  if (!data[name]) return [];
  const tags = data[name].split(',');
  return tags.filter((tag) => tag !== '');
}

function normalizeIngredients(data) {
  const { ingredient, measure } = KEY_NAMES;
  const getMeasureKey = (ingredientKey) => (
    `${measure}${ingredientKey.slice(ingredient.length)}`);
  return Object.keys(data).reduce((arr, key) => (
    (key.includes(ingredient) && data[key] !== '' && data[key] !== null
      ? [...arr, { ingredient: data[key], measure: data[getMeasureKey(key)] }]
      : arr
    )), []);
}

function normalizeSingleRecipe(recipe, isFood) {
  const output = { ...recipe };
  const keyNames = isFood ? KEY_NAMES.food : KEY_NAMES.drink;
  Object.entries(keyNames).forEach(([key, value]) => {
    if (key !== 'list') output[key] = recipe[value];
  });
  output.ingredients = normalizeIngredients(output);
  output.tags = normalizeTags(output);
  return output;
}

function normalizeListOfRecipes(recipes, isFood) {
  return recipes.map((recipe) => (normalizeSingleRecipe(recipe, isFood)));
}

const normalizeData = (data, options = {}) => {
  const { max } = options;
  const isFood = !!(data.meals);
  const recipe = isFood ? KEY_NAMES.food : KEY_NAMES.drink;
  const { list } = recipe;
  const target = data[list];
  const output = target[0].strMeal || target[0].strDrink
    ? normalizeListOfRecipes(target, isFood)
    : normalizeCategories(target);
  return max ? output.slice(0, max) : output;
};

export default normalizeData;
