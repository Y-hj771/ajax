function resolveData(data){
    var arr = []
    for(var k in data){
        arr.push(k + '=' + data[k])
    }
    return arr.join('&')
}
// var result = resolveData({name:'小胖',age:200})
// console.log(result);
function test(options){
    var xhr = new XMLHttpRequest()
    
    //把外界传递过来的参数对象，转换为查询字符串
    var qs = resolveData(options.data)

    //判断是什么请求
    if(options.method.toUpperCase() === 'GET'){
        xhr.open(options.method,options.url + '?' + qs)
        xhr.send()
    }else if(options.method.toUpperCase() === 'POST'){
        xhr.open(options.method,options.url)
        xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded')
        xhr.send(qs)
    }
    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4 && xhr.status === 200){
            var result = JSON.parse(xhr.responseText)
            options.success(result)
        }
    }
}