<?php
//$host = 'C:\Program Files (x86)\Common Files\Aspel\Sistemas Aspel\SAE7.00\Ejemplos\Ejemplos.fdb';
$host = 'localhost:C:\Program Files (x86)\Common Files\Aspel\Sistemas Aspel\SAE7.00\Empresa01\Datos\SAE70EMPRE01.FDB';
$username = "sysdba";
$password = "masterkey";

session_start();
$user = $_SESSION['usuario'];
$cve_vend = $_SESSION['cve_vend'];

$gestor_db = ibase_connect($host,$username,$password,"UTF8");   
header("Content-Type: text/html;charset=utf-8");
?>


<!DOCTYPE html>
<html lang="es-MX">
    

<head>
    <meta lang="es">
    <meta http-equiv="Content-Type" content="text/html"; charset="UTF-8">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>Bionourisso</title>

    <!-- Bootstrap Core CSS -->
    <link href="css/bootstrap.css" rel="stylesheet">
	
	<!-- Date Time Picker CSS -->        
    <link rel="stylesheet" href="css/bootstrap-datetimepicker.min.css">
	
	<!-- Main Style CSS -->
	<link href="css/style.css" rel="stylesheet">
    <link rel="stylesheet" href="css/alertify.css">
    <link rel="stylesheet" href="css/themes/default.css">    
    <!-- Custom CSS -->
    <style>
    body {
        padding-top: 70px;
        /* Required padding for .navbar-fixed-top. Remove if using .navbar-static-top. Change if height of navigation changes. */
    }
    </style>

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
        <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
   

</head>

