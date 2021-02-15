//Pagination, Select, Sort, Mongo Operators
const advancedResults = (model, populate) => async (req, res, next) => {
    let query;

    // Copy request query
    const reqQuery = { ...req.query };
  
    // Fields to exclude in query
    const removeFields = ['select', 'sort', 'page', 'limit'];
  
    // Iterate over removeFields and delete from req query
    removeFields.forEach((param) => delete reqQuery[param]);
  
    // Create query string
    // let queryStr = Object.values(reqQuery).toString();
    let queryStr = JSON.stringify(Object.values(reqQuery));
  
    // Finding resources by query string
    // if(queryStr.length > 0){
    //   query = model.find({name: queryStr});
    // } else {
    //   query = model.find({});
    // }
    
    // Select fields
    if (req.query.select) {
      const fields = req.query.select.split(',').join(' ');
      query = query.select(fields);
    }

    // Sort fields
    if (req.query.sort) {
      query = query.sort(req.query.sort);
    } else {
      query = query.sort('-createdAt');
    }
  
    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 25;
    const startIndex = (page - 1) * limit;
    const total = await model.countDocuments();
    const totalPages = Math.ceil(total/limit)
    query = query.skip(startIndex).limit(limit);
  
    // Populate
    if (populate) {
      query = query.populate(populate);
    }
  
    // Run query
    const results = await query;

    // Pagination result
    const pagination = {
      limit: limit,
      currentPage: page,
      totalPages: totalPages
    };
  
    res.advancedResults = {
      success: true,
      count: results.length,
      pagination,
      data: results,
    };
  
    next();
  };
  
  module.exports = advancedResults;
  