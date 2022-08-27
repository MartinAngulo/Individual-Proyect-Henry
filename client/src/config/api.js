const config = {
    api_domain: 'https://country-api.azurewebsites.net',
    // api_domain: 'http://localhost:3001',
    links: {
        github: "https://github.com/MartinAngulo",
        lin: "https://www.linkedin.com/in/martinangulo1194",
        fb: "https://www.facebook.com/martin1194",
        ig: "https://www.instagram.com/martinx1194/",
    },
    seasonsOptions: [
        { value: 'spring', label: 'Spring' },
        { value: 'autumn', label: 'Autumn' },
        { value: 'winter', label: 'Winter' },
        { value: 'summer', label: 'Summer' },
    ],
    dificulty: [
        { value: 1, label: '1 Easy' },
        { value: 2, label: '2 Normal' },
        { value: 3, label: '3 Intermediate' },
        { value: 4, label: '4 Hard' },
        { value: 5, label: '5 Very Hard' },
    ],
    duration: [
        { value: 1, label: '1 hour' },
        { value: 2, label: '2 hours' },
        { value: 3, label: '3 hours' },
        { value: 4, label: '4 hours' },
        { value: 5, label: '5 hours' },
    ],
    pages: [
        { value: 10, label: '10 c/p' },
        // { value: 20, label: '20 c/p' },
        // { value: 30, label: '30 c/p' },
        // { value: 'max', label: 'All' },
    ],
    namefilter: [
        { value: 'ASC', label: 'A-Z' },
        { value: 'DESC', label: 'Z-A' },
    ],
    populationFilter: [
        { value: 'ASC', label: 'Ascendent' },
        { value: 'DESC', label: 'Descendent' },
    ],
    sizeFilter: [
        { value: 'ASC', label: 'Ascendent' },
        { value: 'DESC', label: 'Descendent' },
    ],
    continentFilter: [
        { value: "Americas", label: 'Americas' },
        { value: "Europe", label: 'Europe' },
        { value: "Asia", label: 'Asia' },
        { value: "Africa", label: 'Africa' },
        { value: "Antarctic", label: 'Antarctic' },
        { value: "Oceania", label: 'Oceania' },
    ],
    contFilter: (countries, prop) => {
        // return countries.reduce((a,e)=>{
        //     return a = [...a,...e.data];
        // },[])
        return countries.filter(a => a.continent === prop);
    },
    pagination: (countries, tp = 10) => {
        let max = tp;
        if (max === 'max') {
            max = countries.length
        }
        const maxPages = 1 + Math.ceil((countries.length - 9 )/ max);
        // console.log(countries.length, max)

        const paginate = [];
        for (let i = 0; i < maxPages; i++) {
            if (i === 0) {
                paginate.push({
                    page: { total: maxPages, current: 1, next: i + 1 < maxPages ? true : false },
                    data: countries.slice(0, 9)
                })
            }
            else if(maxPages > 1){
                paginate.push({
                    page: { total: maxPages, current: i + 1, next: i + 1 < maxPages ? true : false },
                    data: countries.slice(i * max-1, i * max + max-1)
                })
            }
        }

        return paginate;
    },


}

export default config;