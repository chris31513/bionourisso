$(document).ready(function() {
    $("#clientes").css("background-color", "gray");
    
    var recepTable;
    var clieTable;
    var nombre;
   
    $(document).on("click","#clientes",function(){
        $(".table_clientes").removeClass("hidden");
        $(".table_cotizaciones").addClass("hidden");
        $(".table_pedidos").addClass("hidden");
        $(".table_productos").addClass("hidden");
        $("#btn-modRecep").addClass("hidden");
        $(".pagination").addClass("hidden");
        $("#nombre").addClass("hidden");
        $(".busqueda").addClass("hidden");
        $(".form-control").addClass("hidden");
        $(".table_clie").removeClass("hidden");
        $("#clieTable").removeClass("hidden");
        $("#combobox").addClass("hidden");
        $("#observ_text").addClass("hidden");
        $("#form").addClass("hidden");
        $("#alta-form").addClass("hidden");
        $(this).css("background-color", "gray");
        $("#cotizaciones").css("background-color", "white");
        $("#pedidos").css("background-color", "white");
        $("#productos").css("background-color", "white");
        $("#Alta").css("background-color", "white");
        $("#cliepag").removeClass("hidden");
        $("#cotpag").addClass("hidden");
        $("#pedipag").addClass("hidden");
        $("#observ_part").addClass("hidden");        
    });
    $(document).on("click","#cotizaciones",function(){
       $(".table_cotizaciones").removeClass("hidden");
       $(".table_clientes").addClass("hidden");
       $(".table_pedidos").addClass("hidden");
       $(".table_productos").addClass("hidden");
       $("#btn-modRecep").addClass("hidden");
       $(".pagination").addClass("hidden");
       $("#nombre").addClass("hidden");
       $(".busqueda").addClass("hidden");
       $(".form-control").addClass("hidden");
       $(".table_clie").addClass("hidden");
       $("#combobox").addClass("hidden");
        $("#observ_text").addClass("hidden");
        $("#form").addClass("hidden");
        $("#alta-form").addClass("hidden");
        $(this).css("background-color", "gray");
        $("#clientes").css("background-color", "white");
        $("#pedidos").css("background-color", "white");
        $("#productos").css("background-color", "white");
        $("#Alta").css("background-color", "white");
        $("#cliepag").addClass("hidden");
        $("#cotpag").removeClass("hidden");
        $("#pedipag").addClass("hidden");
        $("#observ_part").addClass("hidden");
    });
    $(document).on("click","#pedidos",function(){
       $(".table_clientes").addClass("hidden");
       $(".table_cotizaciones").addClass("hidden");
       $(".table_productos").addClass("hidden");
       $(".table_pedidos").removeClass("hidden");
       $("#btn-modRecep").addClass("hidden");
       $(".pagination").addClass("hidden");
       $("#nombre").addClass("hidden");
       $(".busqueda").addClass("hidden");
       $(".form-control").addClass("hidden");
       $(".table_clie").addClass("hidden");
       $("#combobox").addClass("hidden");
        $("#observ_text").addClass("hidden");
        $("#form").addClass("hidden");
        $("#alta-form").addClass("hidden");
        $(this).css("background-color", "gray");
        $("#clientes").css("background-color", "white");
        $("#cotizaciones").css("background-color", "white");
        $("#productos").css("background-color", "white");
        $("#Alta").css("background-color", "white");
        $("#cliepag").addClass("hidden");
        $("#cotpag").addClass("hidden");
        $("#pedipag").removeClass("hidden");
        $("#observ_part").addClass("hidden");
    });
    $(document).on("click","#productos",function(){
       $("#btn-modRecep").removeClass("hidden");
       $(".table_clientes").addClass("hidden");
       $(".table_cotizaciones").addClass("hidden");
       $(".table_pedidos").addClass("hidden");
       $(".table_productos").removeClass("hidden");
       $("#btn-modRecep").removeClass("hidden");
       $(".pagination").removeClass("hidden");
       $("#nombre").removeClass("hidden");
       $(".busqueda").removeClass("hidden");
       $(".form-control").removeClass("hidden");
       $(".table_clie").addClass("hidden");
       $("#clieTable").addClass("hidden");
       $("#combobox").removeClass("hidden");
        $("#observ_text").removeClass("hidden");
        $("#form").addClass("hidden");
        $("#alta-form").addClass("hidden");
        $(this).css("background-color", "gray");
        $("#clientes").css("background-color", "white");
        $("#cotizaciones").css("background-color", "white");
        $("#pedidos").css("background-color", "white");
        $("#Alta").css("background-color", "white");
        $("#cliepag").addClass("hidden");
        $("#cotpag").addClass("hidden");
        $("#pedipag").addClass("hidden");
        $("#observ_part").removeClass("hidden");
    });
    $(document).on("click","#Alta",function(){
        $("#btn-modRecep").addClass("hidden");
       $(".table_clientes").addClass("hidden");
       $(".table_cotizaciones").addClass("hidden");
       $(".table_pedidos").addClass("hidden");
       $(".table_productos").addClass("hidden");
       $("#btn-modRecep").addClass("hidden");
       $(".pagination").addClass("hidden");
       $("#nombre").addClass("hidden");
       $(".busqueda").addClass("hidden");
       $(".form-control").addClass("hidden");
       $(".table_clie").addClass("hidden");
       $("#clieTable").addClass("hidden");
       $("#combobox").addClass("hidden");
        $("#observ_text").addClass("hidden");
       $("#form").removeClass("hidden");
        $("#alta-form").removeClass("hidden");
        $(this).css("background-color", "gray");
        $("#clientes").css("background-color", "white");
        $("#cotizaciones").css("background-color", "white");
        $("#pedidos").css("background-color", "white");
        $("#productos").css("background-color", "white");
        $("#cliepag").addClass("hidden");
        $("#cotpag").addClass("hidden");
        $("#pedipag").addClass("hidden");
        $("#observ_part").addClass("hidden");
    });
    
    $("#insertar-cliente").click(function(){        
         insertar();
    });
   
    
    
     //--Imprime todos los clientes del vendedor
        $.post("/Bionourisso/consulta_sae.php", {"get_clientes":true})
            .done(function(data){           
            //console.log(data);
            if (data != "0 results") {
                //console.log(data);
                var prods = $.parseJSON(data);
                var entradas;
                for (var x in prods) {
                    if (prods[x]){
                        $("#clieTable tbody")
                        .append("<tr>"+
                                "<td class='CLAVE'>"+prods[x]["CLAVE"]+"</td>"+
                                "<td class='NOMBRE'>"+prods[x]["NOMBRE"]+"</td>"+
                                "<td class='RFC'>"+prods[x]["RFC"]+"</td>"+
                                "<td class='SALDO'>"+prods[x]["SALDO"]+"</td>"+                               
                                "</tr>");
                    }
                }//--Activa la búsqueda y paginación de la tabla de materiales para la remisión
                clieTable = new List('clieTable', {
                  valueNames: ['CLAVE', 'NOMBRE', 'TELEFONO', 'SALDO'],
                  page: 20,
                  pagination: true
                }); 
            }else {
                $("#clieTable tbody").append("<tr><td colspan='5'>No clientes</td></tr>");
            }
        });
    
     //--Imprime todos los productos del inventario
        $.post("/Bionourisso/consulta_sae.php", {"get_totalSalidasEntradas": true})
            .done( function(data) {
            //console.log(data);
            if (data != "0 results") {
               var prods = $.parseJSON(data);
                var entradas;                
                for (var x in prods) {
                    if (prods[x]) {
                        //entradas = prods[x]["CVE_ART"];                        
                        
                        $("#recepTable tbody")
                            .append("<tr>"+
                                        "<td class='CVE_ART'>"+prods[x]["CVE_ART"]+"</td>"+
                                        "<td class='DESCR'>"+prods[x]["DESCR"]+"</td>"+
                                        "<td class='LIN_PROD'>"+prods[x]["LIN_PROD"]+"</td>"+
                                        "<td><input class='form-control input-part' id='part'></td>"+
                                        "<td class='EXIST'>"+prods[x]["EXIST"]+"</td>"+                                        
                                        "<td><input class='form-control input-cant' id='cant'></td>"+
                                        "<td class='PRECIO'>"+prods[x]["PRECIO"]+"</td>"+
                                        "<td class='SUBTOTAL' colspan='5'><input class='form-control' id='SUBTOTAL' disabled></td>"+
                                        "<td class='cant hidden'></td>"+
                                        "<td class='part hidden'></td>"+
                                    "</tr>");
                    }
                }
                
                //--Activa la búsqueda y paginación de la tabla de materiales para la remisión
                recepTable = new List('recepTable', {
                  valueNames: ['CVE_ART', 'DESCR', 'LIN_PROD', 'part', 'EXIST','cant','PRECIO','SUBTOTAL'],
                  page: 10,
                  pagination: true
                });
                
            } else {
                $("#recepTable tbody").append("<tr><td colspan='5'>SIN PRODUCTOS ERROR</td></tr>");
            }
        });
        //--Imprime todos los pedidos del vendedor
         $.post("/Bionourisso/consulta_sae.php", {"get_pedidos": true})
            .done( function(data) {
            //console.log(data);
            if (data != "0 results") {
               var prods = $.parseJSON(data);
                var entradas;                
                for (var x in prods) {
                    if (prods[x]) {
                        //entradas = prods[x]["CVE_ART"];                        
                        
                        $("#pedTable tbody")
                            .append("<tr>"+
                                        "<td class='CVE_DOC'>"+prods[x]["CVE_DOC"]+"</td>"+
                                        "<td class='STATUS'>"+prods[x]["STATUS"]+"</td>"+
                                        "<td class='DOC_SIG'>"+prods[x]["DOC_SIG"]+"</td>"+
                                        "<td class='CLIENTE'>"+prods[x]["CLIENTE"]+"</td>"+                                        
                                    "</tr>");
                    }
                }
                
                //--Activa la búsqueda y paginación de la tabla de materiales para la remisión
                pedTable = new List('pedTable', {
                  valueNames: ['CVE_DOC','STATUS','DOC_SIG','CVE_DOC'],
                  page: 15,
                  pagination: true
                });                
               
                
            } else {
                $("#pedTable tbody").append("<tr><td colspan='5'>SIN PEDIDOS</td></tr>");
            }
        });
    
    
    //--Imprime todas las cotizaciones del cliente
    
    $.post("/Bionourisso/consulta_sae.php", {"get_cotizaciones": true})
            .done( function(data) {
            //console.log(data);
            if (data != "0 results") {
               var prods = $.parseJSON(data);
                var entradas;                
                for (var x in prods) {
                    if (prods[x]) {
                        //entradas = prods[x]["CVE_ART"];                        
                        
                        $("#cotTable tbody")
                            .append("<tr>"+
                                        "<td class='CVE_DOC'>"+prods[x]["CVE_DOC"]+"</td>"+
                                        "<td class='CLIENTE'>"+prods[x]["CLIENTE"]+"</td>"+
                                        "<td class='IMPORTE'>"+prods[x]["IMPORTE"]+"</td>"+
                                        "<td class='STATUS'>"+prods[x]["STATUS"]+"</td>"+                                      
                                    "</tr>");
                    }
                }
                
                //--Activa la búsqueda y paginación de la tabla de materiales para la remisión
                cotTable = new List('cotTable', {
                  valueNames: ['CVE_DOC', 'CLIENTE', 'IMPORTE', 'STATUS'],
                  page: 20,
                  pagination: true
                });                
               
                
            } else {
                $("#cotTable tbody").append("<tr><td colspan='5'>ERROR</td></tr>");
            }
        });
    
        $(document).on('keyup', '.input-cant', function() {
         $(this).parents("tr").find(".cant").text($(this).val());
         var uno = $(this).val();
            //console.log(uno);
         var dos = $(this).parents("tr").find(".PRECIO").text();
         var dos = parseInt(dos);
         var total = 0;
         var subtotal = parseInt(uno) * dos;
        if(Number.isNaN(subtotal)){
            var subtotalRes = $(this).parents("tr").find(".SUBTOTAL").text("0");            
        } else {
            var subtotalRes = $(this).parents("tr").find(".SUBTOTAL").text(subtotal);            
        }       
            //$('.table_productos tfoot tr th:last-child').eq(6).text(subtotal);            
    });
        $(document).on('keyup', '.input-part',function() {
            $(this).parents("tr").find(".part").text($(this).val());
        });
    
        $("#btn-modRecep").click(function() {
            
        var observ = $('#observ_text').val();
        if(confirm("Estan correctos tus datos??")){
            $(".loader").show();
            //alert(confirm("desea continuar"));
        //console.log($('select[name="combobox"] option:selected').text());
        var cliente = $('select[name="combobox"] option:selected').text();
            var cli = cliente.substr(1,9);
            //console.log(cli);
            //saco el valor accediendo al id del input = nombre
        
            
        var prods = [];
        var idx = 0;
        var cap = false;
        var cant = 0;
        var part;
        var precio;
        var subtotal;
        prods.push({name: "observ",value:observ});
        prods.push({name: "cli",value:cli});
        prods.push({name: "subtotal",value:subtotal});
            
        recepTable.reindex();
        var items = recepTable.items;
        //console.log(items);
        for (var x in items) {
            
            cant = parseInt(items[x].values().cant);
            part = items[x].values().part;            
            precio = items[x].values().precio;
            subtotal = items[x].values().SUBTOTAL;
            
            if (!isNaN(cant) && cant > 0) {
                
                //console.log("xx");
                prods.push({name: "keyProds["+idx+"][CVE_ART]", value: items[x].values().CVE_ART});
                prods.push({name: "keyProds["+idx+"][DESCR]", value: items[x].values().DESCR});
                prods.push({name: "keyProds["+idx+"][LIN_PROD]", value: items[x].values().LIN_PROD});
                prods.push({name: "keyProds["+idx+"][EXIST]", value: items[x].values().EXIST});
                prods.push({name: "keyProds["+idx+"][cant]", value: items[x].values().cant});
                prods.push({name: "keyProds["+idx+"][part]", value: items[x].values().part});
                prods.push({name: "keyProds["+idx+"][PRECIO]", value: items[x].values().PRECIO});
                prods.push({name: "keyProds["+idx+"][SUBTOTAL]", value: items[x].values().SUBTOTAL});
                //cli.push({name: "array["+cli+"]",value: $("#nombre").val()});
                
                idx++;
                cap = true;
                //console.log(cap);
            }
        }
            
        if (cap) {          
            $.post("/Bionourisso/php/recep_mail.php",prods).done( function(data) {
                $(".loader").hide();
                console.log(data);
                if (data !== null) {
                    alertify.alert("Bionourisso",data);
                    //window.location.href = window.location.href;
                } else {
                    alert("No se pudo enviar el pedido, revisa tu conexión a internet y vuelve a intentarlo.")
                }
            });
             
           
        } else {
            alert("Debes capturar al menos una cantidad para poder enviar la Recep.mod");
        } 
        }else{
            window.location.href = window.location.href;
        }
        
    });
    
    $("#mostrarProd").click(function(){
        var prods = [];
        var idx = 0;
        var cap = false;
        var cant = 0;
        var part;
        var precio;
        var subtotal;
        var art;
        var descr;
        
        
        prods.push({name: "subtotal",value:subtotal});
            
        recepTable.reindex();
        var items = recepTable.items;
        //console.log(items);
        
        for (var x in items) {       
            cant = parseInt(items[x].values().cant);
            art = items[x].values().CVE_ART;
            part = items[x].values().part;            
            precio = parseInt(items[x].values().PRECIO);
            subtotal = items[x].values().SUBTOTAL;
            descr = items[x].values().DESCR;
            //console.log(cant);
            //console.log(part);
            if (!isNaN(cant) && cant > 0){                
                /*var div = document.createElement("DIV");
                var txt = document.createTextNode(descr+"//"+part+"//"+precio+"//"+subtotal);
                div.setAttribute("style", "background-color: pink;");
                div.setAttribute("ID","divdin");
                div.setAttribute("class","clase");
                div.appendChild(txt);
                document.body.appendChild(div);   */
                var div = document.createElement("DIV");
                var tb = document.createElement("TABLE");
                var tbody = document.createElement("TBODY");
                var tr = document.createElement("TR");
                var td = document.createElement("TD");
                var td1 = document.createElement("TD");
                var td2 = document.createElement("TD");
                var td3 = document.createElement("TD");
                var td4 = document.createElement("TD");
                var txt = document.createTextNode(descr);
                var txt1 = document.createTextNode(part);
                var txt2 = document.createTextNode(cant);
                var txt3 = document.createTextNode(precio);
                var txt4 = document.createTextNode(subtotal);                
                div.setAttribute("class","tabla_remove");div.setAttribute("ID","clieTable");
                tb.setAttribute("class","table_partidas");tb.setAttribute("style","table-layout: fixed;overflow-x:hidden;")
                tr.setAttribute("ID","clase");
                td.setAttribute("class","tdclass");td.setAttribute("style","word-wrap: break-word;");
                td1.setAttribute("class","tdclass");td1.setAttribute("style","word-wrap: break-word;border:1px solid red;");
                td2.setAttribute("class","tdclass");
                td3.setAttribute("class","tdclass");
                td4.setAttribute("class","tdclass");
                div.appendChild(tb);
                tb.appendChild(tbody);
                tbody.appendChild(tr);
                tr.appendChild(td);
                tr.appendChild(td1);
                tr.appendChild(td2);
                tr.appendChild(td3);
                tr.appendChild(td4);
                td.appendChild(txt);
                td1.appendChild(txt1);
                td2.appendChild(txt2);
                td3.appendChild(txt3);
                td4.appendChild(txt4);
                document.body.appendChild(div);
            }
        }       
    });
    $("#borrarPed").click(function(){
        $(".tabla_remove").remove();        
    });
    
    
    
    //--Busca un material por clave de producto
    $("input[name='claveMat']").keyup(function() {
        $("input[name='descMat']").val("");
        recepTable.search($(this).val(), ['CVE_ART']);
    });

    //--Busca un material por descripción de producto
    $("input[name='descMat']").keyup(function() {
        $("input[name='claveMat']").val("");
        recepTable.search($(this).val(), ['DESCR']);
    });
    
    $(".btn-default").click(function() {
        intervalManager(false);
});
    function insertar(){
        
        //var tipo_c1 = $('input[name="radio-c1"]:checked').parent().text(); 
        var numext = $('#numext').val();
        var numint = $('#numint').val();
        var calle1 = $('#calle1').val();
        var calle2 = $('#calle2').val();
        var colonia = $('#colonia').val();
        var cp = $('#cp').val();
        var calle = $('#calle').val();
        var refer = $('#refer').val();
        var poblacion = $('#poblacion').val();
        var estado = $('#estado').val();
        var pais = $('#pais').val();
        if ($('#pais').val()== "") {
            alert("Ingresa tu país");
        }
        var municipio = $('#municipio').val();
        var nacion = $('#nacion').val();
        var clasif = $('#clasif').val();
        var RFC = $('#RFC').val();
        if ($('#RFC').val()== "") {
            alert("Ingresa RFC");
        }
        var curp = $('#curp').val();        
        var web = $('#web').val();
        var tel = $('#tel').val();
        var nombre_cli = $('#nombre_cli').val();
         if ($('#nombre_cli').val()== "") {
            alert("Ingresa Nombre");
        }
        var email = $("#email").val();
        
          $.post("/Bionourisso/php/insert_cliente.php", {"numext":numext, "numint":numint, "calle1":calle1, "calle2":calle2, "cp":cp, "calle":calle, "refer":refer, "poblacion":poblacion, "estado":estado, "pais":pais, "municipio":municipio, "nacion":nacion, "clasif":clasif, "RFC":RFC, "curp":curp, "web":web, "tel":tel,"nombre_cli":nombre_cli,"colonia":colonia,"email":email}).done(function(data) { 
              
        if (data == "insert") {
           //alert("Registro Insertado");
            console.log(data);
            //window.location.href = "index.html";
           
        } else {  
            console.log(data);
            //alert("Registro Insertado");
            
        }
        });alert("Registro Insertado");
    }
        
        
        
        
    
    
    
    
	
});

