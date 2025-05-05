// backend/services/orderService.js
import transporter from "../config/nodemailer.js";
import ejs from "ejs";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "url";
import db from "../config/database.js"; // Importa el objeto 'db'
import { or } from "sequelize";

const { Pedido, PedidoSneaker, Usuario, Sneaker } = db; // Accede a los modelos directamente desde 'db'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const orderService = {
  async registrarPedidoYEnviarFactura(usuarioId, carritoItems, totalPedido) {
    const transaction = await db.sequelize.transaction();
    let pedidoCreado;

    try {
      pedidoCreado = await Pedido.create(
        {
          fecha_pedido: new Date(),
          total_pedido: totalPedido,
          id_usr: usuarioId,
        },
        { transaction }
      );

      const pedidoSneakerItems = carritoItems.map((item) => ({
        id_pedido: pedidoCreado.id_pedido,
        id_snkr: item.id_snkr,
        talla_ps: item.talla,
        cantidad_ps: item.cantidad,
      }));

      await PedidoSneaker.bulkCreate(pedidoSneakerItems, { transaction });

      // Actualizar la existencia de los sneakers
      for (const item of carritoItems) {
        const sneaker = await Sneaker.findByPk(item.id_snkr, { transaction });
        if (!sneaker) {
          await transaction.rollback();
          throw new Error(
            `El sneaker con ID ${item.id_snkr} no fue encontrado.`
          );
        }
        if (sneaker.existencia_snkr < item.cantidad) {
          await transaction.rollback();
          throw new Error(
            `No hay suficiente stock para el sneaker con ID ${item.id_snkr}. Stock actual: ${sneaker.existencia_snkr}, Cantidad requerida: ${item.cantidad}`
          );
        }
        await Sneaker.update(
          { existencia_snkr: sneaker.existencia_snkr - item.cantidad },
          { where: { id_snkr: item.id_snkr }, transaction }
        );
      }

      const pedidoConDetalles = await Pedido.findByPk(pedidoCreado.id_pedido, {
        include: [
          {
            model: Usuario,
            attributes: [
              "id_usr",
              "nombre_usr",
              "apellido_usr",
              "correo_usr",
              "direccion_usr",
            ],
          },
          {
            model: Sneaker,
            through: {
              model: PedidoSneaker,
              attributes: ["talla_ps", "cantidad_ps"],
            },
          },
        ],
        transaction,
      });

      if (pedidoConDetalles && pedidoConDetalles.Usuario) {
        await this.enviarFacturaPorCorreo(
          pedidoConDetalles,
          pedidoConDetalles.Usuario
        );
        await transaction.commit();
        return { success: true, pedidoId: pedidoCreado.id_pedido };
      } else {
        await transaction.rollback();
        throw new Error(
          "No se pudieron recuperar los detalles del pedido o del usuario."
        );
      }
    } catch (error) {
      await transaction.rollback();
      console.error("Error al registrar el pedido y enviar la factura:", error);
      throw error;
    }
  },

  async enviarFacturaPorCorreo(pedido, usuario) {
    try {
      const templatePath = path.join(
        __dirname,
        "../templates/invoiceEmailTemplate.ejs"
      );
      const template = await fs.readFile(templatePath, "utf-8");

      const detallesPedido = pedido.Sneakers.map((sneaker) => ({
        modelo_snkr: sneaker.modelo_snkr,
        talla: sneaker.PedidoSneaker.talla_ps,
        cantidad: sneaker.PedidoSneaker.cantidad_ps,
        precio: sneaker.precio_snkr,
        subtotal_item: (
          sneaker.precio_snkr * sneaker.PedidoSneaker.cantidad_ps
        ).toFixed(2),
      }));

      const dataParaFactura = {
        pedido: {
          id_pedido: pedido.id_pedido,
          fecha_pedido:
            new Date(pedido.fecha_pedido).toLocaleDateString() +
            " " +
            new Date(pedido.fecha_pedido).toLocaleTimeString(),
          total_pedido: pedido.total_pedido.toFixed(2),
          detalles: detallesPedido,
          costo_envio: pedido.costo_envio
            ? pedido.costo_envio.toFixed(2)
            : "0.00",
        },
        usuario: {
          nombre_usr: usuario.nombre_usr,
          apellido_usr: usuario.apellido_usr,
          correo_usr: usuario.correo_usr,
          direccion_usr: usuario.direccion_usr,
        },
      };

      const htmlFactura = ejs.render(template, dataParaFactura);

      const mailOptions = {
        from: `Sniker World <${process.env.EMAIL_USER}>`,
        to: usuario.correo_usr,
        subject: `Factura de Pedido #${pedido.id_pedido} - Sniker World`,
        html: htmlFactura,
      };

      const info = await transporter.sendMail(mailOptions);
      console.log("Factura enviada:", info.messageId);
      return true;
    } catch (error) {
      console.error("Error al enviar la factura por correo:", error);
      return false;
    }
  },

  async obtenerPedidosPorUsuario(usuarioId) {
    try {
      const pedidos = await Pedido.findAll({
        where: { id_usr: usuarioId },
        order: [["fecha_pedido", "DESC"]],
        include: [
          {
            model: Sneaker,
            through: {
              model: PedidoSneaker,
              attributes: ["talla_ps", "cantidad_ps"],
            },
          },
        ],
      });
      return pedidos;
    } catch (error) {
      console.error("Error al obtener los pedidos:", error);
      throw error;
    }
  },
};

export default orderService;
