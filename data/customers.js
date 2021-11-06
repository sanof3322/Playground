const customers = [
    {
        Id: 1,
        FirstName: "First 1",
        LastName:  "Last 1"
    },
    
    {
        Id: 2,
        FirstName: "First 2",
        LastName:  "Last 2"
    },
    
    {
        Id: 3,
        FirstName: "First 3",
        LastName:  "Last 3"
    },
    
    {
        Id: 4,
        FirstName: "First 4",
        LastName:  "Last 4"
    },
    
    {
        Id: 5,
        FirstName: "First 5",
        LastName:  "Last 5"
    },
    
    {
        Id: 6,
        FirstName: "First 6",
        LastName:  "Last 6"
    },
    
    {
        Id: 7,
        FirstName: "First 7",
        LastName:  "Last 7"
    },
    
    {
        Id: 8,
        FirstName: "First 8",
        LastName:  "Last 8"
    },
    
    {
        Id: 9,
        FirstName: "First 9",
        LastName:  "Last 9"
    },
    
    {
        Id: 10,
        FirstName: "First 10",
        LastName:  "Last 10"
    },
    
    {
        Id: 11,
        FirstName: "First 11",
        LastName:  "Last 11"
    },
    
    {
        Id: 12,
        FirstName: "First 12",
        LastName:  "Last 12"
    },
    
    {
        Id: 13,
        FirstName: "First 13",
        LastName:  "Last 13"
    },
    
    {
        Id: 14,
        FirstName: "First 14",
        LastName:  "Last 14"
    },
    
    {
        Id: 15,
        FirstName: "First 15",
        LastName:  "Last 15"
    },
    
    {
        Id: 16,
        FirstName: "First 16",
        LastName:  "Last 16"
    },
    
    {
        Id: 17,
        FirstName: "First 17",
        LastName:  "Last 17"
    },
    
    {
        Id: 18,
        FirstName: "First 18",
        LastName:  "Last 18"
    },
    
    {
        Id: 19,
        FirstName: "First 19",
        LastName:  "Last 19"
    },
    
    {
        Id: 20,
        FirstName: "First 20",
        LastName:  "Last 20"
    }
]

let str = ""
for (let index = 0; index < 20; index++) {
    str += /*html*/`
    {
        Id: ${index + 1},
        FirstName: "First ${index + 1}",
        LastName:  "Last ${index + 1}"
    },
    `;
}
console.log(str);

export {customers as default}