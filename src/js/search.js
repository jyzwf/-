import {flea_ajax} from './ajax.js';
import {tpl_init} from './club_tpl';
// import {search_data} from './save_data';

const WINDOW_H = $(window).height();
let flag = 0,
	is_find = false,
	// last_str = '',
	is_scroll = false;



var _callback = function(res){

	if(!res[0]&&!is_scroll){
		$('#search').val('');
		alert('没有找到，换个词试试吧');
		return;
	}

	if(!res[0]&&is_scroll){
		$('#load_finish').addClass('active');
		setTimeout(()=>{
				$('#load_finish').removeClass('active');
		},1500);
		return;
	}

	search.remove_nav_style();
	if(!is_find ){
		$('#clubs_list').html('');
		is_find = true;
	}
	// $(window).off('scroll').on('scroll',search.scroll_fn);
	$(window).off('scroll');
	
	this.data.page+=1;
	tpl_init(res);
	$(window).on('scroll',search.scroll_fn);

};

var search = {
	obj:null,
	search_data:{
		data:{
			type:2,
			str:'',
			page:0,
			page_num:5
		},
		cb(res){
			_callback.call(this,res);
		}
	},

	search_result:[],

	isEmpty(){
		return this.obj.dom.siblings('input').val() ? true :false;
	},

	isShow(){
		return this.obj.dom.parent().hasClass('active') ? true :false;
	},

	click_act(){
		
		var parent = this.obj.dom.parent(),
			siblings = this.obj.dom.siblings(),
			is_show = this.isShow(),
			is_empty = this.isEmpty();

		if(!is_show){
			parent.addClass('active');
			return false;
		}

		if(!is_empty){
			parent.removeClass('active');
			return false;
		}
		if(siblings.val() != last_str && last_str.trim()!=''){
			console.log(last_str);
			$('#clubs_list').html('');
			is_find = false;
			is_scroll = false;
		}else if(siblings.val() == last_str){
			return;
		}

		last_str = siblings.val();
		this.get_data();
	},

	get_data(){
		this.search_data.data.page=0;
		this.search_data.data.str = $('#search').val();
		flea_ajax(this.search_data);
	},

	remove_nav_style(){
		$('nav a:not(.slide)').removeClass('active');
		$('.slide').css({
			left:'-500px'
		})
	},

	get_more_data(){
		flea_ajax(this.search_data);
	},

	init(obj){
		this.obj = obj;
		this.obj.dom.on('click',this.click_act.bind(this));
	},

	scroll_fn(){
		if($(window).scrollTop() <= flag){
			flag = $(window).scrollTop();
			return
		}
		if( $(window).scrollTop() >= ($('body').height() - WINDOW_H ) ){
			$(window).off('scroll');
			is_scroll = true;
			search.get_more_data();
		}

		flag = $(window).scrollTop();
	}
};

export {search}