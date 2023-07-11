levelImages = {
    "diamond":"https://boostroyal.com/cdn-cgi/image/width=160,quality=75,format=auto/images/divisions/tft/diamond.png",

    "master":"https://boostroyal.com/cdn-cgi/image/width=80,quality=75,format=auto/images/divisions/tft/master.png",

    "iron":"https://boostroyal.com/cdn-cgi/image/width=80,quality=75,format=auto/images/divisions/tft/iron.png",

    "bronze":"https://boostroyal.com/cdn-cgi/image/width=80,quality=75,format=auto/images/divisions/tft/bronze.png",

    "silver":"https://boostroyal.com/cdn-cgi/image/width=80,quality=75,format=auto/images/divisions/tft/silver.png",

    "platinum":"https://boostroyal.com/cdn-cgi/image/width=160,quality=75,format=auto/images/divisions/tft/platinum.png",

    "gold":"https://boostroyal.com/cdn-cgi/image/width=80,quality=75,format=auto/images/divisions/tft/gold.png",
}
stateValues = {
    "iron-4" : 3,

    "iron-3" : 5,

    "iron-2" : 7,

    "iron-1" : 9,

    "bronze-4" : 12,

    "bronze-3" : 15,

    "bronze-2" : 18,

    "bronze-1" : 21,

    "silver-4" : 25,

    "silver-3" : 29,

    "silver-2" : 33,

    "silver-1" : 37,

    "gold-4" : 45,

    "gold-3" : 50,

    "gold-2" : 55,

    "gold-1" : 60,

    "diamond-4" : 70,

    "diamond-3" : 80,

    "diamond-2" : 90,

    "diamond-1" : 100,

    "platinum-4" : 145,

    "platinum-3" : 170,

    "platinum-2" : 195,

    "platinum-1" : 220,

    "master": 250,
}
function getCurrentState() { 
    state    = $('.current-rank [clickable=clickable].active').find('div img').attr('title').toLowerCase();
    level    = $('.current-rank [clickable="level"].active').attr('zigidkey');
    return   {"state" :state , 'level' : level}
}
function setCurrentState(data) { 
    image = levelImages[data['state']]
    $('.current-rank-image').attr("src",image)
    $('.current-rank-text').text(data['state']+ " " + data['level'])
    $('.current-bg').removeClass('diamond-bg master-bg iron-bg bronze-bg silver-bg platinum-bg gold-bg')
    $('.current-bg').addClass(data['state']+'-bg')
 }



function getDesiredState() { 
    state    = $('.desired-rank [clickable=clickable].active').find('div img').attr('title').toLowerCase();
    level    = $('.desired-rank [clickable="level"].active').attr('zigidkey');
    return   {"state" :state , 'level' : level}
}
function setDesiredState(data) { 
    image = levelImages[data['state']]
    $('.desired-rank-image').attr("src",image)
    $('.desired-rank-text').text(data['state']+ " " + data['level'])
    $('.desired-bg').removeClass('diamond-bg master-bg iron-bg bronze-bg silver-bg platinum-bg gold-bg')
    $('.desired-bg').addClass(data['state']+'-bg')
 }
function getStateValue(state) { 
    if(state="I")
        return 1 
    else if(state="II")
        return 2
    else if(state="III")
        return 3
    else if(state="IV")
        return 4
 }
function calcStateValue(state,level) {
    console.log(state);  
    level = getStateValue(state)
    return stateValues[state+"-"+level]
}

function changeState() { 
    current         = getCurrentState();
    setCurrentState(current);
    currentValue    = (current['state'] == 'master') ? 250 : calcStateValue(current['state'],current['level']) 
    desired         = getDesiredState()
    setDesiredState(desired)
    desiredValue    = (desired['state'] == 'master') ? 250 : calcStateValue(desired['state'],desired['level']) 
    amount          = desiredValue - currentValue;
    $('#payment-request-button button').prop('disabled',(amount < 0))
    $('#Cost_amount').text(amount)
}

$("[clickable=clickable]").click(function (e) { 
    e.preventDefault();
    $(this).parent().parent().parent().find('.active').removeClass('active bg-primary/20');
    $(this).addClass('active ');    
    changeState();
    
});
$("[clickable=level]").click(function (e) { 
    e.preventDefault();
    $(this).parent().find('.active').removeClass('active bg-primary').addClass('bg-white/10');
    $(this).removeClass('active bg-white/10').addClass('active bg-primary');
    changeState();

});
