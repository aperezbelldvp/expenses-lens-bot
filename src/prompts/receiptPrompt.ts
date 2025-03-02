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

3️⃣ **Identificación correcta de los precios:**  
   - Si en la línea hay **cantidad + producto + precio**, ese precio es el **total** del producto.  
   - Si hay una **columna de "P. Unit" y otra de "Importe"**, el primer precio es el unitario y el segundo es el total.  
   - **Ejemplo:**  
     \`\`\`
     Descripción        P. Unit    Importe
     1 +PROT CHOCO-NATA  2,90       2,90
     2 LECHE DESN        0,79       1,58
     1 CRUNCHY PICANTE   1,00       1,00
     \`\`\`
     **Debe extraerse así:**  
     \`\`\`json
     {
       "productos": [
         { "cantidad": 1, "nombre": "+PROT CHOCO-NATA", "precio_unitario": "2,90€", "precio_total": "2,90€", "categoria": "Alimentación" },
         { "cantidad": 2, "nombre": "LECHE DESN", "precio_unitario": "0,79€", "precio_total": "1,58€", "categoria": "Alimentación" },
         { "cantidad": 1, "nombre": "CRUNCHY PICANTE", "precio_unitario": "1,00€", "precio_total": "1,00€", "categoria": "Alimentación" }
       ]
     }
     \`\`\`

4️⃣ **Cálculo del subtotal, IVA y total:**  
   - 📌 **El "total" ya incluye el IVA, NO lo sumes de nuevo.**  
   - 📌 **El subtotal es la base imponible (total sin IVA).**  
   - 📌 **El IVA es la diferencia entre el total y el subtotal.**  
   - Ejemplo:  
     - Si el ticket dice:  
       \`\`\`
       TOTAL (€) 1,60  
       BASE IMPONIBLE 1,54  
       IVA 0,06  
       \`\`\`
     - La salida correcta debe ser:  
       \`\`\`json
       {
         "subtotal": "1,54€",
         "iva": "0,06€",
         "total": "1,60€"
       }
       \`\`\`

5️⃣ **El JSON de salida debe tener este formato:**  
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