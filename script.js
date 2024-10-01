function showClock (){
    let dateObj =new Date;
    let month  = ['January','February','March','Aprail','May','June','July','August','Septemer','Octomber','November','December'];

    let year = dateObj.getFullYear();
    let monthNum = dateObj.getMonth();
    let dateCal = dateObj.getDate();
    let hour = dateObj.getHours();
    let min = dateObj.getMinutes();
    let sec = dateObj.getSeconds();
    let timeFormatted = toTwelveHourFormat(hour)
    
    
    // Render to element
document. querySelector('.timeAndDate').innerHTML =
    (month[monthNum] + ' ' + dateCal +',' + year + ' ' + timeFormatted['time'] + ':' + min +':'+ sec + ' ' + timeFormatted['am_pm']);
    
    // Set interval to show seconds - every second update the clock
    

}

function toTwelveHourFormat(time){
       let  am_pm = 'AM';
        if(time>12){
            time  = time-12;
            am_pm = 'PM';
        }

        return{
            time : time,
            am_pm:am_pm
        };
    }

    showClock();
    setInterval(showClock, 1000);
