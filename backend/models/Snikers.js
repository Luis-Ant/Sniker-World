export default (sequelize, DataTypes) => {
  const Sneaker = sequelize.define(
    "Sneaker",
    {
      id_snkr: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      modelo_snkr: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      descripcion_snkr: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      marca_snkr: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      tallas_snkr: {
        type: DataTypes.ARRAY(DataTypes.FLOAT),
        allowNull: false,
      },
      precio_snkr: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      tipo_snkr: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      existencia_snkr: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      imagen_url: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
    },
    {
      tableName: "sneakers",
      timestamps: false,
    }
  );

  Sneaker.associate = (models) => {
    Sneaker.belongsToMany(models.Pedido, {
      through: models.PedidoSneaker,
      foreignKey: "id_snkr",
    });
  };

  return Sneaker;
};
