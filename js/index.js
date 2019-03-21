var editor; // use a global for the submit and return data rendering in the examples
var url = "http://localhost:3000/invoices";

$(document).ready(function() {
    $.get(url, function(rows){
        // преобразование данных
        for(var i = 0; i < rows.length; i++){
            rows[i].DT_RowId = rows[i].id;
        }


        // таблица
        editor = new $.fn.dataTable.Editor( {
            ajax: {
                create: {
                    type: 'POST',
                    url:  url,
                    data: function prepareData(data){
                        return data.data[0];
                    }
                },
                edit: {
                    type: 'PUT',
                    url:  url+'/_id_',
                    data: function prepareData(data){
                       
                        for(key in data.data){
                           var obj1 = { id:key };
                           var obj2 = data.data[key];
                           var obj = Object.assign(obj1, obj2);
                           return obj;
                        }
                    }
                },
                remove: {
                    type: 'DELETE',
                    url: url+'/_id_'
                }
            },
            table: "#invoices",
            fields: [ 
                {
                    label: "Direction",
                    name: "direction"
                }, {
                    label: "Number",
                    name: "number"
                }, {
                    label: "Date created",
                    name: "date_created",
                    type: "datetime"
                }, {
                    label: "Date due",
                    name: "date_due",
                    type: "datetime"
                }, {
                    label: "Date supply",
                    name: "date_supply",
                    type: "datetime"

                }, {
                    label: "Comment",
                    name: "comment"
                }
            ]
        } );

        editor.on( 'postSubmit', function ( e, json, data ) {
            if(data.action === "create" || data.action === "edit")
                document.location.href = document.location.href;
        } );

        // кнопки дабавления
       table = $('#invoices').DataTable( {
            dom: "Bfrtip",
            data: rows,
            columns: [
                { data: "direction" },
                { data: "number" },
                { data: "date_created" },
                { data: "date_due"},
                { data: "date_supply" },
                { data: "comment" }
            ],
            select: true,
            buttons: [
                { extend: "create", editor: editor },
                { extend: "edit",   editor: editor },
                { extend: "remove", editor: editor }
            ]
        } );
    });
    
   
} );