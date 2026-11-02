import { useEffect, useState } from "react";

const KEY = "3f65c1567cf3d424a94ba82a95726b0a";

const cities = ["Kyiv", "Lviv", "Odesa"];

export async function getWeather() {
    const response = cities.map(async city => {
        const resq = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${KEY}&units=metric&lang=uk`,
        );
         if (!resq.ok) {
           throw new Error("Не вдалося отримати погоду");
         }
        const data = await resq.json()
        return data
    })

  return await Promise.all(response);
}
