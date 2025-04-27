export default (sequelize, DataTypes) => {
  const Usuario = sequelize.define(
    "Usuario",
    {
      id_usr: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nombre_usr: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      apellido_usr: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      correo_usr: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      telefono_usr: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      contrasena_usr: {
        type: DataTypes.STRING(250),
        allowNull: false,
      },
      direccion_usr: {
        type: DataTypes.STRING(100),
      },
    },
    {
      tableName: "usuarios",
      timestamps: false,
    }
  );

  Usuario.associate = (models) => {
    Usuario.hasMany(models.Pedido, { foreignKey: "id_usr" });
  };

  return Usuario;
};
