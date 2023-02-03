// Theme switch
const switchTheme = document.getElementById('switch');

const moonDark = document.getElementById('moonDark');
const moonLight = document.getElementById('moonLight');

const searchDark = document.getElementById('searchDark');
const searchLight = document.getElementById('searchLight');

const downDark = document.getElementById('downDark');
const downLight = document.getElementById('downLight');

switchTheme.addEventListener('click', () => 
{
    console.log('here');
    document.body.classList.toggle('themeLight');
    document.body.classList.toggle('themeDark');

    moonLight.classList.toggle('none');
    moonDark.classList.toggle('none');

    searchLight.classList.toggle('none');
    searchDark.classList.toggle('none');

    downLight.classList.toggle('none');
    downDark.classList.toggle('none');
});

// Dropdown menu
const dropdwnbtn = document.getElementById('dropbtn');
const dropdwncontent = document.getElementById('drop-content');

dropdwnbtn.addEventListener('click', () => 
{
    dropdwncontent.classList.toggle('none');
});
