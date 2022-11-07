/* eslint-disable @next/next/no-img-element */
import { MapboxGeoJSONFeature } from 'mapbox-gl';

type TextProps = React.PropsWithChildren<{
  className?: string;
}>;

function Text({ children, className }: TextProps) {
  return <p className={`text-center ${className}`}>{children}</p>;
}

type DetailsModalProps = React.PropsWithChildren<{
  feature: MapboxGeoJSONFeature;
}>;

const DetailsModal: React.FC<DetailsModalProps> = (props) => {
  const {
    title,
    type,
    author,
    director,
    artist,
    album,
    editor,
    year,
    place,
    image,
    link,
  } = props.feature.properties || {};

  function toggleAside() {
    document.getElementById('details-dialog')?.classList.add('hidden');
  }

  return (
    <aside
      id="details-dialog"
      className="absolute h-full z-50 bg-white top-0 right-0 w-full sm:w-[max(33%,350px)] hidden border border-black"
    >
      {image ? (
        <img src={image} alt={title} className="object-cover h-1/3 w-full" />
      ) : null}

      <div className="flex flex-col items-center py-2 px-4 gap-2">
        <button onClick={toggleAside} className="self-end">
          &times;
        </button>

        <h3 className="font-serif text-center text-base leading-6 mb-2 ">
          {title}
        </h3>

        {type ? <Text className="italic">{type}</Text> : null}

        {author ? <Text>{author}</Text> : null}

        {director ? <Text>{director}</Text> : null}

        {artist ? <Text>{artist}</Text> : null}

        {year ? <Text>{year}</Text> : null}

        {place ? <Text>{place}</Text> : null}

        {link ? (
          <a
            href={link}
            target="_blank"
            rel="noreferrer"
            className="underline hover:no-underline text-sm"
          >
            Voir plus +
          </a>
        ) : null}

        {editor ? <Text>{editor}</Text> : null}

        {album ? <Text>{album}</Text> : null}
      </div>
    </aside>
  );
};

export default DetailsModal;
