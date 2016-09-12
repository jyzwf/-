import {tpl_init} from './club_tpl';
import {flea_ajax} from './ajax.js';
import {tab_data} from './save_data';
const WINDOW_H = $(window).height();
let flag = 0;

var _hash_event = {
	'school_org':{
		data:{
			type:1,
			str:1,
			page:0,
			page_num:5
		},
		cb(res){
			_callback.call(this,res,'school_org');
		}
		
	},

	'hos_level_org':{
		data:{
			type:1,
			str:2,
			page:0,
			page_num:5
		},
		cb(res){
			_callback.call(this,res,'hos_level_org');
		}
	},

	'school_hos_club':{

		data:{
			type:1,
			str:3,
			page:0,
			page_num:5
		},
		cb(res){
			_callback.call(this,res,'school_hos_club');
		}
	}
}

var _callback = function(res,str){
	if(!res[0]){
		$('#load_finish').addClass('active');
		setTimeout(()=>{
				$('#load_finish').removeClass('active');
		},1500)
		return;
	}
	this.data.page+=1;
	tpl_init(res);
	tab_data[str].accept_data.push(...res);
	$(window).on('scroll',top_nav.scroll_fn);
};


var top_nav = {
	toggle_style(num){
		$('nav a:not(.slide)').eq(num).addClass('active').siblings('a').removeClass('active');

		$('.slide').css({
			left: ($(window).width()/3)*num + 'px'
		})
		return this;
	},

	get_data(hash){
		$('#search').parent().removeClass('active');
		$('#search').val('');
		$('#clubs_list').html('');
		$(window).off('scroll');
		// if(tab_data[hash].accept_data[0]){
		// 	tpl_init(tab_data[hash].accept_data);
		// 	$(window).on('scroll',top_nav.scroll_fn);
		// 	return ;
		// }
		
		_hash_event[hash].data.page = 0;
		let send_info = _hash_event[hash];

		setTimeout(()=>{
			flea_ajax(send_info);
		},201)
		
		
		
	},

	get_more_data(hash){
		let send_info = _hash_event[hash];
		flea_ajax(send_info);
	},

	format:{
		'school_org':0,
		'hos_level_org':1,
		'school_hos_club':2
	},

	scroll_fn(){
		if($(window).scrollTop() <= flag){
			flag = $(window).scrollTop();
			return
		}
		if( $(window).scrollTop() >= ($('body').height() - WINDOW_H ) ){
			$(window).off('scroll',top_nav.scroll_fn);

			let hash = location.hash.slice(1);
			top_nav.get_more_data(hash);
		}

		flag = $(window).scrollTop();
	}

};



export {top_nav};