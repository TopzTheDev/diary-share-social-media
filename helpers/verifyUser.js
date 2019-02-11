module.exports = (diaries)=>{
    let arr = [];
    
    for(let i = 0; i < diaries.length; i++){
        
        if(diaries[i].user === null){
            console.log(diaries[i]);    
            diaries.splice(i,1);
        }
    }

    console.log(diaries.length);
    return diaries;
}