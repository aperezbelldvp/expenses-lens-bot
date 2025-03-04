export const receiptPrompt = (text: string): string => `
Tienes un texto extraído de un ticket de compra.  
Tu tarea es analizarlo y extraer correctamente la información en JSON siguiendo estas reglas:

🔹 **Reglas para extraer los productos correctamente:**  
1️⃣ **La estructura del ticket puede variar, pero en general sigue este orden:**  
   - Cantidad del producto  
   - Precio unitario (PVP o P. Unit)  
   - Nombre del producto  
   - Precio total del producto  

2️⃣ **El importe total de cada producto aparece en la última columna.**  
   - 📌 **El precio unitario es el que aparece en la columna PVP/P. Unit.**  
   - 📌 **Si la cantidad del producto es mayor a 1, el total es precio_unitario * cantidad.**  
   - 📌 **Si no hay una cantidad explícita, asume que es 1 unidad.**  
   
3️⃣ **Ejemplo correcto de extracción de productos:**  
   **Si el ticket tiene:**  
   \`\`\`
   Cant PVP Descripción Artículo Importe
   2   1,10   CABALLA EN SALSA  2,20
   1   2,90   +PROT CHOCO-NATA  2,90
   \`\`\`
   **Debe extraerse:**  
   \`\`\`json
   {
     "productos": [
       { "cantidad": 2, "nombre": "CABALLA EN SALSA", "precio_unitario": "1,10€", "precio_total": "2,20€", "categoria": "Alimentación" },
       { "cantidad": 1, "nombre": "+PROT CHOCO-NATA", "precio_unitario": "2,90€", "precio_total": "2,90€", "categoria": "Alimentación" }
     ]
   }
   \`\`\`

4️⃣ **Cálculo del subtotal, IVA y total:**  
   - 📌 **El subtotal es la suma de las bases imponibles (sin IVA).**  
   - 📌 **El IVA total es la suma de las cuotas de IVA.**  
   - 📌 **El total es la suma del subtotal + IVA.**  
   - 📌 **Es muy importante que siempre te fies del total del ticket, no lo recalcules tú.** 
   - Ejemplo:  
     \`\`\`
     BASE (€) I.V.A (%) Cuota I.V.A (€)
     6,76    10%      0,68
     3,00    21%      0,63
     0,60    2%       0,01
     \`\`\`
     **Salida JSON correcta:**  
     \`\`\`json
     {
       "subtotal": "10,36€",
       "iva": "1,32€",
       "total": "11,68€"
     }
     \`\`\`

5️⃣ **Formato de salida JSON esperado:**  
\`\`\`json
{
  "supermercado": "Nombre del Supermercado",
  "subtotal": "XX.XX€",
  "iva": "XX.XX€",
  "total": "XX.XX€",
  "fecha": "fecha de la compra",
  "productos": [
    { "cantidad": X, "nombre": "Producto1", "precio_unitario": "X.XX€", "precio_total": "X.XX€", "categoria": "Categoría" },
    { "cantidad": X, "nombre": "Producto2", "precio_unitario": "X.XX€", "precio_total": "X.XX€", "categoria": "Categoría" }
  ]
}
\`\`\`

📌 **Aquí está el ticket real que debes analizar:**  
${text}
`;
