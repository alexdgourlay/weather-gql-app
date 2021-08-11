import countries from "../assets/data/countries.json";

export default function getCountryName(countryISO: string): string | undefined {
  return countries.find((country) => country.Code === countryISO)?.Name.split(",")[0];
}
