const Region = require('../models/region.model');

exports.findRegionsExample1 = async (req, res) => {
    const latitude = 28.71143;
    const longitude = 79.74579; 

    const regions = await Region.find({
        location: {
            $geoIntersects: {
                $geometry: {
                    type: 'Point',
                    coordinates: [longitude, latitude]
                }
            }
        }
    });
    return res.json(regions);
}

exports.findRegionsExample2 = async (req, res) => {
    const latitude = 28.67408;
    const longitude = 79.97513;

    const regions = await Region.findPolygon(longitude, latitude);
    return res.json(regions);
}

exports.findRegionsExample3 = async (req, res) => {
    const latitude = 28.67408;
    const longitude = 79.97513; 

    const regions = await Region.aggregate([
        {
            $match: {
                location: {
                    $geoIntersects: {
                        $geometry: {
                            type: 'Point',
                            coordinates: [longitude, latitude]
                        }
                    }
                }
            }
        }
    ]);
    return res.json(regions);
}

exports.dummyData = async (req, res) => {
    const regions = await Region.insertMany([
        {
            name: 'Region 1',
            location: {
                type: 'Polygon',
                coordinates: [
                    [79.9490441, 28.710228],
                    [79.929818, 28.6439618],
                    [79.9806297, 28.5788596],
                    [80.0767601, 28.70541],
                    [79.9490441, 28.710228]
                ]
            }
        },
        {
            name: 'Region 2',
            location: {
                type: 'Polygon',
                coordinates: [
                    [79.6620262, 28.7620069],
                    [79.6592796, 28.6668585],
                    [79.8048485, 28.6511928],
                    [79.8487938, 28.7475596],
                    [79.6620262, 28.7620069]
                ]
            }
        }
    ]);
    return res.json(regions);
}
