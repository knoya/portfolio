function isEmail(email) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}

$(document).on('ready', function() {

    var from, name, email, message;
	var aOffset = (($("#about").offset().top - 5) / $(document).height());
	var pOffset = (($("#portfolio").offset().top - 5) / $(document).height());
	var cOffset = (($("#contact").offset().top - 5) / $(document).height());

	$(window).scroll(function(){
		if (($(this).scrollTop()/$(document).height()) > cOffset) {
			$(".graynav").addClass("greennav");
			$(".graynav").removeClass("rednav yellownav");
    	}
    	else if (($(this).scrollTop()/$(document).height()) > pOffset){
    		$(".graynav").addClass("rednav");
    		$(".graynav").removeClass("yellownav greennav");
    	}
    	else if (($(this).scrollTop()/$(document).height()) > aOffset){
    		$(".graynav").addClass("yellownav");
    		$(".graynav").removeClass("rednav greennav");
    	}
    	else {
    		$(".graynav").addClass("graynav");
    		$(".graynav").removeClass("yellownav rednav greennav");
    	}

	});
    $("#send_email").click(function(){    
        name=$("#name").val();
        email=$("#email").val();
        message=$("#message").val();
        if (isEmail(email)) {
            $("#feedback").text("Sending E-mail...Please wait");
            $.get("https://kristiannoya.com/send",{name:name,email:email,message:message},function(data){
                if(data=="sent") {
                    $("#feedback").empty().text("Email has been sent!");
                }
            },"html");
            $("#feedback").delay(2000).fadeOut().empty();
            $(".grpcollapse").animate({
                height: 'toggle'
            }).fadeOut("fast");
            $("#contacttext").fadeOut("fast", function() {
                var $this = $(this);
                $this.empty().text("Thanks! I'll respond ASAP.").fadeIn("slow");
            });
        }else {
            alert("Please enter a valid email address");
        }

    });

});
