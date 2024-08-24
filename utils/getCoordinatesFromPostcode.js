export async function getCoordinatesFromPostcode(postcode) {

    if (postcode === '') {
        return null
    }
    const res = (await fetch(`https://nominatim.openstreetmap.org/search?q=${postcode}&format=json`));
    const data = await res.json()
    console.log(data[0].lat, data[0].lon)
    const coordinates = {
        lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon)
    }

    return coordinates;
}