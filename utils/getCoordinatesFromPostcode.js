export async function getCoordinatesFromPostcode(postcode) {
    const res = (await fetch(`https://nominatim.openstreetmap.org/search?q=${postcode}&format=json`));
    const data = await res.json()
    console.log(data[0].lat, data[0].lon)
    const coordinates = {
        lat: data[0].lat, lon: data[0].lon
    }

    return coordinates;
}