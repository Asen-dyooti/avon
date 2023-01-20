const express = require('express');
const deleteRouter = express.Router();
const RoleSchema = require('../Models/RolesSchema');
const CategorySchema = require('../Models/CategorySchema');
const SubcategorySchema = require('../Models/SubcategorySchema');
const BrandSchema = require('../Models/BrandSchema');
const UnitSchema = require('../Models/UnitSchema');
const SizeSchema = require('../Models/SizeSchema');
const ProductSchema = require('../Models/ProductSchema');
const PurchaseEntrySchema = require('../Models/PurchaseEntrySchema');
const VolumeSchema = require('../Models/VolumeSchema');


deleteRouter.delete('/deleteRole', (req, res) => {
    let { _id } = req.body;
    RoleSchema.findByIdAndDelete({ _id }, error => {
        if (error) return res.json({ data: 'Something went wrong!', key: 'error', error });
        else return res.json({ data: 'Role successfully deleted', key: 'success' })
    })
});

deleteRouter.delete('/deleteCategory', (req, res) => {
    let { _id } = req.body;
    CategorySchema.findByIdAndDelete({ _id }, error => {
        if (error) return res.json({ data: 'Something went wrong!', key: 'error', error });
        else return res.json({ data: 'Category successfully deleted', key: 'success' })
    })
});

deleteRouter.delete('/deleteSubCategory', (req, res) => {
    let { _id } = req.body;
    SubcategorySchema.findByIdAndDelete({ _id }, error => {
        if (error) return res.json({ data: 'Something went wrong!', key: 'error', error });
        else return res.json({ data: 'SubCategory successfully deleted', key: 'success' })
    })
});

deleteRouter.delete('/deleteBrand', (req, res) => {
    let { _id } = req.body;
    BrandSchema.findByIdAndDelete({ _id }, error => {
        if (error) return res.json({ data: 'Something went wrong!', key: 'error', error });
        else return res.json({ data: 'Brand successfully deleted', key: 'success' })
    })
});

deleteRouter.delete('/deleteUnit', (req, res) => {
    let { _id } = req.body;
    UnitSchema.findByIdAndDelete({ _id }, error => {
        if (error) return res.json({ data: 'Something went wrong!', key: 'error', error });
        else return res.json({ data: 'Unit successfully deleted', key: 'success' })
    })
});

deleteRouter.delete('/deleteVolume', (req, res) => {
    let { _id } = req.body;
    VolumeSchema.findByIdAndDelete({ _id }, error => {
        if (error) return res.json({ data: 'Something went wrong!', key: 'error', error });
        else return res.json({ data: 'Volume successfully deleted', key: 'success' })
    })
});

deleteRouter.delete('/deleteSize', (req, res) => {
    let { _id } = req.body;
    SizeSchema.findByIdAndDelete({ _id }, error => {
        if (error) return res.json({ data: 'Something went wrong!', key: 'error', error });
        else return res.json({ data: 'Size successfully deleted', key: 'success' })
    })
});

deleteRouter.delete('/deleteProduct', (req, res) => {
    let { _id } = req.body;
    ProductSchema.findByIdAndDelete({ _id }, error => {
        if (error) return res.json({ data: 'Something went wrong!', key: 'error', error });
        else return res.json({ data: 'Product successfully deleted', key: 'success' })
    })
});

deleteRouter.delete('/deletePurchaseEntry', (req, res) => {
    let { _id } = req.body;
    PurchaseEntrySchema.findByIdAndDelete({ _id }, error => {
        if (error) return res.json({ data: 'Something went wrong!', key: 'error', error });
        else return res.json({ data: 'Purchase entry successfully deleted', key: 'success' })
    })
});

module.exports = deleteRouter;