// js for gif-Fruity app

// declare variables
var topics = ["pumpkin", "cherry"];
var fruitGifsArea = document.getElementById("fruitGifsArea");


// create space for fruit gifs to populate

// function to generate buttons from fruits array
function populateButtonList() {
    // clear our button html area since it's about to get updated and rewritten
    document.getElementById("buttonList").innerHTML = "";

    for (let fruit of topics) {
        // create a button for each fruit listed in our array
        var addedFruit = document.createElement("button");
        // add a class of "fruit" to the element for future use/styling
        addedFruit.classList.add("fruit");
        // add a data attribute of "fruit" to the element for future use/styling
        addedFruit.setAttribute("data-name", fruit);
        // update each button text to display the corresponding
        addedFruit.textContent = fruit;
        // update our html with our buttons
        document.getElementById("buttonList").appendChild(addedFruit);
    }
}

// instructions following click event for fruit gif generation buttons
function serveUpFruityGifs(event) {
    if (event.target.classList.contains("fruit")) {
        // do i have to use "this"? it seems to work with event.target instead >_>
        var getFruitGifs = event.target.dataset.name.replace(' ', '+');
        // test whether the API escapes the query for me
        //var getFruitGifs = event.target.dataset.name;

        console.log(getFruitGifs);
        // clear the gifs section (clear out previously shown gifs)
        fruitGifsArea.innerHTML = "";

        // request gifs from giphy using the fruit name as the query
        var queryURL = `https://api.giphy.com/v1/gifs/search?q=${getFruitGifs}&api_key=fdYHoYcYVDFUlKAY767cni3noXeN0Kkd&limit=10`;

        // make AJAX GET request using fetch / XHR

        // if fetch is supported
        if (window.fetch) {
            fetch(queryURL, {
                method: "GET"
            })
                .then(function(response) {
                    return response.json();
                })
                .then(function(response){
                    // store an array of results from the data
                    var results = response.data;

                    for (let item of results) {
                        // limiting gif ratings to G and PG
                        if (item.rating == "g" || item.rating == "pg") {

                            // create an inline element that will hold the gif image & its rating
                            var gifSpan = document.createElement("span");
                            gifSpan.classList.add("d-inline-block");

                            // create an element for the rating, store the rating data, and display it
                            var ratingText = document.createElement("p");
                            var rating = item.rating;
                            ratingText.textContent = `Rating: ${rating}`

                            // create an img tag for the gif image
                            var fruitGif = document.createElement("img");
                            fruitGif.setAttribute("src", item.images.fixed_height_still.url);
                            fruitGif.setAttribute("alt", "fruit gif");

                            // add the elements into the span
                            gifSpan.appendChild(fruitGif);
                            gifSpan.appendChild(ratingText);


                            fruitGifsArea.insertBefore(gifSpan, fruitGifsArea.firstChild);
                        }
                    }


                });
        // if fetch isn't supported, use XHR
        } else {
            const xhr = new XMLHttpRequest();

            xhr.open("GET", queryURL);

            xhr.onload = event => {

                if (xhr.readyState === 4) {

                    if (xhr.status === 200) {
                        let response = JSON.parse(xhr.responseText);

                        var results = response.data;
                        
                        // turn this loop into a function later?
                        for (let item of results) {
                            // limiting gif ratings to G and PG
                            if (item.rating == "g" || item.rating == "pg") {
    
                                // create an inline element that will hold the gif image & its rating
                                var gifSpan = document.createElement("span");
                                gifSpan.classList.add("d-inline-block");
    
                                // create an element for the rating, store the rating data, and display it
                                var ratingText = document.createElement("p");
                                var rating = item.rating;
                                ratingText.textContent = `Rating: ${rating}`
    
                                // create an img tag for the gif image & set its attributes so it can be animated
                                var fruitGif = document.createElement("img");
                                fruitGif.setAttribute("src", item.images.fixed_height_still.url);
                                fruitGif.setAttribute("alt", "fruit gif");
    
                                // add the elements into the span
                                gifSpan.appendChild(fruitGif);
                                gifSpan.appendChild(ratingText);
    
                                fruitGifsArea.insertBefore(gifSpan, fruitGifsArea.firstChild);
                            }
                        }
                    }
                }
            }
            xhr.send();
        }

        // we want the still image, the motion gif, and the rating
        // 


        // populate section for the gifs to appear (side by side and spill over?)

    }
    
}

// click event for adding fruits form "Yes, this fruit" button
document.getElementById("addFruit").addEventListener("click", function(event){
    

    // // since we are submitting a form, we don't want to refresh the page, so we prevent that default action
    event.preventDefault();

    var fruit = document.getElementById("newGifs").value;
    // check that the value of the form isn't empty
    if (fruit.length > 2) {
        // grab the text entered into the form
        fruit = document.getElementById("newGifs").value.trim();
        // add the entered fruit to our list of fruits
        topics.push(fruit);
        // generate the buttons using our updated list
        populateButtonList();
        // clear the text field of the input form for easier follow-up use
        document.getElementById("newGifs").value = "";
    } else {
        alert("Your input makes me feel empty inside... please enter the name of the fruit.");
    };
});

// click event for fruit buttons
document.getElementById("container").addEventListener("click", serveUpFruityGifs);

// initial call of our button generation function
populateButtonList();