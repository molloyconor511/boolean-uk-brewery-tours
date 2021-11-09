let state = { 
  selectStateInput: "",
  breweries: [],
  cities: [],
  filters: {
    type: "",
    city: [],
    search: ""   
  }
};

function render() {
  renderBreweriesList(state);
};

function setState(newState) {
  //console.log("newState", newState);
  state = { ...state, ...newState };
  //console.log("state", state);
  render();
};


function filterBreweries(data) {
  const filteredBreweries = data.filter(beerType => (
    beerType.brewery_type === "micro" ||
    beerType.brewery_type === "regional" || 
    beerType.brewery_type === "brewpub"
    )
  );
  return filteredBreweries;
};


const selectState = document.querySelector("#select-state-form");
  selectState.addEventListener("submit", function(event) { 

    event.preventDefault();

    const selectStateInput= document.querySelector("#select-state");
    //console.log(selectStateInput);
  
    const stateInput= selectStateInput.value;
    
    //console.log("Form Submitted", stateInput);

    fetch(`https://api.openbrewerydb.org/breweries?by_state=${stateInput}`)
      .then((res) => res.json() )
      .then((data) => {
        console.log(data) ;
        const breweries = filterBreweries(data);
        //const filterByCity = filterCities(data);
        setState({breweries});
      });
  });

const mainEl = document.querySelector("main");

const headerH1= document.createElement("h1");
  headerH1.innerText="List Of Breweries";
  mainEl.append(headerH1);

const header = document.createElement("header");
  header.className= "search-bar";
  mainEl.append(header);

const searchForm = document.createElement("form");
  searchForm.id="search-breweries-form";
  header.append(searchForm);

const searchLabel=document.createElement("label"); 
  searchLabel.setAttribute("for", "search-breweries");
  searchForm.append(searchLabel);

const searchH2 = document.createElement("h2");
  searchH2.innerText= "Search Breweries";
  searchLabel.append(searchH2);

const searchInput = document.createElement("input");
  searchInput.id= "search-breweries"; 
  searchInput.innerText= `${searchH2.value}`;
  searchForm.append(searchInput);
  
const article = document.createElement("article");
  mainEl.append(article);

const listEl = document.createElement("ul");
  listEl.className= "breweries-list";
  article.append(listEl);


function renderBreweriesList(state) {


  const breweries = state.breweries;
  for (let i = 0; i < breweries.length; i++) {

    brewery = breweries[i];
    
    const newLi = document.createElement("li");
      listEl.append(newLi);

    const listH2 = document.createElement("h2");
      listH2.innerText= breweries[i].name;
      newLi.append(listH2);

    const divEl = document.createElement("div");
      divEl.className= "type";
      divEl.innerText= `${breweries[i].brewery_type}`;
      newLi.append(divEl);

    const addressSection = document.createElement("section");
      addressSection.className= "address";
      newLi.append(addressSection);

    const h3Address = document.createElement("h3");
      h3Address.innerText= "Address:";
      addressSection.append(h3Address);

    const pAddress1 = document.createElement("p");
      pAddress1.innerText=breweries[i].street;
      addressSection.append(pAddress1);

    const pAddress2 = document.createElement("p");
      addressSection.append(pAddress2);

    const strong = document.createElement("strong");
      strong.innerText= `${breweries[i].city}, ${breweries[i].postal_code}`;
      pAddress2.append(strong);
    
    const phoneSection= document.createElement("section");
      phoneSection.className= "phone";
      newLi.append(phoneSection);

    const phoneH3= document.createElement("h3");
      phoneH3.innerText= "Phone:";
      phoneSection.append(phoneH3);

    const pPhone = document.createElement("p");
      pPhone.innerText= `${breweries[i].phone}`;
      phoneSection.append(pPhone);

    const anchorSection = document.createElement("section");
      anchorSection.className="link";
      newLi.append(anchorSection);

    const anchor = document.createElement("a");
      anchor.href= `${breweries[i].website_url}`;
      anchor.target=  "_blank";
      anchor.innerText= "Visit Website";
      anchorSection.append(anchor);

  };
};
//function filters(sta {

  const filterSection = document.createElement("aside");
    filterSection.className= "filters-section";
    mainEl.append(filterSection);

  const asideH2 = document.createElement("h2");
    asideH2.innerText= "Filter By:";
    filterSection.append(asideH2);

  const filterForm = document.createElement("form");
    filterForm.id= "filter-by-type-form";
    filterForm.addEventListener("change", function(event) {
      beerType = filterSelect.value;
    })
    filterSection.append(filterForm);
  
  const filterLabel = document.createElement("label");
    filterLabel.setAttribute("for", "filter-by-type");
    // filterLabel.innerText="Type of Brewery";
    filterForm.append(filterLabel);

  const filterH3 = document.createElement("h3");
    filterH3.innerText= "Type of Brewery";
    filterLabel.append(filterH3);

  const filterSelect = document.createElement("select");
    //filterSelect.name= "filter-by-type";
    filterSelect.id= "filter-by-type";
    //filterSelect.size= 4;
    filterForm.append(filterSelect);

  const filterOption = document.createElement("option");
    filterOption.value= "";
    filterOption.innerText= "Select a type...";
    filterSelect.append(filterOption);

  const filterOptionMicro = document.createElement("option");
    filterOptionMicro.value="micro";
    filterOptionMicro.innerText="Micro";
    filterSelect.append(filterOptionMicro);

  const filterOptionRegional = document.createElement("option");
    filterOptionRegional.value="regional";
    filterOptionRegional.innerText="Regional";
    filterSelect.append(filterOptionRegional);

  const filterOptionBrewpub = document.createElement("option");
    filterOptionBrewpub.value="brewpub";
    filterOptionBrewpub.innerText="Brewpub";
    filterSelect.append(filterOptionBrewpub);

  const filterByCityDiv= document.createElement("div");
    filterByCityDiv.className= "filter-by-city-heading";
    filterSection.append(filterByCityDiv);

  const filterByCityH3 = document.createElement("h3");
    filterByCityH3.innerText= "Cities";
    filterByCityDiv.append(filterByCityH3);

  const clearAll= document.createElement("button");
    clearAll.className= "clear-all-btn";
    clearAll.innerText= "Clear All";
    filterByCityDiv.append(clearAll);

  const filterCityForm = document.createElement("form");
    filterCityForm.id= "filter-by-city-form";
    filterSelect.append(filterCityForm);


  for (let i=0; i<filterByCity.length; i++) {

    const filterCityInput = document.createElement("input");
    filterCityInput.type = "checkbox";
    filterCityInput.name = `${element}`;
    filterCityInput.value = `${element}`;
    filterCityForm.append(filterCityInput);

  const filterInputLabel = document.createElement("label");
    filterInputLabel.setAttribute = `${element}`;
    filterInputLabel.innerText = `${element}`;
    filterCityForm.append(filterInputLabel);
  };


   
//};









 
  
  
