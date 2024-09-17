import {useDispatch, useSelector} from "react-redux";
import {removeCar} from "../store";
import {createSelector} from "@reduxjs/toolkit";


function CarList() {

    const dispatch = useDispatch();

    // const cars = useSelector(({cars: {data, searchTerm}}) => {
    //     return data.filter((car) => car.name.toLowerCase().includes(searchTerm.toLowerCase()));
    // });

    // const cars = useSelector(({cars: {data, searchTerm}}) => {
    //     return data.filter((car) => car.name.toLowerCase().includes(searchTerm.toLowerCase()));
    // });


    const memoizedCars = createSelector(
        [(state) => state.cars.data,
        (state) => state.cars.searchTerm,
        (state) => state.form.name],
        (data, searchTerm, name) => {
            return {
                cars: data.filter((car) =>
                    car.name.toLowerCase().includes(searchTerm.toLowerCase())
                ),
                name
            };
        }
    );

    const {cars , name} = useSelector(memoizedCars);


    const handleDeleteClick = (car) => {
        dispatch(removeCar(car.id));
    };


    const renderedCars = cars.map((car) => {
        const bold = name && car.name.toLowerCase().includes(name.toLowerCase())

        return (
            <div key={car.id} className={`panel ${bold && 'bold'}`}>
                <p>{car.name} - ${car.cost}</p>
                <button
                    onClick={()=>handleDeleteClick(car)}
                    className="button is-danger"
                >Delete</button>
            </div>
        );
    });

    return (
        <div className="car-list">
            {cars && renderedCars}
            <hr/>
        </div>
    );
}

export default CarList;
