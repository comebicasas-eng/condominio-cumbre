import mapboxgl from "mapbox-gl";
import { useEffect, useState } from "react";
import { Hospital, School, ShoppingBag, ShoppingCart, Utensils } from 'lucide-react';
import TrafficWeatherWidget from './TrafficWeatherWidget';

// Coordenadas de los diferentes lugares (supermercados, escuelas, etc.)
const placesCoordinates = {
  supermercados: [
    {
      name: "H-E-B El Mirador",
      coord: [-100.33410608534822, 20.590769439964493], 
    },
    {
      name: "Fresko La Comer - Milenio lll",
      coord: [-100.34838034452557, 20.594849291243843],
    },
    {
      name: "Walmart Express Milenio",
      coord: [-100.36103945114569, 20.596759536365347],
    },
    {
      name: "Tiendas 3B Milenio",
      coord: [-100.34978332010645, 20.5955317318667787],
    },
    {
      name: "Super Q 230 Zen House",
      coord: [-100.33077689836433, 20.590456946035022],
    },
    {
      name: "Super Q El Mirador I",
      coord: [-100.33568374327034, 20.598848440406968],
    },
    {
      name: "Asturiano",
      coord: [-100.33586009849367, 20.598903048692975],
    }, 
    {
      name: "OXXO Catania",
      coord: [-100.3295167802535, 20.591063200523994],
    }, 
    {
      name: "OXXO Plaza Krystal",
      coord: [-100.3327438862283, 20.594349435338433],
    }, 
    {
      name: "OXXO El Mirador QRF",
      coord: [-100.33225058418199, 20.597564985447583],
    }, 
    {
      name: "OXXO Xentric Mirador QRF",
      coord: [-100.33821196793842, 20.589653053724817],
    }, 
  ],
  escuelas: [
    { name: "Universidad Mondragón México Campus Querétaro / Prepa Mondragón", coord: [-100.27650359260494, 20.604310146813475] }, 
    {
      name: "INSTITUTO VIA DISEÑO - Campus El Marqués",
      coord: [-100.2832923773513, 20.606548272079003],
    },
    {
      name: "Universidad Cuauhtémoc Querétaro",
      coord: [-100.36230884465098, 20.5896918837624],
    },
    {
      name: "Prepa Anáhuac Querétaro",
      coord: [-100.36062419218268, 20.61395918636227],
    },
    {
      name: "Innova Schools Querétaro",
      coord: [-100.28515807428082, 20.60599601209843],
    },
    {
      name: "Colegio Bretón",
      coord: [-100.29277320008123, 20.60072542971055],
    },
    {
      name: "Colegio Everest",
      coord: [-100.27433851831582, 20.591626400227664],
    },
    { name: "COLEGIO CELSE", coord: [-100.32216164909877, 20.589945504268805] },
    {
      name: "Kinder Plancarte",
      coord: [-100.31900455196296, 20.586037185179777],
    },
    {
      name: "Instituto Plancarte El Marqués",
      coord: [-100.31834674017587, 20.585818105751542],
    },
  ],
  hospitales: [
    {
      name: "Farmacias Similares",
      coord: [-100.32293178235767, 20.59256554736648],
    },
    { name: "Farmacia Guadalajara", coord: [-100.32943092050226, 20.591050939895975] },
    {
      name: "Farmacias Similares",
      coord: [-100.33466480172609, 20.59026921605686],
    },
    {
      name: "Farmacias Similares",
      coord: [-100.33176604454822, 20.596579148213177],
    },
    {
      name: "MEDI Family",
      coord: [-100.3339698383135, 20.598152225437577],
    },
  ],
  restaurant: [
    { name: "El Baúl de la Catrina", coord: [-100.3232650031021, 20.592429021204914] },
    { name: "Tacos arandas", coord: [-100.32476262338572, 20.592154764435843] },
    {
      name: "El Oso Berlin",
      coord: [-100.33436664531469, 20.590895080024566],
    },
    {
      name: "Trattoria la Nonna el Marques",
      coord: [-100.33516838216129, 20.59037913899859],
    },
    {
      name: "Tacos el Pata Mirador",
      coord: [-100.33545881793664, 20.590320111394917],
    },
    {
      name: "Really big pizza",
      coord: [-100.33757320038092, 20.589099015928273],
    },
    {
      name: "Taqueria El marques de los altos",
      coord: [-100.33080878961674, 20.596885154274627],
    },
    {
      name: "Maranatha Restaurante - El Mirador",
      coord: [-100.33171189849803, 20.596564698793607],
    },
  ],
  plazas: [
    { name: "Plaza Catania", coord: [-100.32922306209797, 20.59125293900127] },
    { name: "Plaza Mirador", coord: [-100.33536575805742, 20.590080154867568] },
    {
      name: "Xentric Mirador",
      coord: [-100.33801166137437, 20.589741874284176],
    },
  ],
};

const filterOptions = [
  { key: "supermercados", label: "Supermercados", icon: <ShoppingCart size={18}/> },
  { key: "escuelas", label: "Escuelas", icon: <School size={18}/> },
  { key: "hospitales", label: "Farmacias", icon: <Hospital size={18}/> },
  { key: "restaurant", label: "Restaurantes", icon: <Utensils size={18}/> },
  { key: "plazas", label: "plazas", icon: <ShoppingBag size={18}/> },
];

