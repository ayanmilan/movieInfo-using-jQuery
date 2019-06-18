$(document).ready(() =>{
    $("#searchForm").on('submit',(event) => {
        var searchText = $("#searchText").val();
        getMovies(searchText);
        event.preventDefault();
    });
});

function getMovies(searchText){
    axios
        .get("http://www.omdbapi.com/?s=" + searchText + "&apikey=2370c7ed")
        .then((response) => {
            console.log(response);
            var movies = response.data.Search;
            var output = "";
            $.each(movies,(index,movie) => {
                output += `
                <div class = "col-md-3">
                    <div class = "well text-center">
                        <img src = "${movie.Poster}">
                        <h5>${movie.Title}</h5>
                        (${movie.Type}) <br>
                        <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href"#">Movie Details</a>
                    </div>
                </div>
                `;
            });
            $("#movies").html(output);
        })
        .catch((error) => {
            console.log(error);
        })
}

function movieSelected(id){
    sessionStorage.setItem("movieID",id);
    window.location = "movie.html";
}

function getMovie(){
    var movieID = sessionStorage.getItem("movieID");
    axios
        .get("http://www.omdbapi.com/?i=" + movieID + "&apikey=2370c7ed")
        .then((response) => {
            console.log(response);
            var movie = response.data;
            var output = `
            <div class="row">
                <div class="col-md-4">
                    <img src="${movie.Poster}" class="thumbnail">
                </div>
                <div class="col-md-8">
                    <h2>${movie.Title}</h2>
                    <ul class="list-group">
                        <li class="list-group-item"><strong>Genre:</strong>${movie.Genre}</li>
                        <li class="list-group-item"><strong>Actors:</strong>${movie.Actors}</li>
                        <li class="list-group-item"><strong>Released:</strong>${movie.Released}</li>
                        <li class="list-group-item"><strong>IMDb rating:</strong>${movie.imdbRating}</li>
                        <li class="list-group-item"><strong>Genre:</strong>${movie.Genre}</li>
                    </ul>
                </div>
            </div> <br>
            <div class="row">
                <div class="well">
                    <h4>Plot</plot></h4>
                    ${movie.Plot} <br> <br> <br>
                    <a href="index.html" class="btn btn-primary">Go Back To Search</a>
                </div>
            </div>
            `;
            $("#movie").html(output);
        })
        .catch((error) => {
            console.log(error);
        })
}