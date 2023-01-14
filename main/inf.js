var iu = {
    10:{
        cost(x = getIULevel(this.id)){return n(1)},
        description(){return `t1 - Unlock second dimension but you start with 1000 antimatter on infinity. Unlock new Infinity upgrade and double infinity point gain.`},
        cap(){return n(1)},
        type:"main",
    },
    11:{
        cost(x = getIULevel(this.id)){return n(2)},
        description(){return `t1.1 -  Unlock third dimension.`},
        cap(){return n(1)},
        type:"upgrade",
    },
    12:{
        cost(x = getIULevel(this.id)){return two.pow(x.add(1))},
        description(){return `t1.2 - First dimension multiplier is divided by (x+1)^(x+1) (Currently: /${format(this.effect1())})<br>IP*1.5^x. (Currently: *${format(this.effect2())}).`},
        effect1(x = getIULevel(this.id)){//一维减益
            return x.add(1).pow(x.add(1))
        },
        effect2(x = getIULevel(this.id)){//IP增益
            return n(1.5).pow(x)
        },
        cap(){return n(9)},
        type:"challenge",
    },
    13:{
        cost(x = getIULevel(this.id)){
            if(x.lt(5)) return n(3).pow(x.add(1))
            return n(4).pow(x.add(3))
        },
        description(){return `t1.3 - Infinity point boost first dimension.<br>Currently: *${format(this.effect())}`},
        effect(x = getIULevel(this.id)){
            return player.ip.add(1).pow(x.pow(x.div(100).add(1)).mul(1.25).add(1).log10())
        },
        cap(){return n(9)},
        type:"upgrade",
    },
    14:{
        cost(x = getIULevel(this.id)){return n(16)},
        description(){return `t1.4 - All dimensions cost is multiplied by first dimension multiplier. Infinity point gain *1.5.`},
        effect(x = getIULevel(this.id)){
            if(tmpNDmult[1].lte(0)) return n("1.8e308")
            return tmpNDmult[1]
        },
        cap(){return n(1)},
        type:"challenge",
    },
    20:{
        cost(x = getIULevel(this.id)){return n(64)},
        description(){return `t2 - Unlock auto dimension(Speed:5s).Dimensions bought/5 boost infinity point gain.(Currently: *${format(this.effect())}) And unlock energy.`},
        effect(x = getIULevel(this.id)){
            return getTotalBoughtND().div(5)
        },
        cap(){return n(1)},
        type:"main",
    },
    21:{
        cost(x = getIULevel(this.id)){return n(64)},
        description(){return `t2.1 - Auto infinity when you can infinity when dimension autobuyer triggered.`},
        cap(){return n(1)},
        type:"upgrade",
    },
    22:{
        cost(x = getIULevel(this.id)){return n(64).mul(n(2).pow(x))},
        description(){return `t2.2 - Autobuyer speed -${formatWhole(this.effect1())}s. When dimension autobuyer is triggered, Matter dimensions get ${format(this.effect2())}s production.(Dont generate energy)`},
        effect1(x = getIULevel(this.id)){
            return x
        },
        effect2(x = getIULevel(this.id)){
            return x.div(4).sqrt()
        },
        cap(){return n(4)},
        type:"upgrade",
    },
    23:{
        cost(x = getIULevel(this.id)){return n(128)},
        description(){return `t2.3 - Unlock fourth dimension but you start with 1e5 antimatter on infinity.`},
        cap(){return n(1)},
        type:"challenge",
    },
    24:{
        cost(x = getIULevel(this.id)){return n(128).mul(n(2).pow(x))},
        description(){return `t2.4 - When antimatter drops to 1, Resets bought matter dimensions, then time will be reversed ${formatWhole(this.effect1())}s(energy is kept, highest dimension amount resets after reverse)<br>Infinity point gain*1.5^x. (Currently: *${format(this.effect2())})`},
        effect1(x = getIULevel(this.id)){
            if(x.eq(0)) return n(0)
            return n(3).pow(x.sub(1)).mul(40)
        },
        effect2(x = getIULevel(this.id)){
            return n(1.5).pow(x)
        },
        cap(){return n(4)},
        type:"challenge",
    },
    30:{
        cost(x = getIULevel(this.id)){return n(1024)},
        description(){return `t3 - cbrt(t1.3 effect) (*${format(this.effect1())}) boost second dimension.Infinity point amount boost antimatter gain on start.(*(x+1) = *${format(this.effect2())}).IP gain increases over 40 seconds.(*(t/20) = *${format(this.effect3())}) Energy effect^0.8.`},
        effect1(x = getIULevel(this.id)){
            return getIUEffect(13).root(3)
        },
        effect2(x = getIULevel(this.id)){
            if(hasIU(60)) return player.ip.add(1).pow(2)
            return player.ip.add(1)
        },
        effect3(x = getIULevel(this.id)){
            return player.infTime.min(40).div(20)
        },
        cap(){return n(1)},
        type:"main",
    },
    31:{
        cost(x = getIULevel(this.id)){return n(512)},
        description(){return `t3.1 - Remove dimension's "Capped at 1".`},
        cap(){return n(1)},
        type:"upgrade",
    },
    32:{
        cost(x = getIULevel(this.id)){return n(1024)},
        description(){return `t3.2 - Unlock fifth dimension but infinity point gain is divided by 1.25.`},
        cap(){return n(1)},
        type:"upgrade",
    },
    33:{
        cost(x = getIULevel(this.id)){return n(2048)},
        description(){return `t3.3 - First dimension cost increase is 5x higher. Infinity point*1.8.`},
        cap(){return n(1)},
        type:"challenge",
    },
    34:{
        cost(x = getIULevel(this.id)){return n(2048).mul(n(2).pow(x))},
        description(){return `t3.4 - The closer matter/s to antimatter/s,The lower 2nd dimension's mult is (/${format(this.effect1())}).Infinity point*1.5^x.(*${format(this.effect2())})`},
        effect1(x = getIULevel(this.id)){
            return getNDproc(1).max(10).log10().mul(x.div(2).add(1.5)).div(player.am.add(9).log10()).pow(x.mul(1.75).add(1.5)).max(1)
        },
        effect2(x = getIULevel(this.id)){
            return n(1.5).pow(x)
        },
        cap(){return n(4)},
        type:"challenge",
    },
    40:{
        cost(x = getIULevel(this.id)){return n(4096)},
        description(){return `t4 - 1st dimension's amount boosts the highest dimension.(*${format(this.effect())})Infinity point*0.75.`},
        effect(x = getIULevel(this.id)){
            return ten.pow(player.nd[1].num.max(1).log10().add(1).log10().pow(2))
        },
        cap(){return n(1)},
        type:"main",
    },
    41:{
        cost(x = getIULevel(this.id)){return n(4096).mul(n(4).pow(x))},
        description(){return `t4-1 - All dimensions cost 100^x^1.25 more. (*${format(this.effect1())})<br>Infinity point*(1.5^x+x/2) (*${format(this.effect2())}).`},
        effect1(x = getIULevel(this.id)){
            return n(100).pow(x.pow(1.25))
        },
        effect2(x = getIULevel(this.id)){
            return n(1.5).pow(x).add(x.div(2))
        },
        cap(){return n(6)},
        type:"challenge",
    },
    42:{
        cost(x = getIULevel(this.id)){return n(4096).mul(n(4).pow(x))},
        description(){return `t4-2 - Second matter dimension generate antimatter. Infinity point*1.5.`},
        cap(){return n(1)},
        type:"challenge",
    },
    43:{
        cost(x = getIULevel(this.id)){return n(8192).mul(n(2).pow(x))},
        description(){return `t4-3 - Every level will unlock a new dimension,<br>but antimatter on start*(10^(x+1)^2/10) (*${format(this.effect())}).`},
        effect(x = getIULevel(this.id)){
            return n(10).pow(x.add(1).pow(2)).div(10)
        },
        cap(){return n(3)},
        type:"challenge",
    },
    44:{
        cost(x = getIULevel(this.id)){return n(16384).mul(n(4).pow(x))},
        description(){return `t4-4 - Based on the geometric average of all the dimensions, any /2^x^1.25(/${format(this.effect1())}).<br>Infinity point*1.75^x.(*${format(this.effect2())})`},
        effect1(x = getIULevel(this.id)){
            return n(2).pow(x.pow(1.25))
        },
        effect2(x = getIULevel(this.id)){
            return n(1.75).pow(x)
        },
        cap(){return n(3)},
        type:"challenge",
    },
    50:{
        cost(x = getIULevel(this.id)){return n(262144)},
        description(){return `t5 - Unlock dimension sacifice which boost eighth dimension(5^x).Unlock dimension sacifice autobuyer. But you can only use energy to buy eight dimension and the cost is changed.`},
        cap(){return n(1)},
        type:"main",
    },
    51:{
        cost(x = getIULevel(this.id)){return n(262144)},
        description(){return `t5.1 - Optimize the dimension automator settings, and its speed -0.5s.(go to set it again)`},
        cap(){return n(1)},
        type:"upgrade",
    },
    52:{
        cost(x = getIULevel(this.id)){return n(5e5).mul(n(5).pow(x))},
        description(){return `t5.2 - All bought dimensions mult only changes every ${format(this.effect1())} boughts.e.g. If the effect is 2, buying 2 or 3 times is the same.<br>Infinity point*(x*0.4+1).(*${format(this.effect2())})`},
        effect1(x = getIULevel(this.id)){
            return x.add(1)
        },
        effect2(x = getIULevel(this.id)){
            return x.mul(0.4).add(1)
        },
        cap(){return n(3)},
        type:"challenge",
    },
    53:{
        cost(x = getIULevel(this.id)){return n(1e6).mul(n(5).pow(x))},
        description(){return `t5.3 - All dimensions get a nerf based on its dimensionality and time.(xth dimensions /${format(this.effect1())}^x)<br>Infinity point*1.8^x(*${format(this.effect2())}).The base of sacrifice multplier +1.Increases t5.4 cap,up to 5.`},
        effect1(x = getIULevel(this.id).min(this.cap())){
            return n(1.25).pow(x.div(2).add(player.infTime.div(4).add(10).log10().sub(1)).pow(1.25)).sqrt()
        },
        effect2(x = getIULevel(this.id).min(this.cap())){
            return n(1.8).pow(x)
        },
        cap(){return getIULevel(54).add(1).min(6)},
        type:"challenge",
    },
    54:{
        cost(x = getIULevel(this.id)){return n(1e6).mul(n(5).pow(x))},
        description(){return `t5.4 - Energy is produced by 1 dimension higher.(Currently: ${ord[this.effect1()]} dimension)<br>Infinity point*2^x(*${format(this.effect2())}).The base of sacrifice multplier +1.Increases t5.3 cap,up to 6.`},
        effect1(x = getIULevel(this.id).min(this.cap())){
            return x.add(1)
        },
        effect2(x = getIULevel(this.id).min(this.cap())){
            return n(2).pow(x)
        },
        cap(){return getIULevel(53).add(1).min(5)},
        type:"challenge",
    },
    60:{
        cost(x = getIULevel(this.id)){return n(2.5e6)},
        description(){return `t6 - t3's multplier to antimatter ^2, Infinity points boosts the base of sacrifice(+ ${format(this.effect())}).`},
        effect(x = getIULevel(this.id)){
            return player.ip.div(1e5).add(1).log10()
        },
        cap(){return n(1)},
        type:"main",
    },
    61:{
        cost(x = getIULevel(this.id)){return n(2.5e6).mul(n(4).pow(x))},
        description(){return `t6.1 - Boost the effect of energy.(^${format(this.effect(),3)})`},
        effect(x = getIULevel(this.id)){
            return x.div(40).add(1)
        },
        cap(){return n(4)},
        type:"upgrade",
    },
    62:{
        cost(x = getIULevel(this.id)){return n(4e6)},
        description(){return `t6.2 - Disable seventh dimension(t4.4 skips 7th dimension),eighth dimensions produces sixth dimensions outside the time warp of t2.2 and t2.4.<br>Infinity point*1.75.`},
        cap(){return n(1)},
        type:"challenge",
    },
    63:{
        cost(x = getIULevel(this.id)){return n(6666666).mul(n(3).pow(x))},
        description(){return `t6.3 - Infinity point boost energy gain.(*${format(this.effect())})`},
        effect(x = getIULevel(this.id)){
            return player.ip.div(1e4).add(1).pow(x.div(1.33).add(1).log10().mul(2))
        },
        cap(){return n(4)},
        type:"upgrade",
    },
    64:{
        cost(x = getIULevel(this.id)){return n(1e7).mul(n(4).pow(x))},
        description(){return `t6.4 - Antimatter increases on sacrifice.(*${format(this.effect1())})<br>Infinity point*1.6^x.(*${format(this.effect2())})`},
        effect1(x = getIULevel(this.id)){
            return n(100).pow(x.pow(1.25))
        },
        effect2(x = getIULevel(this.id)){
            return n(1.6).pow(x)
        },
        cap(){return n(5)},
        type:"challenge",
    },
}
for(i in iu) iu[i].id = i

