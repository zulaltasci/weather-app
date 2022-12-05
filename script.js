function showData(response) {
  for (const data of response) {
    const weekday = [
      "Pazar",
      "Pazartesi",
      "Salı",
      "Çarşamba",
      "Perşembe",
      "Cuma",
      "Cumartesi",
    ];

    const date = new Date(data.tarih);
    let day = weekday[date.getDay()];

    $(".card-title" + data.gun).html(day);
    $("#min" + data.gun).html(data.min + "°C");
    $("#max" + data.gun).html(data.max + "°C");

    let result = (parseInt(data.min) + parseInt(data.max)) / 2;

    if (result < 10) {
      $(".img-style" + data.gun).attr(
        "src",
        "https://ssl.gstatic.com/onebox/weather/48/rain_light.png"
      );
    } else if (result > 10) {
      $(".img-style" + data.gun).attr(
        "src",
        "https://ssl.gstatic.com/onebox/weather/48/sunny.png"
      );
    } else if (result == 10) {
      $(".img-style" + data.gun).attr(
        "src",
        "https://ssl.gstatic.com/onebox/weather/48/partly_cloudy.png"
      );
    }
  }
}

$(document).ready(function () {
  $("#floatingSelect").change(function () {
    const city = $(this).val();
    $.ajax({
      url: "http://api.tavcan.com/json/havadurumu/" + city,
      method: "GET",
      data: null,
      dataType: "json",
      success: showData,
    }).fail(function (err) {
      console.log(err);
    });
  });

  $.ajax({
    url: "http://api.tavcan.com/json/havadurumu/balikesir",
    method: "GET",
    data: null,
    dataType: "json",
    success: showData,
  }).fail(function (err) {
    console.log(err);
  });
});
