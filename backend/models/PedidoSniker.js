export default (sequelize, DataTypes) => {
  const PedidoSneaker = sequelize.define(
    "PedidoSneaker",
    {
      id_ps: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      talla_ps: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      cantidad_ps: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "pedidos_sneakers",
      timestamps: false,
    }
  );

  PedidoSneaker.associate = (models) => {
    PedidoSneaker.belongsTo(models.Pedido, { foreignKey: "id_pedido" });
    PedidoSneaker.belongsTo(models.Sneaker, { foreignKey: "id_snkr" });
  };

  return PedidoSneaker;
};
