const config = {
    // api_domain: 'https://country-api.azurewebsites.net',
    api_domain: 'http://localhost:3001',
    seasonsOptions: [
        {value:'spring', label:'Spring'},
        {value:'autumn', label:'Autumn'},
        {value:'winter', label:'Winter'},
        {value:'summer', label:'Summer'},
    ],
    dificulty: [
        {value:1, label:'1 Easy'},
        {value:2, label:'2 Normal'},
        {value:3, label:'3 Intermediate'},
        {value:4, label:'4 Hard'},
        {value:5, label:'5 Very Hard'},
    ],
    duration: [
        {value:1, label:'1 hour'},
        {value:2, label:'2 hours'},
        {value:3, label:'3 hours'},
        {value:4, label:'4 hours'},
        {value:5, label:'5 hours'},
    ],
    namefilter: [
        {value:'ASC', label:'A-Z'},
        {value:'DESC', label:'Z-A'},
    ],
    populationFilter: [
        {value:'ASC', label:'Ascendent'},
        {value:'DESC', label:'Descendent'},
    ],
    sizeFilter: [
        {value:'ASC', label:'Ascendent'},
        {value:'DESC', label:'Descendent'},
    ],
    continentFilter: [
        {value:"Americas", label:'Americas'},
        {value:"Europe", label:'Europe'},
        {value:"Asia", label:'Asia'},
        {value:"Africa", label:'Africa'},
        {value:"Antartic", label:'Antartic'},
        {value:"Oceania", label:'Oceania'},
    ],
    contFilter: (countries, prop)=>{
        return countries.filter(a=>a.continent===prop);
    },
    
}

export default config;