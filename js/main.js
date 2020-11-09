$(document).ready(function () {





  //INIT
  var tdate = new Date();

  var MM = tdate.getMonth(); //yields month
  var yyyy = tdate.getFullYear(); //yields year


  $('.show-month').attr('data-currentMonth', MM + 1);
  $('.show-month').attr('data-currentYear', yyyy);
  $('.show-month').html(yyyy + "-" + (MM + 1));

  create_calender(yyyy, MM);



  //Create event listener
  $(window).scroll(function () {

    if ($(window).scrollTop() > $(window).height() / 4) {
      $('.top_btn').css('opacity', 1);
    }
    else {
      $('.top_btn').css('opacity', 0);
    }

  });


  $('.top_btn').click(function (e) {
    $("html,body").animate({ scrollTop: '0' }, 500);
  });

  $('.img-list ul li img').click(function () {
    var img_src = $(this).attr('src');
    $('.show-photo img').attr('src', img_src);
  });


  $('.next-month').click(function (e) {
    $('.calender-days').empty();

    var show_year = $('.show-month').attr('data-currentYear');
    var show_month = $('.show-month').attr('data-currentMonth');
    if (show_month == 12) {
      show_month = 1;
      show_year++;
    }
    else {
      show_month++;
    }
    $('.show-month').attr('data-currentYear', show_year);
    $('.show-month').attr('data-currentMonth', show_month);

    $('.show-month').html(show_year + "-" + (show_month));
    create_calender(show_year, show_month - 1)

  });

  $('.last-month').click(function (e) {
    $('.calender-days').empty();

    var show_year = $('.show-month').attr('data-currentYear');
    var show_month = $('.show-month').attr('data-currentMonth');
    if (show_month == 1) {
      show_month = 12;
      show_year--;
    }
    else {
      show_month--;
    }
    $('.show-month').attr('data-currentYear', show_year);
    $('.show-month').attr('data-currentMonth', show_month);

    $('.show-month').html(show_year + "-" + (show_month));
    create_calender(show_year, show_month - 1);
  });



});



function GetRequest() {
  var url = location.search;
  var theRequest = new Object();
  if (url.indexOf("?") != -1) {
    var str = url.substr(1);
    strs = str.split("&");
    for (var i = 0; i < strs.length; i++) {
      theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
    }
  }
  return theRequest;
}

function create_calender(year, MM) {


  //Get days in first day
  var first_date = new Date();
  first_date.setFullYear(year, MM, 1);
  var offset_days = first_date.getDay() - 1;


  var month_days = new Date(year, (MM + 1), 0).getDate();

  var weeks = Math.floor((first_date.getDay() + month_days) / 7);

  if ((first_date.getDay() + month_days) % 7 > 0)
    weeks += 1;

  for (var i = 0; i < weeks; i++) {
    $('.calender-days').append("<tr>"
      + "<td> <div class='days'></div><div class='status'></div></td>"
      + "<td> <div class='days'></div><div class='status'></div></td>"
      + "<td> <div class='days'></div><div class='status'></div></td>"
      + "<td> <div class='days'></div><div class='status'></div></td>"
      + "<td> <div class='days'></div><div class='status'></div></td>"
      + "<td> <div class='days'></div><div class='status'></div></td>"
      + "<td> <div class='days'></div><div class='status'></div></td>"
      + "</tr>");
  }


  for (var i = 1; i <= month_days; i++) {
    // var temp = $('.calender-days').find('td')[i];
    //temp.find('.days').html(i);
    $('.calender-days').find('td .days')[i + offset_days].innerHTML = i;
    var random = Math.floor(Math.random() * 11);
    $('.calender-days').find('td .status')[i + offset_days].innerHTML = random;
    if (random == 0) {
      var item = $('.calender-days').find('td')[i + offset_days];
      $('.calender-days').find(item).css('background-color', 'red');

    }

  }
  //var item = $('.calender-days').find('td')[0];

  //$('.calender-days').find(item).css('background-color', 'blue');

}

function GetTodayDate() {
  var tdate = new Date();
  var dd = tdate.getDate(); //yields day
  var MM = tdate.getMonth(); //yields month
  var yyyy = tdate.getFullYear(); //yields year

  var currentDate = dd + "-" + (MM + 1) + "-" + yyyy;

  return currentDate;
}
