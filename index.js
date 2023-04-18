// http://www.omdbapi.com/?i=tt3896198&apikey=aa724d2e&

const search = document.getElementById("input-button")
const displayDiv = document.getElementById("display-div")
const placeholder = document.getElementById("placeholder")
const watchlist = document.getElementById("watchlist-display-div")

let watchlistArray = JSON.parse(localStorage.getItem("watchlistArray")) || [];

if (search){

    search.addEventListener("click", function () {
        let input = document.getElementById("input").value;
        let movieArray = [];
        
    
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
                            watchlistBtn.textContent = "Add to Watchlist";
                            watchlistBtn.addEventListener("click", function () {
                                watchlistArray.push(data);
                                console.log(watchlistArray);
                                localStorage.setItem("watchlistArray", JSON.stringify(watchlistArray));
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
}
function loadWatchlist() {
    if (window.location.href.indexOf('watchlist.html') > -1) {
        const watchlistArray = JSON.parse(localStorage.getItem("watchlistArray"));
        if (Array.isArray(watchlistArray)){
            watchlistArray.forEach(movie => {
                const movieDiv = document.createElement("div");
                movieDiv.classList.add("movie");

                const startExploring = document.getElementById("start-exploring");
                startExploring.style.display = "none";

                const removeBtn = document.createElement("button");
                removeBtn.classList.add("watchlist-btn");
                removeBtn.textContent = "Remove";
                removeBtn.addEventListener("click", function () {
                    watchlistArray.splice(index, 1);
                    localStorage.setItem("watchlistArray", JSON.stringify(watchlistArray));
                    watchlist.removeChild(movieDiv);
                });

                movieDiv.innerHTML = `
                <img id="poster" src="${movie.Poster}" alt="">
                <div class="information">
                    <div class="title">
                        <h3 class="movie-title">${movie.Title}</h3>
                        <i class="fa-solid fa-star"></i>
                        <h3>${movie.imdbRating}</h3>
                    </div>
                    <div class="data">
                        <p>${movie.Runtime}</p>
                        <p>${movie.Genre}</p>
                    </div>
                    <p class="plot">${movie.Plot}</p>
                </div>
            `;

            const dataDiv = movieDiv.querySelector('.data');
            dataDiv.appendChild(removeBtn);
            watchlist.appendChild(movieDiv);
        });
        }
    }
}
loadWatchlist()