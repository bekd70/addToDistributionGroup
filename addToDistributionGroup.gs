//group 1 email address
var group1Email = 'esaqialerts@xxx.xxx';

//Group2 email address
var group2Email = 'mshsaqialerts@xxx.xxx'
/**
 * Adds a user to an existing group in the domain.
 */
function addGroupMember(emailAddress,groupEmail) {
  var userEmail = emailAddress;
  var groupEmail = groupEmail;
  var member = {
    email: userEmail,
    role: 'MEMBER'
  };
  member = AdminDirectory.Members.insert(member, groupEmail);
  Logger.log('User %s added as a member of group %s.', userEmail, groupEmail);
}


function onFormSubmit(e) {
  Logger.clear();
  var values = SpreadsheetApp.getActive().getSheetByName('Form Responses 1')
     .getDataRange().getValues();
  //gets the last row of data submitted and only last row
  for (var i = values.length-1; i < values.length; i++) {
    //gets information from all collumns in the row
    var session = values[i];
    //breaks date out to it's own variable
    var dateSubmitted = session[0].toLocaleDateString();
    //breaks time out to it's own variable
    var timeSubmitted = session[0].toLocaleTimeString();
    //gets user email address from form . (the second column)
    var emailAddress = session[1];
    //gets the answer to the first question. (the third column)
    var esGroup = session[2];
    //gets the answer to the second question. (the fourth column)
    var mshsGroup =session[3];
    
    //for debug to make sure I am getting the right data
    Logger.log('%s submitted this answer: %s to question 1 and this answer: %s to question 2 at %s %s.',emailAddress, esGroup,mshsGroup,dateSubmitted, timeSubmitted);
    
    //if they answered "Yes" to the first question
    if (esGroup == 'Yes'){
      //call to function to add to distribution group
      addGroupMember(emailAddress,group1Email);
      
      //sets the cell range to the last row, and the fifth column (the cell I want to update if they want to subscribe to the es group) 
      cell = SpreadsheetApp.getActive().getSheetByName('Form Responses 1').getRange(values.length, 5,1,1);
      //updates the cell
      cell.setValue(emailAddress+" was added to the ES AQI Alerts at "+ timeSubmitted+" on "+ dateSubmitted);
    }
    
    //if they answered "Yes" to the second question
    if (mshsGroup == 'Yes'){
      //call to function to add to distribution group
      addGroupMember(emailAddress,group2Email);
      
      //sets the cell range to the last row, and the sixth column (the cell I want to update if they want to subscribe to the ms/hs group)
      cell = SpreadsheetApp.getActive().getSheetByName('Form Responses 1').getRange(values.length, 6,1,1);
      //updates the cell
      cell.setValue(emailAddress+" was added to the MS/HS AQI Alerts at "+ timeSubmitted+" on "+ dateSubmitted);
    }
 
  }
}