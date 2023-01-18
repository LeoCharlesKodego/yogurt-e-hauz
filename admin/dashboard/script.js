
const PRODUCTS_API =  "../../api/products.php";





index();
function index()
{
    $.blockUI();
    itemsDataTable = $("#products").DataTable({
        processing : true,
        responsive: true,
        ajax : {
            url : PRODUCTS_API + "?index",
            dataSrc : function (response) {
                let return_data = new Array();

                for (let i = 0; i<response.records.length; i++) 
                {
                    return_data.push({
                      
                        select : "<input type='checkbox' value='" + response.records[i].id + "' class='selected_service' />",
                        id : response.records[i].id,
                        product_name :  response.records[i].product_name,
                        description : response.records[i].description,
                        price : response.records[i].price,
                        date_time : response.records[i].date_time,
                        action : "<button onclick='destroy(" +response.records[i].id+ ")'>DELETE</button>"

                    });
                }

                return return_data;
            },
            complete : function() {
                $.unblockUI()
                
                $('#products tbody').on('dblclick', 'tr', function() {
                    let data = $('#products')
                        .DataTable()
                        .row(this)
                        .data()
                    
                    
                    $("#idToBeDisplay").html(data.id)
                    $("#product_name").val(data.product_name);
                    $("#description").val(data.description);
                    $("#price").val(data.price);
                    $("#modalClickerShow").click();

                    $("#saveButton").hide();
                    $("#updateButton").show();
                    $("#showId").show();
                });
            },
        },
        columns : [
           
            { data : 'id' },
            { data : 'product_name' },
            { data : 'description' },
            { data : 'price'},
            { data : 'date_time'},
            { data : 'action'},

        ],
        dom : 'lBfrtip',
        buttons : [
            'copyHtml5',
            'excelHtml5',
            'csvHtml5',
            'pdf'
        ]
    });
}

/**
 * 
 * @param {*} id 
 */
function show(id)
{
   
    $.ajax({
        "url" : PRODUCTS_API + "?show&id=" + id,
        "success" : function(response) {
            
            let jsonParse = JSON.parse(response)
            let tr = '';

            for (var i = 0; i<jsonParse.records.length; i++) 
            {
                
               tr += "<tr>" +
               "<td>" + jsonParse.records[i].id + "</td>" + 
               "<td>" + jsonParse.records[i].product_name + "</td>" +
               "<td>" + jsonParse.records[i].description + "</td>" +
               "<td>" + jsonParse.records[i].price + "</td>" +
               "<td>" + jsonParse.records[i].date_time + "</td>" +
               "<td><button onclick='goToView(" +jsonParse.records[i].id+ ")'>SHOW</button>&nbsp;"+
                    "<button onclick='destroy(" +jsonParse.records[i].id+ ")'>DELETE</button></td>";

            }

            
            $("#products").html(tr)
        }
    })
}


function store()
{
    
  
    let studentForm = {
        product_name : $("#product_name").val(),
		description : $("#description").val(),
        price : $("#price").val(),
	}

    $.ajax({
        "url" : PRODUCTS_API ,
        "type" : "POST",
        "data" : "store=" + JSON.stringify(studentForm),
        "success" : function(response) {

            let responseJSON = JSON.parse(response)
            

            alert(responseJSON.description);

            resourceDataTable.ajax.reload(null, false);
            
            $("#modalClickerClose").click();

            return false;
        }
    })

    return false;
}

function destroy(id)
{
   

    if (!confirm("Are you sure you want to delete?"))
    {
        return;
    }

    $.ajax({
        "url" : PRODUCTS_API ,
        "type" : "POST",
        "data" : "destroy&id=" + id,
        "success" : function(response) {

            let responseJSON = JSON.parse(response)
            

            alert(responseJSON.description);

            itemsDataTable.ajax.reload(null, false);
            
            return false;
        }
    })
}

function update(id)
{
    
    
   
    let studentForm = {
		product_name : $("#product_name").val(),
		description : $("#description").val(),
        price : $("#price").val(),
	}

    $.ajax({
        "url" : PRODUCTS_API ,
        "type" : "POST",
        "data" : "update=" + JSON.stringify(studentForm) + "&id=" + id,
        "success" : function(response) {

            let responseJSON = JSON.parse(response)
           

            alert(responseJSON.description);

            itemsDataTable.ajax.reload(null, false);
            
            return false;
        }
    })
}


function resetButton()
{
    $("#saveButton").show();
    $("#updateButton").hide();
    $("#showId").hide();
}

function doUpdate()
{
    let id = $("#idToBeDisplay").html();

    update(id)

    $("#modalClickerClose").click();
}

function getSelected()
{
    let selectedValues = [];

    $(".selected_service:checked").each(function() {
        selectedValues.push($(this).val());
    })

    
    $.blockUI();

    if (!confirm("Are you sure you want to delete this records?"))
    {
        return;
    }

    $.ajax({
        "url" : PRODUCTS_API ,
        "type" : "POST",
        "data" : "bulkDestroy&id=" + JSON.stringify(selectedValues),
        "success" : function(response) {

            let responseJSON = JSON.parse(response)
            $.unblockUI()

            alert(responseJSON.description);

            itemsDataTable.ajax.reload(null, false);
            
            return false;
        }
    })
}