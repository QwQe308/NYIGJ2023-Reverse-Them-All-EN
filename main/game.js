
function HTMLupdate(){
    //反物质
    e("am").innerHTML = formatWhole(player.am)
    let AMproc = getNDproc(1)
    if(hasIU(42)) AMproc = AMproc.sub(getNDproc(2))
    if(player.am.eq(1)) e("extraInfo").innerHTML = "(Capped)"
    else if(AMproc.gte(0)) e("extraInfo").innerHTML = `(-${format(AMproc)}/s)`
    else e("extraInfo").innerHTML = `(+${format(AMproc.neg())}/s)`
    //物质维度
    for(dim=1;dim<=8;dim++){
        //数据更新
        e(`nd${dim}mult`).innerHTML = "x"+format(tmpNDmult[dim])
        e(`nd${dim}num`).innerHTML = `${formatWhole(player.nd[dim].num)}`
        if(player.nd[dim].num.neq(1) || hasIU(31)) e(`nd${dim}buy`).innerHTML = `Buy 1<br>Cost: ${formatWhole(getDimCost(dim))} ${(hasIU(50)&&dim==8?'Energy':'Matter')}`
        else e(`nd${dim}buy`).innerHTML = `Capped at 1`
        if(dim <= 7) w(`nd${dim}proc`, `(+${format(getNDproc(dim+1).div(player.nd[dim].num.max(1)).mul(100))}%/s)`)

        //未解锁情况下锁定维度
        if(getNDunlocked(dim)){
            e(`nd${dim}name`).style.visibility = "visible"
            e(`nd${dim}num`).style.visibility = "visible"
            e(`nd${dim}buy`).style.visibility = "visible"
            e(`nd${dim}proc`).style.visibility = "visible"
        }else{
            e(`nd${dim}name`).style.visibility = "hidden"
            e(`nd${dim}num`).style.visibility = "hidden"
            e(`nd${dim}buy`).style.visibility = "hidden"
            e(`nd${dim}proc`).style.visibility = "hidden"
        }

        //更新按钮状态
        if(canBuyND(dim)){
            e(`nd${dim}buy`).className = "dimBuy can"
        }else{
            e(`nd${dim}buy`).className = "dimBuy locked"
        }
    }

    if(!hasIU(44)) e("iu44Info").style.visibility = "hidden"
    else e("iu44Info").style.visibility = "visible"
    w("iu44Info",`IU44 currently nerfs mults above x${format(getIU44Avg())}`)

    if(!player.infinitied) e("infTabButton").style.display = "none"
    else e("infTabButton").style.display = "inline-block"
    e("infButton").innerHTML = `Big Church and get ${formatWhole(getInfGain())} infinity point<br>Base amount:${player.am.eq(1)?"1(Capped)":"0<br>(Reach 1 AM to get a infinity point)"}`
    w("ip",`You have <span style="color:rgb(60,60,0);font-size: 18px;">${format(player.ip)}</span> infinity point<br>You have spent ${format(player.infTime)} seconds in this infinity, and are supposed to get ${format(getInfGain(true))} infinity point`)

    //更新iu状态
    for(i in iu){
        i = Number(i)
        let baseUpg = i%10?i-i%10:i-10
        var className = `${(i%10==0?"mainIU":iu[i].type=="challenge"?"ic":"iu")} ${(shift?getIULevel(i).gte(1)?"downgrade":"downgrade locked":getIULevel(i).gte(iu[i].cap())?"bought":canBuyIU(i)?"can":"locked")}`//待修复
        w(`iu${i}`,`${iu[i].description()}<br>Level:${formatWhole(player.iu[i])}/${formatWhole(iu[i].cap())}<br>Cost: ${formatWhole(iu[i].cost())} infinity point`)
        if(i!=10){
            if(!player.iuUnl[baseUpg]){
                e(`iu${i}`).style.visibility = "hidden"
                if(hasIU(baseUpg)) player.iuUnl[baseUpg] = true
            }
            else{
                e(`iu${i}`).style.visibility = "visible"
                if(!hasIU(baseUpg)) className += " disabled"
            }
        }
        e(`iu${i}`).className = className
    }
    if(shift) w("downgradeInfo","You are now in downgrade mode.")
    else w("downgradeInfo","")
    if(!hasIU(20)){
        e("ndAuto").style.display = "none"
        e("energy").style.display = "none"
    }
    else{
        if(!hasIU(51)){
            e("ndAuto").style.display = "block"
            e('advancedNdAuto').style.display = "none"
        }else{
            e("ndAuto").style.display = "none"
            e('advancedNdAuto').style.display = "block"
        }
        if(!hasIU(50)){
            e('sacrificeAuto').style.display = "none"
        }else{
            e('sacrificeAuto').style.display = "block"
        }
        e("energy").style.display = "block"
    }
    w("ndAutoCD",` ${format(ndAutoCDTicker,1)}s/${format(getNDAutoCD(),1)}s`)
    w("advancedNdAutoCD",` ${format(ndAutoCDTicker,1)}s/${format(getNDAutoCD(),1)}s`)
    w("energy",`You have ${format(player.energy,1)} energy(+${format(getENGain().div(diff))}/s, based on antimatter that annihilated) ,which make all matter dimension cost ${format(getENEffect())} times less.`)
    //更新献祭按钮状态
    if(hasIU(50)){
        e(`sacrifice`).style.visibility = 'visible'
        w(`sacrifice`,`Sacrifice 1st dimension to 7th dimension, which increase your sacrificed 8th dimensions amount by ${formatWhole(player.nd[8].num.sub(player.sacrifice).max(0))}(Currently: ${formatWhole(player.sacrifice)}),sacrifice multiplier will increase from *${format(getSacrificeEffect())} to *${format(getSacrificeEffect(player.nd[8].num.max(player.sacrifice)))}`)
        if(canSacrifice()) e(`sacrifice`).className = 'can sacrifice'
        else e(`sacrifice`).className = `locked sacrifice`
    }else{
        e(`sacrifice`).style.visibility = 'hidden'
    }
}

