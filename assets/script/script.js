

$(function(){
  let recipeDataArray = JSON.parse(localStorage.getItem("recipeDataArray")) || []


  const options = {
    method: 'POST',
    headers: {
      'content-type': 'text/plain',
      'X-RapidAPI-Key': '9987ab57famsh4b33ddf26f77c6bp1af32bjsnc0a5287ef750',
      'X-RapidAPI-Host': 'mycookbook-io1.p.rapidapi.com'
    },
    body: ''
  };
  let importedRecipe = 'https://mycookbook-io1.p.rapidapi.com/recipes/rapidapi'


 $('#thisfuckingthing').on('click', function(){
// console.log($('#url-import').val())
options.body = $('#url-import').val()
console.log(options.body)
getApi()

 })

// getApi()
  function getApi() {
    fetch(importedRecipe, options)

      .then(function(response){
      return response.json();
      })
      .then(function(data){
      const r_name = data[0].name
      // const r_image = data[0].image[1]
      const r_ingredients = data[0].ingredients
      const r_instructions = data[0].instructions[0].steps; //made a change here
      const r_yield =  data[0].yield
      console.log(data)
      const recipeObject = {
      name:r_name,
      // image:r_image,
      ingredients:r_ingredients,
      instructions:r_instructions,
      yield:r_yield

      }
      recipeDataArray.push(recipeObject)
      let stringed = JSON.stringify(recipeDataArray)
      localStorage.setItem("recipeDataArray", stringed)

    })
    }
    renderRecipe()
  function renderRecipe (){
  recipeDataArray.forEach(recipe =>{
    // console.log(recipe)
    let recipeName = $('<h5>').text(recipe.name)
    $('body').append(recipeName)

  recipe.ingredients.forEach(recipeItem =>{
      // console.log(recipeItem)
      let ingredientLi = $('<li>').text(recipeItem)
      $('body').append(ingredientLi)
    })
    recipe.instructions.forEach(step=>{
      let instructionStep = $("<li>").text(step)
      $('body').append(instructionStep)
    })
  })}
  
  



  
  })




  /*Goals for 1/12/23:
  - recipe and put it in array
  - set to local stroge
  - get from local storage
  - take recipe array put into html dom elements
  - get to display on page
  */
