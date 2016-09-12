// 入口文件
import reset from './scss/index.scss';

import {search} from './js/search';

import {top_nav} from './js/top_nav';


// let flag = 0;
search.init({	//点击搜索图标
	dom:$('#search_pic')
});

window.last_str = '';

$(window).on('hashchange',()=>{
	last_str = '';
	let hash = location.hash.slice(1);
	top_nav.toggle_style(top_nav.format[hash]).get_data(hash);
})

$(window).on('scroll',top_nav.scroll_fn);


// 触发hash事件
if(location.hash=='#school_org'){
	$(window).trigger('hashchange');
}else{
	location.hash='#school_org';
}


