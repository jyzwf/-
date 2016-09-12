
let flea_ajax = (obj)=>{
		$.ajax({
		  type: 'POST',
		  url: window.window_url,
		  data: obj.data,
		  dataType: 'json',
		  xhrFields: {
            withCredentials: true
          },
		  success: function(data){
		   	obj.cb && obj.cb(data);
		  },
		  error: function(xhr, type){
		  	console.log(xhr);
		    alert('数据请求失败')
		  }
		})

};

export {flea_ajax}