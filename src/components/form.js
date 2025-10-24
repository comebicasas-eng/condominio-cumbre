    // JavaScript para manejar el envío del formulario
    document.addEventListener('DOMContentLoaded', function() {
        const formulario = document.getElementById('contact-form');
        const modal = document.getElementById('modal');
  
        formulario.addEventListener('submit', function(event) {
          event.preventDefault();
  
          handleSubmit(event);
        });

            // Event listener para validar que solo se ingresen números en el campo de teléfono
        const inputTelefono = document.getElementById('telefono');
        inputTelefono.addEventListener('keypress', function(e) {
            const key = e.keyCode || e.which;
            const teclado = String.fromCharCode(key);
            const numeros = "0123456789";
            const especiales = "8-37-38-46";
            const tecladoEspecial = especiales.includes(key.toString());

            if (numeros.indexOf(teclado) === -1 && !tecladoEspecial) {
                e.preventDefault();
            }
        });
      });

      // Función para manejar el envío del formulario
      function handleSubmit(event) {
        const formData = new FormData(event.target);
        const vj_nombre = formData.get("nombre");
        const vj_apellido = formData.get("apellido");
        const vj_email = formData.get("correo");
        const vj_telefono = formData.get("telefono");
        const isChecked = formData.get("checkbox") === "on";
        const vj_localizacion = "Irapuato";
        const vj_plaza = "IRA";
        const vj_fraccionamiento = "GOD";
        const vj_nombre_micrositio = "GODAI LIVING";
        let vj_campania = "";
        const vj_informacion_requerida = "Solicitud de informes";
        const vj_aleatorio = Math.random();
        const ref = document.referrer;
        const vj_correo_valido = validarEmail(vj_email);
        const RutaBrochure = "http://casascomebi.mx/catalogos-casas-muestra/GODAI_TLMK.pdf";
        const vj_httpref = RutaBrochure;
        let url = window.location.href;
    
        if (url.indexOf("?fb") >= 0) {
            console.log("Visitante de facebook ");
            vj_campania = "FACEBOOK";
        } else {
            if (url.indexOf("?ads") >= 0) {
                console.log("Visitante de adwords ");
                vj_campania = "GOOGLE";
            } else {
                if (url.indexOf("campania=mailing") >= 0) {
                    console.log("Visitante de mailing ");
                    vj_campania = "MAILING";
                } else {
                    console.log("Visitante orgánico ");
                    vj_campania = "ORGANICO";
                }
            }
        }
  
        const errors = {};
  
        // Validación básica antes del envío
        if (!vj_nombre) {
          errors.nombre = "Por favor ingresa tu nombre.";
        }
        if (!vj_apellido) {
          errors.apellidos = "Por favor ingresa tus apellidos.";
        }
        if (!vj_email) {
          errors.correo = "Por favor ingresa tu correo electrónico.";
        } else if (!validarEmail(vj_email)) {
          errors.correo = "Por favor ingresa un correo electrónico válido.";
        }
        if (!vj_telefono) {
          errors.telefono = "Por favor ingresa un teléfono a 10 dígitos.";
        } else if (!validarTelefono(vj_telefono)) {
          errors.telefono = "Por favor ingresa un teléfono válido.";
        }
        if (!isChecked) {
          errors.checkbox = "Debes aceptar las políticas del Aviso de privacidad.";
        }

        // Mostrar errores en los campos correspondientes
        mostrarErrores(errors);

        if (Object.keys(errors).length > 0) {
        return;
        }
  
        // Si pasa la validación, construir los datos a enviar
        const data = {
          // nombre: vj_nombre,
          // apellidos: vj_apellido,
          // correo: vj_email,
          // telefono: vj_telefono,
          // isChecked: isChecked,
          // url: window.location.href,
          "ttPlaza": vj_plaza.toUpperCase(),
          "ttFraccionamiento": vj_fraccionamiento.toUpperCase(),
          "ttNombre": vj_nombre.toUpperCase(),
          "ttApellidos": vj_apellido.toUpperCase(),
          "ttCorreo": vj_email,
          "ttTelefono": vj_telefono,
          "ttLocalizacion": vj_localizacion.toUpperCase(),
          "ttCampania": vj_campania.toUpperCase(),
          // "ttHttp_reference": vj_httpref,
          "ttInformacion_requerida": vj_informacion_requerida.toUpperCase(),
          "ttNombre_micrositio": vj_nombre_micrositio.toUpperCase(),
          "ttorigen_prospecto": "",
          "ttip_origen": ""
        };
  
        // Aquí podrías enviar los datos mediante fetch u otra solicitud HTTP
        console.log(data);
        
        // Simulación de envío con fetch (requiere un servidor que acepte la solicitud POST)
        fetch("https://www.calypsonet.mx:8440/telemarketing_rst_visualiza_referidos/rest/telemarketing_rst/post_guarda_referido_web_Landing", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((response) => response.json())
          .then((data) => {
            // console.log(data);
            // Aquí puedes manejar la respuesta exitosa, como mostrar un mensaje al usuario
            // alert("Formulario enviado exitosamente");
            mostrarModal();
          })
          .catch((error) => {
            console.error("Error:", error);
            // Aquí puedes manejar los errores
            alert("Hubo un error al enviar el formulario. Por favor, intenta más tarde.");
          });
      }

        // Función para mostrar los errores en los campos del formulario
    function mostrarErrores(errors) {
        const errorNombre = document.getElementById('errorNombre');
        const errorApellidos = document.getElementById('errorApellidos');
        const errorCorreo = document.getElementById('errorCorreo');
        const errorTelefono = document.getElementById('errorTelefono');
        const errorCheckbox = document.getElementById('errorCheckbox');

        // Limpiar errores previos
        errorNombre.textContent = '';
        errorApellidos.textContent = '';
        errorCorreo.textContent = '';
        errorTelefono.textContent = '';
        errorCheckbox.textContent = '';

        // Mostrar nuevos errores
        if (errors.nombre) {
        errorNombre.textContent = errors.nombre;
        }
        if (errors.apellidos) {
        errorApellidos.textContent = errors.apellidos;
        }
        if (errors.correo) {
        errorCorreo.textContent = errors.correo;
        }
        if (errors.telefono) {
        errorTelefono.textContent = errors.telefono;
        }
        if (errors.checkbox) {
        errorCheckbox.textContent = errors.checkbox;
        }
    }
  
      // Función para validar el formato del email
      function validarEmail(email) {
        const expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return expr.test(email);
      }
  
      // Función para validar el formato del teléfono (solo números)
      function validarTelefono(telefono) {
        const expr = /^[0-9]+$/;
        return expr.test(telefono);
      }

          // Función para mostrar el modal
    function mostrarModal() {
        modal.style.display = 'block'; // Mostrar el modal
    }

    // Event listener para el botón de cierre
    const closeModal = document.querySelector('.close');
    closeModal.addEventListener('click', function() {
        location.reload(); // Recargar la página
    });