const express = require('express');
const postRouter = express.Router();
const bcrypt = require('bcrypt');
const RoleSchema = require('../Models/RolesSchema');
const CategorySchema = require('../Models/CategorySchema');
const SubcategorySchema = require('../Models/SubcategorySchema');
const BrandSchema = require('../Models/BrandSchema');
const UnitSchema = require('../Models/UnitSchema');
const SizeSchema = require('../Models/SizeSchema');
const VolumeSchema = require('../Models/VolumeSchema');
const ProductSchema = require('../Models/ProductSchema');
const PurchaseEntrySchema = require('../Models/PurchaseEntrySchema');
const AdjustmentSchema = require('../Models/AdjustmentSchema');
const PosSchema = require('../Models/POS_Schema');
const SalesReturnSchema = require('../Models/SalesReturnSchema');
const PurchaseReturnSchema = require('../Models/PurchaseReturnSchema');
const TrackStock = require('../Models/TrackStock');
const LoginSchema = require('../Models/LoginSchema');
const SECRET_KEY = `35912624597df678ec821c4a1b9288d6d01c93779964eda5a95f1604656e2a673bfbb0aa`;
const JWT = require("jsonwebtoken");
const decodeJWT = require('jwt-decode');


const GEN_INVOICE = () => {
    let year = new Date().getFullYear();
    let month = new Date().getMonth();
    let date = new Date().getDate();
    let randomNumber = Math.floor(Math.random() * 90000) + 10000;
    let UUID = `${year}${month}${date}-${randomNumber}`;
    return UUID;
}


// function Authentication(req, res, next) {

//     const now = parseInt(Date.now().valueOf() / 1000);
//     let decryptedToken = decodeJWT(req.cookies.token);
//     console.log(decryptedToken);
// }


// postRouter.post('/authenticate', Authentication, (req, res) => {
//     console.log('tri auth');
// })


/*************************************************************************************  
*    Group Permission:
*        - This route helps   you to create roles for the admin dashboard.
*************************************************************************************/
postRouter.post('/createRole', (req, res) => {

    const { userName, password } = req.body;

    RoleSchema.findOne({ userName }).then((isUserExist) => {
        if (isUserExist === null) {
            let userData = req.body;
            bcrypt.hash(password, 14).then(hash => {
                userData.password = hash;
                userData.isSuperAdmin = false;
                RoleSchema(userData).save().then(response => {
                    res.json({ data: 'User created successfully.', key: 'success' })
                }).catch(err => {
                    res.json({ data: 'Something wrong with database!', key: 'error', error: err })
                })
            })
        } else {
            res.json({ data: 'Username already exist!', key: 'error' })
        }
    }).catch(err => {
        res.json({ data: 'Something wrong with database!', key: 'error', error: err })
    })

})

/******************************************************************************
 *      Admin Dashboard Login:
 *          - This routes helps you to login & access the admin dashboard for both 
 *            superadmin & users (roles). 
 ********************************************************************************/
postRouter.post('/login', (req, res) => {
    const { userName, password } = req.body;

    RoleSchema.findOne({ userName, isSuperAdmin: false }).then(isUserExist => {
        if (isUserExist !== null) {
            bcrypt.compare(password, isUserExist.password).then(pwdMatched => {
                if (pwdMatched) {
                    let temp = isUserExist;
                    delete temp.password;

                    res.json({ data: 'Successfully Logged In', key: 'success', details: temp })
                } else {
                    res.json({ data: 'Either username or password is wrong! Please try with the right credentials.', key: 'error' })
                }
            }).catch(error => {
                res.json({ data: 'Something wrong with password decryption!', key: 'error' })
            })
        } else {
            res.json({ data: 'Either username or password is wrong! Please try with the right credentials.', key: 'error' })
        }
    }).catch(error => {
        res.json({ data: 'Something wrong with database!', key: 'error', error })
    })
})

