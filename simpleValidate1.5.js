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
                   field: 'svalidate',
                     msg: function(msg){
                            alert(msg);
                        }
               };

               //Copy local of this form
               var $this = $(this);
               var $idform = $this.attr('id');
               /*
                * Extend options with default values
                */
               var options = $.extend(defaults, options);

               //Trigger of Plugin
               $this.submit(function(form) {
                   // setting value of return
                    var _return_ = true;

                    $('#' + $idform + ' [title^=' + options.field + ']').each(function(){
                        var $input = $(this);
                        var $validator = $input.attr('title');
                        _return_   = $this.__init__($validator,$input);
                        if(_return_ === false){
                            this.focus();
                            return false;
                        }
                    });//End of filter check input valids

                    if(typeof callback == 'function') { // make sure the callback is a function
                        callback.call(this); // brings the scope to the callback
                        form.preventDefault();
                        return false;
                    }else{
                        return true;
                    }
               });//End of trigger


               $this.__init__ = function(validator,field){
                   //Set options
                   var filter = /\[(.*)\]/;
                   var validator = filter.exec(validator);
                   var value = field.value;
                   var _return_ = true;//Force return true;
                   
               }            

           }
        });

})( jQuery );
