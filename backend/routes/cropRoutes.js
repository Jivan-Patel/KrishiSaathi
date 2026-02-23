const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const cropDataPath = path.join(__dirname, '../../cropData.json');

const getCrops = () => {
    const data = fs.readFileSync(cropDataPath, 'utf8');
    return JSON.parse(data);
};

// GET all crops
router.get('/', (req, res) => {
    try {
        const crops = getCrops();
        res.json(crops);
    } catch (err) {
        res.status(500).json({ message: 'Error reading crop data' });
    }
});

// GET crop by ID
router.get('/:id', (req, res) => {
    try {
        const crops = getCrops();
        const crop = crops.find(c => c.id == req.params.id);
        if (crop) {
            res.json(crop);
        } else {
            res.status(404).json({ message: 'Crop not found' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Error reading crop data' });
    }
});

// GET recommendations
router.get('/recommendations/filter', (req, res) => {
    try {
        const { soil, season, water } = req.query;
        let crops = getCrops();

        const filteredCrops = crops.filter(crop => {
            const matchSoil = !soil || crop.soilTypes.some(s => s.toLowerCase() === soil.toLowerCase());
            const matchSeason = !season || crop.season.toLowerCase() === season.toLowerCase();
            const matchWater = !water || crop.waterRequirement.toLowerCase() === water.toLowerCase();
            return matchSoil && matchSeason && matchWater;
        });

        res.json(filteredCrops);
    } catch (err) {
        res.status(500).json({ message: 'Error filtering recommendations' });
    }
});

module.exports = router;
