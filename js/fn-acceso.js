// Acceso
/*
 * fn-acceso.js
 *
 */
/* --------------------------------------------------------- */	
/* --------------------------------------------------------- */
!function(window, document, $) {
    "use strict";
    $("#loginform").find("input,select,textarea").not("[type=submit]").jqBootstrapValidation({
            preventSubmit: false,
            submitSuccess: function ($form, event) { 
                event.preventDefault();
                logIn();
            }
        }
    );
    $("#recoverform").find("input,select,textarea").not("[type=submit]").jqBootstrapValidation(
        {
            submitSuccess: function ($form, event) { 
                
            }
        }
    );
}(window, document, jQuery);

/* --------------------------------------------------------- */
function asignarPassword(){
	// Invoca al servidor para asignar contraseña a usuario

	var form = $('#frm_passw');
	$.ajax({
        type:"POST",
        url:"database/data-participantes.php",
        data:form.serialize(),
        beforeSend: function() {
        	$(".alert").removeClass("alert-danger");
        	$(".alert").removeClass("alert-success");
        	$(".alert").hide();
        },
        success: function( response ){
        	console.log( response );
        	form[0].reset();
        	res = jQuery.parseJSON( response );
			alertaMensaje( res.exito, res.mje );
        }
    });
}
/* --------------------------------------------------------- */
function logIn(){
	//Invoca al servidor para iniciar sesión de usuario
	var form = $('#loginform');
	$.ajax({
        type:"POST",
        url:"database/data-acceso.php",
        data:form.serialize(), //data invocación: #usr_login (index.php)
        beforeSend: function() {
        	
        },
        success: function( response ){
        	console.log( response );
        	//res = jQuery.parseJSON( response );
			if( response == 1 )
				window.location = "inicio.php";
			else{
				//alertaMensaje( res.exito, res.mje );
            }
        }
    });
}
/* --------------------------------------------------------- */
function log_out(){
	//Invoca al servidor para cerrar sesión de usuario
	
	$.ajax({
        type:"POST", url:"database/data-acceso.php",
        data:{ logout: true },
        success: function( response ){
            console.log( response );
        	if( response == 1 ) window.location = 'index.php'
        }
    });
}
/* --------------------------------------------------------- */
function r_password(){
	//Invoca al servidor para recuperar contraseña
	var form = $('#ly_rpassw');
	$.ajax({
        type:"POST",
        url:"database/data-acceso.php",
        data:form.serialize(),
        beforeSend: function() {
        	$(".alert").removeClass("alert-danger");
        	$(".alert").removeClass("alert-success");
        	$(".alert").hide();
        },
        success: function( response ){
        	console.log( response );
        	form[0].reset();
        	res = jQuery.parseJSON( response );
			alertaMensaje( res.exito, res.mje );
        }
    });
}
/* --------------------------------------------------------- */
function registrar(){
	//Invoca al servidor para registrar nuevo usuario
	var form_reg = $('#frm_registro').serialize();
	var espera = "<img src='img/loading.gif' width='60'>";
	
	$.ajax({
        type:"POST",
        url:"database/data-acceso.php",
        data:{ usr_reg: form_reg },
        beforeSend: function() {
        	$("#response-reg").html( espera );
        },
        success: function( response ){
        	console.log( response );
        	res = jQuery.parseJSON( response );
            document.getElementById("frm_registro").reset();
            if( res.exito == 1 )
                alertaMensajeBoton( res.exito, res.mje, 'index.php', 'Ingresar' );
            else
                alertaMensaje( res.exito, res.mje );
        }
    });
}
/* --------------------------------------------------------- */