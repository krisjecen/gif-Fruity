// js for gif-Fruity app
'use strict'
// declare variables
var topics = ["pumpkin", "cherry", "honeydew", "peaches", "pear"];
var fruitGifsArea = document.getElementById("fruitGifsArea");

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
        // set the trimmed query value into a variable that will be used in our queryURL
        var getFruitGifs = event.target.dataset.name.trim();

        // clear the gifs section (clear out previously shown gifs)
        fruitGifsArea.innerHTML = "";

        // request gifs from giphy using the fruit name as the query
        var queryURL = `https://api.giphy.com/v1/gifs/search?q=${getFruitGifs}&api_key=fdYHoYcYVDFUlKAY767cni3noXeN0Kkd&limit=10`;

        // make AJAX GET request using fetch / XHR

        // if fetch is supported
        if (window.fetch) {
            // set up an AJAX GET request to our queryURL
            fetch(queryURL, {
                method: "GET"
            })
            // once we get our data, convert the data to json so we can use it more easily
                .then(function(response) {
                    return response.json();
                })
                .then(function(response){
                    // store the response data in a variable
                    var results = response.data;

                    // for each part of our results (for each batch of image data we get back), we will...
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
                            fruitGif.setAttribute("data-still", item.images.fixed_height_still.url);
                            fruitGif.setAttribute("data-animate", item.images.fixed_height.url);
                            fruitGif.setAttribute("data-state", "still");
                            fruitGif.setAttribute("alt", "fruit gif");

                            // add the elements into the span
                            gifSpan.appendChild(fruitGif);
                            gifSpan.appendChild(ratingText);

                            // insert the gif into the designated area on the page
                            fruitGifsArea.appendChild(gifSpan);
                        }
                    }


                });
        // if fetch isn't supported, use XHR
        } else {
            // create new xhr object
            const xhr = new XMLHttpRequest();
            // set an AJAX GET request using our queryURL
            xhr.open("GET", queryURL);
            // once the xhr loads, we want to...
            xhr.onload = event => {
                // check if the request to Giphy's API has finished...
                if (xhr.readyState === 4) {
                    // check of the request has successfully retrieved data from Giphy's API
                    if (xhr.status === 200) {
                        // parse our response into json so we can grab parts of it more easily
                        let response = JSON.parse(xhr.responseText);
                        // put the data into a variable so we can access it
                        var results = response.data;
                        
                        // for each part of our results (for each batch of image data we get back), we will...
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
                                fruitGif.setAttribute("data-still", item.images.fixed_height_still.url);
                                fruitGif.setAttribute("data-animate", item.images.fixed_height.url);
                                fruitGif.setAttribute("data-state", "still");
                                fruitGif.setAttribute("alt", "fruit gif");
    
                                // append the elements to the span in the order specified
                                gifSpan.appendChild(fruitGif);
                                gifSpan.appendChild(ratingText);
                                
                                // insert the gifs into the designated area on the page
                                fruitGifsArea.insertBefore(gifSpan, fruitGifsArea.firstChild);
                            }
                        }
                    }
                }
            }
            // send the xhr request
            xhr.send();
        }
    }
}

// click event for adding fruits form "Yes, this fruit" button
document.getElementById("addFruit").addEventListener("click", function(event){
    // // since we are submitting a form, we don't want to refresh the page, so we prevent that default action
    event.preventDefault();

    var fruit = document.getElementById("newGifs").value;
    // check that the value of the form isn't empty or too short to be a fruit
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

// toggle animation when images are clicked
document.querySelector('.container').addEventListener('click', function(event) {
    if (event.target.tagName.toLowerCase() === 'img') {
        // assign a variable for the target so we can update its attributes
        let clickedImg = event.target;
        // assign a variable to our target's state so we can update the state
        var state = clickedImg.dataset.state;

        // if the image state is still...
        if (state === "still") {
            // change the source to the animated gif
            clickedImg.setAttribute('src', clickedImg.dataset.animate);
            // and set the state to animate
            clickedImg.setAttribute('data-state', 'animate');
        // if the image is something besides still...
        } else {
            // change its source to the still image
            clickedImg.setAttribute('src', clickedImg.dataset.still);
            // and change its state to still
            clickedImg.setAttribute('data-state', 'still');
        }
    }
})

// initial call of our button generation function
populateButtonList();