function iuEnabled(id){
    id = Number(id)
    if(id%10) return iuEnabled(id-id%10) && getIULevel(id-id%10).gt(0)
    if(id == 10) return true
    return getIULevel(id-10).gt(0) && iuEnabled(id-10)
}
function hasIU(id){
    return player.iu[id].gte(1) && iuEnabled(id)
}
function getIULevel(id){
    id = Number(id)
    //if(player.iu[id-id%10].lt(1)) return zero
    return player.iu[id]
}
function getIUEffect(id,extra = "",level){
    if(!level) level = player.iu[id]
    if(!iuEnabled(id)) return iu[id]["effect"+extra](zero)
    return iu[id]["effect"+extra](level)
}
function getIUCost(id,level){
    if(!level) level = player.iu[id]
    return iu[id].cost(level)
}

function canBuyIU(id){
    var level = getIULevel(id)
    var cost = getIUCost(id,level)
    if(iu[id].cap) if(level.gte(iu[id].cap())) return false
    if(player.ip.lt(cost)) return false
    return true
}

function buyIU(id){
    if(shift){downgradeIU(id);return}
    if(!canBuyIU(id)) return
    player.ip = player.ip.sub(getIUCost(id))
    player.iu[id] = player.iu[id].add(1)    
    inf()
}

