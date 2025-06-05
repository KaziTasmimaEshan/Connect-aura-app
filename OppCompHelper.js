({
    //helper method for defining UI columns and getting opportunity records fetched from salesforce
    fetchOpportunitiesHelper : function(component) {
        //defining UI columns
        component.set("v.columns", [
            {label: "Name", fieldName: "Name", type: "text"},
            {label: "Stage", fieldName: "StageName", type: "text"},
            {label: "Account", fieldName: "AccountName", type: "text"}
        ]);

        //getting opportunity records fetched from salesforce
        var action = component.get("c.getOpportunities");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS"){
                var opp = response.getReturnValue();  
                
                opp.forEach(function(o){
                    o.AccountName = o.Account ? o.Account.Name : '';
                })
                
                component.set("v.opportunities", opp);
            } else{
                alert("An error occurred while fetching the data");
            }      
        });
        $A.enqueueAction(action);
    }
})