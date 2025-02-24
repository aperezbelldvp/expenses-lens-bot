export const receiptPrompt = (text: string): string => `
Tienes un texto extraído de un ticket de compra.  
Tu tarea es extraer la información correctamente siguiendo estas reglas:  

🔹 **Reglas para extraer los productos correctamente:**  
1️⃣ **El primer número SIEMPRE indica la cantidad de productos, el resto es el nombre del producto, aunque incluya números**  
   - Puede ser parte del nombre del producto.  
   - Por ejemplo, "1 5 BOCADILLOS" significa "1 unidad del producto llamado '5 bocadillos'".  

2️⃣ **Si hay un precio a la derecha, y un número aislado ANTES del nombre del producto, ese número es la cantidad.**  
   - Ejemplo: "2 PAN DE MOLDE 1,50" significa que se compraron 2 unidades de "PAN DE MOLDE" a 1,50€ cada una.  
   - Pero "1 5 BOCADILLOS 1,19" significa que se compró **1 unidad** de un paquete de 5 bocadillos por 1,19€.  

3️⃣ **Extrae también los siguientes datos del ticket:**  
   - **Subtotal (sin IVA)**
   - **IVA total**
   - **Total (con IVA)**

4️⃣ **El JSON de salida debe tener este formato:**  
{
  "subtotal": "XX.XX€",
  "iva": "XX.XX€",
  "total": "XX.XX€",
  "productos": [
    { "cantidad": X, "nombre": "Producto1", "precio_unitario": "X.XX€", "precio_total": "X.XX€", "categoria": "Categoría" },
    { "cantidad": X, "nombre": "Producto2", "precio_unitario": "X.XX€", "precio_total": "X.XX€", "categoria": "Categoría" }
  ]
}

📌 **Ejemplo correcto:**  
Si en el ticket aparece: 
TOTAL (€) 23,91
BASE IMPONIBLE 20,69
IVA 3,22
El JSON correcto debe ser:  
{
  "subtotal": "20,69€",
  "iva": "3,22€",
  "total": "23,91€",
  "productos": [
    { "cantidad": 1, "nombre": "5 BOCADILLOS", "precio_unitario": "1,19€", "precio_total": "1,19€", "categoria": "Alimentación" },
    { "cantidad": 2, "nombre": "PAN DE MOLDE", "precio_unitario": "1,50€", "precio_total": "3,00€", "categoria": "Alimentación" }
  ]
}

📌 **Aquí está el ticket real que debes analizar:**  
${text}
`;