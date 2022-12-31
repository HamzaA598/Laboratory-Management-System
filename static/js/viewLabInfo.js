
function searchLab() {

    var searchInput = document.getElementById('searchBar').value;
    
    $.post({
        url:'../database/searchLab',
        data: {'labName': searchInput},
        datatype: 'json',

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
                section += "' class= 'labinfo'> <div>Name:&emsp; <input id='name' class='field' type='text' value='";
                section += inner.fields.labName;
                section += "' readonly size='10'></div> <div>ID:&emsp; <input id='ID' class='field' type='number' value='";
                section += inner.fields.labID;
                section += "' readonly size='4'> </div> <div>building number:&emsp; <input id='building' class='field' type='number' value='";
                section += inner.fields.bNum;
                section += "' readonly size='4'></div> <div>floor number:&emsp; <input id='floor' class='field' type='number' value='";
                section += inner.fields.fNum;
                section += "' readonly size='4'></div> <div> number of PCS:&emsp; <input id='pcNum' class='field' type='number' value='";
                section += inner.fields.pcNum;
                section += "' readonly size='4'></div> <input id = '";
                section += inner.pk;
                section += "' onclick=\"edit('";
                section += inner.pk;
                section += "')\" class='button edit' title ='edit' src = '../static/images/edit.png' type='image'/> <div> number of chairs:&emsp; <input id='chairs' class='field' type='number' value='";
                section += inner.fields.chairNum;
                section += "' readonly size='4'></div> <div> capacity:&emsp; <input id='capacity'  class='field' type='number' value='";
                section += inner.fields.cap;
                section += "' readonly size='4'></div> <input id = '";
                section += inner.pk;
                section += "' onclick=\"reportLab('";
                section += inner.pk;
                section += "')\" class='button report' title = 'report' src = \"../static/images/report.png\" type='image'/> <div> status:&emsp; <select name=\"labStatus\" class = \"field\" id=\"status\">";
                section += "<option value=\"";
                section += inner.fields.labStatus;
                section += "\">";
                section += inner.fields.labStatus;
                section += "</option> </select> </div> </section>";
                
                inner_html += section;
                
            }
            document.getElementById('wrapper').innerHTML = inner_html;

            if(obj.length == 0)
                window.alert("no labs found")
            else
                window.alert("labs found")
        }

    });
}

function edit(id)
{

    var labInfo = document.getElementById(id);
    var fields = labInfo.getElementsByClassName("field");
    
    for (var i = 0; i < fields.length; i++) 
    {
        fields[i].removeAttribute("readonly");
        fields[i].style.backgroundColor='#22303c';
        fields[i].style.border='1px solid black';
        fields[i].style.height='16px';
    }

    if(fields[7].value == "Active" || fields[7].value == "active")
        fields[7].innerHTML = "<select name=\"labStatus\" id=\"status\"> <option value=\"active\">Active</option> <option value=\"Under maintenance\">Under maintenance</option></select>";
    else
        fields[7].innerHTML = "<select name=\"labStatus\" id=\"status\"> <option value=\"Under maintenance\">Under maintenance</option> <option value=\"active\">Active</option></select>";

    fields[7].style.height = "20px";
    var Buttons =  labInfo.getElementsByClassName("button");
    
    Buttons[0].setAttribute("class", "button update");
    Buttons[0].setAttribute("title", "update");
    Buttons[0].setAttribute("src", "../static/images/update.png");
    Buttons[0].setAttribute("onclick", "javascript: update("+id+", "+parseInt(fields[1].value)+");");
    
    
    Buttons[1].setAttribute("class", "button delete");
    Buttons[1].setAttribute("title", "delete");
    Buttons[1].setAttribute("src", "../static/images/delete.png");
    Buttons[1].setAttribute("onclick", "javascript: deleteLab('"+id+"');");
    
}

function update(id, oldID)
{
    var labInfo = document.getElementById(id);
    var fields = labInfo.getElementsByClassName("field");


    $.post({
        url:'../database/updateLab',
        data: {'pk': id, 'labID': fields[1].value, 'oldID' : oldID, 'labName':fields[0].value,
        'fNum':fields[3].value, 'bNum':fields[2].value,
        'pcNum':fields[4].value, 'cap':fields[6].value,
        'chairNum':fields[5].value, 'labStatus':fields[7].value, },
        datatype: 'json',

        success: function(data)
        {
            if(data.exist == false)
            {
                render()
                window.alert("lab updated successfully!")
            }
            else
            {
                window.alert("lab id already exists!");
            }
        }

    }
    );
}

function deleteLab(id)
{
    var choice = confirm("are you sure you want to delete this lab?");
    if(choice)  
    {
        $.post({
            url:'../database/deleteLab',
            data: {'pk': id},
            datatype: 'json',
    
            success: function(data)
            {
                render()
                window.alert("lab deleted successfully!");
            }
        }
        );
    }
}

function reportLab(id)
{
    var reportID
    var labInfo = document.getElementById(id);
    var fields = labInfo.getElementsByClassName("field");
    reportID = parseInt(fields[1].value)
    sessionStorage.setItem('reportID', reportID)
    location.href = '../report';
  

}

function render()
{
    $.ajax({
        url:'../database/getLabs',
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
                section += "' class= 'labinfo'> <div>Name:&emsp; <input id='name' class='field' type='text' value='";
                section += inner.fields.labName;
                section += "' readonly size='10'></div> <div>ID:&emsp; <input id='ID' class='field' type='number' value='";
                section += inner.fields.labID;
                section += "' readonly size='4'> </div> <div>building number:&emsp; <input id='building' class='field' type='number' value='";
                section += inner.fields.bNum;
                section += "' readonly size='4'></div> <div>floor number:&emsp; <input id='floor' class='field' type='number' value='";
                section += inner.fields.fNum;
                section += "' readonly size='4'></div> <div> number of PCS:&emsp; <input id='pcNum' class='field' type='number' value='";
                section += inner.fields.pcNum;
                section += "' readonly size='4'></div> <input id = '";
                section += inner.pk;
                section += "' onclick=\"edit('";
                section += inner.pk;
                section += "')\" class='button edit' title ='edit' src = '../static/images/edit.png' type='image'/> <div> number of chairs:&emsp; <input id='chairs' class='field' type='number' value='";
                section += inner.fields.chairNum;
                section += "' readonly size='4'></div> <div> capacity:&emsp; <input id='capacity'  class='field' type='number' value='";
                section += inner.fields.cap;
                section += "' readonly size='4'></div> <input id = '";
                section += inner.pk;
                section += "' onclick=\"reportLab('";
                section += inner.pk;
                section += "')\" class='button report' title = 'report' src = \"../static/images/report.png\" type='image'/> <div> status:&emsp; <select name=\"labStatus\" class = \"field\" id=\"status\">";
                section += "<option value=\"";
                section += inner.fields.labStatus;
                section += "\">";
                section += inner.fields.labStatus;
                section += "</option> </select> </div> </section>";
                
                
                inner_html += section;
                
            }
            document.getElementById('wrapper').innerHTML = inner_html;  
            document.getElementById('searchBar').value = '';
        }

    });
}

