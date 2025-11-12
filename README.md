# Sistema de Pagos con Patrón Strategy

Este proyecto demuestra la **diferencia entre implementar un sistema de pagos SIN usar el patrón Strategy y con él**.  
El objetivo es evidenciar cómo el patrón mejora la **escalabilidad, mantenibilidad y legibilidad del código**.

---

## Descripción del proyecto

Se desarrolló una aplicación cliente-servidor que permite simular pagos con distintos métodos (Tarjeta, PayPal, Criptomonedas, Nequi, etc.).

- **Sin Strategy:**  
  El backend utiliza una estructura rígida con condicionales (`if/else`) para determinar cómo procesar cada método de pago.  
  Cada nuevo método requiere **modificar el código existente**, lo que puede introducir errores y dificulta el mantenimiento.

- **Con Strategy:**  
  El backend aplica el **Patrón Strategy**, donde cada método de pago es una clase independiente que implementa una interfaz común.  
  El sistema detecta las estrategias automáticamente, por lo que **añadir un nuevo método** solo implica crear una nueva clase y registrarla, sin tocar el código central.

El frontend (React + Bootstrap) permite probar ambos enfoques para comparar resultados en tiempo real.

El backend con Node.js + express