var tabList = ["dimTab","infTab"]
function tabSwitch(showingTab){
    for(i in tabList){
        e(tabList[i]).style.display = "none"
    }
    e(showingTab).style.display = "block"
}

function calcDiff(){
    t = new Date()
    diff = n((Number(t.getTime())-timestart)/1000)
    timestart = t.getTime()
}

function gameloop(){
    //临时变量赋值
    tmpNDmult = getNDmult()


    calcDiff()
    if(hasIU(20)) player.energy = player.energy.add(getENGain().mul(diff)).min(1.79e308)
    for(dim=7;dim>=1;dim--){
        player.nd[dim].num = player.nd[dim].num.add(getNDproc(dim+1).mul(diff))
    }
    if(hasIU(42)) player.am = player.am.add(getNDproc(2).mul(diff))
    if(hasIU(62)) player.nd[6].num = player.nd[6].num.add(getNDproc(8).mul(diff))
    player.am = player.am.sub(getNDproc(1).mul(diff)).max(1)

    if(hasIU(24) && player.am.eq(1) && !player.rewinded){
        var timeRewind = getIUEffect(24,1).neg()
        var bought = [null,zero,zero,zero,zero,zero,zero,zero,zero]
        for(dim=8;dim>=1;dim--){
            bought[dim] = player.nd[dim].bought
            player.nd[dim].bought = n(0)
        }
        tmpNDmult = getNDmult()        
        player.am = player.am.sub(getNDproc(1).mul(timeRewind)).max(1)
        player.nd[1].num = player.nd[1].num.sub(bought[1])
        for(dim=1;dim<=7;dim++){
            player.nd[dim].num = player.nd[dim].num.add(getNDproc(dim+1).mul(timeRewind))
            player.nd[dim+1].num = player.nd[dim+1].num.sub(bought[dim+1])
        }        
        player.rewinded = true
    }

    player.infTime = player.infTime.add(diff)
    ndAutoCDTicker = ndAutoCDTicker.add(diff)
    if(hasIU(20)) checkNDAuto()
    if(hasIU(50)) checkSacrificeAuto()

    HTMLupdate()
    save()
}

setInterval(gameloop,50)

function hotkey(){  
    var a=window.event.keyCode;  
    //64+字母序数
    //alert(a)
    switch(a){
        //M
        case 77:
            break;

        //shift
        case 16:
            shift = true
            break
    }
}
function disableHotkey(){  
    var a=window.event.keyCode;  
    //64+字母序数
    //alert(a)
    switch(a){
        //shift
        case 16:
            shift = false
            break
    }
}
document.onkeydown = hotkey;
document.onkeyup = disableHotkey;