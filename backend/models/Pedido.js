export default (sequelize, DataTypes) => {
  const Pedido = sequelize.define(
    "Pedido",
    {
      id_pedido: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      fecha_pedido: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      total_pedido: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },
    {
      tableName: "pedidos",
      timestamps: false,
    }
  );

  Pedido.associate = (models) => {
    Pedido.belongsTo(models.Usuario, { foreignKey: "id_usr" });
    Pedido.belongsToMany(models.Sneaker, {
      through: models.PedidoSneaker,
      foreignKey: "id_pedido",
    });
  };

  return Pedido;
};
