function bal(bichi){
    console.log("Uronto Badur Jhulonto Bichi");
    let text= "Babar Bichi Dhore Khichi"
    bichi(text);
}
function aloo(text){
    console.log(text)
}

bal((text)=>aloo(text));