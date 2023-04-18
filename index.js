// http://www.omdbapi.com/?i=tt3896198&apikey=aa724d2e&

const search = document.getElementById("input-button")
const displayDiv = document.getElementById("display-div")
const placeholder = document.getElementById("placeholder")


search.addEventListener("click", function () {
    let input = document.getElementById("input").value;
    let movieArray = [];
    let watchlistArray = [];

    displayDiv.innerHTML = ''; 

    fetch(`http://www.omdbapi.com/?&apikey=aa724d2e&s=${input}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            for (let i = 0; i < data.Search.length; i++) {
                movieArray.push(data.Search[i]);
            }
            movieArray.forEach(movie => {
                fetch(`http://www.omdbapi.com/?&apikey=aa724d2e&i=${movie.imdbID}`)
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                        placeholder.style.display = "none";
                        
                        const movieDiv = document.createElement("div");
                        movieDiv.classList.add("movie");

                        const watchlistBtn = document.createElement("button");
                        watchlistBtn.classList.add("watchlist-btn");
                        watchlistBtn.textContent = "Watchlist";
                        watchlistBtn.addEventListener("click", function () {
                            watchlistArray.push(data);
                            watchlistArray.forEach(movie => {});
                            //FIX THIS LATER
                        });

                        

                        movieDiv.innerHTML = `
                            <img id="poster" src="${data.Poster}" alt="">
                            <div class="information">
                                <div class="title">
                                    <h3 class="movie-title">${data.Title}</h3>
                                    <i class="fa-solid fa-star"></i>
                                    <h3>${data.imdbRating}</h3>
                                </div>
                                <div class="data">
                                    <p>${data.Runtime}</p>
                                    <p>${data.Genre}</p>
                                </div>
                                <p class="plot">${data.Plot}</p>
                            </div>
                        `;

                        const dataDiv = movieDiv.querySelector('.data');
                        dataDiv.appendChild(watchlistBtn);
                        displayDiv.appendChild(movieDiv);
                    });
            });
            // end of for loop and forEach
        });
});