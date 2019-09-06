var cabinInfo = [
    {
        cabinPhotos: `https://images.unsplash.com/photo-1482192505345-5655af888cc4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2000&q=80`,
        cabinName: "Forest Cabin",
        cabinAddress: "4444 N 1st Ave, Phoenix, AZ 55555",
        cabinPrice: 1675,
        cabinSqFt: 2000,
        cabinBed: 3,
        cabinBath: 2
    },
    {
        cabinPhotos: `https://images.unsplash.com/photo-1527030280862-64139fba04ca?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1506&q=80`,
        cabinName: "City Apartment",
        cabinAddress: "5555 E Main St, Phoenix, AZ 55555",
        cabinPrice: 7230,
        cabinSqFt: 3000,
        cabinBed: 2,
        cabinBath: 1
    },
    {
        cabinPhotos: `https://images.unsplash.com/photo-1475855581690-80accde3ae2b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80`,
        cabinName: "Grassy Rambler",
        cabinAddress: "3333 E 2nd St, Phoenix, AZ 33333",
        cabinPrice: 4530,
        cabinSqFt: 3650,
        cabinBed: 4,
        cabinBath: 3
    }
]


for (let i = 0; i < cabinInfo.length; i++) {
    var sqft = (cabinInfo[i].cabinSqFt).toLocaleString()
    var price = (cabinInfo[i].cabinPrice).toLocaleString()

    document.getElementById("cabins").innerHTML += 
    `<div class="cabin">
    <div class="image" style="background-image: url('${cabinInfo[i].cabinPhotos}')">
    
    </div>
    <h1>${cabinInfo[i].cabinName}</h1>
    <h2>${cabinInfo[i].cabinAddress}</h2>
    <h2>$${price}/mo</h2>
    <h3>${sqft} sqft</h3>
    <h3>${cabinInfo[i].cabinBed} bedroom(s)</h3>
    <h3>${cabinInfo[i].cabinBath} bathroom(s)</h3>
    <a>Book Home</a>
    </div>
    `
}

