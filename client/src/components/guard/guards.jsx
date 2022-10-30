import React,{useState,useEffect} from "react";


const Guards = () => {
    const Cars = () => {
        const [cars, setCars] = useState([]);
        const [search, setSearch] = useState("");
      
        useEffect(() => {
          fetch("http://localhost:4000/cars")
            .then((r) => r.json())
            .then((data) => {
              setCars(data);
            });
        }, []);
      
        return (
          <div className="car">
            <div className="search__box">
              <input
                type="text"
                placeholder="Search"
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            {cars?.length > 0 ? (
              <div className="box-container">
                {cars
                  .filter((value) => {
                    if (search === "") {
                      return value;
                    } else if (
                      value.name.toLowerCase().includes(search.toLowerCase())
                    ) {
                      return value;
                    }
                  })
                  .map((car) => (
                    <CarItem key={car.id} car={car} />
                  ))}
              </div>
            ) : (
              <div className="empty">
                <h2>No Cars found</h2>
              </div>
            )}
          </div>
        );
      };
}
export default Guards;