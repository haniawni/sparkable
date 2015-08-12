

function verifyPerson(e){
  e.preventDefault();
  var name = $("#name").val();
  var fb_url = $("#fb_url").val();
    if (name == "")
    {
      $("#person_error").text("Please provide a nickname!");
      $("#person_error").fadeIn(1000);
      $("#person_error").fadeOut(3000);
      return false;
    }
    else if (fb_url=="") {
      $("#url_error").text("Please provide a facebook url!");
      $("#url_error").fadeIn(1000);
      $("#url_error").fadeOut(3000);
      return false;
    }
    else
    {
      verifyUnique(name, fb_url);
    }
}

function verifyUnique(name, fb_url){
  $.post("/submitPerson", {"name": name, "fb_url": fb_url}, function(data){
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
      alert("This person has been added!");
      window.location.href = "/";
      //TODO: redirect to that persons page
    }
  });
}

function showNewPerson() {
  $("#new_person_form").fadeIn(0);
  $("#show_new_person").fadeOut(0);
  return false;
}


$(document).ready(
  function() {
    $('#new_person_form').on('submit', verifyPerson)
    $('#show_new_person').on('submit', showNewPerson)
    $(".small_btn_center").hover(function(){
    $(this).css("background", "#FF9966");
    }, function(){
    $(this).css("background", "white");
  });
});
