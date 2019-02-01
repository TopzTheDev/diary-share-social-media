
document.getElementById('btn_exit').addEventListener('click', (e)=>{

    document.querySelector('.cover').style.transform= 'scale(0)';
    document.querySelector('.popup-form').style.transform= 'translate(-50%, -50%) scale(0)';
});

document.getElementById('btn_register').addEventListener('click', (e)=>{

    document.querySelector('.cover').style.transform= 'scale(1)';
    document.querySelector('.popup-form').style.transform= ' translate(-50%, -50%) scale(1)';

    e.preventDefault();
});



