

$(function(){
  let recipeDataArray = JSON.parse(localStorage.getItem("recipeDataArray")) || []
  let importedRecipe = 'https://mycookbook-io1.p.rapidapi.com/recipes/rapidapi'

  const options = {
    method: 'POST',
    headers: {
      'content-type': 'text/plain',
      'X-RapidAPI-Key': '9987ab57famsh4b33ddf26f77c6bp1af32bjsnc0a5287ef750',
      'X-RapidAPI-Host': 'mycookbook-io1.p.rapidapi.com'
    },
    body: ''
  };




// getApi()
  function getApi() {
    fetch(importedRecipe, options)
      .then(response =>{return response.json();})
      .then(function(data){
        console.log(data)
        const recipeObject = {
          name:data[0].name,
          // image:data[0].image,
          ingredients:data[0].ingredients,
          instructions:data[0].instructions[0].steps,
          yield:data[0].yield
        }
        console.log(recipeObject)
        recipeDataArray.push(recipeObject)
        let stringed = JSON.stringify(recipeDataArray)
        localStorage.setItem("recipeDataArray", stringed)
      
      })
  }

  // function renderRecipe (){
  //   recipeDataArray.forEach(recipe =>{
  //     const card = $('<div>').addClass('card')
  //     $(card)
  //       .append($('<h5>')
  //         .text(recipe.name))
  //     recipe.ingredients.forEach(recipeItem =>{
  //       $(card)
  //         .append($('<li>')
  //           .text(recipeItem))
  //     })
  //     recipe.instructions.forEach(step=>{
  //       $(card)
  //         .append($("<li>")
  //           .text(step))
  //     })
  //     $('.card-container')
  //       .append(card)
            
  // })}


  $(".recipe").on('click', function(){
    renderContent(recipeDataArray[0])
  })
  function renderContent (recipe){
    $('.modal-title').text('')
    $('.accordion-body-ingredients').empty()
    $('.accordion-body-directions').empty()
    console.log(recipeDataArray)
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
    console.log(response)
    let nu = response.parsed[0].food.nutrients
    $('.accordion-body-nutrients').append($('<li>').text(nu))
    console.log(nu)
  })
	.catch(err => console.error(err));}






  $('#url-import-button').on('click', function(){
    options.body = $('#url-import').val()
    console.log(options.body)
    getApi()
    
     })
  
// let recipeCard = $('<div class="card" style="width: 18rem;">')
//      let cardBody = $('<div class="card-body">')
//         let cardTitle = $('<h5 class="card-title" id="recipeName">Recipe Name</h5>')

     
// // ===============================================================accordion===============================
//     let accordion = $('<div class="accordion" id="accordion-body">')
//       let ingredients = $('<div class="accordion-item">')
        
//         let accordionHeader = $('<h2 class="accordion-header headingOne" id="panelsStayOpen-headingOne">')
//           let accordionBtn1 = $('<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="false" aria-controls="panelsStayOpen-collapseOne">')
//               //could we use $(this) for id and targeting to prevent multi targeting
//         let panelsStayOpen = $('<div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingOne">')
//           let panelBody = $('<div class="accordion-body">')
//       let directions = $('<div class="accordion-item">')
// panelsStayOpen.append($(panelBody.text('suck it trebeck')))
// console.log(panelsStayOpen)
// accordionHeader.append($(accordionBtn1).text('Ingredients'))
// ingredients.append(accordionHeader)
// ingredients.append(panelsStayOpen)
// accordion.append(ingredients)
// accordionHeader.append($(accordionBtn).text('Directions'))
// directions.append(accordionHeader)
// directions.append(panelsStayOpen)
// accordion.append(directions)
// // console.log($(accordionItem).children())
// $(cardBody).append(cardTitle).append(accordion)
// recipeCard.append(cardBody)
// $('.card-container').append(recipeCard)


// let recipeCard =  
//                   $(card)
//                     .append(img)
//                     .append(cardTitle)
//                     .append((cardBody)
//                       .append((mainList)
//                         .append(mainListItems)))








// console.log(card)
// console.log(img)
// console.log(cardBody)
// console.log(cardTitle)
// console.log(accordion)
// console.log(accordionItem)
// console.log(accordionHeader)
// console.log(accordionBtn)
// console.log(accordionBody)


  
// $('main')
//   .append(card
//     .append($('<img>')
//       .attr('src', '')
//       .addClass('card-img-top')
//     )
//     .append(
//       (
//         $('<div>')
    //       .addClass('card-body'))
    //         .append($('<h5>')
    //           .addClass('card-title')
    //           .text('recipe name here')
    //           )
//         .append(($('<div>')
//           .addClass('accordion')
//           .attr('id', 'accordion-body')
//             .append($('<div>')
//             .addClass('accordion-item')
//               .append($('<h2>')
//                 .addClass('accordion-header', 'headingOne')
//                 .attr('id', 'panelsStayOpen-headingOne')
//                   .append(  $('<button>')
//                     .addClass('accordion-button', 'collapsed')
//                     .attr({
//                       'type': 'button',
//                       'data-bs-toggle': 'collapse',
//                       'data-bs-target': '#panelsStayOpen-collapseOne',
//                       'aria-expanded': 'false',
//                       'aria-controls':'panelsStayOpen-collapseOne',})
//                   )
//               .append
//                 (($('<div>')
//                   .addClass('accordion-collapse', 'collapse')
//                   .attr({
//                     'aria-labelled': 'panelsStayOpen-headingOne',
//                     'id': 'panelsStayOpen-collapse'})
                
//                     )).append($('<div>').addClass('accordion-body')))
//             )
//         ))
//       )
//   )
      





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