function downgradeIU(id){
    if(player.iu[id].lt(1)) return
    player.iu[id] = player.iu[id].sub(1)
    player.ip = player.ip.add(getIUCost(id,player.iu[id]))
    inf()
}

function getENGain(){
    var gain = player.am.sub(1).min(getNDproc(1).mul(diff)).div(100).max(0)
    if(hasIU(54)) gain = player.am.sub(1).min(getNDproc(getIUEffect(54,1).toNumber()).mul(diff)).div(100).max(0)
    if(hasIU(63)) gain = gain.mul(getIUEffect(63))
    return gain
}
function getENEffect(){
    var eff = player.energy.add(1)
    if(hasIU(30)) eff = eff.pow(0.8)
    if(hasIU(61)) eff = eff.pow(getIUEffect(61))
    return eff
}

function inf(){
    //if(player.am.neq(1) && !force) return
    tmpNDmult = [null,zero,zero,zero,zero,zero,zero,zero,zero]
    player.ip = player.ip.add(getInfGain())
    player.infinitied = true
    player.infTime = n(0)
    player.energy = n(0)
    player.rewinded = false
    player.sacrifice = n(0)
    sacrificeAutoCDTicker = n(0)

    player.am = getStartAM()
    for(dim=1;dim<=8;dim++){
        player.nd[dim].num = zero
        player.nd[dim].bought = zero
    }
}

