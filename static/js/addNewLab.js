
// add new lab validation
function validateInput()
{
    
    var newLab = new Object()

     newLab.ID = document.getElementById("ID").value;
     newLab.name = document.getElementById("name").value;
     newLab.building = document.getElementById("building").value;
     newLab.floor = document.getElementById("floor").value;
     newLab.pcNum = document.getElementById("pcNum").value;
     newLab.capacity = document.getElementById("capacity").value;
     newLab.chair = document.getElementById("chairs").value;
     newLab.status = document.getElementById("status").value;
    
    if(newLab.ID == "")
    {
        window.alert('Please enter a valid ID')
        return false
    }   
    else if(newLab.name == "")
    {
        window.alert('Please enter a valid name')
        return false
    }  
    else if(newLab.building == "")
    {
        window.alert('Please enter a valid building number')
        return false
    }  
    else if(newLab.floor == "")
    {
        window.alert('Please enter a valid floor number')
        return false
    }   
    else if(newLab.pcNum == "")
    {
        window.alert('Please enter a valid number of PCS')
        return false
    }   
    else if(newLab.capacity == "")
    {
        window.alert('Please enter a valid capacity')
        return false
    }
    else if(newLab.chair == "")
    {
        window.alert('Please enter a valid number of chairs')
        return false
    }

    
   $.post({
       url:'../database/createLab',
       data: {'labID':newLab.ID, 'labName':newLab.name,
            'fNum':newLab.floor, 'bNum':newLab.building,
            'pcNum':newLab.pcNum, 'cap':newLab.capacity,
            'chairNum':newLab.chair, 'labStatus':newLab.status, },
        datatype: 'json',
        success: function(data)
        {
            if(data.exist == false)
            {
                window.alert("Lab has been added");
            }
            else
            {
                window.alert("lab ID already exists");
            }
        }
   })

    document.getElementById("ID").value = null;
    document.getElementById("name").value = '';
    document.getElementById("building").value = '';
    document.getElementById("floor").value = '';
    document.getElementById("pcNum").value = '';
    document.getElementById("capacity").value = '';
    document.getElementById("chairs").value = '';
    document.getElementById("status").value = 'Active';
    window.scrollTo(0,0);
    return false

}


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
                section += "' readonly size='10'></div> <div>ID:&emsp; <input id='ID' class='field' type='text' value='";
                section += inner.fields.labID;
                section += "' readonly size='4'> </div> <div>building number:&emsp; <input id='building' class='field' type='text' value='";
                section += inner.fields.bNum;
                section += "' readonly size='4'></div> <div>floor number:&emsp; <input id='floor' class='field' type='text' value='";
                section += inner.fields.fNum;
                section += "' readonly size='4'></div> <div> number of PCS:&emsp; <input id='pcNum' class='field' type='text' value='";
                section += inner.fields.pcNum;
                section += "' readonly size='4'></div> <input id = '";
                section += inner.pk;
                section += "' onclick=\"edit('";
                section += inner.pk;
                section += "')\" class='button edit' src = '../static/images/edit.png' type='image'/> <div> number of chairs:&emsp; <input id='chairs' class='field' type='text' value='";
                section += inner.fields.chairNum;
                section += "' readonly size='4'></div> <div> capacity:&emsp; <input id='capacity'  class='field' type='text' value='";
                section += inner.fields.cap;
                section += "' readonly size='4'></div> <input id = '";
                section += inner.pk;
                section += "' onclick=\"reportLab('";
                section += inner.pk;
                section += "')\" class='button report' src = \"../static/images/report.png\" type='image'/> <div> status:&emsp; <input id='status'  class='field' type='text' value='";
                section += inner.fields.labStatus;
                section += "' readonly size='16'></div> </section>";
                
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
        fields[i].style.height='14px';
    }
    
    
    var Buttons =  labInfo.getElementsByClassName("button");
    
    Buttons[0].setAttribute("class", "button update");
    Buttons[0].setAttribute("src", "../static/images/update.png");
    Buttons[0].setAttribute("onclick", "javascript: update("+id+", "+parseInt(fields[1].value)+");");
    
    
    Buttons[1].setAttribute("class", "button delete");
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
                section += "' readonly size='10'></div> <div>ID:&emsp; <input id='ID' class='field' type='text' value='";
                section += inner.fields.labID;
                section += "' readonly size='4'> </div> <div>building number:&emsp; <input id='building' class='field' type='text' value='";
                section += inner.fields.bNum;
                section += "' readonly size='4'></div> <div>floor number:&emsp; <input id='floor' class='field' type='text' value='";
                section += inner.fields.fNum;
                section += "' readonly size='4'></div> <div> number of PCS:&emsp; <input id='pcNum' class='field' type='text' value='";
                section += inner.fields.pcNum;
                section += "' readonly size='4'></div> <input id = '";
                section += inner.pk;
                section += "' onclick=\"edit('";
                section += inner.pk;
                section += "')\" class='button edit' src = '../static/images/edit.png' type='image'/> <div> number of chairs:&emsp; <input id='chairs' class='field' type='text' value='";
                section += inner.fields.chairNum;
                section += "' readonly size='4'></div> <div> capacity:&emsp; <input id='capacity'  class='field' type='text' value='";
                section += inner.fields.cap;
                section += "' readonly size='4'></div> <input id = '";
                section += inner.pk;
                section += "' onclick=\"reportLab('";
                section += inner.pk;
                section += "')\" class='button report' src = \"../static/images/report.png\" type='image'/> <div> status:&emsp; <input id='status'  class='field' type='text' value='";
                section += inner.fields.labStatus;
                section += "' readonly size='16'></div> </section>";
                
                inner_html += section;
                
            }
            document.getElementById('wrapper').innerHTML = inner_html;  
        }

    });
}