const FilterButton = ({ label, icon, active, onClick }) => (
  <button
    className={`flex gap-2 group items-center px-4 py-1 rounded-full bg-white transition font-medium hover:cursor-pointer ${
      active ? "bg-secondary" : "hover:bg-neutral-100"
    }`}
    onClick={onClick}
  >
    {/* <div className="rounded-full border border-neutral-900 group-hover:bg-neutral-800 group-hover:text-white w-10 h-10 flex items-center justify-center mb-1">
            <span className="text-2xl">{icon}</span>
        </div> */}
    <span className="">{icon}</span>
    <span className="text-xs hidden md:block">{label}</span>
  </button>
);

export default function MapView() {
  const [filter, setFilter] = useState(null);
  const [map, setMap] = useState(null);
  const [residentialMarker, setResidentialMarker] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [hoveredPlaceIndex, setHoveredPlaceIndex] = useState(null);

  // Manejador de eventos para el clic en el filtro
  const handleFilterClick = (selectedFilter) => {
    setFilter(selectedFilter);
  };

  // Función para mostrar marcadores según el filtro seleccionado
  const showMarkersForFilter = () => {
    if (filter !== null) {
      addMarkers(filter);
    }
  };

  function addMarkers(category) {
    // Eliminar marcadores existentes
    markers.forEach((marker) => marker.remove());
    setMarkers([]);

    const places = placesCoordinates[category];
    if (!places || places.length === 0) {
      console.warn(`No places found for category: ${category}`);
      return;
    }

    const newMarkers = places
      .map((place, index) => {
        const { name, coord } = place;

        if (
          !coord ||
          coord.length !== 2 ||
          isNaN(coord[0]) ||
          isNaN(coord[1])
        ) {
          console.warn(`Invalid coordinates for place: ${name}`);
          return null;
        }

        // Crear el marcador predeterminado de Mapbox
        const marker = new mapboxgl.Marker({ color: "#004E90" })
          .setLngLat(coord)
          .setPopup(
            new mapboxgl.Popup({ offset: 25 }).setHTML(
              `<h3 class="font-bold">${name}</h3>`
            )
          )
          .addTo(map);

        // Guardar el índice en el marcador para referencia
        marker._placeIndex = index;

        return marker;
      })
      .filter(Boolean);

    setMarkers(newMarkers);
  }

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1Ijoib2xpdmExMjMiLCJhIjoiY2wzdDZzMHh1MXh6ajNib2VhcHR4dWx3ZSJ9.e1SYRWtDEVsfVaId3w5tAg";
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v12",
      center: [-100.3130064780373, 20.598109920432663], 
      zoom: 14,
      scrollZoom: false,
    });

    setMap(map);

    const residentialMarker = new mapboxgl.Marker({ color: "red" })
      .setLngLat([-100.31291357549969, 20.5972174754678])
      .addTo(map);

    setResidentialMarker(residentialMarker);

    return () => map.remove();
  }, []);

  useEffect(() => {
    showMarkersForFilter();
    // eslint-disable-next-line
  }, [filter, map]);

  // Efecto para mostrar popup cuando se hace hover
  useEffect(() => {
    if (hoveredPlaceIndex !== null && markers.length > 0) {
      const marker = markers[hoveredPlaceIndex];
      if (marker) {
        marker.togglePopup();
      }
    } else {
      // Cerrar todos los popups cuando no hay hover
      markers.forEach(marker => {
        if (marker.getPopup().isOpen()) {
          marker.togglePopup();
        }
      });
    }
  }, [hoveredPlaceIndex, markers]);

  return (
    <div className="flex w-full h-[50vh] md:h-[80vh] rounded-2xl overflow-hidden relative">
      {/* Sidebar de resultados */}
      <div className="hidden relative lg:block w-[370px] min-w-[300px] max-w-[400px] bg-white border-r border-gray-200 overflow-y-auto z-20">
        <div className="p-4">
          {/* <input
            type="text"
            placeholder="Buscar..."
            className="w-full mb-4 px-3 py-2 border rounded"
          /> */}
          Resultados 
          <div className="max-h-[520px] overflow-auto">
            {filter &&
              placesCoordinates[filter]?.map((place, idx) => (
                <div
                  key={idx}
                  className="mb-4 p-3 rounded hover:bg-gray-100 cursor-pointer transition-colors"
                  onMouseEnter={() => setHoveredPlaceIndex(idx)}
                  onMouseLeave={() => setHoveredPlaceIndex(null)}
                >
                  <div className="font-bold">{place.name}</div>
                </div>
              ))}
          </div>
          <div className="absolute bottom-0">
            <TrafficWeatherWidget lat={20.5972174754678} lon={-100.31291357549969} />
          </div>
        </div>


        {/* <div className="">
            <WeatherWidget lat={20.68052186274997} lon={-101.38816638108801} />
        </div> */}
      </div>

      {/* Mapa */}
      <div className="flex-1 relative">
        <div id="map" className="w-full h-full" />
        {/* Filtros flotantes sobre el mapa */}
        <div className="absolute top-6 left-10 z-30 flex gap-4 px-4 py-2">
          {filterOptions.map((opt) => (
            <FilterButton
              key={opt.key}
              label={opt.label}
              icon={opt.icon}
              active={filter === opt.key}
              onClick={() => handleFilterClick(opt.key)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}