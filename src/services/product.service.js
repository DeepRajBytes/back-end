
const Category = require("../models/category.model");
const Product = require("../models/product.model");
const user = require("../models/user.model");
const userdata = require("../models/user.model")


async function createproduct(reqData) {
    let topLevel = await Category.findOne({ name: reqData.topLavelcategory });
    if (!topLevel) {
        topLevel = new Category({
            name: reqData.topLavelcategory,
            level: 1
        });
        await topLevel.save();
    }
    
    let secondLevel = await Category.findOne({ name: reqData.secondLavelcategory, parentCategory: topLevel._id });
    if (!secondLevel) {
        secondLevel = new Category({
            name: reqData.secondLavelcategory,
            parentCategory: topLevel._id,
            level: 2
        });
        await secondLevel.save(); 
    }
    
    let thirdLevel = await Category.findOne({ name: reqData.thirdLavelcategory, parentCategory: secondLevel._id });
    if (!thirdLevel) {
        thirdLevel = new Category({
            name: reqData.thirdLavelcategory,
            parentCategory: secondLevel._id,
            level: 3
        });
        await thirdLevel.save();
    }

    const product = new Product({
        title:reqData.title,
        color:reqData.color,
        description:reqData.description,
        discountedPrice:reqData.discountedPrice,
        discountedPercent:reqData.discountedPercent,
        imageUrl:reqData.imageUrl,
        brand:reqData.brand,
        price:reqData.price,
        size:reqData.size,
        images:reqData.images,
        quantity:reqData.quantity,
        category:thirdLevel._id
  })

//   return await product.save();
    const savedProduct = await product.save();
  const findProduct = await Product.findById(savedProduct._id).populate("category")
    return findProduct ; 


}

async function deleteproduct(productId){
    const product = await findproductbyid(productId)
    await Product.findByIdAndDelete(productId);
    return "product Removed";
}

async function updateproduct(reqData,productId){
    return await Product.findByIdAndUpdate(productId,reqData)
}

async function findproductbyid(productId){
    const product = await Product.findById(productId).populate({
        path: 'reviews',
        populate: { path: 'user' } 
    }).populate('category').exec();
  
    if(!product){
        throw new Error("product does not found",productId)
    }
    return product;
}


async function findproductbyParticularcategory(category){

    const exist = await Category.findOne({ name: category.category});
    

    if(!exist){
      return;
    }
    const product = await Product.find({category:exist._id}).populate('category').exec();
    
    if(!product){
        throw new Error("product does not found",productId)
    }
    return { content : product}; ;
}


async function getAllProducts(reqQuery) {
    let { category, color, size, minPrice, maxPrice, minDiscount, sort, stock, pageSize, pageNumber } = reqQuery;
    
    pageSize = pageSize || 50; 
    // pageNumber = parseInt(pageNumber) || 1;  

    let query = Product.find().populate("category");
    

    if (category) {
        
        const exist = await Category.findOne({ name: category });
       
        if (exist) {
            
            query = query.where("category").equals(exist._id);
            
        } else {
            return { content: [], currentPage: 1, totalPages: 0 };
        }
    }            

    if (color) {
       const colorSet = new Set(color.split(",").map(color => color.trim().toLowerCase()));
      
        const colorRegex = colorSet.size > 0?new RegExp([...colorSet].join("|"), "i") : null;

        query = query.where("color").regex(colorRegex)
    }

    if (size) {
        const sizesSet = new Set(size);
        query = query.where("size.name").in([...sizesSet]);
    }

    if (minPrice && maxPrice) {
        query = query.where("discountedPrice").gte(minPrice).lte(maxPrice);
    }

    if (minDiscount) {
        query = query.where("discountedPercent").gt(minDiscount);
    }

    if (stock) {
        if (stock === "in_stock") { 
            query = query.where("quantity").gt(0);
        } else if (stock === "out_of_stock") { 
            query = query.where("quantity").lte(1);
        }
    }

    if (sort) {
        const sortDirection = sort === "price_high" ? -1 : 1;
        query = query.sort({ discountedPrice: sortDirection });
    }

    const totalProducts = await Product.countDocuments(query);

    const skip = (pageNumber-1)*pageSize ;

   
    query = query.skip(skip).limit(pageSize);

    const products  = await query.exec();
    
    const totalPages = Math.ceil(totalProducts / pageSize)

    return { content : products , currentPage : pageNumber , totalPages }; 
}


async function createMultipleProduct(products){
    for(let product of products){
        await createproduct(product);
    }
}

async function addProductToWishlist(userId, productId) {
    try {
        
        const user = await userdata.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }
        // console.log("user is ", user);

       
        const product = await findproductbyid(productId);
        if (!product) {
            throw new Error('Product not found');
        }
        // console.log("product is ", product);

        
        if (!user.wishlist.includes(productId)) {
           
            user.wishlist.push(product);
            await user.save();
            // console.log('Product added to wishlist successfully',user);
            return {message:"product successfully add"};
            
        } else {
            console.log('Product is already in the wishlist');
        }
    } catch (error) {
        console.error('Error adding product to wishlist:', error.message);
    }
    
    
}



module.exports={
     createproduct,
     deleteproduct,
     updateproduct,
     getAllProducts,
     findproductbyid,
     createMultipleProduct,
     findproductbyParticularcategory,
     addProductToWishlist
}

