

function verifyOpinion(e){
  e.preventDefault();
  var origin = $("#origin").val();
  var target = $("#target").val();
  var rating = $("#rating").val();
  var confidence = $("#confidence").val();
    if (origin == "")
    {
      $("#origin_error").text("Please provide your name!");
      $("#origin_error").fadeIn(1000);
      $("#origin_error").fadeOut(3000);
      return false;
    }
    else if (target=="") {
      $("#target_error").text("Please provide another person's name!");
      $("#target_error").fadeIn(1000);
      $("#target_error").fadeOut(3000);
      return false;
    }
    else if (rating=="") {
      $("#rating_error").text("Please provide a rating!");
      $("#rating_error").fadeIn(1000);
      $("#rating_error").fadeOut(3000);
      return false;
    }
    else if (confidence=="") {
      $("#confidence_error").text("Please provide a confidence!");
      $("#confidence_error").fadeIn(1000);
      $("#confidence_error").fadeOut(3000);
      return false;
    }
    else
    {
      verifyOpinionInfo(origin, target, rating, confidence);
    }
}

function verifyOpinionInfo(origin, target, rating, confidence){
  $.post("/submitOpinion", {"origin": origin, "target": target,"rating":rating,"confidence":confidence}, function(data){
    if (!data.nameUnique){
      $("#person_error").text("That nickname is taken. Please enter another!");
      $("#person_error").fadeIn(1000);
      $("#person_error").fadeOut(3000);
    }
    if (!data.fb_urlUnique){
      $("#url_error").text("That url is taken. Please enter another!");
      $("#url_error").fadeIn(1000);
      $("#url_error").fadeOut(3000);
    }
    if (data.fb_urlUnique && data.nameUnique){
      window.location.href = "/";
      //TODO: redirect to that persons page
    }
  });
}


$(document).ready(
  function() {
    $('#new_opinion_form').on('submit', verifyOpinion)
    $(".big_btn").hover(function(){
    $(this).css("background", "#FF9933");
    }, function(){
    $(this).css("background", "white");
  });
});
