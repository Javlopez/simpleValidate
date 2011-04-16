/*!
 * simpleValidate plugin Jquery
 *
 *
 * Copyright 2011, Javier López López(aka Ajaxman)
 * Licensed under GPL Version 3 license.
 * http://www.gnu.org/licenses/gpl.html
 *
 * @version 1.5 beta
 *
 */
(function($){
        $.fn.extend({

           simpleValidate: function(options,callback,msg) {

               var defaults = {
                    text: array("El campo"," es obligatorio"),
                    mail: "Ingrese un email valido",
                     zip: "Ingrese un codigo postal valido",
                     min: array(5,"Ingrese al menos ", "caracteres"),
                     max: array(10,"Ingrese maximo", "caracteres"),
                     msg: function(msg){
                            alert(msg);
                        }
               };

               /*
                * Extend options with default values
                */
               var options = $.extend(defaults, options);

           }
        });

})( jQuery );
