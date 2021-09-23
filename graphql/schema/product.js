const { filterFields } = require('./filter');

module.exports = `
scalar Upload
    enum KEY_FIELD{
        publicId
        name
        description
        price
        images
        discount
        category
    }
    
    input PRODUCT_SORT{
        key: KEY_FIELD!
        direction: SORT_ORDER!
    }
    
    input PRODUCT_FILTER{
        key: KEY_FIELD!
        ${filterFields}
    }
 
    input PRODUCT_INPUT {
        name: String
        description: String
        price: String
        discount: String
        category: String
        bucketName:String!
        files:[Upload!]
    }
    type Object {
        url:String
        key:String
    }
    
    type PRODUCT{
        publicId: UUID
        name: String
        description: String
        price: String
        discount: String
        images:[Object]
        category: String
    }
    type PRODUCTS{
        publicId: UUID
        name: String
        description: String
        price: String
        discount: String
        images:JSONObject
        category: String
    }

    type PRODUCT_DETAILS {
        data: PRODUCTS
        errors: [ error ]
    }

    type PRODUCT_DETAILS_LIST {
        data: [ PRODUCTS ]
        pageInfo: PAGE_INFO
        errors: [ error ]
    }

    type Query {    
        GetProduct(publicId: UUID): PRODUCT_DETAILS
        GetProducts(pageNumber: Int,pageSize: Int,sorting: [PRODUCT_SORT],filters: [PRODUCT_FILTER]): PRODUCT_DETAILS_LIST
    }

    type Mutation {
        AddProduct(input: PRODUCT_INPUT): result
        UpdateProduct(publicId: UUID!,input: PRODUCT_INPUT): result
        DeleteProduct(publicId: UUID!): result
    }
`;
