// Manejará la lógica de las peticiones HTTP relacionadas con los pedidos.
import orderService from "../services/orderservice.js";

const orderController = {
  async finalizarCompra(req, res) {
    const { usuarioId, carritoItems, totalPedido, costoEnvio } = req.body;

    try {
      const resultado = await orderService.registrarPedidoYEnviarFactura(
        usuarioId,
        carritoItems,
        totalPedido,
        costoEnvio // Pasa costoEnvio al servicio si es necesario para el registro
      );

      if (resultado.success) {
        res.status(200).json({
          message: "Pedido registrado exitosamente y factura enviada.",
          pedidoId: resultado.pedidoId,
        });
        // Aquí podrías implementar la lógica para limpiar el carrito del usuario
      } else {
        res
          .status(500)
          .json({ error: "Error al procesar el pedido y enviar la factura." });
      }
    } catch (error) {
      console.error(
        "Error en el controlador de finalización de compra:",
        error
      );
      res.status(500).json({
        error:
          error.message || "Error interno del servidor al finalizar la compra.",
      });
    }
  },

  async obtenerPedidos(req, res) {
    const usuarioId = req.user.id_usr;
    try {
      const pedidos = await orderService.obtenerPedidosPorUsuario(usuarioId);
      res.status(200).json(pedidos);
    } catch (error) {
      console.error("Error al obtener los pedidos:", error);
      res.status(500).json({
        error: "Error interno del servidor al obtener los pedidos.",
      });
    }
  },
};

export default orderController;
