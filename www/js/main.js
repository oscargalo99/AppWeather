var onSuccess = function(position) {

  var apiKey = "de75094b22ef2f55c90aaa6e442bb050";

  $.get( "https:api.openweathermap.org/data/2.5/weather?lat="+ position.coords.latitude +"&lon="+ position.coords.longitude +"&appid="+apiKey,
  function(tiempo) {

    var nombre = tiempo.name
    var descripcion = tiempo.weather[0].main;
    var icono = tiempo  .weather[0].icon;
    var temperaturaK = tiempo.main.temp;
    var temperatura = temperaturaK -  273.15;

    $(".localizacion").append(
      '<div class="card text-center shadow p-3 mb-5 bg-white rounded " style="width: 18rem;"> <div class="card-body"><h3 class="card-title">'+nombre+'<h3 class="card-title">'+descripcion+'</h3><p class="card-text"><h5>'+temperatura.toFixed()+'ºC</h5><br><img src="http://openweathermap.org/img/wn/' + icono + '@2x.png" class="img-fluid"></p></div></div></div>'
    )}
  )
};

function onError(error) {
  alert("Ha habido un problema con la localización actual");
}

$(function(){

    $("#informacion").show();
    $(".formulario").hide();
    $(".card").hide();
    $(".ciudades").hide();
    $(".localizacion").hide();

    $("#btnHome").click(function(event){
        event.preventDefault();
        $("#informacion").show();
        $(".formulario").hide();
        $(".card").hide();
        $(".ciudades").hide();
        $(".localizacion").hide();
    });

    $("#btnSearch").click(function(event){
        event.preventDefault();
        $("#informacion").hide();
        $(".formulario").show();
        $(".localizacion").hide();
    });

    $("#btnLocation").click(function(event){
      event.preventDefault();
      $("#informacion").hide();
      $(".formulario").hide();
      $(".localizacion").show();
      navigator.geolocation.getCurrentPosition(onSuccess, onError);
  });

    const form = document.querySelector(".container form");

    $("#btnTiempo").click(function(event){

      $(".card").show();
      $(".ciudades").show();
      $(".ciudades").children().remove();

      var apiKey = "de75094b22ef2f55c90aaa6e442bb050";
      var inputVal = $("#formControlInput").val();
      var input = $("#formControlInput");

      event.preventDefault();
      $.get( "https://api.openweathermap.org/data/2.5/forecast?q="+inputVal+"&appid="+apiKey,
      function(tiempo) {

        var cnt = 4;
        for (var i = 0; i < tiempo.list.length; i++) {
          if (i==cnt){
            var nombre = tiempo.city.name;
            var descripcion = tiempo.list[i].weather[0].main;
            var icono = tiempo.list[i].weather[0].icon;
            var temperaturaK = tiempo.list[i].main.temp;
            var temperatura = temperaturaK -  273.15;
            $(".ciudades").append(
              '<div class="col-sm-12 col-md-6 col-lg-4"><div class="card text-center shadow p-3 mb-5 bg-white rounded " style="width: 18rem;"> <div class="card-body"><h3 class="card-title">'+nombre+'</h3><p class="card-text"><h5>'+temperatura.toFixed()+'ºC</h5><br><h5>'+descripcion+'</h5><br><img src="http://openweathermap.org/img/wn/' + icono + '@2x.png" class="img-fluid"></p></div></div></div>'
            )
            cnt+=8;
          }

        }
      });

      input.val("");
      input.focus();

    });
})

