class ApiFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }
    // search feature 
    search() {
        const keyword = this.queryStr.keyword ? {
            name: {
                // $regex mongoDb operator
                $regex: this.queryStr.keyword,
                $options: "i" //small i means case insenstive

            }
        } : {};
        this.query = this.query.find({ ...keyword }); //   find query on main query
        return this;
    }
    // filter

    filter() {
        // for catagory

        // we need to some change on queryStr so we make a copy for queryStr
        //  we can assign this type because this.queryStr is a object and in javascript object direct assign only reference so whrn 
        // we change one both changes  so we usinf spread operator
        // Not use this type 
        // const copyQueryStr = this.queryStr 
        const copyQueryStr = { ...this.queryStr };

        // removing some fields for catagory 
        const removeFields = ["keyword", "page", "limit"];
        removeFields.forEach(ele => delete copyQueryStr[ele]);


        // filter for price and rating 
        let queryStr = JSON.stringify(copyQueryStr) //copyQueryStr a object so first makeit string 
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, key => `$${key}`)



        this.query = this.query.find(JSON.parse(queryStr));
        return this;

    }


    // pagination

    pagination(resultPerPage){
        // because queryStr a string but we need number so convert it number 
    const currentPage = Number(this.queryStr.page) || 1;
    const skip = resultPerPage*(currentPage-1);
    this.query = this.query.limit(resultPerPage).skip(skip);
    return this;
    }

}




module.exports = ApiFeatures;