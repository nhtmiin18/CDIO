class APIFeatures {
    constructor(query, queryString) {
      this.query = query;
      this.queryString = queryString;
      console.log('🔧 [APIFeatures] Created with queryString:', queryString);
    }
  
    filter() {
      const queryObj = { ...this.queryString };
      const excludedFields = ['page', 'sort', 'limit', 'fields', 'search'];
      excludedFields.forEach(el => delete queryObj[el]);
  
      console.log('🔧 [APIFeatures.filter] Query object after exclude:', queryObj);
  
      let queryStr = JSON.stringify(queryObj);
      queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
  
      console.log('🔧 [APIFeatures.filter] Query string:', queryStr);
  
      if (Object.keys(JSON.parse(queryStr)).length > 0) {
        this.query = this.query.find(JSON.parse(queryStr));
      }
      
      console.log('🔧 [APIFeatures.filter] Query after filter:', this.query._conditions);
      return this;
    }
  
    search() {
      if (this.queryString.search) {
        const searchTerm = this.queryString.search;
        console.log('🔧 [APIFeatures.search] Searching for:', searchTerm);
        
        this.query = this.query.find({
          $or: [
            { fullName: { $regex: searchTerm, $options: 'i' } },
            { email: { $regex: searchTerm, $options: 'i' } },
            { studentId: { $regex: searchTerm, $options: 'i' } },
            { major: { $regex: searchTerm, $options: 'i' } }
          ]
        });
      }
      return this;
    }
  
    sort() {
      if (this.queryString.sort) {
        const sortBy = this.queryString.sort.split(',').join(' ');
        console.log('🔧 [APIFeatures.sort] Sorting by:', sortBy);
        this.query = this.query.sort(sortBy);
      } else {
        console.log('🔧 [APIFeatures.sort] Default sort by createdAt desc');
        this.query = this.query.sort('-createdAt');
      }
      return this;
    }
  
    limitFields() {
      if (this.queryString.fields) {
        const fields = this.queryString.fields.split(',').join(' ');
        console.log('🔧 [APIFeatures.limitFields] Selecting fields:', fields);
        this.query = this.query.select(fields);
      } else {
        console.log('🔧 [APIFeatures.limitFields] Excluding __v');
        this.query = this.query.select('-__v');
      }
      return this;
    }
  
    paginate() {
      const page = parseInt(this.queryString.page, 10) || 1;
      const limit = parseInt(this.queryString.limit, 10) || 10;
      const skip = (page - 1) * limit;
  
      console.log('🔧 [APIFeatures.paginate] Page:', page, 'Limit:', limit, 'Skip:', skip);
  
      this.query = this.query.skip(skip).limit(limit);
      return this;
    }
  }
  
  module.exports = APIFeatures;