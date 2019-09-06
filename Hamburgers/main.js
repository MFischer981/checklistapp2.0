var cabinInfo = [{
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
    },
    {
        cabinPhotos: `https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80`,
        cabinName: "Modern Beachhouse",
        cabinAddress: "1212 W 3rd St, Oceanside, CA 12121",
        cabinPrice: 3850,
        cabinSqFt: 1800,
        cabinBed: 3,
        cabinBath: 2.5
    },
    {
        cabinPhotos: `https://images.unsplash.com/photo-1416331108676-a22ccb276e35?ixlib=rb-1.2.1&auto=format&fit=crop&w=1347&q=80`,
        cabinName: "Desert Villa",
        cabinAddress: "4321 N 4th Ave, Glendale, AZ 56542",
        cabinPrice: 2750,
        cabinSqFt: 3400,
        cabinBed: 4,
        cabinBath: 3.5
    },
    {
        cabinPhotos: `https://images.unsplash.com/photo-1494526585095-c41746248156?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80`,
        cabinName: "Neighborhood Duplex",
        cabinAddress: "7777 W 5th Ave, Phoenix, AZ 77077",
        cabinPrice: 1450,
        cabinSqFt: 1250,
        cabinBed: 2,
        cabinBath: 1.5
    },
    {
        cabinPhotos: `https://images.unsplash.com/photo-1504233529578-6d46baba6d34?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1353&q=80`,
        cabinName: "Red Stilt House",
        cabinAddress: "9999 W 7th St, Flagstaff, AZ 98980",
        cabinPrice: 2250,
        cabinSqFt: 1600,
        cabinBed: 3,
        cabinBath: 2.5
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
    </div>
    `
}

function filter() {
    document.getElementById("cabins").innerHTML = "";
    for (let i = 0; i < cabinInfo.length; i++) {

        var sqft = (cabinInfo[i].cabinSqFt).toLocaleString()
        var price = (cabinInfo[i].cabinPrice).toLocaleString()

        if (cabinInfo[i].cabinPrice <= document.getElementById("budget").value) {
            if (cabinInfo[i].cabinSqFt >= document.getElementById("sqft").value) {
                if (cabinInfo[i].cabinBed >= document.getElementById("bedrooms").value) {
                    if (cabinInfo[i].cabinBath >= document.getElementById("bathrooms").value) {
                document.getElementById("cabins").innerHTML +=
                    `<div class="cabin">
    <div class="image" style="background-image: url('${cabinInfo[i].cabinPhotos}')"></div>
    <h1>${cabinInfo[i].cabinName}</h1>
    <h2>${cabinInfo[i].cabinAddress}</h2>
    <h2>$${price}/mo</h2>
    <h3>${sqft} sqft</h3>
    <h3>${cabinInfo[i].cabinBed} bedroom(s)</h3>
    <h3>${cabinInfo[i].cabinBath} bathroom(s)</h3>
    </div>`
                }
            }
        }
    }
}
}