const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const regionSchema = new Schema(
    {
        name: String,
        location: {
            type: {
                type: String,
                enum: ['Polygon'],
                required: true
            },
            coordinates: {
                type: [[[Number]]],
                required: true
            }
        }
    },
    {
        timestamps: true
    }
);

regionSchema.index({ location: '2dsphere' });

regionSchema.static('findPolygon', function (longitude, latitude) {
    return this.find({
        location: {
            $geoIntersects: {
                $geometry: {
                    type: 'Point',
                    coordinates: [longitude, latitude]
                }
            }
        }
    });
});

const Region = mongoose.model('Region', regionSchema);

module.exports = Region;