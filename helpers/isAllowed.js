module.exports = (seleteData)=>{
    var allowComments;
    if(seleteData){
        allowComments = true;
    }else{
        allowComments = false
    }

    return allowComments;
}