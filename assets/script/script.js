$(function(){



  const options = {
    method: 'POST',
    headers: {
      'content-type': 'text/plain',
      'X-RapidAPI-Key': '9987ab57famsh4b33ddf26f77c6bp1af32bjsnc0a5287ef750',
      'X-RapidAPI-Host': 'mycookbook-io1.p.rapidapi.com'
    },
    body: 'https://www.delish.com/cooking/recipe-ideas/recipes/a45382/avocado-egg-boats-recipe/'
  };
  let importedRecipe = 'https://mycookbook-io1.p.rapidapi.com/recipes/rapidapi'



getApi()
  function getApi() {
    fetch(importedRecipe, options)
      .then(function(response){
      return response.json();
      })
      .then(function(data){
      const r_name = data[0].name
      const r_image = data[0].image[1]
      const r_ingredients = data[0].ingredients
      const r_instructions = data[0].instructions;
      const r_yield =  data[0].yield
      const recipeObject = {
      name:r_name,
      image:r_image,
      ingredients:r_ingredients,
      instructions:r_instructions,
      yield:r_yield
     
      }
    console.log(recipeObject)
  
  })
    }
  })
