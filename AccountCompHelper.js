({
    //helper method for defining UI columns and getting account records fetched from salesforce
    fetchAccountsHelper : function(component) {
        //defining UI columns
        component.set("v.columns", [
            {label: "Name", fieldName: "Name", type: "text"},
            {label: "Is Active?", fieldName: "Active__c", type: "boolean"},
            {label: "Owner", fieldName: "OwnerName", type: "text"}
        ]);

        //getting account records fetched from salesforce
        var action = component.get("c.getAccounts");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS"){
                var accounts = response.getReturnValue();  
                
                accounts.forEach(function(acc){
                    acc.OwnerName = acc.Owner.Name;
                })

                component.set("v.accounts", accounts);
            } else{
                alert("An error occurred while fetching the data");
            }      
        });
        $A.enqueueAction(action);
    }
    
})