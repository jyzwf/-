import loading from './tpl/loading';
import loading_css from './scss/loading.scss';

$('body').prepend(loading);


$(function(){
	$('.loading').fadeOut();
})