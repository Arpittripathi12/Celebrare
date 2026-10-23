import { Heart } from "lucide-react";

export default function PhotoCard({ photo, isFavourite, onToggleFavourite }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="relative overflow-hidden bg-slate-100">
        <img
          src={`https://picsum.photos/id/${photo.id}/700/520`}
          alt={`Photo by ${photo.author}`}
          loading="lazy"
          className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-[1.03]"
        />
        <button
          type="button"
          onClick={() => onToggleFavourite(photo.id)}
          aria-label={isFavourite ? `Remove ${photo.author} photo from favourites` : `Add ${photo.author} photo to favourites`}
          aria-pressed={isFavourite}
          className={`absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full shadow-md transition ${
            isFavourite ? "bg-rose-500 text-white" : "bg-white/95 text-slate-600 hover:text-rose-500"
          }`}
        >
          <Heart size={19} fill={isFavourite ? "currentColor" : "none"} />
        </button>
      </div>
      <div className="p-4">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Photographer</p>
        <h2 className="mt-1 truncate text-sm font-semibold text-slate-800">{photo.author}</h2>
      </div>
    </article>
  );
}