<body id="body">
    

    <!-- Navigation -->
    <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
        <div class="container">
           <a class="navbar-brand logo" href="#">
            <img src="img/LOGO.png" alt="Logo BIO">
           </a>
            <!-- Brand and toggle get grouped for better mobile display -->
            
            <div id="navheader">                
                <ul class="list-inline" id="userLogin">
                    <li class="nav-item">
                    <a class="nav-link" href="principal.php"><span id="span-header">Bienvenido: <?php echo $_SESSION['usuario']?></span></a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="php/logout.php" id="span-header">Cerrar Sesión</a>
                </li>   
                </ul>
            </div>
           
            <!-- Collect the nav links, forms, and other content for toggling -->
			<!--
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul class="nav navbar-nav">
                    <li>
                        <a href="#">About</a>
                    </li>
                    <li>
                        <a href="#">Services</a>
                    </li>
                    <li>
                        <a href="#">Contact</a>
                    </li>
                </ul>
            </div>
            <!-- /.navbar-collapse -->
        </div>
        <!-- /.container -->
    </nav>

    <!-- Page Content -->
    <div class="container">
    <div id="div-headers" class="row">
       <form id="consulta-clientes" method="post">
           <div class="col-md-2 div">
              <h1 id="clientes">Clientes</h1>               
           </div>           
       </form>       
       <form id="consulta-cotizaciones" method="post">
           <div class="col-md-3 div" >
           <h1 id="cotizaciones">Cotizaciones</h1>            
           </div>
       </form>
       <form id="consulta-pedidos" method="post">
           <div class="col-md-2 div">
               <h1 id="pedidos">Pedidos</h1>
           </div>
       </form>
       <form id="consulta-productos" method="post">
           <div class="col-md-3 div">
               <h1 id="productos">Productos</h1>
           </div>
       </form>
       <form id="Alta-clientes" method="post">
           <div class="col-md-2 div">
               <h1 id="Alta">Alta Clientes</h1>
           </div>
       </form>
    </div>
    <div class="row">       
        <div class="col-md-12">
               <div class="loader col-md-12 text-center">
                     <img src="img/2.png" alt="Loading" height="25" width="25">
                </div>           
                <button type="submit" id="btn-modRecep" class="btn btn-primary hidden">Generar modelo</button> 
                <?php 
                if($gestor_db == true) {
                
                $sql = "SELECT CLAVE,NOMBRE FROM CLIE01 WHERE CVE_VEND = '$cve_vend'";
                    //echo $sql;
                $gestor_sent = ibase_query($gestor_db, $sql);
                $coln = ibase_num_fields($gestor_sent);

                echo "<select name='combobox' id='combobox' class='hidden'>";
                while ($row = ibase_fetch_object($gestor_sent)) {
                    
                    echo "<option name='".$row->NOMBRE."'>".$row->CLAVE."--".$row->NOMBRE."</option>";
                }
                echo "</select>";    
                }
                ?>
                <!--                <input type="text" name="nombre" id="nombre" class="nombre hidden" value="" placeholder="# de cliente">            -->
        </div>
    </div>   
    <div class="table-responsive" id="clieTable">      
    <table class="table_clie">
        <thead>
            <tr>
                <th width="20%">CLAVE</th>
                <th width="35%">NOMBRE</th>
                <th width="15%">RFC</th>
                <th width="10%">SALDO</th>                
            </tr>
        </thead>
        <tbody class="list">
        </tbody>
    </table>
    <ul id="cliepag" class="pagination"></ul>
    </div>    
    <div class="table-responsive" id="cotTable">
    <table class="table_cotizaciones hidden">
        <thead>
            <tr>
                <th width="20%">CVE_DOC</th>
                <th width="35%">CLIENTE</th>
                <th width="15%">IMPORTE</th>
                <th width="10%">STATUS</th>                
            </tr>
        </thead>
        <tbody class="list">
        </tbody>
    </table>
    <ul id="cotpag" class="pagination hidden"></ul> 
    </div>
    <div class="table-responsive" id="pedTable">
     <table class="table_pedidos hidden">
        <thead>
            <tr>
                <th width="20%">CVE_DOC</th>
                <th width="20%">STATUS</th>                
                <th width="35%">DOC_SIG</th>
                <th width="35%">CLIENTE</th>                               
            </tr>
        </thead>
        <tbody class="list">
        </tbody>
    </table>
    <ul id="pedipag" class="pagination hidden"></ul>    
    </div>
    
    <div class="table-responsive" id="recepTable">       
       <div class="form-group col-md-2">
            <label for="claveMat" class="busqueda hidden">Clave:</label>
            <input type="text" class="hidden form-control" name="claveMat" id="busqueda" placeholder="Buscar por clave..">
        </div>
        <div class="form-group col-md-2">
            <label for="descMat" class="busqueda hidden">Descripción:</label>
            <input type="text" class="hidden form-control" name="descMat" id="busqueda" placeholder="Buscar por desc..">
        </div>
        <div class="form-group col-md-2">           
            <textarea id="observ_text" name="observ_text" placeholder="Observaciones Generales" cols="50" rows="2" class="hidden"></textarea>            
        </div>        
        <div class="form-group col-md-2">
                          
        </div>
        <div id="content"></div>       
      <table class="table_productos hidden">
        <thead>
            <tr>
                <th width="15%">CVE_ART</th>
                <th width="25%">DESCR</th>
                <th width="5%">LIN_PROD</th>
                <th width="20%">Observaciones Partida</th>
                <th width="5%">EXIST</th>
                <th width="5%">CANT</th>
                <th width="10%">PRECIO</th>
                <th width="5%">SUBTOTAL</th>                
            </tr>
        </thead>
        <tfoot>
            <tr>            
                <th colspan="1"></th>
                <th colspan="1"></th>
                <th colspan="1"></th>
                <th colspan="1"></th>
                <th colspan="1"></th>
                <th colspan="1"></th>                
            </tr>
        </tfoot>
        <tbody class="list">
        </tbody>
    </table>
    <ul class="pagination hidden"></ul>
    </div>
    <div class="container hidden" id="form">
        <form id="alta-form" action="" method='POST' class="hidden">
                <div class="col-md-12 form-section" id="datos-empresa">
                   <h4 class="col-md-12">Datos Generales:</h4>
                    <div class="form-group col-md-2">
                        <label for="empresa" required>**RFC</label>
                        <input type="text" class="datos-input" id="RFC" name="RFC" placeholder="Obligatorio">
                    </div>
                    <div class="form-group col-md-4">
                        <label for="empresa">**Nombre:</label>
                        <input type="text" class="datos-input" id="nombre_cli"  name="nombre_cli">
                    </div>
                </div>
                <div class="col-md-12 form-section" id="datos-empresa">                    
                    <div class="form-group col-md-4">
                        <label for="empresa">Calle:</label>
                        <input type="text" class="datos-input" id="calle" name="calle">
                    </div>                     
                    <div class="form-group col-md-4">
                        <label for="empresa">Colonia:</label>
                        <input type="text" class="datos-input" id="colonia" name="colonia">
                    </div>
                    <div class="form-group col-md-2">
                        <label for="empresa">Código Postal</label>
                        <input type="text" class="datos-input" id="cp" name="cp">
                    </div>                                       
                </div>
                   <div class="col-md-12 form-section" id="datos-empresa">
                    <div class="form-group col-md-1">
                        <label for="empresa">Núm. ext.</label>
                        <input type="text" class="datos-input" id="numext" name="numext">
                    </div>
                    <div class="form-group col-md-1">
                        <label for="empresa">Núm. int.</label>
                        <input type="text" class="datos-input" id="numint" name="numint">
                    </div>
                    <div class="form-group col-md-4">
                        <label for="empresa">Entre calle</label>
                        <input type="text" class="datos-input" id="calle1" name="calle1">
                    </div>
                    <div class="form-group col-md-4">
                        <label for="empresa">Y calle</label>
                        <input type="text" class="datos-input" id="calle2" name="calle2">
                    </div>                    
                    </div>
                    <div class="col-md-12 form-section" id="datos-empresa">
                        <div class="form-group col-md-4">
                        <label for="otro-interes">Referencia:</label>
                            <textarea rows="2" class="datos-input" id="refer" name="refer"></textarea>
                        </div>
                        <div class="form-group col-md-4">
                        <label for="empresa">Población</label>
                        <input type="text" class="datos-input" id="poblacion" name="poblacion">
                        </div>
                        <div class="form-group col-md-4">
                        <label for="empresa">Estado</label>
                        <input type="text" class="datos-input" id="estado" name="estado">
                        </div>
                    </div>
                    <div class="col-md-12 form-section" id="datos-empresa">
                        <div class="form-group col-md-3">
                        <label for="empresa" required>**País</label>
                        <input type="text" class="datos-input" id="pais" name="pais" placeholder="Obligatorio">
                        </div>
                        <div class="form-group col-md-3">
                        <label for="empresa">Municipio</label>
                        <input type="text" class="datos-input" id="municipio" name="municipio">
                        </div>
                        <div class="form-group col-md-3">
                        <label for="empresa">Nacionalidad</label>
                        <input type="text" class="datos-input" id="nacion" name="nacion">
                        </div>
                        <div class="form-group col-md-3">
                        <label for="empresa" required>Clasificación</label>
                        <input type="text" class="datos-input" id="clasif" name="clasif">
                        </div>
                    </div>
                    <div class="col-md-12 form-section" id="datos-empresa">                        
                        <div class="form-group col-md-2">
                        <label for="empresa" required>CURP</label>
                        <input type="text" class="datos-input" id="curp" name="curp">
                        </div>
                        <div class="form-group col-md-3">
                        <label for="empresa" required>Email</label>
                        <input type="text" class="datos-input" id="email" name="email">
                        </div>
                        <div class="form-group col-md-3">
                        <label for="empresa" required>Página Web</label>
                        <input type="text" class="datos-input" id="web" name="web">
                        </div>                     
                        <div class="form-group col-md-2">
                        <label for="empresa" required>Teléfono</label>
                        <input type="text" class="datos-input" id="tel" name="tel">
                        </div>
                    </div>                     

                <div class="col-md-12 text-center">
                    <button type="submit" class="btn btn-primary" id="insertar-cliente">Enviar</button>
                </div> 
                    
			</form>
    </div>
    </div>
    <div class="container">
    <div class="col-md-12" id="Producto">
    <button type="button" class="btn btn-primary" id="mostrarProd">
        Primary
    </button>
    <button type="button" class="btn btn-danger" id="borrarPed">
        Borrar
    </button>
    </div>    
    -<div class="table-responsive" id="partidasTable" style="background-color:pink;">
        <table class="table_partidas" style=";background-color:blue;">
            <th style="width:350px; border:1px solid blue;">
                DESCRIPCION
            </th>
            <th >
                OBSERVACIONES
            </th>
            <th>
                CANTIDAD
            </th>
            <th>
                PRECIO
            </th>
            <th>
                TOTAL
            </th>
        </table>
    </div>
    </div>
    
    

    <!-- jQuery Version 1.11.1 -->
    <script src="js/jquery.js"></script>

    <!-- Bootstrap Core JavaScript -->
    <script src="js/bootstrap.min.js"></script>
	<script src="js/alertify.js"></script>
	<!-- For Date Picker js -->         
	<script src="js/moment.js"></script>
	<script src="js/locale/es.js"></script>
	<script src="js/transition.js"></script>
	<script src="js/collapse.js"></script>
	<script src="js/bootstrap-datetimepicker.min.js"></script>
	<script type="text/javascript">
		$(function () {
			/*$('#datetimepicker1').datetimepicker({
				format: "YYYY/MM",
				showTodayButton: true,
				locale: "es",
				allowInputToggle: true
			});*/
		});
	</script>
    
    <!-- List JS -->
    <script src="js/list.min.js"></script>
	
	<!-- Main JS -->
    <script src="js/index.js"></script>
	
	<!-- Pagination JS -->
	<!--
    <script src="js/pagination.min.js"></script>
	<script type="text/javascript">
		$(function () {
			$('#pagination-container').pagination({
				dataSource: rows,
				callback: function(data, pagination) {
					// template method of yourself
					var html = template(data);
					$('#data-container').html(html);
				}
			});
			function template(data) {
				var html = '<tr>';
				$.each(data, function(index, item){
					html += '<td>' + item + '</td>';
				});
				html += '<tr>';
				return html;
			}
		});
	</script>
	-->
</body>

</html>
