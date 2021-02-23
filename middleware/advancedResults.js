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
    let queryStr = Object.values(reqQuery).toString();

    // Finding resources by query string - /\BqueryStr|queryStr\B/
    if(queryStr.length > 0){
      query = model.find({$text: {$search: queryStr}});
    } else {
      query = model.find({});
    }
    
    // Sort fields
    console.log(req.query.sort)
    if (req.query.sort) {
      query = query.sort({ [req.query.sort]: 1});
    } else {
      query = query.sort({ "lowercaseName": 1, "_id": 1 });
    }

    // Select fields
    if (req.query.select) {
      const fields = req.query.select.split(',').join(' ');
      query = query.select(fields);
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
  