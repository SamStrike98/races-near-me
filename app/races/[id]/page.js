import Container from "@/components/Container";
import { FaCalendarAlt, FaLocationArrow, FaMoneyBillAlt, FaRuler, FaClock, FaCar, FaRoad, FaUser } from "react-icons/fa";

const page = async ({ params }) => {
    const id = params.id

    const res = await fetch(`http://localhost:3001/api/races/${id}`, { cache: 'no-store' });
    const { name, distance, address, description, cost, chipTimed, parking, terrain, raceDate, places, courseDetails, included, howToGetThere, locationDetails, faqs } = await res.json();

    const isoDate = new Date(raceDate);
    const localeDate = isoDate.toLocaleDateString('en-GB')

    return (
        <div>
            <Container>

                {name &&
                    <>
                        <div className='flex flex-row gap-5 mt-5'>
                            <div className='w-[400px] h-[400px] border-2 border-secondary bg-white rounded-md shadow-lg'></div>

                            <div className='bg-white border-2 border-primary p-3 rounded-md shadow-lg'>
                                <h2 className='font-extrabold text-5xl text-center text-primary'>{name}</h2>
                                <ul className="flex flex-col gap-3 mt-5">
                                    <li className="flex flex-row gap-5 items-center"><span className='font-bold text-xl text-secondary flex flex-row  gap-3'><FaCalendarAlt /> Date: </span> <span className="font-extrabold">{localeDate}</span></li>
                                    <li className="flex flex-row gap-5 items-center"><span className='font-bold text-xl text-secondary flex flex-row  gap-3'><FaLocationArrow /> Location: </span><span className="font-extrabold">{address}</span></li>
                                    <li className="flex flex-row gap-5 items-center"><span className='font-bold text-xl text-secondary flex flex-row  gap-3'><FaMoneyBillAlt /> Price: </span><span className="font-extrabold">£{(cost * 0.01).toFixed(2)}</span></li>
                                    <li className="flex flex-row gap-5 items-center"><span className='font-bold text-xl text-secondary flex flex-row  gap-3'><FaRuler /> Distance: </span><span className="font-extrabold">{distance}km</span></li>
                                    <li className="flex flex-row gap-5 items-center"><span className='font-bold text-xl text-secondary flex flex-row  gap-3'><FaClock /> Chip Timed: </span><span className="font-extrabold">{chipTimed ? 'Yes' : 'No'}</span></li>
                                    <li className="flex flex-row gap-5 items-center"><span className='font-bold text-xl text-secondary flex flex-row  gap-3'><FaCar /> Parking: </span> <span className="font-extrabold">{parking ? 'Yes' : 'No'}</span></li>
                                    <li className="flex flex-row gap-5 items-center"><span className='font-bold text-xl text-secondary flex flex-row  gap-3'><FaRoad /> Terrain: </span> <span className="font-extrabold">{terrain}</span></li>
                                    <li className="flex flex-row gap-5 items-center"><span className='font-bold text-xl text-secondary flex flex-row  gap-3'><FaUser /> No. of Places: </span> <span className="font-extrabold">{places}</span></li>
                                </ul>
                            </div>
                        </div>

                        <div className="flex flex-row justify-center gap-3">
                            <div className="text-lg rounded-md p-3 mt-5 border-2 border-primary bg-white w-[40%] shadow-lg">
                                <p>{description}</p>
                            </div>

                            <div className="border-2 border-secondary shadow-lg bg-white p-3 w-[40%] mt-5 rounded-md">
                                <ul className="flex flex-col">
                                    <li>
                                        <h4>Course Details</h4>
                                        <p>{courseDetails}</p>
                                    </li>

                                    <li>
                                        <h4>What's Included</h4>
                                        <p>{included}</p>
                                    </li>

                                    <li>
                                        <h4>How To Get There</h4>
                                        <p>{howToGetThere}</p>
                                    </li>

                                    <li>
                                        <h4>Location</h4>
                                        <p>{locationDetails}</p>
                                    </li>

                                    <li>
                                        <h4>FAQs</h4>
                                        <p>{faqs}</p>
                                    </li>

                                    <li>
                                        <h4>Reviews</h4>
                                        <p></p>
                                    </li>
                                </ul>
                            </div>
                        </div>


                    </>



                }
            </Container>
        </div>
    )
}

export default page