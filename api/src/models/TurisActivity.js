const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('TurisActivity', {

        name: {
            type: DataTypes.STRING,
            allowNull: false,
            set(value){
                this.setDataValue('name', value.toUpperCase())
              }
        },
        difficulty: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                len: [1 - 5]
            }
        },
        duration: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        season: {
            type: DataTypes.ENUM(
                'spring', 'summer', 'winter', 'autumn'
            ),
            allowNull: false,
        }

    }, {
        timestamps: false
    });
};
