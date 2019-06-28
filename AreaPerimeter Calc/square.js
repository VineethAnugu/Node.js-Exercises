module.exports = (x,y,callback) => {
    if(x<=0 || y<=0){
        setTimeout(() => callback(new Error("Invalid measurements"),
        null),
        2000);
    }
    else{
        setTimeout(() => callback(null,
            {
                area : ( ) => (x*x),
                perimeter :  () => 4*x
            }),
            2000);
    }
}








