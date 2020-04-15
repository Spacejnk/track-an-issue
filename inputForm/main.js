// submit event from FORM to localstorage
document.getElementById('issueInputForm').addEventListener('submit', saveIssue);

function saveIssue(e) {
    let issueDesc = document.getElementById('issueDescInput').value;
    let issueSeverity = document.getElementById('issueSeverityInput').value
    let issueAssingedTo = document.getElementById('issueAssingedToInput').value
    let issueId = chance.guid();
    let issueStatus = 'Open';

    // issue object compilation
    let issue = {
        id: issueId,
        description: issueDesc,
        severity: issueSeverity,
        assingedTo: issueAssingedTo,
        status: issueStatus
    }

    // checking localstorage
    if (localStorage.getItem('issues') == null) {
        let issues = [];
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));
    } else {
        let issues = JSON.parse(localStorage.getItem('issues'));
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));
    }

    // reset FORM page issueInputForm
    document.getElementById('issueInputForm').reset();

    fetchIssues();

    e.preventDefault();

}

// compare and delete items from local storage
function setStatusClosed(id) {
    let issues = JSON.parse(localStorage.getItem('issues'));

    for (let i = 0; i < issues.length; i++) {
        if (issues[i].id == id) {
            issues[i].status = 'Closed';
        }
    }

    localStorage.setItem('issues', JSON.stringify(issues));

    // update output
    fetchIssues();

}

function deleteIssue(id) {
    let issues = JSON.parse(localStorage.getItem('issues'));

    for (let i = 0; i < issues.length; i++) {
        if (issues[i].id == id) {
            issues.splice(i, 1);
        }
    }

    localStorage.setItem('issues', JSON.stringify(issues));

    // update output
    fetchIssues();

}


// fetch issues from FORM and add to local storage func
function fetchIssues() {
    let issues = JSON.parse(localStorage.getItem('issues'));
    let issuesList = document.getElementById('issuesList');

    // set content of div element issuesList to empty string
    issuesList.innerHTML = '';

    // generate text with for loop to localStorage
    for (let i = 0; i < issues.length; i++){
        let id = issues[i].id;
        let desc = issues[i].description;
        let severity = issues[i].severity;
        let assingedTo = issues[i].assingedTo;
        let status = issues[i].status;

        // get html output
        issuesList.innerHTML += '<div class="well">'+
                                '<h6>Issue ID: ' + id + '</h6>'+
                                '<p><span class="label label-info">' + status + '</span></p>'+
                                '<h3>' + desc + '</h3>'+
                                '<p><span class="glyphicon glyphicon-time"></span>' + severity + '</p>'+
                                '<p><span class="glyphicon glyphicon-user"></span>' + assingedTo + '</p>'+
                                '<a href="#" onclick="setStatusClosed(\''+id+'\')" class="btn btn-warning">Close</a>'+
                                '<a href="#" onclick="deleteIssue(\''+id+'\')" class="btn btn-danger">Delete</a>'+
                                '</div>'
    }
}
