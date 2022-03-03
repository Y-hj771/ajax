function getCommentList(){
    $.ajax({
        method:'GET',
        url:'http://www.liulongbin.top:3006/api/cmtlist',
        success: function(res){
            if(res.status !== 200)return alert('获取评论失败')
            // console.log('获取数据成功');   
            var rows = [];
            $.each(res.data,function(i,item){
                var str = '<li class="list-group-item"><span class="badge" style="background-color: aqua;">评论时间:'+item.time +'</span><span class="badge" style="background-color:lightcoral;">评论人:'+ item.username +'</span>'+ item.content +'</li>'
                rows.push(str);
            }) 
            $('#one').empty().append(rows.join(''))
        }

    })
}
getCommentList();
$(function(){
    $('#two').submit(function(e){
        e.preventDefault();
        // 即将要发送到服务器的数据
        var data = $(this).serialize()
        $.post('http://www.liulongbin.top:3006/api/addcmt',data,function(res){
            if(res.status !== 201){
                return alert('发表言论失败')
            }
            getCommentList();
            // jquery转换为原生JavaScript对象 使用清空函数
            $('#two')[0].reset();
        })
    })
})