({
    fetchContactsHelper : function(component) {       
        var action = component.get("c.getAllContacts");
        action.setCallback(this, function(response) {
            if (response.getState() === "SUCCESS") {
                component.set("v.contactOptions", response.getReturnValue());
            }
        });
        $A.enqueueAction(action);
        
    },
    
    fetchOppsHelper : function(component) {       
        var action = component.get("c.getAllOpps");
        action.setCallback(this, function(response) {
            if (response.getState() === "SUCCESS") {
                component.set("v.oppOptions", response.getReturnValue());
            }
        });
        $A.enqueueAction(action);
        
    },
    
    
    checkLookupAcc : function(component, conId) {
    var action = component.get("c.getLookupAcc");
    action.setParams({ cId: conId });

    action.setCallback(this, function(response) {
        if (response.getState() === "SUCCESS") {
            var accountId = response.getReturnValue();
            if (accountId != null) {
                component.set("v.selectedAccountId", accountId);
                var action1 = component.get("c.getAccName");
                action1.setParams({ aId: accountId });

                action1.setCallback(this, function(response2) {
                    if (response2.getState() === "SUCCESS") {
                        var accName = response2.getReturnValue();
                        if (accName != null) {
                            component.set("v.accountNameFromContact", accName);
                            component.set("v.disableAccountInput", true);
                            component.set("v.showAccountPicklist", false);
                        }
                    } else {
                        console.error("Failed to fetch Account name.");
                    }
                });

                $A.enqueueAction(action1);
            } else {
                this.AccountPicklist(component);
            }
        } else {
            console.error("Failed to fetch AccountId from contact.");
        }
    });

    $A.enqueueAction(action);
},
    
    AccountPicklist : function(component){
        component.set("v.showAccountPicklist", true);
        var action = component.get("c.getAllAccounts");
        action.setCallback(this, function(response) {
            if (response.getState() === "SUCCESS") {
                component.set("v.accountOptions", response.getReturnValue());
            }
        });
        $A.enqueueAction(action);
    },
    
    makeConnectionsAmongAll : function(component, cId, aId, oId){
        var action = component.get("c.createConnectionsAmongAll");
        
        action.setParams({ cId : cId, aId : aId, oId : oId });
        
        action.setCallback(this, (response) => {
            if (response.getState() === "SUCCESS") {
                console.log("saved");
                var childComp = component.find("contTable");
                    if (childComp) {
                        childComp.refreshTable();
                    }
                this.insertConnectData(component, cId);
            }
        });
        $A.enqueueAction(action);
        component.set("v.isModalOpen", false);
    },
    
    insertConnectData : function(component, cId){
        console.log("ashchi");
        var action = component.get("c.insertConnections");
        action.setParams({ cId: cId });
        
        action.setCallback(this, function(response) {
            if (response.getState() === "SUCCESS") {
                console.log("saved connections");
                var childComp = component.find("connTable");
                if (childComp) {
                    childComp.refreshTable(); 
                }
            }
        });
        $A.enqueueAction(action);
    }
    
})