function getStartAM(){
    var am = ten
    if(hasIU(10)) am = n(1000)
    if(hasIU(23)) am = n(1e5)

    if(hasIU(30)) am = am.mul(getIUEffect(30,2))
    if(hasIU(43)) am = am.mul(getIUEffect(43))
    return am
}

function getInfGain(force){
    if(player.am.neq(1) && !force) return zero
    var gain = one

    if(hasIU(10)) gain = gain.mul(2)
    if(hasIU(12)) gain = gain.mul(getIUEffect(12,2))
    if(hasIU(14)) gain = gain.mul(1.5)

    if(hasIU(20)) gain = gain.mul(getIUEffect(20))
    if(hasIU(24)) gain = gain.mul(getIUEffect(24,2))

    if(hasIU(30)) gain = gain.mul(getIUEffect(30,3))
    if(hasIU(32)) gain = gain.mul(0.8)
    if(hasIU(33)) gain = gain.mul(1.8)
    if(hasIU(34)) gain = gain.mul(getIUEffect(34,2))

    if(hasIU(40)) gain = gain.mul(0.75)
    if(hasIU(41)) gain = gain.mul(getIUEffect(41,2))
    if(hasIU(42)) gain = gain.mul(1.5)
    if(hasIU(44)) gain = gain.mul(getIUEffect(44,2))
    
    if(hasIU(52)) gain = gain.mul(getIUEffect(52,2))
    if(hasIU(53)) gain = gain.mul(getIUEffect(53,2))
    if(hasIU(54)) gain = gain.mul(getIUEffect(54,2))
    
    if(hasIU(62)) gain = gain.mul(1.75)
    if(hasIU(64)) gain = gain.mul(getIUEffect(54,2))
    return gain.floor()
}