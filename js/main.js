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