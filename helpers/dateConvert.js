module.exports = (diaries)=>{
    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
    ];
    
    if(typeof diaries === Object){
        diaries[i].day = date.getDate();
        diaries[i].month = monthNames[date.getMonth()];
        diaries[i].year = date.getFullYear();
    }
    else{
        for(let i=0; i<diaries.length; i++){
            let date = new Date(diaries[i].date);
            diaries[i].day = date.getDate();
            diaries[i].month = monthNames[date.getMonth()];
            diaries[i].year = date.getFullYear();
        }
    }
    return diaries;
}