// postRouter.post('/superAdminLogin', (req, res) => {
postRouter.post('/superAdminLogin', (req, res) => {
    const { userName, password } = req.body;

    RoleSchema.findOne({ userName, isSuperAdmin: true }).then(isUserExist => {
        if (isUserExist !== null) {
            bcrypt.compare(password, isUserExist.password).then(pwdMatched => {
                if (pwdMatched) {
                    let payload = {
                        email: isUserExist.email,
                    };
                    let temp = isUserExist;
                    delete temp.password;
                    res.cookie("token", JWT.sign(payload, SECRET_KEY, { expiresIn: 15000 }), { httpOnly: true })
                    res.json({ data: 'Successfully Logged In', key: 'success', token: true, details: temp });
                } else {
                    res.json({ data: 'Either username or password is wrong! Please try with the right credentials.', key: 'error' })
                }
            }).catch(error => {
                console.log(error);
                res.json({ data: 'Something wrong with password decryption!', key: 'error' })
            })
        } else {
            res.json({ data: 'Either username or password is wrong! Please try with the right credentials.', key: 'error' })
        }
    }).catch(error => {
        res.json({ data: 'Something wrong with database!', key: 'error', error })
    })
})

/****************************************************************************
 *     Category for product:
 *      - This route helps you to create product category.
 ******************************************************************************/
postRouter.post('/createcategory', (req, res) => {
    let { categoryName } = req.body;
    CategorySchema.findOne({ categoryName }).then(isCategoryExist => {
        if (isCategoryExist === null) {
            CategorySchema({ categoryName }).save().then(response => {
                res.json({ data: 'Category added', key: 'success' })
            }).catch(error => {
                res.json({ data: 'Something wrong with database!', key: 'error', error })
            })
        } else {
            res.json({ data: 'Category already exist!', key: 'error' })
        }
    }).catch(error => {
        res.json({ data: 'Something wrong with database!', key: 'error', error });
    })
})

/****************************************************************************
 *     Subcategory for product:
 *      - This route helps you to create product subcategory.
 ******************************************************************************/

postRouter.post('/createsubcategory', (req, res) => {
    let { categoryName, subCategoryName } = req.body;
    SubcategorySchema.findOne({ subCategoryName }).then(isSubcategoryExist => {
        if (isSubcategoryExist === null) {
            SubcategorySchema({
                categoryName,
                subCategoryName
            }).save().then(() => {
                res.json({ data: 'Subcategory added', key: 'success' })
            }).catch((error) => {
                res.json({ data: 'Something wrong with database!', key: 'error', error })
            })
        } else {
            res.json({ data: 'Subcategory already exist!', key: 'error' })
        }
    }).catch(error => {
        res.json({ data: 'Something wrong with database!', key: 'error', error });
    })
})

/***************************************************************
 *    Brands for product
 *      - This route helps you to create product brands
 ***************************************************************/

postRouter.post('/createbrand', (req, res) => {
    let { brandName } = req.body;

    BrandSchema.findOne({ brandName }).then(isBrandExist => {
        if (isBrandExist === null) {
            BrandSchema({ brandName }).save().then(() => {
                res.json({ data: 'Brand added', key: 'success' })
            }).catch(error => {
                res.json({ data: 'Something wrong with database!', key: 'error', error })
            })
        } else {
            res.json({ data: 'Brand already exist!', key: 'error' })
        }
    }).catch(error => {
        res.json({ data: 'Something wrong with database!', key: 'error', error })
    })
})

/***************************************************************
 *    Units for product
 *      - This route helps you to create product units
 ***************************************************************/
postRouter.post('/createUnit', (req, res) => {
    let { unit } = req.body;

    UnitSchema.findOne({ unit }).then(isUnit => {
        if (isUnit === null) {
            UnitSchema({ unit }).save().then(() => {
                res.json({ data: 'Unit added', key: 'success' })
            }).catch(error => {
                res.json({ data: 'Something wrong with database!', key: 'error', error })
            })
        } else {
            res.json({ data: 'Unit already exist!', key: 'error' })
        }

    }).catch(error => {
        res.json({ data: 'Something wrong with database!', key: 'error', error })
    })

})

/***************************************************************
 *    Volume for product
 *      - This route helps you to create product units
 ***************************************************************/
postRouter.post('/createVolume', (req, res) => {
    let { volume } = req.body;

    VolumeSchema.findOne({ volume }).then(isVolume => {
        if (isVolume === null) {
            VolumeSchema({ volume }).save().then(() => {
                res.json({ data: 'Volume added', key: 'success' })
            }).catch(error => {
                res.json({ data: 'Something wrong with database!', key: 'error', error })
            })
        } else {
            res.json({ data: 'Volume already exist!', key: 'error' })
        }

    }).catch(error => {
        res.json({ data: 'Something wrong with database!', key: 'error', error })
    })

})

