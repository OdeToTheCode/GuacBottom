

$(function(){
  let recipeDataArray = JSON.parse(localStorage.getItem("recipeDataArray")) || []
  let importedRecipe = 'https://mycookbook-io1.p.rapidapi.com/recipes/rapidapi'
let card = $('<div>').addClass('card')

let img = $('<img>').attr('src', '').addClass('card-img-top')
let cardTitle = $('<h5>').addClass('card-title').text('recipe name here')
let cardBody = $('<div>').addClass('card-body')
let mainList = $('<ul>').addClass('mainUl')
let mainListItems = $('<li>').addClass('mainListItems')//this is where each array item will be

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
    renderRecipe()
  function renderRecipe (){
    recipeDataArray.forEach(recipe =>{
      const card = $('<div>').addClass('card')
      $(card)
        .append($('<h5>')
          .text(recipe.name))
      recipe.ingredients.forEach(recipeItem =>{
        $(card)
          .append($('<li>')
            .text(recipeItem))
      })
      recipe.instructions.forEach(step=>{
        $(card)
          .append($("<li>")
            .text(step))
      })
      $('.card-container')
        .append(card)
            
  })}
  
  


  $('#url-import-button').on('click', function(){
    options.body = $('#url-import').val()
    console.log(options.body)
    getApi()
    
     })
  

     




// $(mainListItems).text("this fuckin thing")
// let recipeCard =  
//                   $(card)
//                     .append(img)
//                     .append(cardTitle)
//                     .append((cardBody)
//                       .append((mainList)
//                         .append(mainListItems)))
// $('body').append(recipeCard)







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
//                     'aria-labelledby': 'panelsStayOpen-headingOne',
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
