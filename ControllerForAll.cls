public with sharing class ControllerForAll {
    //fetching account records for comp 1
    @AuraEnabled
    public static List<Account> getAccounts(){
        return [select Id, Name,Active__c, Owner.Name from Account
                ORDER BY CreatedDate DESC
                limit 15];
    }

    //fetching contacts records for comp 2
    @AuraEnabled
    public static List<Contact> getContacts(){
        return [select Id, Name, Email, Phone, Account.Id, Account.Name from Contact
                ORDER BY CreatedDate DESC
                limit 15];
    }

    //fetching opportunities records for comp 3
    @AuraEnabled
    public static List<Opportunity> getOpportunities(){
        return [select Id, Name, StageName, Account.Id, Account.Name from Opportunity
                ORDER BY CreatedDate DESC
                limit 15];
    }
    
    // contact picklist for modal
    @AuraEnabled
    public static List<Contact> getAllContacts() {
        return [SELECT Id, Name FROM Contact];
    }
    
    //getting lookup accounts of the selected contact if it has an acc
    @AuraEnabled
    public static string getLookupAcc(string cId){
        Contact con = [
        SELECT AccountId
        FROM Contact
        WHERE Id = :cId
        LIMIT 1];
        return con.AccountId;
    }
    
    //getting the acc name 
    @AuraEnabled
    public static string getAccName(string aId){
        Account acc = [
        SELECT Name
        FROM Account
        WHERE Id = :aId
        LIMIT 1];
        return acc.Name;
    }
    
    // acc picklist if the contact has no acc
    @AuraEnabled
    public static List<Account> getAllAccounts() {
        return [SELECT Id, Name FROM Account];
    }
    
    //opp picklist for modal
    @AuraEnabled
    public static List<Opportunity> getAllOpps() {
        return [SELECT Id, Name FROM Opportunity];
    }
    
    //creating/updating connections in the contact obj
    @AuraEnabled
    public static void createConnectionsAmongAll(string cId, string aId, string oId) {
        Contact conToUpdate = new Contact(
            Id = cId,
            AccountId = aId,
            Opportunity__c = oId
        );
        update conToUpdate;
    }
    
    //inserting connection data to the new obj
    @AuraEnabled
    public static void insertConnections(string cId){
        Contact con = [select Name, AccountId, Opportunity__c from Contact where Id = :cId limit 1];
        Connect__c c = new Connect__c(
            Contact__c = con.Id,
            Account__c = con.AccountId,
            Opportunity__c = con.Opportunity__c
        ); 
        insert c;
    }  
    
    //fetching data for comp 4
    @AuraEnabled
    public static List<Connect__c> getConnections(){
        return [select Id, Contact__c, Contact__r.Name, Account__c, Account__r.Name,
                Opportunity__c, Opportunity__r.Name from Connect__c
               ORDER BY CreatedDate DESC];
    }
}