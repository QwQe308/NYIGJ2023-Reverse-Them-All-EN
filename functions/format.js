//var standard = ["k","m"]
function format(x,p = 2){
    if(x.lt(0)) return "-"+format(x.neg(),p)
    if(x.eq(0)) return "0"
    if(x.lte(10000)){
        return x.toFixed(p)
    }
    var exp = x.log10().floor()
    var mag = x.div(n(10).pow(exp))
    return `${format(mag,2)}e${format(exp,0)}`
}

function formatWhole(x){
    return format(x,0)
}