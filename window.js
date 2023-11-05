function c(e){return document.getElementById(e)}
function a(e){return c(e).value}
function b(e){return c(e)[c(e).selectedIndex].value}
d=new Date()

onload=function(){reset()}
function reset(){
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
    c('incTime').selectedIndex=0
    c('mode').selectedIndex=0
}

function getTS(){return Math.floor(Date.parse(`${a('day')} ${b('month')} ${a('year')} ${a('hour')}:${a('minute')}:00 UTC${b('tid')}${a('time')}`)/1000)}
function getMSG(){
    switch(b('mode')){
        case '0': return `${a('event')} ${a('at')} <t:${getTS()}:${b('incTime')}>, <t:${getTS()}:R>`
        case '1': return `${a('event')} ${a('at')} <t:${getTS()}:${b('incTime')}>`
        case '2': return `${a('event')} ${a('at')} <t:${getTS()}:R>`
    }
}