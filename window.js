function c(e){return document.getElementById(e)}
function a(e){return c(e).value}
function b(e){return c(e)[c(e).selectedIndex].value}

onload=function(){reset();getMSG()}
function reset(){
    d=new Date()
    c('event').value="Event"
    c('at').value="@"
    c('year').value=d.getFullYear()
    c('month').selectedIndex=d.getMonth()
    c('day').value=d.getDate()
    c('hour').value=d.getHours()
    c('minute').value=d.getMinutes()
    c('minute').value=a('minute').padStart(2,0)
    c('time').value=Math.abs(new Date(0).getTimezoneOffset())/60
    Math.sign(d.getTimezoneOffset()) == -1 ? c('tid').selectedIndex = 0 : c('tid').selectedIndex = 1
    c('out').value=""
    c('fmt').selectedIndex=0
    c('mode').selectedIndex=0
}

function getTS(){return Math.floor(Date.parse(`${a('day')} ${b('month')} ${a('year')} ${a('hour')}:${a('minute')}:00 UTC${b('tid')}${a('time')}`)/1000)}
function getTSdate(){
    switch(b('fmt')){
        case 'd': return new Date(getTS()*1000).toLocaleDateString('en-US');
        case 'D': return new Date(getTS()*1000).toLocaleDateString('en-us',{month:"long",year:"numeric",day:"numeric"}) 
        case 'f': return `${new Date(getTS()*1000).toLocaleDateString('en-us',{month:"long",year:"numeric",day:"numeric"})} at ${(a('hour')+11)%12+1 }:${a('minute').padStart(2,0)} ${a('hour')>=12?"PM":"AM"}`
        case 'F': return `${new Date(getTS()*1000).toLocaleDateString('en-us',{weekday:"long",month:"long",year:"numeric",day:"numeric"})} at ${(a('hour')+11)%12+1 }:${a('minute').padStart(2,0)} ${a('hour')>=12?"PM":"AM"}`
    }
}

function getMSG(){
    c('view').innerHTML=`<span>${a('event')} ${a('at')} </span>`
    switch(b('mode')){
        case '0': 
            c('out').value=`${a('event')} ${a('at')} <t:${getTS()}:${b('fmt')}>, <t:${getTS()}:R>`
            c('view').innerHTML+=`<span class='ts'>${getTSdate()}</span>`
            c('view').innerHTML+=`<span>, </span>`
            c('view').innerHTML+=`<span class='ts'>${getRel(getTS())}</span>`
            break;
        case '1': 
            c('out').value=`${a('event')} ${a('at')} <t:${getTS()}:${b('fmt')}>`
            c('view').innerHTML+=`<span class='ts'>${getTSdate()}</span>`
            break;
        case '2': 
            c('out').value=`${a('event')} ${a('at')} <t:${getTS()}:R>`
            c('view').innerHTML+=`<span class='ts'>${getRel(getTS())}</span>`
            break;
    }
}

function getRel(d) {
	diff=-((new Date().getTime()/1000-new Date(d).getTime()))|0
    Math.sign(diff)==1?out='in ':out=''
    out+=getTextTS(Math.abs(diff))
    if(Math.sign(diff)==-1)out+=' ago'
    return out
}

function getTextTS(d){
    if(d > 86400*30*10*2)   {return `${Math.round(d/(86400*365))} years`}
    if(d > 86400*30*10)     {return `${Math.round(d/(86400*365))} year`}
	if(d > 86400*25*2)      {return `${Math.round(d/(86400*30))} months`}
    if(d > 86400*25)        {return `${Math.round(d/(86400*30))} month`}
	if(d > 3600*21*2)       {return `${Math.round(d/86400)} days`}
    if(d > 3600*21)         {return `${Math.round(d/86400)} day`}
	if(d > 60*44*2)         {return `${Math.round(d/3600)} hours`}
    if(d > 60*44)           {return `${Math.round(d/3600)} hour`}
	if(d > 30*2)            {return `${Math.round(d/60)} minutes`}
    if(d > 30)              {return `${Math.round(d/60)} minute`}
                            return `${d} seconds`
}