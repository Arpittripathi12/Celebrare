import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import { Camera, Heart, RefreshCw, SearchX } from "lucide-react";
import useFetchPhotos from "../hooks/useFetchPhotos.js";
import favouritesReducer from "../reducers/favouritesReducer.js";
import SearchBar from "./SearchBar.jsx";
import PhotoCard from "./PhotoCard.jsx";

const STORAGE_KEY = "nrebfbhfbfufbuuwcnioqwce";

function getSavedFavourites() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    const parsed = saved ? JSON.parse(saved) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export default function Gallery() {
  const { photos, loading, error } = useFetchPhotos();
  const [search, setSearch] = useState("");
  const [showFavourites, setShowFavourites] = useState(false);
  const [favourites, dispatch] = useReducer(favouritesReducer, undefined, getSavedFavourites);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favourites));
    } catch (storageError) {
      console.error("Could not save favourites to localStorage:", storageError);
    }
  }, [favourites]);

  const handleSearchChange = useCallback((value) => {
    setSearch(value);
  }, []);

  const handleToggleFavourite = useCallback((photoId) => {
    dispatch({ type: "TOGGLE_FAVOURITE", payload: photoId });
  }, []);

  const filteredPhotos = useMemo(() => {
    const query = search.trim().toLowerCase();
    const galleryPhotos = showFavourites
      ? photos.filter((photo) => favourites.includes(photo.id))
      : photos;
    return galleryPhotos.filter((photo) => photo.author.toLowerCase().includes(query));
  }, [photos, favourites, search, showFavourites]);

  return (
    <main className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-5 py-5 sm:px-8">
          <div className="flex items-center gap-3">

            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-indigo-600 text-white">
              <Camera size={22} />





            </span>
            <div>

              <h1 className="text-lg font-bold text-slate-900">Photo Gallery</h1>
              <p className="text-xs text-slate-500">Discover photos from around the world</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setShowFavourites((showing) => !showing)}
            aria-label={showFavourites ? "Show all photos" : "Show favourite photos"}
            aria-pressed={showFavourites}
            className={`relative grid h-11 w-11 shrink-0 place-items-center rounded-xl transition ${
              showFavourites
                ? "bg-rose-500 text-white"
                : "bg-slate-100 text-slate-600 hover:bg-rose-50 hover:text-rose-500"
            }`}
          >
            <Heart size={21} fill={showFavourites ? "currentColor" : "none"} />
            { favourites.length > 0 &&
            <span className="absolute -right-1.5 -top-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-indigo-600 px-1 text-[10px] font-bold text-white">
              {favourites.length}
            </span>}
          </button>

        </div>
      </header>

      <section className="mx-auto max-w-7xl px-5 pb-12 pt-10 sm:px-8 sm:pt-14">
        <div className="mb-8 max-w-2xl">
         
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Find your next <span className="text-indigo-600">favourite.</span>
          </h2>
          <p className="mt-4 text-sm  text-slate-500 sm:text-base">
            Browse the gallery, search by photographer, and tap a heart to save a photo as a favourite.
          </p>
        </div>

        <div className="mb-7">
          <SearchBar value={search} onChange={handleSearchChange} />
        </div>

        <div className="mb-5 flex items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              {showFavourites ? "Favourite photos" : "All photos"}
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              {loading ? "Loading photos..." : `${filteredPhotos.length} ${filteredPhotos.length === 1 ? "photo" : "photos"}${search.trim() ? " found" : ""}`}
            </p>
          </div>
          {!loading && !error && (
            <span className="rounded-full bg-white px-3 py-1.5 text-xs font-medium text-slate-500 ring-1 ring-slate-200">
              {favourites.length} favourited
            </span>
          )}
        </div>

        {loading && (
          <div className="flex min-h-64 flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 text-center">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-100 border-t-indigo-600" role="status" aria-label="Loading photos" />
            <p className="mt-4 font-semibold text-slate-800">Loading photos</p>
            <p className="mt-1 text-sm text-slate-500">Please wait a moment.</p>
          </div>
        )}

        {!loading && error && (
          <div className="flex min-h-64 flex-col items-center justify-center rounded-2xl border border-rose-100 bg-white px-5 text-center">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-rose-50 text-rose-500"><RefreshCw size={22} /></div>
            <h3 className="mt-4 font-semibold text-slate-900">Unable to load photos</h3>
            <p className="mt-2 max-w-md text-sm text-slate-500">{error}</p>
            <button type="button" onClick={() => window.location.reload()} className="mt-5 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700">
              <RefreshCw size={16} /> Try again
            </button>
          </div>
        )}

        {!loading && !error && filteredPhotos.length > 0 && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {filteredPhotos.map((photo) => (
              <PhotoCard
                key={photo.id}
                photo={photo}
                isFavourite={favourites.includes(photo.id)}
                onToggleFavourite={handleToggleFavourite}
              />
            ))}
          </div>
        )}

        {!loading && !error && filteredPhotos.length === 0 && (
          <div className="flex min-h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white px-5 text-center">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-slate-100 text-slate-500"><SearchX size={23} /></div>
            <h3 className="mt-4 font-semibold text-slate-900">
              {showFavourites && favourites.length === 0 ? "No favourites yet" : "No photos found"}
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              {showFavourites && favourites.length === 0
                ? "Tap the heart on any photo to add it to your favourites."
                : "Try another photographer name or clear your search."}
            </p>
          </div>
        )}

        <footer className="mt-12 border-t border-slate-200 pt-6 text-center text-xs text-slate-400">
          Made by Arpit Tripathi.
        </footer>
      </section>
    </main>
  );
}