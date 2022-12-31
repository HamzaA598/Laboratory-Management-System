

function addPC() {   

        var pcID = document.getElementsByClassName('pc-id')[0].value
        var labID = document.getElementsByClassName('lab-id')[0].value
        var status = document.getElementsByClassName('status')[0].value

        if(pcID == "")   {
            alert("PC's ID is empty")
        }
        if( labID == "") {
            alert("Lab's ID is empty")
        }
    
        $.post({
            url:'../database/createPC',
            data: {'labID':labID, 'pcID':pcID,
                    'pcStatus':status, },
            datatype: 'json',
            success: function(data)
            {  
                if(data.labExist == true)
                {
                    if(data.pcExist == false)
                    {
                        window.alert("PC has been added to this lab");
                    }
                    else
                    {
                        window.alert("PC already exists in this lab");
                    }
                }
                else
                {
                    window.alert("Lab doesn't exist")
                }    
            }  
        });


           document.getElementsByClassName('id')[0].value = ""
           document.getElementsByClassName('id')[1].value = ""
           document.getElementsByClassName('status')[0].value = "Active"

    }




