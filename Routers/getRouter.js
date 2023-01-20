const express = require('express');
const getRouter = express.Router();
const roleSchema = require('../Models/RolesSchema');
const CategorySchema = require('../Models/CategorySchema');
const SubcategorySchema = require('../Models/SubcategorySchema');
const BrandSchema = require('../Models/BrandSchema');
const UnitSchema = require('../Models/UnitSchema');
const SizeSchema = require('../Models/SizeSchema');
const ProductSchema = require('../Models/ProductSchema');
const PurchaseEntrySchema = require('../Models/PurchaseEntrySchema');
const AdjustmentSchema = require('../Models/AdjustmentSchema');
const SalesReturnSchema = require('../Models/SalesReturnSchema');
const PurchaseReturnSchema = require('../Models/PurchaseReturnSchema');
const PosSchema = require('../Models/POS_Schema');
const trackstock = require('../Models/TrackStock');
const VolumeSchema = require('../Models/VolumeSchema');

/**********************************************
 *  -Get all roles.
 **********************************************/
getRouter.get('/roles', (req, res) => {
    roleSchema.find({ isSuperAdmin: false }).then(response => {
        res.json(response);
    }).catch(error => {
        res.json(error)
    })
})
/*************************************************
 *  - Get all categories
 *************************************************/
getRouter.get('/categories', (req, res) => {
    CategorySchema.find().then(response => {
        res.json(response);
    }).catch(error => {
        res.json(error)
    })
})

/***************************************************
 *  - Get all subcategories
 ***************************************************/
getRouter.get('/subcategories', (req, res) => {
    SubcategorySchema.find().then(response => {
        res.json(response);
    }).catch(error => {
        res.json(error)
    })
})
/****************************************************
 *  - Get all brands
 ****************************************************/
getRouter.get('/brands', (req, res) => {
    BrandSchema.find().then(response => {
        res.json(response);
    }).catch(error => {
        res.json(error)
    })
})

/*****************************************************
 *  - Get all units
 *****************************************************/
getRouter.get('/units', (req, res) => {
    UnitSchema.find().then(response => {
        res.json(response);
    }).catch(error => {
        res.json(error);
    })
})

/*****************************************************
 *  - Get all volume
 *****************************************************/
getRouter.get('/volumes', (req, res) => {
    VolumeSchema.find().then(response => {
        res.json(response);
    }).catch(error => {
        res.json(error);
    })
})

/*****************************************************
 *  - Get all size
 *****************************************************/
getRouter.get('/sizes', (req, res) => {
    SizeSchema.find().then(response => {
        res.json(response);
    }).catch(error => {
        res.json(error);
    })
})
/*****************************************************
 *  - Get all product
 *****************************************************/
getRouter.get('/products', (req, res) => {
    ProductSchema.find().then(response => {
        res.json(response);
    }).catch(error => {
        res.json(error);
    })
})
/*****************************************************
 *  - Get all Purchase Entry
 *****************************************************/
getRouter.get('/purchaseEntries', (req, res) => {
    PurchaseEntrySchema.find().then(response => {
        res.json(response);
    }).catch(error => {
        res.json(error);
    })
})

/*****************************************************
 *  - Get all Adjustment Entry
 *****************************************************/
getRouter.get('/adjustmentEntries', (req, res) => {
    AdjustmentSchema.find().then(response => {
        res.json(response);
    }).catch(error => {
        res.json(error);
    })
})

/*****************************************************
 *  - Get all Sales Return Entry
 *****************************************************/
getRouter.get('/salesReturnEntries', (req, res) => {
    SalesReturnSchema.find().then(response => {
        res.json(response);
    }).catch(error => {
        res.json(error);
    })
})

/*****************************************************
 *  - Get all Purchase Return Entry
 *****************************************************/
getRouter.get('/purchaseReturnEntries', (req, res) => {
    PurchaseReturnSchema.find().then(response => {
        res.json(response);
    }).catch(error => {
        res.json(error);
    })
})

/*****************************************************
 *  - Get all POS
 *****************************************************/
getRouter.get('/pos', (req, res) => {
    PosSchema.find().then(response => {
        res.json(response);
    }).catch(error => {
        res.json(error);
    })
})


/*****************************************************
 *  - Track Stock 
 *****************************************************/
getRouter.get('/trackstock', (req, res) => {
    console.log('reached');
    trackstock.find().then(response => {
        res.json(response);
    }).catch(error => {
        res.json(error);
    })
})


// getRouter.get("/updatestock", async (req, res) => {
    
//     const trackStocks = await trackstock.find();

//     trackStocks.map(async (item) => {
//         const product = await ProductSchema.findOne({ productName: item.productName });
       
//         if (product) {
//             await trackstock.updateOne({ _id: item._id }, { $set: { productCode: item.productCode } })
            
            
//         }
//     })

//     res.send(await trackstock.find())
// })



module.exports = getRouter;     