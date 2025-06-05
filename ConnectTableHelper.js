({
	//helper method for defining UI columns and getting connection records fetched from salesforce
    refreshTableHelper : function(component) {
        //defining UI columns
        component.set("v.columns", [
            {label: "Contact", fieldName: "cName", type: "text"},
            {label: "Account", fieldName: "aName", type: "text"},
            {label: "Opportunity", fieldName: "oName", type: "text"}
        ]);

        //getting connection records fetched from salesforce
        var action = component.get("c.getConnections");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS"){
                var connections = response.getReturnValue();  
                
                connections.forEach(function(c){
                    c.cName = c.Contact__c ? c.Contact__r.Name : '';
                    c.aName = c.Account__c ? c.Account__r.Name : '';
                    c.oName = c.Opportunity__c ?  c.Opportunity__r.Name : '';
                })
                
                component.set("v.connections", connections);
            } else{
                alert("An error occurred while fetching the data");
            }      
        });
        $A.enqueueAction(action);
    }
})