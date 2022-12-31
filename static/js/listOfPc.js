
function markRepair(id)
{
    var labInfo = document.getElementById(id);
    var fields = labInfo.getElementsByClassName("field");

    choice = confirm('Are you sure you want to mark this PC as repaired?')

    if(choice)
    {

        $.post({
            url:'../database/repairPC',
            data: {'pk': id, 'pcID': fields[0].value, 'labID':fields[1].value},
            datatype: 'json',
            success: function(data)
            {
                alert('PC marked as repaired')
                render()
            }
        }
        );
    }
   
}


function render()
{
    $.ajax({
        url:'../database/getDamagedPC',
        method: 'GET',
        success: function(data)
        {
            obj = JSON.parse(data)
            var inner = new Object()
            var inner_html =""
            for (var i=0; i<obj.length; i++) 
            {
                inner = obj[i]
                delete inner.model

                var section = "<section id ='";
                section += inner.pk;
                section += "' class= 'labinfo'> <div>pc ID:&emsp; <input id='name' class='field' type='text' value='";
                section += inner.fields.pcID;
                section += "' readonly size='10'></div> <div>lab ID:&emsp; <input id='ID' class='field' type='text' value='";
                section += inner.fields.labID;
                section += "' readonly size='4'>";
                section += "</div> <input id = '";
                section += inner.pk;
                section += "' onclick=\"markRepair('";
                section += inner.pk;
                section += "')\" class='button' title = 'repair' src = \"../static/images/repair.png\" type='image'/> <div> status:&emsp; <input id='status'  class='field' type='text' value='";
                section += inner.fields.pcStatus;
                section += "' readonly size='16'></div> </section>";
                
                inner_html += section;
                
            }
            document.getElementById('wrapper').innerHTML = inner_html;  
        }

    });
}


/* 
          if(data.exist == false)
            {
                render()
                window.alert("lab updated successfully!")
            }
            else
            {
                window.alert("lab id already exists!");
            } 
            
            */