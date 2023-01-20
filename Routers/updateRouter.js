const express = require('express');
const updateRouter = express.Router();
const RoleSchema = require('../Models/RolesSchema');
const CategorySchema = require('../Models/CategorySchema');
const SubcategorySchema = require('../Models/SubcategorySchema');
const BrandSchema = require('../Models/BrandSchema');
const UnitSchema = require('../Models/UnitSchema');
const SizeSchema = require('../Models/SizeSchema');
const ProductSchema = require('../Models/ProductSchema');
const PurchaseEntrySchema = require('../Models/PurchaseEntrySchema');
const VolumeSchema = require('../Models/VolumeSchema');
const bcrypt = require('bcrypt');

/********************************************
 *       Update router for ROLES
 *******************************************/
updateRouter.put('/updateRole', async (req, res) => {
    const { _id, isPwdUpdated, newPassword } = req.body;

    let temp = req.body;

    if (isPwdUpdated) {
        temp.password = await bcrypt.hash(newPassword, 14)
    }

    RoleSchema.updateOne({ _id }, { $set: temp }).then(response => {
        if (response.modifiedCount !== 0) {
            res.json({ data: 'Role updated successfully', key: 'success' })
        } else {
            res.json({ data: 'Object not found!', key: 'error' })
        }
    }).catch((error) => {
        res.json({ data: 'Something went wrong!', key: 'error', error })
    })
});

/********************************************
 *       Update router for Category
 *******************************************/
updateRouter.put('/updateCategory', (req, res) => {
    const { _id } = req.body;
    CategorySchema.updateOne({ _id }, { $set: req.body }).then(response => {
        if (response.modifiedCount !== 0) {
            res.json({ data: 'Category updated successfully', key: 'success' })
        } else {
            res.json({ data: 'Object not found!', key: 'error' })
        }
    }).catch((error) => {
        res.json({ data: 'Something went wrong!', key: 'error', error })
    })
});

/********************************************
 *       Update router for SubCategory
 *******************************************/
updateRouter.put('/updateSubCategory', (req, res) => {
    const { _id } = req.body;
    SubcategorySchema.updateOne({ _id }, { $set: req.body }).then(response => {
        if (response.modifiedCount !== 0) {
            res.json({ data: 'SubCategory updated successfully', key: 'success' })
        } else {
            res.json({ data: 'Object not found!', key: 'error' })
        }
    }).catch((error) => {
        res.json({ data: 'Something went wrong!', key: 'error', error })
    })
});

/********************************************
 *       Update router for Brand
 *******************************************/
updateRouter.put('/updateBrand', (req, res) => {
    const { _id } = req.body;
    BrandSchema.updateOne({ _id }, { $set: req.body }).then(response => {
        if (response.modifiedCount !== 0) {
            res.json({ data: 'Brand updated successfully', key: 'success' })
        } else {
            res.json({ data: 'Object not found!', key: 'error' })
        }
    }).catch((error) => {
        res.json({ data: 'Something went wrong!', key: 'error', error })
    })
});

/*******************************************
 *       Update router for Unit
 *******************************************/
updateRouter.put('/updateUnit', (req, res) => {
    const { _id } = req.body;
    UnitSchema.updateOne({ _id }, { $set: req.body }).then(response => {
        if (response.modifiedCount !== 0) {
            res.json({ data: 'Unit updated successfully', key: 'success' })
        } else {
            res.json({ data: 'Object not found!', key: 'error' })
        }
    }).catch((error) => {
        res.json({ data: 'Something went wrong!', key: 'error', error })
    });
});

/*******************************************
 *       Update router for Volume
 *******************************************/
updateRouter.put('/updateVolume', (req, res) => {
    const { _id } = req.body;
    VolumeSchema.updateOne({ _id }, { $set: req.body }).then(response => {
        if (response.modifiedCount !== 0) {
            res.json({ data: 'Volume updated successfully', key: 'success' })
        } else {
            res.json({ data: 'Object not found!', key: 'error' })
        }
    }).catch((error) => {
        res.json({ data: 'Something went wrong!', key: 'error', error })
    });
});

/*******************************************
 *       Update router for Size
 *******************************************/
updateRouter.put('/updateSize', (req, res) => {
    const { _id } = req.body;
    SizeSchema.updateOne({ _id }, { $set: req.body }).then(response => {
        if (response.modifiedCount !== 0) {
            res.json({ data: 'Size updated successfully', key: 'success' })
        } else {
            res.json({ data: 'Object not found!', key: 'error' })
        }
    }).catch((error) => {
        res.json({ data: 'Something went wrong!', key: 'error', error })
    });
});

/*******************************************
 *       Update router for Product
 *******************************************/
updateRouter.put('/updateProduct', (req, res) => {
    const { _id } = req.body;
    ProductSchema.updateOne({ _id }, { $set: req.body }).then(response => {
        if (response.modifiedCount !== 0) {
            res.json({ data: 'Product updated successfully', key: 'success' })
        } else {
            res.json({ data: 'Object not found!', key: 'error' })
        }
    }).catch((error) => {
        res.json({ data: 'Something went wrong!', key: 'error', error })
    });
});

/**********************************************
 *       Update router for PurchaseEntryProduct
 ***********************************************/
updateRouter.put('/updatePurchaseEntry', (req, res) => {
    const { _id } = req.body;
    PurchaseEntrySchema.updateOne({ _id }, { $set: req.body }).then(response => {
        if (response.modifiedCount !== 0) {
            res.json({ data: 'Purchase Entry updated successfully', key: 'success' })
        } else {
            res.json({ data: 'Object not found!', key: 'error' })
        }
    }).catch((error) => {
        res.json({ data: 'Something went wrong!', key: 'error', error })
    });
});


module.exports = updateRouter;
