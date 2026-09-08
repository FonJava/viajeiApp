import {
  createContext,
  useEffect,
  useContext,
  useReducer,
  useCallback,
} from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebase.js";

const citiesCollection = collection(db, "cities");

const CitiesContext = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};

function normalizeCity(snapshot) {
  const city = snapshot.data();
  const lat = Number(city.position?.lat ?? city.lat ?? city.latitude);
  const lng = Number(city.position?.lng ?? city.lng ?? city.longitude);

  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;

  return {
    ...city,
    id: snapshot.id,
    position: { lat, lng },
    date: city.date?.toDate ? city.date.toDate() : new Date(city.date),
  };
}

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };

    case "cities/loaded":
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      };

    case "city/loaded":
      return { ...state, isLoading: false, currentCity: action.payload };

    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };

    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
      };

    case "rejected":
      return { ...state, isLoading: false, error: action.payload };

    default:
      throw new Error("Unknown action type");
  }
}

function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState,
  );
  /* const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({}); */

  useEffect(function () {
    async function fetchCities() {
      dispatch({ type: "loading" });
      try {
        const snapshot = await getDocs(citiesCollection);
        const data = snapshot.docs.map(normalizeCity).filter(Boolean);
        dispatch({ type: "cities/loaded", payload: data });
      } catch (error) {
        console.error("Erro ao carregar cidades do Firestore:", error);
        dispatch({
          type: "rejected",
          payload: "Não foi possível carregar as cidades do Firestore.",
        });
      }
    }
    fetchCities();
  }, []);

  const getCity = useCallback(
    async function getCity(id) {
      if (id === currentCity.id) return;

      dispatch({ type: "loading" });
      try {
        const snapshot = await getDoc(doc(db, "cities", id));
        if (!snapshot.exists()) throw new Error("Cidade não encontrada");
        const city = normalizeCity(snapshot);
        if (!city) throw new Error("A cidade não possui coordenadas válidas");
        dispatch({ type: "city/loaded", payload: city });
      } catch (error) {
        console.error("Erro ao carregar cidade do Firestore:", error);
        dispatch({
          type: "rejected",
          payload: "Não foi possível carregar esta cidade do Firestore.",
        });
      }
    },
    [currentCity.id],
  );

  async function createCity(newCity) {
    dispatch({ type: "loading" });
    try {
      const cityReference = await addDoc(citiesCollection, newCity);
      const snapshot = await getDoc(cityReference);
      const city = normalizeCity(snapshot);
      if (!city) throw new Error("A cidade não possui coordenadas válidas");
      dispatch({
        type: "city/created",
        payload: city,
      });
      return true;
    } catch (error) {
      console.error("Erro ao criar cidade no Firestore:", error);
      dispatch({
        type: "rejected",
        payload: "Não foi possível salvar a cidade no Firestore.",
      });
      return false;
    }
  }

  async function deleteCity(id) {
    dispatch({ type: "loading" });
    try {
      await deleteDoc(doc(db, "cities", id));
      dispatch({ type: "city/deleted", payload: id });
    } catch (error) {
      console.error("Erro ao excluir cidade do Firestore:", error);
      dispatch({
        type: "rejected",
        payload: "Não foi possível excluir a cidade do Firestore.",
      });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        error,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined) {
    throw new Error("useCities was used outside of CitiesProvider");
  }
  return context;
}

export { CitiesProvider, useCities };
