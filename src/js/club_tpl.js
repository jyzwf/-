import tpl from '../tpl/club_tpl';


var tpl_init = (data)=>{

	let str = '';
	let list_clone = null;
	for(let i=0,item;item=data[i++];){
		list_clone = tpl;
		let is_active = item.is_like == 1 ? 'active' :'';

		list_clone = list_clone.replace(/\{\$club_link\}/gi,item.url_club)
		   		  			   .replace(/\{\$club_title\}/gi,item.title)
		   		  			   .replace(/\{\$is_active\}/gi,is_active)
		   		  			   .replace(/\{\$url_like\}/gi,item.url_like)
		   		  			   .replace(/\{\$club_logo\}/gi,item.url_logo)
		   		  			   .replace(/\{\$club_name\}/gi,item.club)
		   		  			   .replace(/\{\$club_intr\}/gi,item.description)
		   		  			   .replace(/\{\$club_time\}/gi,item.date_time)
		   		  			   .replace(/\{\$club_watch\}/gi,item.view);


		str +=list_clone;
	}


	$('#clubs_list').append(str);
}

// 为收藏按钮加事件

;(function(){
	$('#clubs_list').on('click','.collect',function(e){

		e.preventDefault();
		
		let url = $(this).data('url_like'),
			_this = this;

		$.get(url,(data)=>{
			let  res = JSON.parse(data);
			if(res.status==1){
				$(_this).addClass('active');
				$('#notice').text('已收藏').addClass('active');
			}else if(res.status ==0){
				$(_this).removeClass('active');
				$('#notice').text('已取消收藏').addClass('active');
			}

			setTimeout(()=>{
				$('#notice').removeClass('active')
			},1500)
		})
	})
})()




export {tpl_init};