/*********************************************************************
 *    Sizes for products.
 *      - This route helps you to create size for your product
 *********************************************************************/
postRouter.post('/createsize', (req, res) => {
    let { size } = req.body;
    console.log(req.body);
    SizeSchema.findOne({ size }).then(isSizeExist => {
        if (isSizeExist === null) {
            SizeSchema({ size }).save().then(() => {
                res.json({ data: 'Size added', key: 'success' })
            }).catch(error => {
                res.json({ data: 'Something wrong with database!', key: 'error', error })
            })
        } else {
            res.json({ data: 'Size already exist!', key: 'error' })
        }
    }).catch(error => {
        res.json({ data: 'Something wrong with database!', key: 'error', error })
    })

})

/*********************************************************************
 *    products.
 *      - This route helps you to create product
 *********************************************************************/
postRouter.post('/createproduct', (req, res) => {
    let { productCode, productName, category, subCategory, brand, unit, size, volume } = req.body;
    ProductSchema.findOne({ productCode, productName, category, subCategory, brand, unit, size, volume }).then(isProductCodeExist => {
        if (isProductCodeExist === null) {
            ProductSchema({ productCode, productName, category, subCategory, brand, unit, size, volume }).save().then(() => {
                res.json({ data: 'Product created successfully', key: 'success' })
            }).catch(error => {
                res.json({ data: 'Something wrong with database!', key: 'error', error })
            })
        } else {
            res.json({ data: 'Product already exist!', key: 'error' })
        }
    }).catch(error => {
        res.json({ data: 'Something wrong with database!', key: 'error', error })
    })
})

/******************************************************************************
 *    Purcahse Entry Product
 *      - This route helps you to create entrys for product purchase 
 ******************************************************************************/
postRouter.post('/createpurchaseEntry', async (req, res) => {
    let { invoiceNo, purchasedDate, product, stocks, remarks } = req.body;
    let isProductExist = await TrackStock.findOne({ productId: product._id });


    function SavePurchaseEntry() {
        PurchaseEntrySchema({
            invoiceNo,
            purchasedDate,
            product,
            stocks,
            remarks
        }).save().then(() => {
            res.json({ data: 'Purchase entry for the product created successfully.', key: 'success' })
        }).catch(error => {
            res.json({ data: 'Something wrong with database!', key: 'error', error })
        })
    }


    if (isProductExist) {
        try {
            await TrackStock.updateOne({ productId: product._id }, { $set: { quantity: parseInt(isProductExist.quantity) + parseInt(stocks) } })
            SavePurchaseEntry()
        } catch (error) {
            res.json({ data: 'Something wrong with database!', key: 'error', error })
        }

    } else {
        try {
            await TrackStock({
                productId: product._id,
                productName: product.productName,
                category: product.category,
                quantity: stocks,
                size: product.size,
                unit: product.unit,
                brand: product.brand
            }).save();
            SavePurchaseEntry()
        } catch (error) {
            res.json({ data: 'Something wrong with database!', key: 'error', error })

        }
    }



});

/******************************************************************************
 *    Adjustment Product
 *      - This route helps you to Adjust the purchase product 
 ******************************************************************************/
postRouter.post('/adjustPurchaseEntry', async (req, res) => {
    let { isAdd, product, stock, reason } = req.body;

    let updatedStock = isAdd ? (parseInt(product.adjustmentStock) + parseInt(stock)) : (parseInt(product.adjustmentStock) - parseInt(stock))

    await TrackStock.findOne({ productId: product.product._id }).then(async (result) => {
        await TrackStock.updateOne({ productId: product.product._id }, { $set: { quantity: isAdd ? (parseInt(result.quantity) + parseInt(stock)) : (parseInt(result.quantity) - parseInt(stock)) } }).then(() => {

        })
    })

    PurchaseEntrySchema.updateOne({ _id: product._id }, { $set: { adjustmentStock: updatedStock } }).then(response => {
        if (response.modifiedCount !== 0) {
            AdjustmentSchema({
                isAdd, product, stock, reason
            }).save().then(() => {
                res.json({ data: 'Successfully adjusted the purchase entry.', key: 'success' })
            }).catch(error => {
                res.json({ data: 'Something went wrong!', key: 'error', error })
            })
        } else {
            res.json({ data: 'Something went wrong!', key: 'error' });
        }
    }).catch((error) => {
        res.json({ data: 'Something went wrong!', key: 'error', error })
    })

});

