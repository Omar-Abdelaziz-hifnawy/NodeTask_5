let form = document.querySelector("#form");
const address = document.querySelector("#address");
const locationweb = document.querySelector("#locationweb");
const forecastweb = document.querySelector("#forecastweb");
const latitude = document.querySelector("#latitude");
const longitude = document.querySelector("#longitude");
const errorweb = document.querySelector("#errorweb");

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log(address.value);
    await weatherFunction();
    errorweb.innerText = ""; 
});
const weatherFunction = async () => { // async function => return promise
    try {
        const addressVal = address.value;
        const response = await fetch(`http://localhost:3000/weather?address=${addressVal}`);
        const data = await response.json();
        console.log(data);

        if (data.error) {
        errorweb.innerText = data.error;
        locationweb.innerText = "";
        latitude.innerText = "";
        forecastweb.innerText = "";
        } else {
            setTimeout(() => {
                locationweb.innerText = data.location;
            }, 500);
            setTimeout(() => {
                latitude.innerText = data.latitude ;
            }, 1000);
            setTimeout(() => {
                longitude.innerText = data.longtitude;
            }, 1500);
            setTimeout(() => {
                forecastweb.innerText = data.forecast;
            }, 2000);          
        errorweb.innerText = "";
        }
    } catch (error) {
        errorweb.innerText = error;
    }
};

