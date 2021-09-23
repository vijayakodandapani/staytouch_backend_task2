module.exports = `
type error{
    name: String!
    message: String! 
  }

  type PAGE_INFO{
    totalRecords: Int,
    pageLimit: Int,
  }

  type saveDataResult{
    publicId: String,
    message: String,
  }
  
  type result{
    errors: [ error ],
    data: saveDataResult
  }
  
  enum SORT_ORDER{
    ASC
    DESC
  }
`;
