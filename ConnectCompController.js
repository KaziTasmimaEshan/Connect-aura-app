({
    doInit : function(component, event, helper) {
        
        var childComp = component.find("connTable");
        if (childComp) {
            childComp.refreshTable();
        };
        var childComp = component.find("contTable");
        if (childComp) {
            childComp.refreshTable();
        }
    },
    openModal : function(component, event, helper) {
        component.set("v.isModalOpen", true);
        helper.fetchContactsHelper(component);
        helper.fetchOppsHelper(component);
    },
    
    closeModal : function(component, event, helper){
        component.set("v.isModalOpen", false);
    },
    
    handleContactChange : function(component, event, helper){
        var sContactId = component.find("contactPicklist").get("v.value");
        component.set("v.selectedContactId", sContactId);
        //console.log("Selected Contact Id: " + sContactId);
        helper.checkLookupAcc(component, sContactId )
    },
    
    handleAccountPicklistChange : function(component, event, helper){
        var sAccId = component.find("accPicklist").get("v.value"); 
        component.set("v.selectedAccountId", sAccId);
    },
    
    handleOppChange : function(component, event, helper){
        var sOppId = component.find("oppPicklist").get("v.value"); 
        component.set("v.selectedOppId", sOppId);
    },
    
    save : function(component, event, helper){
        helper.makeConnectionsAmongAll(component,
                                       component.get("v.selectedContactId"),
                                       component.get("v.selectedAccountId"),
                                       component.get("v.selectedOppId"));
    }
    
    
})