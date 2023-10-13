public with sharing class ProjectSummary {
	@AuraEnabled
    public static void insertProjectData(String firstName,String secondName,String thirdName,String forthName,String fifthName){
        List<Project__c> insertRecord = new List<Project__c>();
        Try{
            Project__c	project = new Project__c();
            project.Name1__c = firstName;
            project.Name2__c = secondName;
            project.Name3__c = thirdName;
            project.Name4__c = forthName;
            project.Name5__c = fifthName;
            insertRecord.add(project);
            List<Project__c> existingRecords = [select Id,Name1__c,Name2__c,Name3__c,Name4__c,Name5__c from Project__c];
            for(Project__c p1:existingRecords){
                for(Project__c p2:insertRecord){
                    if(p1.Name1__c == p2.Name1__c || p1.Name2__c == p2.Name2__c || p1.Name3__c == p2.Name4__c || p1.Name5__c == p2.Name5__c){
                        p1.addError('Record are already exist!!');
                        // right now here addError class not support to work in apex and its valid only for trigger context. I'll do some alternatives ways
                 }
              }
            }
            insert insertRecord;
            System.debug('Record Inserted Successfully!!');
        }catch(Exception e){
            System.debug('DML exception occur!!'+e);
        }
    }
    
/* @AuraEnabled(cacheable=true)  // NOT uSED
    public static List<Project__c> getProjectDetails(){
        return [select Id, Name1__c,Name2__c,Name3__c,Name4__c,Name5__c from Project__c];
    }*/
    
}