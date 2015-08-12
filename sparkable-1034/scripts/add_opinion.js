

function verifyOpinion(e){
  e.preventDefault();
  var origin = $("#origin").val();
  var target = $("#target").val();
  var rating = $("#rating").val();
  var confidence = $("#confidence").val();
    if (origin == "")
    {
      $("#opinion_error").text("Please provide your name!");
      $("#opinion_error").fadeIn(1000);
      $("#opinion_error").fadeOut(3000);
      return false;
    }
    else if (target=="") {
      $("#opinion_error").text("Please provide another person's name!");
      $("#opinion_error").fadeIn(1000);
      $("#opinion_error").fadeOut(3000);
      return false;
    }
    else if (rating=="") {
      $("#opinion_error").text("Please provide a rating!");
      $("#opinion_error").fadeIn(1000);
      $("#opinion_error").fadeOut(3000);
      return false;
    }
    else if (confidence=="") {
      $("#opinion_error").text("Please provide a confidence!");
      $("#opinion_error").fadeIn(1000);
      $("#opinion_error").fadeOut(3000);
      return false;
    }
    else
    {
      verifyOpinionInfo(origin, target, rating, confidence);
    }
}

function verifyOpinionInfo(origin, target, rating, confidence){
  $.post("/submitOpinion", {"origin": origin, "target": target,"rating":rating,"confidence":confidence}, function(data){
    if (!data.originValid){
      $("#opinion_error").text("Your name does not exist, please add it to our database first!");
      $("#opinion_error").fadeIn(1000);
      $("#opinion_error").fadeOut(3000);
    }
    if (!data.targetValid){
      $("#opinion_error").text("The person you're refering to does not exist, please add them to our database first!");
      $("#opinion_error").fadeIn(1000);
      $("#opinion_error").fadeOut(3000);
    }
    if (data.originValid && data.targetValid){
      alert("Your opinion has been added!");
      window.location.href = "/add_opinion";
    }
  });
}


$(document).ready(
  function() {
    $('#new_opinion_form').on('submit', verifyOpinion)
    $(".small_btn_center").hover(function(){
    $(this).css("background", "#FF9966");
    }, function(){
    $(this).css("background", "white");
  });
});
