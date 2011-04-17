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
                   email: "Ingrese un email valido",
                     zip: "Ingrese un codigo postal valido",
                     min: array(5,"Ingrese al menos ", "caracteres"),
                     max: array(10,"Ingrese maximo", "caracteres"),
                   field: 'sValidate',
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
                   var _value_ = field.value;
                   var _return_ = true;//Force return true;
                   var name = field.name;

                   if(validator === true){
                        try{
                            var length = validator[0].length;
                            var params = validator[0].substring(1,length-1);
                            var msg;
                            if(params == ""){
                                if(!$this.__required__(_value_)){
                                    msg = options.text[0] + " " + name + " " + options.text[1];
                                    options.msg(msg);
                                    _return_ = false;
                                }
                            }else{
                                var data = params.split(",");
                                var type = data[0];
                                var msj;
                                var size;

                                switch(type){
                                    
                                    case "required":
                                            msg = options.text[0] + " " + name + " " + options.text[1];
                                            _return_ = $this.__required__(_value_,msg);
                                    break;

                                    case "email":
                                            msg = data[1] || options.email;
                                            _return_ = $this.__email__(_value_,msg);
                                    break;

                                }
                                //Other validation
                            }
                        }catch(error){
                            $this.exception(error);
                        }
                   /**
                    *
                    */

                   }else{
                       _return_ = true;
                   }
                   return _return_;
               },  //End of constructor __init__

                // Methods of validations
                $this.__required__ = function(value,msg){
                    if(value == ""){
                        options.msg(msg);
                        return false;
                    }else{
                        return true;
                    }
                },
                $this.__email__ = function(value,msg){
                    var patternMail = /^[^@\s]+@[^@\.\s]+(\.[^@\.\s]+)+$/;
                    if(patternMail.test(value) === false){
                        options.msg(msg);
                        return false;
                    }else{
                        return true;
                    }
                },


               // Use this method for catch and manage exceptions
                $this.exception = function(e){
                    ////console.log(e);
                }

           }
        });

})( jQuery );
