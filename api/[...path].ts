import app from "../server/index";

// Vercel espera una función serverless explícita. El adaptador conserva todas
// las rutas de Express y evita que el export de la instancia se trate como
// una configuración estática.
export default function handler(req: Parameters<typeof app>[0], res: Parameters<typeof app>[1]) {
  return app(req, res);
}
