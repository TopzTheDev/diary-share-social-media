module.exports = (googleCover)=>{
    let coverPhoto = '';
    const collectionPhotos = ['https://cdn.dribbble.com/users/257709/screenshots/5257468/next_gen-land_1_2x.png'];
    if(typeof googleCover === "undefined"){
        coverPhoto = collectionPhotos[Math.floor(Math.random() * collectionPhotos.length-1) + 1];
    }else{
        coverPhoto = googleCover.coverPhoto;
    }
    return coverPhoto;
}