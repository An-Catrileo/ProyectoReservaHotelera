# 📧 Instrucciones para Configurar el Envío de Correos Electrónicos

## 📋 Índice

1. [Configuración con Gmail (Gratis)](#configuración-con-gmail-gratis)
2. [Configuración en Laravel](#configuración-en-laravel)
3. [Pruebas](#pruebas)
4. [Solución de Problemas](#solución-de-problemas)
5. [Alternativas a Gmail](#alternativas-a-gmail)

---

## 🔧 Configuración con Gmail (Gratis)

### Paso 1: Habilitar la Verificación en Dos Pasos

1. Ve a tu cuenta de Google: https://myaccount.google.com/
2. En el menú de la izquierda, haz clic en **"Seguridad"**
3. Busca la sección **"Verificación en dos pasos"**
4. Si no está activada, haz clic en **"Verificación en dos pasos"** y sigue los pasos para activarla
5. Necesitarás tu teléfono para recibir códigos de verificación

### Paso 2: Crear una Contraseña de Aplicación

1. Una vez activada la verificación en dos pasos, regresa a la página de Seguridad
2. Busca la sección **"Contraseñas de aplicaciones"** o ve directamente a: https://myaccount.google.com/apppasswords
3. Es posible que te pida iniciar sesión nuevamente
4. En el formulario que aparece:
    - **Selecciona la app:** Elige "Correo"
    - **Selecciona el dispositivo:** Elige "Otro (nombre personalizado)" y escribe "Laravel Pacific Reef" o el nombre que prefieras
5. Haz clic en **"Generar"**
6. Google te mostrará una contraseña de 16 caracteres (ejemplo: `abcd efgh ijkl mnop`)
7. **⚠️ IMPORTANTE:** Copia esta contraseña y guárdala en un lugar seguro. No podrás volver a verla.

### Paso 3: Formato de la Contraseña

La contraseña generada se ve así con espacios:

```
abcd efgh ijkl mnop
```

Pero debes escribirla **SIN ESPACIOS** en tu archivo `.env`:

```
abcdefghijklmnop
```

---

## ⚙️ Configuración en Laravel

### Paso 1: Editar el Archivo .env

1. Abre el archivo `.env` en la raíz de tu proyecto Laravel
2. Busca las líneas que comienzan con `MAIL_` o agrégalas si no existen
3. Reemplázalas con la siguiente configuración:

```env
MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=tu-email@gmail.com
MAIL_PASSWORD=abcdefghijklmnop
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS="tu-email@gmail.com"
MAIL_FROM_NAME="Pacific Reef Hotel"
```

### Paso 2: Reemplazar los Valores

-   `MAIL_USERNAME`: Tu dirección de correo completa de Gmail (ejemplo: `tuusuario@gmail.com`)
-   `MAIL_PASSWORD`: La contraseña de aplicación de 16 caracteres **SIN ESPACIOS**
-   `MAIL_FROM_ADDRESS`: Tu dirección de correo de Gmail (puede ser la misma que `MAIL_USERNAME`)
-   `MAIL_FROM_NAME`: El nombre que aparecerá como remitente

### Paso 3: Limpiar el Caché de Configuración

Después de editar el `.env`, ejecuta estos comandos en tu terminal:

```bash
cd pacificreef
php artisan config:clear
php artisan cache:clear
```

---

## 🧪 Pruebas

### Opción 1: Usar el Sistema de Pagos

1. Inicia tu servidor Laravel:

    ```bash
    php artisan serve
    ```

2. Inicia el servidor de Vite (en otra terminal):

    ```bash
    npm run dev
    # o si usas pnpm:
    pnpm dev
    ```

3. Ve a tu aplicación y realiza un pago de prueba
4. Revisa tu bandeja de entrada del correo configurado

### Opción 2: Probar con Tinker (Modo Desarrollo)

Si quieres probar sin hacer un pago completo:

```bash
php artisan tinker
```

Luego ejecuta:

```php
// Obtener una reserva existente y su último pago
$reservation = \App\Models\Reservation::with(['payments', 'user'])->first();
$payment = $reservation->payments()->first();

// Enviar el correo de prueba
\Illuminate\Support\Facades\Mail::to('tu-email@gmail.com')
    ->send(new \App\Mail\PaymentReceipt($reservation, $payment));

// Salir de tinker
exit
```

### Opción 3: Modo Log (Para Desarrollo)

Si solo quieres probar sin enviar correos reales:

1. En el archivo `.env`, cambia:

    ```env
    MAIL_MAILER=log
    ```

2. Los correos se guardarán en: `storage/logs/laravel.log`

3. Puedes verlos con:

    ```bash
    tail -f storage/logs/laravel.log
    ```

4. **No olvides volver a cambiar a `smtp` cuando quieras enviar correos reales**

---

## 🔍 Solución de Problemas

### Error: "Failed to authenticate on SMTP server"

**Causa:** Credenciales incorrectas

**Solución:**

-   Verifica que el correo en `MAIL_USERNAME` sea correcto
-   Verifica que la contraseña de aplicación no tenga espacios
-   Asegúrate de haber habilitado la verificación en dos pasos
-   Genera una nueva contraseña de aplicación

### Error: "Connection could not be established with host smtp.gmail.com"

**Causa:** Problemas de conexión o configuración incorrecta

**Solución:**

-   Verifica tu conexión a internet
-   Asegúrate de que el puerto sea `587`
-   Verifica que `MAIL_ENCRYPTION` sea `tls`
-   Revisa si tu firewall o antivirus está bloqueando la conexión

### Los correos no llegan

**Causa:** Podrían estar en spam o configuración incorrecta

**Solución:**

1. Revisa la carpeta de spam/correo no deseado
2. Verifica los logs de Laravel:
    ```bash
    tail -f storage/logs/laravel.log
    ```
3. Asegúrate de que el correo `MAIL_FROM_ADDRESS` sea válido
4. Verifica que ejecutaste `php artisan config:clear`

### Error: "Address in mailbox given [...] does not comply with RFC 2822"

**Causa:** Formato de correo incorrecto

**Solución:**

-   No uses comillas simples en `MAIL_FROM_ADDRESS`
-   Usa comillas dobles: `MAIL_FROM_ADDRESS="tu-email@gmail.com"`

### Los correos se envían pero sin formato

**Causa:** Problema con las vistas de correo

**Solución:**

1. Verifica que la vista existe en: `resources/views/mail/payment/receipt.blade.php`
2. Limpia la caché de vistas:
    ```bash
    php artisan view:clear
    ```

---

## 📮 Alternativas a Gmail

### Outlook/Hotmail (Gratis)

```env
MAIL_MAILER=smtp
MAIL_HOST=smtp-mail.outlook.com
MAIL_PORT=587
MAIL_USERNAME=tu-email@outlook.com
MAIL_PASSWORD=tu-contraseña-de-outlook
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS="tu-email@outlook.com"
MAIL_FROM_NAME="Pacific Reef Hotel"
```

**Nota:** Outlook también puede requerir contraseñas de aplicación si tienes la autenticación en dos pasos habilitada.

### Yahoo (Gratis)

```env
MAIL_MAILER=smtp
MAIL_HOST=smtp.mail.yahoo.com
MAIL_PORT=587
MAIL_USERNAME=tu-email@yahoo.com
MAIL_PASSWORD=tu-contraseña-de-aplicacion
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS="tu-email@yahoo.com"
MAIL_FROM_NAME="Pacific Reef Hotel"
```

**Nota:** Yahoo requiere contraseñas de aplicación. Ve a: https://login.yahoo.com/account/security

### Servicios Profesionales (Recomendados para Producción)

Para un entorno de producción, considera estos servicios que ofrecen planes gratuitos:

1. **Mailtrap** (Gratis para desarrollo): https://mailtrap.io/
2. **SendGrid** (100 correos/día gratis): https://sendgrid.com/
3. **Mailgun** (5,000 correos/mes gratis): https://www.mailgun.com/
4. **Amazon SES** (62,000 correos/mes gratis si usas EC2): https://aws.amazon.com/ses/

---

## 📝 Notas Importantes

1. **Límites de Gmail:**

    - Gmail tiene un límite de 500 destinatarios por día para cuentas gratuitas
    - Para aplicaciones de producción con alto volumen, considera usar servicios profesionales

2. **Seguridad:**

    - Nunca subas tu archivo `.env` a Git
    - Nunca compartas tu contraseña de aplicación
    - Si la contraseña se compromete, revócala desde tu cuenta de Google

3. **Rendimiento:**

    - Para mejor rendimiento, considera usar colas (queues) de Laravel:

        ```bash
        # En .env
        QUEUE_CONNECTION=database

        # Ejecutar migraciones de colas
        php artisan queue:table
        php artisan migrate

        # Procesar trabajos en cola
        php artisan queue:work
        ```

    - En el código, cambia `Mail::to()` por `Mail::to()->queue()`

4. **Localización:**
    - Los correos respetan el idioma configurado en la sesión del usuario
    - Puedes crear versiones en español e inglés de las plantillas

---

## ✅ Verificación Final

Antes de considerar la configuración completa:

-   [ ] Verificación en dos pasos de Google activada
-   [ ] Contraseña de aplicación generada
-   [ ] Archivo `.env` actualizado con las credenciales
-   [ ] Ejecutado `php artisan config:clear`
-   [ ] Prueba de envío realizada
-   [ ] Correo recibido correctamente
-   [ ] Formato del correo se ve bien

---

## 🆘 ¿Necesitas Ayuda?

Si sigues teniendo problemas después de seguir estos pasos:

1. Revisa los logs: `storage/logs/laravel.log`
2. Verifica tu configuración de correo:
    ```bash
    php artisan tinker
    config('mail')
    ```
3. Prueba con `MAIL_MAILER=log` para descartar problemas de SMTP

---

## 📚 Recursos Adicionales

-   [Documentación de Laravel Mail](https://laravel.com/docs/10.x/mail)
-   [Contraseñas de aplicación de Google](https://support.google.com/accounts/answer/185833)
-   [Laravel Queues](https://laravel.com/docs/10.x/queues)

---

**¡Listo!** 🎉 Tu sistema de correos electrónicos debería estar funcionando correctamente.
