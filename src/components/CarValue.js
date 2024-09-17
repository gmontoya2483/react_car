import {useSelector} from "react-redux";
import {createSelector} from "@reduxjs/toolkit";

function CarValue() {



    const data = (state) => state.cars.data
    const searchTerm = (state) => state.cars.searchTerm
    const memoizedCars = createSelector(
        [data, searchTerm],
        (data, searchTerm) => {
            return data.filter((car) =>
                car.name.toLowerCase().includes(searchTerm.toLowerCase()))
                .reduce((acc,car) => acc + car.cost, 0);
        }
    );

    const totalCost = useSelector(memoizedCars);


    return (
        <div className="car-value">
            total Cost: ${totalCost}
        </div>
    );
}

export default CarValue;
