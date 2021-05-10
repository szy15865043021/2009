let name="zhangsan";
let age =22;

let obj ={
    name,
    age,
    sex:"未知"
}

let hello=function (){
    console.log("dhbdywbb");
}

//将当前模块，供其他模块使用
export {obj,hello}