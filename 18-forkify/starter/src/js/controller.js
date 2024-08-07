import * as model from './model.js';
import recipeView from './view/recipeView.js';

import 'core-js/stable';

const recipeContainer = document.querySelector('.recipe');

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;

    recipeView.renderSpinner();

    //1- Loading recipe
    await model.loadRecipe(id);

    //2- Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    console.log(err);
    //alert(err);
  }
};

['hashchange', 'load'].forEach(ev =>
  window.addEventListener(ev, controlRecipes)
);
