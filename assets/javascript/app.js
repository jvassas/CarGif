//initial array of cars
var cars = ['Aston Martin', 'Volvo', 'Porsche', 'Audi', 'Jeep'];


function renderButtons() {
    $('#buttons').empty();
    $('#create-input').val("");

    for (var i = 0; i < cars.length; i++){

        var newButton = $('<button class="btn btn-primary">');
        newButton.addClass('car')
        newButton.attr('data-name', cars[i]);
        newButton.text(cars[i]);
        $('#buttons').append(newButton);
    }

}

renderButtons();

$('#addCar').on('click', function (event) {
    event.preventDefault();
    var car = $('#create-input').val().trim();
    if (car === "") {
        $('#no-entry').text("You did not type anything.");
    } else {

    cars.push(car);
    renderButtons();
    }

});



function showGif() {
    var gif = $(this).attr('data-name');
    var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=u4JV5f1WT24vokSSiF7ozk6AKU9aAHsH";
        //api key: u4JV5f1WT24vokSSiF7ozk6AKU9aAHsH
    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
          console.log(response);
          $("#cars-view").empty();
          for (var i = 0; i < response.data.length; i++) {
            var imageUrl = response.data[i].image_original_url;
            var rating = response.data[i].rating;

            var image = $("<img>");
            var carDiv = $("<div>");
            var ratingText = $("<p id='rating'>" + "Rating: " + rating + "</p>");

            image.attr('src', imageStillUrl);
            image.attr('alt', 'gif');
            image.attr('data-state', 'still');
            image.attr('data-still', imageStillUrl);
            image.attr('data-animate', imageUrl);

            carDiv.append(image);
            carDiv.append(ratingText);
            $("#cars-view").prepend(carDiv);
          }
      });

}

$(document).on('click', '.car', showGif);

renderButtons();

function checkState() {
    $('img').on('click', function(){
        var state = $(this).attr('data-state');
        if (state == 'still') {
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        } else {
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }
    });
};