/******************************************************************************
 *    Sales Return Product
 *      - This route helps you to create sales return entry
 ******************************************************************************/
postRouter.post('/salesReturn', async (req, res) => {
    let { invoiceNo, returnDate, reason, products } = req.body;

    await products.map(item => {
        PurchaseEntrySchema.updateOne({ _id: item._id }, { $set: { stocks: (parseInt(item.stocks) + parseInt(item.returnStock)) } }).then(response => { })
    })

    SalesReturnSchema({
        invoiceNo, returnDate, reason, products
    }).save().then(() => {
        res.json({ data: 'Sales return noted.', key: 'success' })
    }).catch(error => {
        res.json({ data: 'Something went wrong!', key: 'error', error })
    })

});

/******************************************************************************
 *    Purchase Return Product
 *      - This route helps you to create purchase return entry
 ******************************************************************************/

postRouter.post('/purchaseReturn', async (req, res) => {
    let { invoiceNo, returnDate, reason, product, returnStock } = req.body;

    console.log({ invoiceNo, returnDate, reason, product, returnStock });

    await TrackStock.findOne({ productId: product.product._id }).then(async (stockResult) => {
        await TrackStock.updateOne({ productId: product.product._id }, { $set: { quantity: (parseInt(stockResult.quantity) - parseInt(returnStock)) } }).then((result) => {

        })
    })



    await PurchaseEntrySchema.updateOne({ _id: product._id }, { $set: { returnedStock: (parseInt(product.returnedStock) + parseInt(returnStock)) } }).then(() => {

    })

    PurchaseReturnSchema({
        invoiceNo, returnDate, reason, product, returnStock
    }).save().then(response => {
        res.json({ data: 'Purchase return noted.', key: 'success' })
    }).catch(error => {
        res.json({ data: 'Something went wrong!', key: 'error', error })
    })
});

/******************************************************************************
 *    POS 
 *      - This route helps you to create Sales entry
 ******************************************************************************/

postRouter.post('/pos', async (req, res) => {
    let { product } = req.body;
    let invoiceNo = GEN_INVOICE();

    console.log(product);
    await product.map(item => {
        PurchaseEntrySchema.updateOne({ _id: item._id }, { $set: { saledStock: (parseInt(item.saledStock) + parseInt(item.saleStock)) } }).then(() => { })
    });

    await product.map(item => {
        TrackStock.findOne({ productId: item.product._id }).then(i => {
            TrackStock.updateOne({ productId: item.product._id }, { $set: { quantity: (parseInt(i.quantity) - parseInt(item.saleStock)) } }).then(() => { })
        })
    })

    PosSchema({
        invoiceNo,
        product
    }).save().then(() => {
        res.json({ data: 'Products sold successfully', key: 'success' });
    }).catch(error => {
        res.json({ data: 'Something went wrong!', key: 'error', error });
    })

});


// Reset password
postRouter.post('/resetpwd', async (req, res) => {
    try {
        let { oldPwd, newPwd, confirmPwd } = req.body;
        let admin = await RoleSchema.findOne({ isSuperAdmin: true });
        let isPwdMatched = await bcrypt.compare(oldPwd, admin.password);

        if (isPwdMatched) {
            let newEncryptedPwd = await bcrypt.hash(newPwd, 12);
            let Role = await RoleSchema.updateOne({ isSuperAdmin: true }, { $set: { password: newEncryptedPwd } });

            if (Role.modifiedCount !== 0) {
                res.json({ data: 'Password changed', key: 'success' });
            } else {
                res.json({ data: 'Something went wrong! Try later', key: 'error' })
            }

        } else {
            res.json({ data: 'Old password not matched', key: 'error' })
        }
    } catch (error) {
        res.json({ data: 'Something went wrong! Try later', key: 'error', error })

    }
})

module.exports = postRouter;