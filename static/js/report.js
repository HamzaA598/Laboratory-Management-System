

function validation() {

    var labID = document.getElementsByClassName('lab-id')[0].value
    var pcNumber = document.getElementsByClassName('pc-number')[0].value
    var problemType = document.getElementsByClassName('problem-type')[0].value
    var date = document.getElementsByClassName('date')[0].value
    var problemDescription = document.getElementsByClassName('problem-description')[0].value

    

    if(labID == "") {
        alert("Labortatory ID is empty");
        return false;
    }
    else if(pcNumber == "") {
        alert("Number of PCs that need repairs is empty");
        return false;
    }
    else if(date == "") {
        alert("Date of occurence is empty");
        return false;
    }
    else if(problemDescription == "") {
        alert("Problem description is empty");
        return false;
    }
    else {

        $.post({
            url: '../database/reportLab',
            data: {"labID":labID,"pcNum":pcNumber, 
                    "type":problemType, "date":date, 
                    "description":problemDescription},
            datatype: 'JSON',
            success: function(data)
            {
                if(data.labExists)
                    alert('Problem Added to database successfully. One of our specialists will look at it soon')
                else
                    alert('Lab id doesnt exist')
            }

        })

        document.getElementsByClassName('lab-id')[0].value = null
        document.getElementsByClassName('pc-number')[0].value = null
        document.getElementsByClassName('problem-type')[0].value = 'Software'
        document.getElementsByClassName('date')[0].value = null
        document.getElementsByClassName('problem-description')[0].value = ''
    
        return false;
    }
}
