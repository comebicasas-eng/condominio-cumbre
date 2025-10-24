import { useEffect, useState } from "react";
import {
  CloudSun,
  AlertTriangle,
  Navigation,
  CheckCircle,
  Clock,
  Car,
} from "lucide-react";

export default function TrafficWeatherWidget({
  location = "El Marqués, Qro.",
  lat,
  lon,
}) {
  const [weather, setWeather] = useState(null);
  const [traffic, setTraffic] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=999cebd8b7e35f79e8d4ea92cfd83733&units=metric&lang=es`
    )
      .then((res) => res.json())
      .then((data) => setWeather(data));

    // Obtener tráfico usando TomTom Traffic Flow API
    // Necesitas registrarte en https://developer.tomtom.com/ para obtener tu API key
    const TOMTOM_API_KEY = "1iqw9ynC05rKu4oMtSDJ6V0hffOgIcsB";

    fetch(
      `https://api.tomtom.com/traffic/services/4/flowSegmentData/absolute/10/json?point=${lat},${lon}&key=${TOMTOM_API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        setTraffic(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al obtener tráfico:", err);
        setLoading(false);
      });
  }, [lat, lon]);

  // Calcular nivel de tráfico basado en la velocidad actual vs velocidad libre
  const getTrafficLevel = () => {
    if (!traffic || !traffic.flowSegmentData) return null;

    const currentSpeed = traffic.flowSegmentData.currentSpeed;
    const freeFlowSpeed = traffic.flowSegmentData.freeFlowSpeed;
    const ratio = currentSpeed / freeFlowSpeed;

    if (ratio > 0.8) {
      return {
        level: "fluido",
        color: "green",
        icon: CheckCircle,
        message: "Tráfico fluido",
        detail: "Sin retrasos significativos",
      };
    } else if (ratio > 0.5) {
      return {
        level: "moderado",
        color: "yellow",
        icon: Clock,
        message: "Tráfico moderado",
        detail: `Velocidad reducida a ${Math.round(currentSpeed)} km/h`,
      };
    } else {
      return {
        level: "congestionado",
        color: "red",
        icon: AlertTriangle,
        message: "Mucho tráfico en esta zona",
        detail: `Velocidad de ${Math.round(
          currentSpeed
        )} km/h, retrasos estimados`,
      };
    }
  };

  const trafficInfo = getTrafficLevel();

  const colorClasses = {
    green: { bg: "bg-green-100", text: "text-green-600" },
    yellow: { bg: "bg-yellow-100", text: "text-yellow-600" },
    red: { bg: "bg-red-100", text: "text-red-600" },
  };

  return (
    <div className="p-8 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg px-5 py-3 flex flex-col gap-1 w-full max-w-xs">
        <div className="flex items-center justify-between">
          <span className="font-semibold text-sm">{location}</span>
          <div className="flex items-center gap-1">
            {weather && weather.main && weather.weather ? (
              <>
                <span className="text-sm">
                  {Math.round(weather.main.temp)}°
                </span>
                <img
                  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                  alt={weather.weather[0].description}
                  className="w-6 h-6"
                />
              </>
            ) : (
              <>
                <span className="text-sm">--°</span>
                <CloudSun className="w-6 h-6 text-yellow-400" />
              </>
            )}
          </div>
        </div>

        {loading ? (
          <div className="flex items-center gap-2 mt-1">
            <span className="bg-gray-100 rounded-full p-1 animate-pulse">
              <Navigation className="w-5 h-5 text-gray-400" />
            </span>
            <div className="font-medium text-sm text-gray-400">
              Obteniendo información de tráfico...
            </div>
          </div>
        ) : trafficInfo ? (
          <div className="flex items-center gap-2 mt-1">
            <span
              className={`${
                colorClasses[trafficInfo.color].bg
              } rounded-full p-1`}
            >
              <trafficInfo.icon
                className={`w-5 h-5 ${colorClasses[trafficInfo.color].text}`}
              />
            </span>
            <div>
              <div className="font-medium text-sm">{trafficInfo.message}</div>
              <div className="text-xs text-gray-500">{trafficInfo.detail}</div>
            </div>
            {/* <span className="ml-auto text-gray-400">{">"}</span> */}
          </div>
        ) : (
          <div className="flex items-center gap-2 mt-1">
            <span className="bg-gray-100 rounded-full p-1">
              <Navigation className="w-5 h-5 text-gray-400" />
            </span>
            <div className="font-medium text-sm text-gray-500">
              Información de tráfico no disponible
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
