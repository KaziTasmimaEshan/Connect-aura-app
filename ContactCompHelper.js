({
    //helper method for defining UI columns and getting contact records fetched from salesforce
    fetchContactsHelper : function(component) {
        //defining UI columns
        component.set("v.columns", [
            {label: "Name", fieldName: "Name", type: "text"},
            {label: "Email", fieldName: "Email", type: "email"},
            {label: "Phone", fieldName: "Phone", type: "phone"},
            {label: "Account", fieldName: "AccountName", type: "text"}
        ]);

        //getting contact records fetched from salesforce
        var action = component.get("c.getContacts");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS"){
                var contacts = response.getReturnValue();  
                
                contacts.forEach(function(con){
                    con.AccountName = con.Account ? con.Account.Name : '';
                })
                
                component.set("v.contacts", contacts);
            } else{
                alert("An error occurred while fetching the data");
            }      
        });
        $A.enqueueAction(action);
    }
})