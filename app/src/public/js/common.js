$(document).ready(function(){

	$('#gnb-menu').click(function(){
		if($(this).is('.on')) {
			$(this).removeClass('on');
			$('#gnb-list').slideUp('fast');
		}else {
			$(this).addClass('on');
			$('#gnb-list').slideDown('fast');
		}
	});	
});

