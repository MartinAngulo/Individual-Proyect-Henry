require('dotenv').config();
const { Router } = require('express');
const { Op } = require('sequelize')
const axios = require('axios');
const { COUNTRY_API, DB_PASSWORD } = process.env;
const { Country, TurisActivity } = require('../db');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();

//This Function request all countries to the API 
const getAllCountries = async () => {
    const success = await Country.findAll();
    // console.log(COUNTRY_API, DB_PASSWORD)
    //If all countries are already into DB
    if (success.length > 0) return 'DB already loaded';

    //Otherwise, request all data to the API
    else {
        const allCountries = await axios.get(`${COUNTRY_API}/all`); //GET request to Country API
        let info = []; //New array to save the response request fix

        await allCountries.data.forEach(country => {
            info.push({
                'id': country.cca3,
                'name': country.name.common,
                'imgFlag': country.flags[1],
                'continent': country.region,
                'capital':
                    country.capital ? country.capital[0] : 'no se encontro',
                'subregion': country.subregion,
                'area': country.area,
                'population': country.population
            })
        }); //This added all countries to New Array
        // console.log(info);
        await Country.bulkCreate(info);//This create all rows into DB with all countries Data
        return 'All countries added into DB successful';
    }
}

// const getCountry = async(countryId)=>{

// }

router.get('', async (req, res) => {
    // await getAllCountries();
    const countriesDB = await Country.findAll();
    const { name } = req.query;

    try {
        if (name) {
            const country = await Country.findAll({
                where: {
                    name: {
                        [Op.startsWith]: name.toUpperCase()
                    }
                }
            });
            return res.status(200).json(country);

        } else {
            return res.status(200).json(countriesDB);
        }
    }
    catch (err) {
        return res.status(400).json(`Ocurrio un error: ${err}`);
    }
}); // This route returns all countries from DB or the country with the name receive from query

router.get('/:countryId', async (req, res) => {
    // await getAllCountries();
    const countryId = req.params.countryId.toUpperCase();

    if (countryId.length > 3) return res.status(400).send(`The country Id mustn't have more than 3 letters`)
    try {
        const country = await Country.findByPk(
            countryId,
            { include: TurisActivity }
        );

        return (
            country
                ?
                res.status(201).json(country)
                :
                res.status(404).json(`The country Id: ${countryId} is wrong`)
        )
    }
    catch (err) {
        res.send(err);
    }
});

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
