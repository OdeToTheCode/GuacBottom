

$(function(){
  let recipeDataArray = JSON.parse(localStorage.getItem("recipeDataArray")) || []
  let importedRecipe = 'https://mycookbook-io1.p.rapidapi.com/recipes/rapidapi'
  let recipeUrl = '';
  let recipeKey = '';

  const options = { //recipe import
    method: 'POST',
    headers: {
      'content-type': 'text/plain',
      'X-RapidAPI-Key': '9987ab57famsh4b33ddf26f77c6bp1af32bjsnc0a5287ef750',
      'X-RapidAPI-Host': 'mycookbook-io1.p.rapidapi.com'
    },
    body: ''
  };

// recipeButtonFun()


// getApi()
  function getApi() {
    fetch(importedRecipe, options)
      .then(response =>{return response.json();})
      .then(function(data){
     
        console.log(recipeUrl)
        const recipeObject = {
          name:data[0].name,
          // image:data[0].image[0],
          ingredients:data[0].ingredients,
          instructions:data[0].instructions[0].steps,
          yield:data[0].yield
        }
        // console.log(recipeObject)
        recipeDataArray.push(recipeObject)
        let stringed = JSON.stringify(recipeDataArray)
        localStorage.setItem("recipeDataArray", stringed)
        recipeButtonFun(recipeObject)
      })
  }

  // function recipeButtonFun(data){
  //   // console.log(data.name)
  //   let newButton = $('<button>').text(data.name).addClass('btn', 'btn-primary', 'recipe')
  //   console.log(newButton[0].textContent)
  //   let key = newButton[0].textContent
  //   console.log(key)
  //   $('#buttonContainer').append(newButton)
  // }
  function recipeButtonFun(){
   for (let index = 0; index < recipeDataArray.length; index++) {
    // console.log(index)
    let Key = recipeDataArray[index].name
    recipeKey = recipeDataArray[index]
    // console.log(key)
    let newButton = $('<button>').text(Key).addClass('btn', 'btn-primary', 'recipe').attr('id', recipe[index])
    console.log(newButton[0].textContent)
    $('#buttonContainer').append(newButton)
   } 
  }



  $("#buttonContainer").on('click', function(e){
    console.log()

    renderContent(recipeDataArray[0])
  })


  function renderContent (recipe){
    console.log(recipe)
    $('.modal-title').text('')
    $('.accordion-body-ingredients').empty()
    $('.accordion-body-directions').empty()
    // console.log(recipeDataArray)
    $('.modal-title').text(recipe.name)

      recipe.ingredients.forEach(recipeItem =>{
        $('.accordion-body-ingredients')
          .append($('<li>')
            .text(recipeItem))
            getNutrients(recipeItem)

      })
      recipe.instructions.forEach(step=>{
        $('.accordion-body-directions')
          .append($("<li>")
            .text(step))
      })
            
  }
  
  

//if we give each button a increasing data-set equal to the index position of that item in the array we can use 
//recipeArrayData[$('this').dataset]


// ================================get nutrients=======================================

const nu_options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '9987ab57famsh4b33ddf26f77c6bp1af32bjsnc0a5287ef750',
		'X-RapidAPI-Host': 'edamam-food-and-grocery-database.p.rapidapi.com'
	}
};


function getNutrients(ingredient){
  let keyword = ingredient
  let nutrientsFetch = `https://edamam-food-and-grocery-database.p.rapidapi.com/parser?ingr=${keyword}`
  fetch(nutrientsFetch, nu_options)
	.then(response => response.json())
	.then(response => {
    // console.log(response)
    let nu = response.parsed[0].food.nutrients
    $('.accordion-body-nutrients').append($('<li>').text(nu))
    // console.log(nu)
  })
	.catch(err => console.error(err));}


  $('#url-import-button').on('click', function(){
    options.body = $('#url-import').val()
    recipeUrl = $('#url-import').val()
    // console.log(options.body)
    getApi()
    
     })
  


  })




  /*Goals for 1/12/23:
  - recipe and put it in array
  - set to local stroge
  - get from local storage
  - take recipe array put into html dom elements
  - get to display on page
  */
/* Goals revisited:
- decide if the nutrients should be fetched when the recipe is imported
*/