const formSearch = document.querySelector('form');
const searchInput = document.querySelector('#searchInput');
const ulList = document.querySelector('#ulList');


const searchShows = async (searchValue)=>{
    try{
        const requestShows = await axios.get(`https://api.tvmaze.com/search/shows?q=${searchValue}`)
        const showList = requestShows.data;
        for(let show of showList){
            createSearchItem(show);
        }
    }catch(e){
        return 'No results available. :('
    }   
}

// console.log(showsList[1].show.name);

const section = document.querySelector('#searchSect');
section.classList.add('m-0');
const createSearchItem = (searchObject)=>{
    const card = document.createElement('div');
    const imageBody = document.createElement('div')
    const imageitem = document.createElement('img');
    const cardBody = document.createElement('div');
    const cardTittle = document.createElement('h5');
    card.classList.add('card', 'd-inline-block', 'm-2');
    cardBody.classList.add('d-inline-block', 'ml-1');
    cardTittle.classList.add('card-tittle');
    imageitem.classList.add( 'img-fluid');
    imageBody.classList.add('d-inline-block');

    cardTittle.innerText = searchObject.show.name;
    imageitem.src =searchObject.show.image.medium;

    imageBody.append(imageitem);
    card.append(imageBody);
    cardBody.append(cardTittle);
    card.append(cardBody);
    section.append(card)
}

const removeLastSearch = ()=>{
    const lastSearch = document.querySelectorAll('.card');
    for(let item of lastSearch){
        item.remove();
    }
}
const removeAlert = ()=>{
    const alert = document.querySelector('.alert');
    alert.remove();
}

formSearch.addEventListener('submit', (e)=>{
    e.preventDefault();
    removeLastSearch();
    
    searchShows(searchInput.value);
})
