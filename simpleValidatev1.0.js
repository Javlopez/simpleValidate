/**
 * @name simpleValidate
 * @description simpleValidate.js is a simple validator of forms
 * @require Jquery
 * @author Javier López López (aka Ajaxman)
 * @License GPL
 * @version 1.0
 */

;(function( $ ){

    $.fn.simpleValidate = function(type,callback) {


    /**
     * @property $this Object
     */
    var $this = $(this);
    var __id__= $(this).attr('id');
    var __typeout__ = (typeof type === "undefined")?true:type;
    var _requiredText = Array("El campo"," es obligatorio");
    var _requiredMail = "Ingrese un email valido";
    var _requiredZip  = "Ingrese un codigo postal valido";
    var _requiredMin  = Array(5,"Ingrese al menos ", "caracteres");
    var _requiredMax  = Array(10,"Ingrese maximo", "caracteres");
    /// IMPORTANTE = TIPOS DE VALIDACIONES (required,email,zip,minlength,maxlength) incluye select
    // Funcion que muestra un mensaje alerr();
    $this.__msg__ = function(__val__){alert (__val__);};


    //Public methods
    $this.__required__ = function(__val__){return (__val__=== "")?false:true;};
    $this.__email__ = function(__val__){
	var __p__ = /^[^@\s]+@[^@\.\s]+(\.[^@\.\s]+)+$/;
	return __p__.test(__val__);
    };
    $this.__length__ = function(__type,__size,__val__){
	var __return = true;

	switch(__type){
	    case "equal":
		  if(parseInt(__size,10) != parseInt(__val__.length,10)){
		      __return = false;
		  }
	    break;
	    case "max":
		  if(parseInt(__val__.length,10) > parseInt(__size,10)){
		      __return = false;
		  }
	    break;
	    case "min":
		  if(parseInt(__val__.length,10) < parseInt(__size,10)){
		      __return = false;
		  }
	    break;
	}
	return __return;
    };

    //Function __init__
    $this.__eval__ = function(__args__,__e){
      var __pattern__ = /\[(.*)\]/;
      var __params__ = __pattern__.exec(__args__);
      var __val__ = __e.value;
      var __return__ = true;
      if (__params__) {
	var __l  = __params__[0].length;
	var __param__ = __params__[0].substring(1,__l-1);
	if( __param__ === ""){
	  if(!$this.__required__(__val__)){
	      $this.__msg__(_requiredText[0]+" "+__e.name+" "+_requiredText[1]);
	      __return__ = false;
	  }
	}else{
	  var data = __param__.split(",");
	  var __type__ = data[0];
	  var msj;
	  var __size;


		    switch(__type__){
			  case "required":
				if(!$this.__required__(__val__)){
				  msj = data[1] || _requiredText[0]+" "+__e.name+" "+_requiredText[1];
				  $this.__msg__(msj);
				  __return__ = false;
				}
			  break;
			  case "email":
				if(!$this.__email__(__val__)){
				  msj = data[1] || _requiredMail;
				  $this.__msg__(msj);
				  __return__ = false;
				}
			  break;
			  case "zip":
				msj = data[1] || _requiredZip;
				if(!$this.__length__("equal",5,__val__)){
				  $this.__msg__(msj);
				  __return__ = false;
				}else{
				  if(isNaN(__val__)){
				    $this.__msg__(msj);
				    __return__ = false;
				  }
				}
			  break;
			  case "minlength":
				__size = (isNaN(data[2]))?_requiredMin[0]:data[2];
				if(!$this.__length__("min",__size,__val__)){
				  msj = data[1] || _requiredMin[1]+" "+_requiredMin[2]+ " " +_requiredMin[1];
				  $this.__msg__(msj);
				  __return__ = false;
				}
			  break;
			  case "maxlength":
				__size = (isNaN(data[2]))?_requiredMin[0]:data[2];
				if(!$this.__length__("max",__size,__val__)){
				  msj = data[1] || _requiredMax[1]+" "+_requiredMax[2]+ " " +_requiredMax[1];
				  $this.__msg__(msj);
				  __return__ = false;
				}
			  break;
			  default:
				if(!$this.__required__(__val__)){
				  msj = data[1] || __type__;
				  $this.__msg__(msj);
				  __return__ = false;
				}
			  break;
		    }

	}
      }else{
	  __return__ = true;
      }
      return __return__;

    };


    $this.submit(function(e) {
      var __return__ = true;
      $('#'+__id__+ '  [title^=valida]').each(function(){
	var type = $(this).attr('title');
	  __return__ = $this.__eval__(type,this);
	  if(__return__ === false){
	    this.focus();
	    return false;
	  }
      });


     if(__typeout__ === true){
         return __return__;
     }else{
         if(__return__ === true){
            e.preventDefault();
            if (typeof callback == 'function') { // make sure the callback is a function
                callback.call(this); // brings the scope to the callback
            }
         }else{
            return false;
         }
     }

    });

  };
})( jQuery );
