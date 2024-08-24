//ADD NEW FILTERS HERE

import { getCoordinatesFromPostcode } from "./getCoordinatesFromPostcode";

export const filtersArr = [
    {
        id: 'chipTimed',
        name: 'Chip Timed',
        type: 'select',
        options: [
            { id: 1, name: 'All', value: 'All' },
            { id: 2, name: 'Yes', value: true },
            { id: 3, name: 'No', value: false },
        ],
        agg: 'match'
    },

    {
        id: 'parking',
        name: 'Parking',
        type: 'select',
        options: [
            { id: 1, name: 'All', value: 'All' },
            { id: 2, name: 'Yes', value: true },
            { id: 3, name: 'No', value: false },
        ],
        agg: 'match'
    },

    {
        id: 'terrain',
        name: 'Terrain',
        type: 'checkboxGroup',
        items: [
            { id: 'Road', name: 'Road', value: 'Road' },
            { id: 'Track', name: 'Track', value: 'Track' },
            { id: 'Trail', name: 'Trail', value: 'Trail' },
            { id: 'Grass', name: 'Grass', value: 'Grass' },
            { id: 'Sand', name: 'Sand', value: 'Sand' }
        ],
        agg: 'match'
    },

    {
        id: 'distance',
        name: 'Distance',
        type: 'checkboxGroup',
        items: [
            { id: '5km', name: '5km', value: 5 },
            { id: '10km', name: '10km', value: 10 },
            { id: 'halfMarathon', name: 'Half Marathon', value: 21.1 },
            { id: 'marathon', name: 'Marathon', value: 42.2 }
        ],
        agg: 'match'
    },

    {
        id: 'location',
        name: 'Location',
        type: 'search',
        placeholder: 'Enter Postcode',
        agg: 'geoNear'
    },
    {
        id: 'maxDistance',
        name: 'Max Distance',
        type: 'select',
        options: [
            { id: 1, name: 'All', value: 'All' },
            { id: 2, name: 'Within 5km', value: 5 },
            { id: 3, name: 'Within 10km', value: 10 },
            { id: 4, name: 'Within 15km', value: 15 },
            { id: 5, name: 'Within 25km', value: 25 },
            { id: 6, name: 'Within 35km', value: 35 },
            { id: 7, name: 'Within 50km', value: 50 },
            { id: 8, name: 'Within 100km', value: 100 },
        ],
        agg: 'geoNear'
    },

]

// FUNCTIONS HANDLES THE CREATION OF THE FILTERS URL
export function createFilterURL(filtersArr, formData) {
    let arr = ['/api/races/filtered?'];
    filtersArr.map(filter => {
        if (filter.type === 'select') {
            arr.push(`${filter.id}=${formData.get(filter.id)}&`)
        }
        else if (filter.type === 'checkboxGroup') {
            arr.push(`${filter.id}=${filter.items.map(item => (formData.get(item.id) ? item.value : '0'))}&`)
        } else if (filter.type === 'search') {
            arr.push(`${filter.id}=${formData.get(filter.id)}&`)
        }
    })
    console.log(arr.join(''))
    return arr.join('');
}



// CREATES MATCH OBJECT FOR RACE QUERY
export async function createFiltersMatch(filtersArr, searchParams) {
    let filtersObj = {};
    const postcode = searchParams.get('location')
    console.log('maxDistance', searchParams.get('maxDistance'))
    const maxDistance = searchParams.get('maxDistance') === 'All' ? 10000000 : parseInt(searchParams.get('maxDistance')) * 1000
    console.log('maxDistance', maxDistance)
    console.log(postcode)


    filtersArr.map(async filter => {

        if (filter.type === 'checkboxGroup') {
            if (searchParams.get(`${filter.id}`).split(",").filter(n => n !== '0').length === 0) {
                filtersObj[`${filter.id}`] = { $exists: true }
            } else {
                filtersObj[`${filter.id}`] = { $in: searchParams.get(`${filter.id}`).split(",").filter(n => n !== '0') }
            }

        } else if (filter.type === 'select' && filter.agg === 'match') {
            if (searchParams.get(`${filter.id}`) === 'All') {
                filtersObj[`${filter.id}`] = { $exists: true }
            } else {
                filtersObj[`${filter.id}`] = (searchParams.get(`${filter.id}`) === 'true')
            }
        }


    })
    console.log('filtersObj', filtersObj)


    return { filtersObj, postcode, maxDistance };
}

export async function createFiltersGeoNear() {

}