module.exports = (diaries)=>{
    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
    ];
    
    if(typeof diaries === Object){
        diaries[i].day = date.getDate();
        diaries[i].month = monthNames[date.getMonth()];
        diaries[i].year = date.getFullYear();
        diaries[i].rand = Math.floor(Math.random() * 5 ) + 1;
    }
    else{
        for(let i=0; i<diaries.length; i++){
            let date = new Date(diaries[i].date);
            console.log(date.getDate());
            diaries[i].day = date.getDate();
            diaries[i].month = monthNames[date.getMonth()];
            diaries[i].year = date.getFullYear();
            diaries[i].rand = Math.floor(Math.random() * 5 ) + 1;
        }
    }

    

    return diaries;
}