# Google Apps Script

It seems that the Google services that need authorization should be used in the `doGet` and `doPost` methods other wise the WebApp will not ask for authorization or will forget that they are authorized. This can be observed by moving the MailApp usage to another class.
